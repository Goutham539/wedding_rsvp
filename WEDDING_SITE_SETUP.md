# Wedding Website Setup Guide

## 🎉 Your Immersive Wedding Website

This website includes:
- ✨ Ghibli-style floating particles and dreamy animations
- 📅 Events timeline with locations
- 🎁 Gift registry options
- 📸 Photo moments section
- 💌 Messages/guestbook with reply functionality
- 🔗 RSVP link integration

## 📁 Files Created

1. **wedding-site.html** - Main website page
2. **wedding-site-styles.css** - All styling with Ghibli effects
3. **wedding-site-script.js** - Interactive functionality
4. **wedding-site-backend.gs** - Google Apps Script for messages backend

## 🚀 Setup Instructions

### Step 1: Customize the Content

Open `wedding-site.html` and update:

1. **Hero Section (lines 40-45)**
   - Replace "Our Wedding" with your names
   - Update the wedding date

2. **Events Timeline (lines 58-112)**
   - Update event names, times, and descriptions
   - Replace locations with your actual venues
   - Update addresses

3. **Gift Registry (lines 164-183)**
   - Update payment details (Venmo/PayPal)
   - Add your actual registry links

### Step 2: Add Your Photos

Replace the photo placeholders:

1. Save your couple photos as:
   - `photo1.jpg`, `photo2.jpg`, etc.
2. In `wedding-site.html`, replace lines like:
   ```html
   <div class="photo-placeholder">
       <span>Add Your Photo 1</span>
   </div>
   ```
   With:
   ```html
   <img src="photo1.jpg" alt="First Meeting" style="width: 100%; height: 300px; object-fit: cover;">
   ```

### Step 3: Setup Messages Backend (Google Sheets)

1. **Create a new Google Sheet:**
   - Go to https://sheets.google.com
   - Create a new blank spreadsheet
   - Name it "Wedding Messages"

2. **Add the Apps Script:**
   - In Google Sheets, click **Extensions** > **Apps Script**
   - Delete any existing code
   - Copy all content from `wedding-site-backend.gs`
   - Paste it into the Apps Script editor
   - Update line 6: Replace `your-email@example.com` with your email
   - Click **Save** (💾 icon)

3. **Deploy as Web App:**
   - Click **Deploy** > **New deployment**
   - Click the gear icon ⚙️ > Select **Web app**
   - Description: "Wedding Messages API"
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy the **Web app URL** (it looks like: https://script.google.com/macros/s/...)

4. **Update the Website:**
   - Open `wedding-site-script.js`
   - Find line 158: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`
   - Replace it with your actual Web App URL

### Step 4: Customize Colors (Optional)

In `wedding-site-styles.css`, lines 11-21, customize the color scheme:

```css
:root {
    --primary-color: #d4a574;      /* Main gold color */
    --secondary-color: #8b7355;    /* Brown color */
    --accent-color: #f4e4d7;       /* Light cream */
    --ghibli-green: #a8d5ba;       /* Soft green */
    --ghibli-blue: #89b8d4;        /* Soft blue */
    --ghibli-pink: #f4c2c2;        /* Soft pink */
}
```

### Step 5: Test Locally

1. Open `wedding-site.html` in a web browser
2. Test all sections and navigation
3. Submit a test message to verify the backend works

### Step 6: Deploy to GitHub Pages

1. Push to GitHub:
   ```bash
   git add wedding-site.html wedding-site-styles.css wedding-site-script.js
   git commit -m "Add immersive wedding website"
   git push
   ```

2. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Source: Deploy from main branch
   - Save

3. Your website will be at:
   `https://goutham539.github.io/wedding_rsvp/wedding-site.html`

## 💌 Managing Messages & Replies

1. Open your Google Sheet to see all messages
2. To reply to a message:
   - Find the message row
   - Add your reply in column E (Reply)
   - The reply will automatically appear on the website
3. You'll receive email notifications for new messages

## 🎨 Creating the Ghibli Effect

The website already has:
- ✨ Floating particles animation
- 🌈 Gradient color shifting background
- 🎭 Smooth parallax scrolling
- 💫 Fade-in animations

To enhance:
1. Use soft, pastel-colored photos of you as a couple
2. Consider using photo filters that give a dreamy, painted look
3. The photos will blend beautifully with the animated background

## 📱 Mobile Responsive

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Troubleshooting

**Messages not sending?**
- Check that you deployed the Google Apps Script
- Verify the Web App URL in `wedding-site-script.js`
- Ensure the script has permissions

**Photos not showing?**
- Check file paths are correct
- Ensure images are in the same folder as HTML
- Verify image file names match the code

**Animations not smooth?**
- Clear browser cache
- Try a different browser (Chrome recommended)

## 🎯 What's Included

- **Immersive Ghibli Design**: Floating particles, gradient backgrounds, smooth animations
- **Events Timeline**: Visual timeline with all event details and locations
- **Gift Registry**: Interactive cards for different gift options
- **Photo Gallery**: Showcase your journey as a couple
- **Messages System**: Full guestbook with reply functionality
- **RSVP Integration**: Links to your existing RSVP page
- **Mobile Responsive**: Perfect on all devices

## 🌟 Next Steps

1. Customize all content and add your photos
2. Setup the Google Sheets backend for messages
3. Test everything thoroughly
4. Share the link with your guests!

Enjoy your beautiful wedding website! 💑✨
