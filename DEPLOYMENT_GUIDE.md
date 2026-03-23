# 🚀 Deployment Guide - GitHub & Global Hosting

## 📋 **Step-by-Step Deployment**

### **Step 1: Initialize Git Repository**

```bash
# Navigate to your portfolio folder
cd "c:\Users\krish\OneDrive\Desktop\ShubhamPortfolio"

# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit - Portfolio website with backend"
```

### **Step 2: Create GitHub Repository**

1. **Go to**: https://github.com/shubham123df
2. **Click**: "New repository"
3. **Name**: `portfolio-website` (or your preferred name)
4. **Description**: "Professional portfolio website with contact form and backend"
5. **Make it**: Public
6. **Click**: "Create repository"

### **Step 3: Push to GitHub**

```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/shubham123df/portfolio-website.git

# Push to GitHub
git push -u origin main
```

### **Step 4: Deploy to Global Hosting**

#### **Option A: Vercel (Recommended - Free & Easy)**

1. **Go to**: https://vercel.com
2. **Sign up** with your GitHub account
3. **Click**: "New Project"
4. **Import**: Your GitHub repository
5. **Configure**:
   - Framework: Other
   - Root Directory: ./
   - Build Command: `npm install`
   - Output Directory: ./
   - Install Command: `npm install`

#### **Option B: Netlify (Also Free & Easy)**

1. **Go to**: https://netlify.com
2. **Sign up** with your GitHub account
3. **Click**: "New site from Git"
4. **Select**: Your GitHub repository
5. **Configure**:
   - Build command: `npm install`
   - Publish directory: `./`

#### **Option C: GitHub Pages (Free Static Hosting)**

1. **Create `vercel.json`** (I'll create this file)
2. **Push to GitHub**
3. **Enable GitHub Pages** in repository settings

## 🔧 **Configuration Files Needed**

Let me create the necessary deployment files...
