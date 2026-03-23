// Quick email test for debugging
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
    console.log('🔍 Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', process.env.EMAIL_PASS ? 'Yes' : 'No');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('❌ Email credentials not found');
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
        
        console.log('🔄 Creating test email...');
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'krishkumargupta7631@gmail.com',
            subject: '📧 Test Email from Render',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">✅ Email Test Successful!</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>From:</strong> Render Deployment</p>
                        <p><strong>To:</strong> krishkumargupta7631@gmail.com</p>
                        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>Status:</strong> Email service is working!</p>
                    </div>
                </div>
            `
        };
        
        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully!');
        console.log('Message ID:', result.messageId);
        return true;
        
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        console.error('Error code:', error.code);
        return false;
    }
}

testEmail().then(success => {
    if (success) {
        console.log('🎉 Email configuration is working!');
    } else {
        console.log('💥 Email configuration failed!');
    }
    process.exit(0);
});
