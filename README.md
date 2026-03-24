# Shubham Kumar Gupta - Portfolio Website

A modern, responsive portfolio website with backend functionality for contact forms, built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations and transitions
- **Contact Form**: Functional contact form with email notifications
- **Backend Integration**: Node.js/Express.js backend with MongoDB database
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: 3D card effects, parallax scrolling, and smooth animations
- **Rate Limiting**: Protection against spam submissions
- **Email Notifications**: Automatic email sending to both recipient and sender

## 📁 Project Structure

```
ShubhamPortfolio/
├── index.html          # Main HTML file
├── style.css          # Styling
├── script.js          # Frontend JavaScript
├── server.js          # Backend server
├── package.json       # Node.js dependencies
├── .env              # Environment variables
├── README.md         # This file
└── shubham.png       # Profile image
```

## 🛠️ Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (installed and running)
3. **Gmail Account** (for email functionality)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Edit the `.env` file and update the following:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/portfolio

   # Email Configuration (Gmail)
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password

   # Server Configuration
   PORT=5000
   ```

3. **Setup Gmail App Password**
   
   - Enable 2-factor authentication on your Gmail account
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security > App passwords
   - Generate a new app password for this application
   - Use this app password in the `EMAIL_PASS` field

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   net start MongoDB

   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the Application**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

6. **Access the Portfolio**
   
   Open your browser and navigate to:
   ```
   https://shubham123df.github.io/Shubham-Kumar-Gupta-portfolio/
   ```

## 📧 Contact Form Functionality

The contact form includes:

- **Form Validation**: Client-side and server-side validation
- **Rate Limiting**: 5 submissions per 15 minutes per IP
- **Database Storage**: All messages are stored in MongoDB
- **Email Notifications**: 
  - Sends email to `krishkumargupta7631@gmail.com`
  - Sends confirmation email to the sender
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🎨 Customization

### Updating Personal Information

1. **Name and Title**: Edit `index.html` (lines 35-36)
2. **Email**: Update in `index.html` (line 190) and `server.js` (line 95)
3. **LinkedIn**: Update the link in `index.html` (line 198)
4. **Social Links**: Update in the contact section of `index.html`

### Styling

- Modify `style.css` to change colors, fonts, and layouts
- Main color variables are defined in `:root` (lines 5-11)

### Adding New Sections

1. Add new HTML sections in `index.html`
2. Add corresponding styles in `style.css`
3. Add any JavaScript functionality in `script.js`

## 🚀 Deployment

### Local Deployment

Follow the setup instructions above.

### Cloud Deployment (Heroku Example)

1. **Install Heroku CLI**
2. **Login to Heroku**
   ```bash
   heroku login
   ```
3. **Create App**
   ```bash
   heroku create your-portfolio-app
   ```
4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   ```
5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## 📱 API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)
- `GET /api/health` - Health check endpoint

## 🛡️ Security Features

- Rate limiting on contact form
- Input validation and sanitization
- CORS protection
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the setup instructions above
2. Ensure all prerequisites are installed
3. Verify environment variables are correctly set
4. Check MongoDB is running

---

**Built with ❤️ by Shubham Kumar Gupta**
