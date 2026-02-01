// Wedding RSVP - Main JavaScript

// Event details for calendar export
const EVENTS = {
  'Haldi (March 12, 9:30 AM)': {
    title: 'Haldi Ceremony',
    start: '2026-03-12T09:30:00',
    end: '2026-03-12T12:00:00',
    location: 'New England Sai Baba Temple, 99 Shirdi Way, Groton, Massachusetts',
    description: 'Haldi ceremony for Goutham & Supritha\'s wedding'
  },
  'Upanayanam (March 13, 9:30 AM)': {
    title: 'Upanayanam',
    start: '2026-03-13T09:30:00',
    end: '2026-03-13T14:00:00',
    location: 'New England Sai Baba Temple, 99 Shirdi Way, Groton, Massachusetts',
    description: 'Upanayanam ceremony followed by lunch'
  },
  'Marriage Ceremony (March 13, 9:10 PM)': {
    title: 'Wedding Ceremony - Goutham & Supritha',
    start: '2026-03-13T21:10:00',
    end: '2026-03-14T00:00:00',
    location: 'New England Sai Baba Temple, 99 Shirdi Way, Groton, Massachusetts',
    description: 'Wedding ceremony followed by dinner'
  },
  'Satyanarayana Swami Vratam (March 14, 10:00 AM)': {
    title: 'Satyanarayana Swami Vratam',
    start: '2026-03-14T10:00:00',
    end: '2026-03-14T13:00:00',
    location: 'New England Sai Baba Temple, 99 Shirdi Way, Groton, Massachusetts',
    description: 'Satyanarayana Swami Vratam ceremony'
  }
};

// Configuration
const CONFIG = {
  email: 'nerellagoutham5@gmail.com',
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbxVNgPx5UKGujslzFW913v9ixD2LWn_pl3iSDRr-77tQNUfeDqRumX8RSu49oYNrx-q/exec',
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
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(ev.start)}`,
    `DTEND:${toICSDate(ev.end)}`,
    `SUMMARY:${ev.title}`,
    `LOCATION:${ev.location}`,
    `DESCRIPTION:${ev.description}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: ' + ev.title,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  return ics.join('\r\n');
}

function buildMultiEventICS(events) {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding RSVP//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];
  
  events.forEach(ev => {
    const uid = Math.random().toString(36).slice(2) + '@wedding.local';
    icsLines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${toICSDate(new Date().toISOString())}`,
      `DTSTART:${toICSDate(ev.start)}`,
      `DTEND:${toICSDate(ev.end)}`,
      `SUMMARY:${ev.title}`,
      `LOCATION:${ev.location}`,
      `DESCRIPTION:${ev.description}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: ' + ev.title,
      'END:VALARM',
      'END:VEVENT'
    );
  });
  
  icsLines.push('END:VCALENDAR');
  return icsLines.join('\r\n');
}

function downloadICS(icsContent, filename) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initializeCalendarLink();
  initializeContactEmail();
  initializeFormSubmission();
  initializePDFExport();
  initializeThemeToggle();
  initializeEventCalendarExport();
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
    
    // Validate attendance and events selection
    const attendanceValue = form.querySelector('#attendance').value;
    const eventCheckboxes = form.querySelectorAll('input[name="eventsAttending"]:checked');
    
    if (attendanceValue === 'Yes, joyfully' && eventCheckboxes.length === 0) {
      showSuccessMessage('⚠️ Please select at least one event you plan to attend');
      return;
    }
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    
    // Collect form data but exclude checkboxes (handle separately)
    const formData = new FormData(form);
    const data = {};
    
    // Get all form entries except the checkbox group
    for (let [key, value] of formData.entries()) {
      if (key !== 'eventsAttending') {
        data[key] = value;
      }
    }
    
    // Use the already declared eventCheckboxes from validation above
    const selectedEvents = Array.from(eventCheckboxes).map(cb => cb.value);
    data.eventsAttending = selectedEvents.length > 0 ? selectedEvents.join(', ') : 'None';
    
    console.log('📋 Form data before sending:', data);
    console.log('✅ Events selected:', data.eventsAttending);
    console.log('📝 Fun Ideas:', data.allergies);
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    data.submittedAt = new Date().toLocaleString();
    
    try {
      // Send to Google Sheets
      if (CONFIG.googleScriptUrl && CONFIG.googleScriptUrl !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE') {
        console.log('📤 Sending data to Google Sheets...', data);
        console.log('🔗 URL:', CONFIG.googleScriptUrl);
        
        const response = await fetch(CONFIG.googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        console.log('✅ Request sent to Google Sheets');
        console.log('📊 Response type:', response.type);
        
        // Wait a bit to ensure data is written (since no-cors doesn't give us feedback)
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Show success message
      showSuccessMessage('🎉 Thank you! Your RSVP has been submitted successfully.');
      
      // Reset form
      form.reset();
      
      // Email backup removed - data only goes to Google Sheets
      
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

// Event calendar export functionality
function initializeEventCalendarExport() {
  const calendarBtn = document.getElementById('addToCalendarBtn');
  if (!calendarBtn) return;
  
  calendarBtn.addEventListener('click', function() {
    const checkedBoxes = document.querySelectorAll('input[name="eventsAttending"]:checked');
    
    if (checkedBoxes.length === 0) {
      showSuccessMessage('⚠️ Please select at least one event first');
      return;
    }
    
    const selectedEvents = Array.from(checkedBoxes)
      .map(cb => EVENTS[cb.value])
      .filter(Boolean);
    
    if (selectedEvents.length === 0) {
      showSuccessMessage('⚠️ No valid events selected');
      return;
    }
    
    // Generate ICS file with all selected events
    const icsContent = buildMultiEventICS(selectedEvents);
    const filename = selectedEvents.length === 1 
      ? `${selectedEvents[0].title.replace(/\s+/g, '_')}.ics`
      : 'Wedding_Events.ics';
    
    downloadICS(icsContent, filename);
    showSuccessMessage(`✅ Calendar file downloaded with ${selectedEvents.length} event(s)!`);
  });
}
