// Simple server for debugging contact form issues
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email transporter setup
let transporter = null;

// Setup email transporter
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
    console.log('❌ Email not configured');
}

// Test email on startup
if (transporter) {
    transporter.verify((error, success) => {
        if (error) {
            console.log('❌ Email config error:', error.message);
        } else {
            console.log('✅ Email server ready');
        }
    });
}

// Contact endpoint
app.post('/api/contact', async (req, res) => {
    console.log('📧 Contact form hit!');
    console.log('Request body:', req.body);
    
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate input
        if (!name || !email || !subject || !message) {
            console.log('❌ Validation failed');
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }
        
        console.log('✅ Validation passed');
        console.log('📧 Processing message:', { name, email, subject, message });

        // Send email if transporter is available
        if (transporter) {
            try {
                console.log('🔄 Sending email...');
                
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: 'krishkumargupta7631@gmail.com',
                    subject: `📧 Portfolio Contact: ${subject}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #6366f1;">New Contact Form Message</h2>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Subject:</strong> ${subject}</p>
                                <p><strong>Message:</strong> ${message}</p>
                            </div>
                            <p style="color: #6c757d; font-size: 12px;">
                                Sent from: ${new Date().toLocaleString()}
                            </p>
                        </div>
                    `
                };

                const result = await transporter.sendMail(mailOptions);
                console.log('✅ Email sent successfully!');
                console.log('Message ID:', result.messageId);
                
                return res.status(200).json({ 
                    message: '✅ Message sent successfully! I\'ll get back to you soon.' 
                });
                
            } catch (emailError) {
                console.error('❌ Email error:', emailError.message);
                console.error('❌ Full error:', emailError);
                
                return res.status(200).json({ 
                    message: '✅ Message received! I\'ll get back to you soon.' 
                });
            }
        } else {
            console.log('❌ No email transporter');
            return res.status(200).json({ 
                message: '✅ Message received! I\'ll get back to you soon.' 
            });
        }

    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({ 
            message: '❌ Server error. Please try again.' 
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        email_configured: !!transporter
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT}`);
});
