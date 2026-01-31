# Wedding RSVP Website - Setup Guide

## 🎉 Overview
A beautiful Indian-themed wedding RSVP website that automatically saves responses to Google Sheets. Perfect for hosting on GitHub Pages!

## ✨ Features
- 🎨 Beautiful Indian-themed design with animated elements
- 📱 Fully responsive (mobile, tablet, desktop)
- 📊 Automatic data collection to Google Sheets
- 📧 Email backup via mailto
- 🖨️ Print/PDF capability
- 🎭 Theme toggle (Maroon & Gold / Royal Blue)
- ⚡ Smooth animations and transitions
- ♿ Accessible (ARIA labels, semantic HTML)

## 📁 Project Structure
```
wedding_rsvp/
├── index.html              # Main HTML file (clean structure)
├── styles.css              # All styling and animations
├── script.js               # All JavaScript functionality
├── google-apps-script.gs   # Backend Google Sheets integration
├── README.md               # This file
├── deploy.sh               # Deployment helper script
└── .gitignore             # Git ignore file
```

## 📋 Setup Instructions

### Part 1: Set Up Google Sheets Backend

1. **Create Google Apps Script**
   - Go to [script.google.com](https://script.google.com/)
   - Click **"New Project"**
   - Delete the default code and paste the contents of `google-apps-script.gs`
   - Click the save icon and name it "Wedding RSVP Handler"

2. **Deploy as Web App**
   - Click **"Deploy"** → **"New deployment"**
   - Click the gear/settings icon next to "Select type"
   - Choose **"Web app"**
   - Configure settings:
     - **Description**: Wedding RSVP Form Handler
     - **Execute as**: Me (your email)
     - **Who has access**: Anyone
   - Click **"Deploy"**
   - **Authorize** the script (you'll need to grant permissions)
   - **IMPORTANT**: Copy the **Web App URL** (it looks like: `https://script.google.com/macros/s/...`)

3. **Test the Script (Optional)**
   - In the Apps Script editor, select `setupSpreadsheet` from the function dropdown
   - Click **Run**
   - Check the logs - it will show you the Google Sheet URL
   - Open that URL to see your new RSVP spreadsheet

4. **Update Your HTML File**
   - The Google Script URL is already configured in `script.js`
   - If you need to change it, edit `script.js` at line 4:
     ```javascript
     googleScriptUrl: 'https://script.google.com/macros/s/AKfycbyA4teV1FLOzBndwIhxh4zjS03blRcbVotRut2RKGKi_1faf3tKZ2mSiw8UU15dMXOn/exec'
     ```

### Part 2: Deploy to GitHub Pages

1. **Create a GitHub Repository**
   - Go to [github.com](https://github.com/) and sign in
   - Click **"New repository"**
   - Name it something like `wedding-rsvp`
   - Make it **Public**
   - Click **"Create repository"**

2. **Upload Your Files**
   - Option A: Use GitHub Web Interface
     - Click **"uploading an existing file"**
     - Drag and drop `index.html`, `styles.css`, and `script.js`
     - Commit the changes
   
   - Option B: Use Git Commands (in terminal)
     ```bash
     cd /home/helios/Desktop/wedding_rsvp
     git init
     git add index.html styles.css script.js .gitignore
     git commit -m "Initial commit: Wedding RSVP page"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/wedding-rsvp.git
     git push -u origin main
     ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **"Settings"** tab
   - Click **"Pages"** in the left sidebar
   - Under "Source", select **"main"** branch
   - Click **"Save"**
   - Wait a few minutes, then your site will be live at:
     `https://YOUR_USERNAME.github.io/wedding-rsvp/`
   - Or with the specific file:
     `https://YOUR_USERNAME.github.io/wedding-rsvp/index.html`

4. **Optional: Use Custom Domain**
   - If you want a custom domain like `wedding.yourdomain.com`:
     - Add a `CNAME` file to your repository with your domain
     - Update your domain's DNS settings to point to GitHub Pages
     - Follow [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Part 3: Customize Your Website

All customizations are in separate files for easy editing:

1. **Email Address** - Edit `script.js` (Line 4)
   ```javascript
   email: 'nerellagoutham5@gmail.com', // Change to your email
   ```

2. **Wedding Details** - Edit `script.js` (Lines 5-11)
   ```javascript
   event: {
     title: 'Goutham & Supritha – Wedding',
     start: '2026-03-13T13:00:00',
     end: '2026-03-13T22:00:00',
     location: 'New England Sai Baba Temple, 99 Shirdi Way, Groton, Massachusetts',
     description: 'Wedding ceremony– with love.'
   }
   ```

3. **Names and Content** - Edit `index.html`
   - Couple names (Line 50)
   - Dates and times (Lines 53-55, 67)
   - Venue details (Lines 76-84)

4. **Colors and Animations** - Edit `styles.css`
   - Color scheme (Lines 3-11)
   - Animation timings (Lines 400+)

## 🎯 How It Works

1. **Guest fills out the form** on your website
2. **Data is sent to Google Sheets** automatically via the Apps Script
3. **Email is also sent** as a backup using mailto
4. **You can view all responses** in the Google Sheet in real-time
5. **Download as Excel** anytime from Google Sheets (File → Download → Microsoft Excel)

## 📊 Viewing Your Responses

1. Go to [Google Drive](https://drive.google.com/)
2. Find the file named **"Wedding RSVP Responses"**
3. Open it to see all submitted RSVPs
4. The data includes:
   - Timestamp
   - Full Name
   - Email
   - Phone Number
   - Number of Guests
   - Attendance (Yes/No)
   - Meal Preference
   - Allergies/Special Requests
   - Song Request

## 🔧 Troubleshooting

### Form submissions not appearing in Google Sheets?
- Make sure you copied the correct Web App URL
- Ensure the script is deployed with "Who has access: Anyone"
- Check the Apps Script execution logs for errors

### GitHub Pages not working?
- Make sure the repository is public
- Wait 5-10 minutes after enabling Pages
- Check that the file name is correct in the URL

### Need to redeploy the script?
- Go back to Apps Script
- Click "Deploy" → "Manage deployments"
- Click the edit icon, then "Deploy" again
- The URL will remain the same

## 📞 Support

For issues or questions, email: nerellagoutham5@gmail.com

## 🎨 Features to Note

- **Responsive Design**: Works on all devices
- **Accessibility**: ARIA labels and semantic HTML
- **Theme Toggle**: Switch between Maroon/Gold and Royal Blue
- **Calendar Integration**: Downloadable .ics file
- **Print Ready**: Professional PDF output

---

Made with ❤️ for Goutham & Supritha's Wedding
