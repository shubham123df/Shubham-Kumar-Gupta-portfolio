const nodemailer = require('nodemailer');
require('dotenv').config();

// Quick email test without server dependencies
async function quickTest() {
    console.log('🔍 Quick Email Test');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', process.env.EMAIL_PASS ? 'Yes' : 'No');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('❌ Email credentials missing');
        return false;
    }
    
    if (process.env.EMAIL_PASS === 'YOUR_GMAIL_APP_PASSWORD_HERE') {
        console.log('⚠️  Still using placeholder password');
        return false;
    }
    
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        console.log('🔄 Testing email connection...');
        await transporter.verify();
        console.log('✅ Gmail connection successful');
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'krishkumargupta7631@gmail.com',
            subject: '📧 Quick Test - Portfolio Contact Form',
            text: 'This is a quick test to verify email sending is working.',
            html: '<h2>✅ Email Test Successful</h2><p>If you receive this email, your contact form is working perfectly!</p>'
        };
        
        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully!');
        console.log('Message ID:', result.messageId);
        return true;
        
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        console.log('Error code:', error.code);
        return false;
    }
}

quickTest();
