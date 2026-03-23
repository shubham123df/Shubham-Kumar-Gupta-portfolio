const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from the current directory

// Apply rate limiting to contact endpoint
app.use('/api/contact', limiter);

console.log('📧 MongoDB disabled for deployment - using email only');

// Contact Message Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Email transporter setup
let transporter = null;

// Setup email transporter if environment variables are available
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    console.log('✅ Gmail configured for:', process.env.EMAIL_USER);
} else {
    console.log('📧 Email not configured - contact form will work but no emails will be sent');
}

// Test email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error.message);
        console.log('Please check your .env file and ensure EMAIL_USER and EMAIL_PASS are correctly set.');
        console.log('For Gmail: Enable 2-factor authentication and use an App Password.');
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Serve static files first
app.use(express.static('.'));

// Apply rate limiting to contact endpoint
app.use('/api/contact', limiter);

// API routes
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }
        
        console.log('📧 New contact form submission:', { name, email, subject, message });

        // Send email if transporter is available
        if (transporter) {
            try {
                console.log('🔄 Sending emails...');
                
                // Send email to you
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: 'krishkumargupta7631@gmail.com',
                    subject: `📧 New Contact Form Message: ${subject}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #6366f1; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                                📧 New Contact Form Submission
                            </h2>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Subject:</strong> ${subject}</p>
                                <p><strong>Message:</strong></p>
                                <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #8b5cf6;">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                            <p style="color: #6c757d; font-size: 14px; text-align: center;">
                                This message was sent from your portfolio website contact form.
                            </p>
                        </div>
                    `
                };

                // Send confirmation email to sender
                const confirmationMailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: '✅ Thank you for contacting Shubham Kumar Gupta',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #6366f1;">✅ Thank You for Reaching Out!</h2>
                            <p>Dear ${name},</p>
                            <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p><strong>Your Message:</strong></p>
                                <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #8b5cf6;">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                            <p>Best regards,<br>Shubham Kumar Gupta</p>
                            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                                <p style="color: #6c757d; font-size: 12px;">
                                    Connect with me: 
                                    <a href="https://www.linkedin.com/in/shubham-kumar-gupta-b760b8334/" style="color: #6366f1;">LinkedIn</a> | 
                                    <a href="https://github.com/shubham123df" style="color: #6366f1;">GitHub</a>
                                </p>
                            </div>
                        </div>
                    `
                };

                // Send both emails
                await transporter.sendMail(mailOptions);
                console.log('✅ Email sent to krishkumargupta7631@gmail.com');
                
                await transporter.sendMail(confirmationMailOptions);
                console.log('✅ Confirmation email sent to:', email);
                
                return res.status(200).json({ 
                    message: '✅ Message sent successfully! I\'ll get back to you soon.' 
                });
                
            } catch (emailError) {
                console.error('❌ Email sending failed:', emailError.message);
                console.error('❌ Full error:', emailError);
                
                // Still return success to user but log error
                return res.status(200).json({ 
                    message: '✅ Message received! I\'ll get back to you soon.' 
                });
            }
        } else {
            // No email configuration - just log the message
            console.log('📧 Email not configured - message logged only');
            console.log('📋 Message details:', { name, email, subject, message });
            
            return res.status(200).json({ 
                message: '✅ Message received! I\'ll get back to you soon.' 
            });
        }

    } catch (error) {
        console.error('❌ Error in contact form submission:', error);
        res.status(500).json({ 
            message: '❌ Internal server error. Please try again later.' 
        });
    }
});

// Get all contact messages (for admin purposes)
app.get('/api/contact', async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} to view the portfolio`);
});
