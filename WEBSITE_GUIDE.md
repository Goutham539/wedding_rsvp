# Goutham & Supritha Wedding Website

A beautiful, immersive multi-page wedding website with Ghibli-style animations, custom logo, and smooth page transitions.

## 🌟 Features

### Brand Identity
- **Custom Logo**: G&S monogram with elegant design in navigation and footer
- **Couple Names**: Goutham & Supritha prominently displayed
- **Tagline**: "Forever Together" as the wedding brand

### Multi-Page Architecture
Instead of scrolling sections, the website now has separate pages for better navigation:

1. **index.html** - Home page with welcome and quick links
2. **events.html** - Wedding events timeline with locations
3. **registry.html** - Gift registry options
4. **photos.html** - Photo gallery
5. **messages.html** - Guestbook for wishes and messages
6. **family-events.html** - RSVP form with back to home link

### Immersive Design Features
- ✨ Ghibli-style floating particles animation
- 🎨 Smooth gradient backgrounds with color shifting
- 🔄 Page transition effects when navigating
- 💫 Fade-in animations on page load
- 📱 Fully responsive design
- 🎯 Interactive hover effects and animations

### Navigation
- Sticky navigation bar with logo
- Active page highlighting
- Smooth page transitions
- RSVP button always accessible

### Footer
- Displays logo with couple names
- Links to all pages
- Professional and cohesive design

## 📁 File Structure

```
wedding_rsvp-main/
├── index.html              # Home page
├── events.html             # Events timeline
├── registry.html           # Gift registry
├── photos.html             # Photo gallery
├── messages.html           # Guestbook
├── family-events.html      # RSVP form
├── wedding-site-styles.css # Main stylesheet
├── wedding-site-script.js  # JavaScript functionality
└── wedding-site-backend.gs # Google Apps Script for messages
```

## 🚀 Setup Instructions

### 1. Update Content

**index.html:**
- Hero section already has your names
- Update the "Save the Date" with actual date
- Customize the "Our Story" section

**events.html:**
- All events are already populated with your details:
  - Sangeet Night at Empire Biryani & Grille
  - Haldi Ceremony at Condo in Lowell
  - Wedding Ceremony at New England Shirdi Sai Temple
  - Satyanarayana Swami Vratam at New England Shirdi Sai Temple
- Each event has Google Maps links

**registry.html:**
- Update payment details in `wedding-site-script.js`
- Add actual registry links (Amazon, Target, etc.)

**photos.html:**
- Replace photo placeholders with your couple photos
- Update photo captions as needed

**messages.html:**
- Setup Google Sheets backend (see below)

### 2. Add Your Photos

Replace the placeholders in `photos.html`:

```html
<!-- Replace this: -->
<div class="photo-placeholder">
    <span>Add Your Photo 1</span>
</div>

<!-- With this: -->
<img src="your-photo.jpg" alt="First Meeting" style="width: 100%; height: 300px; object-fit: cover;">
```

### 3. Setup Messages Backend

Follow instructions in `WEDDING_SITE_SETUP.md` to:
1. Create Google Sheet
2. Add the Apps Script
3. Deploy as Web App
4. Update the URL in `wedding-site-script.js`

### 4. Customize Colors (Optional)

In `wedding-site-styles.css` (lines 11-21):

```css
:root {
    --primary-color: #d4a574;      /* Gold */
    --secondary-color: #8b7355;    /* Brown */
    --accent-color: #f4e4d7;       /* Cream */
    --ghibli-green: #a8d5ba;       /* Soft green */
    --ghibli-blue: #89b8d4;        /* Soft blue */
    --ghibli-pink: #f4c2c2;        /* Soft pink */
}
```

## 🎨 Logo Design

The custom G&S logo features:
- Circular border with gradient
- Monogram "G&S" in elegant font
- Decorative elements (dots and curve)
- Couple names below
- "Forever Together" tagline

The logo appears in:
- Navigation bar (with text on desktop)
- Footer (larger size with full branding)

## 🔄 Page Transitions

The website includes smooth transitions between pages:
- Fade-out effect when clicking links
- Fade-in effect when page loads
- Creates a cohesive, app-like experience

## 📱 Responsive Design

- Desktop: Full logo with names visible
- Mobile: Logo icon only in navigation
- Footer adapts to vertical layout on mobile
- Touch-friendly buttons and links

## 🎯 Quick Links Section

The home page features interactive cards for:
- 📅 Events Timeline
- 🎁 Gift Registry
- 📸 Photo Gallery
- 💌 Guestbook

Each card has:
- Animated icons
- Hover effects
- Arrow indicators
- Direct links to pages

## 🌐 Deployment

### GitHub Pages

1. Push all files to your repository:
```bash
git add .
git commit -m "Update wedding website with multi-page design"
git push
```

2. Your website will be at:
   - Main: `https://goutham539.github.io/wedding_rsvp/`
   - Events: `https://goutham539.github.io/wedding_rsvp/events.html`
   - Registry: `https://goutham539.github.io/wedding_rsvp/registry.html`
   - Gallery: `https://goutham539.github.io/wedding_rsvp/photos.html`
   - Guestbook: `https://goutham539.github.io/wedding_rsvp/messages.html`
   - RSVP: `https://goutham539.github.io/wedding_rsvp/family-events.html`

## ✨ Key Improvements

### From Single Page to Multi-Page
- **Better Navigation**: Each section has its own dedicated page
- **Faster Loading**: Pages load independently
- **More Authentic**: Feels like a professional website
- **Easier to Share**: Can share direct links to specific pages

### Brand Identity
- **Custom Logo**: Professional G&S monogram design
- **Consistent Branding**: Logo appears throughout the site
- **Personal Touch**: Your names featured prominently

### User Experience
- **Smooth Transitions**: Elegant page navigation
- **Quick Access**: Direct links from home page
- **Clear Hierarchy**: Organized content structure
- **Mobile Friendly**: Works perfectly on all devices

## 🎊 Pages Overview

### Home (index.html)
- Hero section with names and call-to-action
- Quick links to all sections
- "Our Story" highlight
- Full branding and navigation

### Events (events.html)
- Visual timeline of all wedding events
- Venue details with addresses
- Google Maps integration
- RSVP reminder

### Registry (registry.html)
- Gift options with interactive cards
- Modal popups for details
- Payment information
- Traditional and modern options

### Gallery (photos.html)
- Grid layout for photos
- Placeholder guidance
- Ghibli-style presentation
- Captions for each photo

### Guestbook (messages.html)
- Message submission form
- Display of all wishes
- Reply functionality (via Google Sheets)
- Real-time updates

## 🛠️ Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript**: Interactive functionality
- **Google Apps Script**: Backend for messages
- **GitHub Pages**: Hosting

## 📞 Support

For questions or customization help, refer to:
- `WEDDING_SITE_SETUP.md` - Detailed setup guide
- `SUMMARY.txt` - Project overview
- `README.md` - This file

---

**Congratulations on your wedding! 💑**

Enjoy your beautiful, professional wedding website!
