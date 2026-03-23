# 📧 Email Setup Guide for Contact Form

## 🔧 **Quick Fix for Email Issue**

The contact form is working but emails aren't sending because the email configuration needs to be set up properly.

## 📋 **Step-by-Step Setup**

### **1. Get Gmail App Password**

1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to **Security** → **2-Step Verification**
4. Enable it if not already enabled

### **2. Generate App Password**

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** for the app
3. Select **Other (Custom name)** for the device
4. Enter "Portfolio Contact Form" as the name
5. Click **Generate**
6. **Copy the 16-character password** (this is your EMAIL_PASS)

### **3. Update .env File**

Edit the `.env` file in your portfolio folder:

```env
# Replace with your actual Gmail and app password
EMAIL_USER=your-actual-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password

# Keep these the same
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
```

### **4. Restart Server**

1. Stop the current server: Press **Ctrl+C**
2. Start again: `npm start`

## 🧪 **Test the Contact Form**

1. Open your portfolio: http://localhost:5000
2. Go to Contact section
3. Fill out the form with your details
4. Click "Send Message"
5. Check:
   - Your email inbox for the message
   - Sender's email for confirmation

## 🔍 **Troubleshooting**

### **If still not working:**

1. **Check console logs** - Look for email configuration errors
2. **Verify app password** - Make sure it's exactly 16 characters
3. **Check Gmail settings** - Ensure "Less secure apps" is allowed if needed
4. **Try different email** - You can use any Gmail account

### **Alternative: Use a Different Email Service**

You can also configure with other email providers by updating `server.js`:

```javascript
// Example for Outlook
const transporter = nodemailer.createTransporter({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## ✅ **Success Indicators**

When properly configured, you'll see in console:
- `Email server is ready to send messages`
- `Emails sent successfully` (when form is submitted)

## 📞 **Need Help?**

If you're still having issues:
1. Check the server console for specific error messages
2. Ensure MongoDB is running
3. Verify all fields in .env are filled correctly

The contact form will save messages to database even if email fails, so you won't lose any submissions!
