@echo off
echo Starting Shubham's Portfolio Backend Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if MongoDB is running
echo Checking MongoDB connection...
timeout /t 2 >nul

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies!
        pause
        exit /b 1
    )
)

REM Check if .env file exists
if not exist ".env" (
    echo Warning: .env file not found!
    echo Please create a .env file with your email and MongoDB configuration.
    echo.
    echo Example .env file:
    echo MONGODB_URI=mongodb://localhost:27017/portfolio
    echo EMAIL_USER=your-email@gmail.com
    echo EMAIL_PASS=your-app-password
    echo PORT=5000
    echo.
    pause
)

echo Starting server...
echo.
echo Portfolio will be available at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

npm start
