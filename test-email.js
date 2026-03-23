// Quick test to check email configuration
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS configured:', process.env.EMAIL_PASS ? 'Yes' : 'No');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('❌ Email not configured properly');
        return;
    }
    
    if (process.env.EMAIL_USER === 'krishkumargupta7631@gmail.com' && 
        process.env.EMAIL_PASS === 'YOUR_GMAIL_APP_PASSWORD_HERE') {
        console.log('⚠️  Using placeholder password - please update .env file');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('✅ Email configuration is valid');
        
        // Send test email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'krishkumargupta7631@gmail.com',
            subject: '📧 Test Email from Portfolio',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">✅ Email Configuration Test</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p>This is a test email to verify your email configuration is working properly.</p>
                        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>Status:</strong> Email service is configured correctly</p>
                    </div>
                    <p style="color: #6c757d; font-size: 14px; text-align: center;">
                        If you receive this email, your contact form will send emails successfully!
                    </p>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully to krishkumargupta7631@gmail.com');
        
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        console.log('🔧 Possible solutions:');
        console.log('1. Check if EMAIL_PASS is correct (16-character app password)');
        console.log('2. Enable 2-factor authentication on Gmail');
        console.log('3. Generate new app password from: https://myaccount.google.com/apppasswords');
    }
}

testEmail();
