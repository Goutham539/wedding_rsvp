// Wedding RSVP - Main JavaScript

// Configuration
const CONFIG = {
  email: 'nerellagoutham5@gmail.com',
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbyA4teV1FLOzBndwIhxh4zjS03blRcbVotRut2RKGKi_1faf3tKZ2mSiw8UU15dMXOn/exec',
  event: {
    title: 'Goutham & Supritha – Wedding',
    start: '2026-03-13T13:00:00',
    end: '2026-03-13T22:00:00',
    location: 'New England Sai Baba Temple, 99 Shirdi Way, Groton, Massachusetts',
    description: 'Wedding ceremony– with love.'
  }
};

// Utility Functions
function showSuccessMessage(message) {
  const msgEl = document.createElement('div');
  msgEl.className = 'success-message';
  msgEl.textContent = message;
  document.body.appendChild(msgEl);
  
  setTimeout(() => {
    msgEl.remove();
  }, 3000);
}

function toICSDate(dt) {
  const d = new Date(dt);
  const pad = n => String(n).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  const mm = pad(d.getUTCMonth() + 1);
  const dd = pad(d.getUTCDate());
  const hh = pad(d.getUTCHours());
  const mi = pad(d.getUTCMinutes());
  return `${yyyy}${mm}${dd}T${hh}${mi}00Z`;
}

function buildICS(ev) {
  const uid = Math.random().toString(36).slice(2) + '@wedding.local';
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding RSVP//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(ev.start)}`,
    `DTEND:${toICSDate(ev.end)}`,
    `SUMMARY:${ev.title}`,
    `LOCATION:${ev.location}`,
    `DESCRIPTION:${ev.description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initializeCalendarLink();
  initializeContactEmail();
  initializeFormSubmission();
  initializePDFExport();
  initializeThemeToggle();
  addFormAnimations();
});

// Calendar Link Setup
function initializeCalendarLink() {
  const icsLink = document.getElementById('icsLink');
  if (icsLink) {
    icsLink.href = buildICS(CONFIG.event);
    icsLink.download = 'wedding.ics';
  }
}

// Contact Email Setup
function initializeContactEmail() {
  const contactEmail = document.getElementById('contactEmail');
  if (contactEmail) {
    contactEmail.href = 'mailto:' + CONFIG.email;
  }
}

// Form Submission Handler
function initializeFormSubmission() {
  const form = document.getElementById('rsvpForm');
  const submitBtn = document.getElementById('submitBtn');
  
  if (!form || !submitBtn) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    data.submittedAt = new Date().toLocaleString();
    
    try {
      // Send to Google Sheets
      if (CONFIG.googleScriptUrl && CONFIG.googleScriptUrl !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE') {
        await fetch(CONFIG.googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        console.log('✅ Data sent to Google Sheets');
      }
      
      // Show success message
      showSuccessMessage('🎉 Thank you! Your RSVP has been submitted successfully.');
      
      // Reset form
      form.reset();
      
      // Optional: Send email backup only if email is provided
      if (data.email && data.email.trim() !== '') {
        const subject = `Wedding RSVP – ${data.guestName || ''}`;
        const bodyLines = [
          `Name: ${data.guestName || ''}`,
          `Email: ${data.email || ''}`,
          `Phone: ${data.phone || ''}`,
          `Number of Guests: ${data.guests || ''}`,
          `Arrival Date: ${data.arrivalDate || ''}`,
          `Attendance: ${data.attendance || ''}`,
          `Fun Ideas: ${data.allergies || ''}`,
          `Submitted: ${data.submittedAt}`
        ];
        
        const mailto = `mailto:${encodeURIComponent(CONFIG.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
        
        // Small delay before opening mailto
        setTimeout(() => {
          window.location.href = mailto;
        }, 1000);
      }
      
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('There was an issue submitting your RSVP. Please try again or email us directly.');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.textContent = originalText;
    }
  });
}

// PDF Export Handler
function initializePDFExport() {
  const pdfBtn = document.getElementById('savePdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// Theme Toggle Handler
function initializeThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  
  // Check for saved theme preference, default to blue
  const savedTheme = localStorage.getItem('weddingTheme') || 'blue';
  if (savedTheme === 'blue') {
    document.body.classList.add('theme-blue');
    toggle.textContent = 'Switch to Maroon & Gold ✨';
    toggle.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove('theme-blue');
    toggle.textContent = 'Switch to Royal Blue ✨';
    toggle.setAttribute('aria-pressed', 'false');
  }
  
  toggle.addEventListener('click', () => {
    const isBlue = document.body.classList.toggle('theme-blue');
    toggle.setAttribute('aria-pressed', isBlue);
    toggle.textContent = isBlue ? 'Switch to Maroon & Gold ✨' : 'Switch to Royal Blue ✨';
    
    // Save preference
    localStorage.setItem('weddingTheme', isBlue ? 'blue' : 'maroon');
  });
}

// Add Form Field Animations
function addFormAnimations() {
  const formGroups = document.querySelectorAll('.form-group');
  
  formGroups.forEach((group, index) => {
    group.style.animationDelay = `${0.1 + (index * 0.05)}s`;
  });
  
  // Add focus/blur animations to inputs
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'translateX(4px)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'translateX(0)';
    });
  });
}

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
