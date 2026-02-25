// Ghibli-style Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 5;
        const startX = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// Page Transition Effect for Navigation Links
document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Check if it's an internal link (not external)
        if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
            e.preventDefault();
            
            // Add fade out effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});

// Smooth scroll for hash navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item, .registry-card, .photo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Gift Registry Modal Functions
const registryData = {
    home: {
        title: 'Home Essentials Registry',
        content: `
            <p style="margin-bottom: 1rem;">Help us build our dream home with these essentials:</p>
            <ul style="text-align: left; line-height: 2; margin-left: 2rem;">
                <li>Kitchen appliances and cookware</li>
                <li>Bedroom linens and decor</li>
                <li>Living room furniture</li>
                <li>Home electronics</li>
            </ul>
            <p style="margin-top: 1.5rem; font-weight: 600;">
                Registry Link: <a href="#" style="color: var(--primary-color);">View on Amazon/Target</a>
            </p>
        `
    },
    honeymoon: {
        title: 'Honeymoon Fund',
        content: `
            <p style="margin-bottom: 1rem;">Help us create unforgettable memories on our dream honeymoon!</p>
            <p style="margin-bottom: 1rem;">We're planning to visit:</p>
            <ul style="text-align: left; line-height: 2; margin-left: 2rem;">
                <li>🏝️ Beach Resort Stay</li>
                <li>🍽️ Romantic Dinners</li>
                <li>🚁 Adventure Activities</li>
                <li>📸 Photography Session</li>
            </ul>
            <p style="margin-top: 1.5rem; font-weight: 600;">
                Contribution Details:<br>
                Venmo/PayPal: @yournamehere<br>
                Or Cash/Check at the wedding
            </p>
        `
    },
    traditional: {
        title: 'Traditional Gifts',
        content: `
            <p style="margin-bottom: 1rem;">We appreciate traditional gifts and blessings:</p>
            <ul style="text-align: left; line-height: 2; margin-left: 2rem;">
                <li>🪔 Blessing items for the home</li>
                <li>💍 Gold/Silver jewelry</li>
                <li>🎁 Traditional gift sets</li>
                <li>🌸 Decorative items</li>
            </ul>
            <p style="margin-top: 1.5rem;">
                These can be presented during the wedding ceremonies or reception.
            </p>
        `
    },
    cash: {
        title: 'Cash Gift',
        content: `
            <p style="margin-bottom: 1rem;">Your generous cash gift will help us start our new life together!</p>
            <p style="margin-bottom: 1rem;">We plan to use it for:</p>
            <ul style="text-align: left; line-height: 2; margin-left: 2rem;">
                <li>🏠 Down payment on our first home</li>
                <li>💑 Future family plans</li>
                <li>📚 Continuing education</li>
                <li>💼 Business ventures</li>
            </ul>
            <p style="margin-top: 1.5rem; font-weight: 600;">
                Digital Payment:<br>
                Venmo/PayPal/Zelle: @yournamehere<br><br>
                Or bring cash/check to the wedding reception
            </p>
        `
    }
};

function openRegistry(type) {
    const modal = document.getElementById('registryModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = registryData[type].title;
    body.innerHTML = registryData[type].content;
    
    modal.style.display = 'block';
}

function closeRegistry() {
    document.getElementById('registryModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('registryModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Message Form Handling
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVNgPx5UKGujslzFW913v9ixD2LWn_pl3iSDRr-77tQNUfeDqRumX8RSu49oYNrx-q/exec';

const messageForm = document.getElementById('messageForm');
if (messageForm) {
    messageForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('guestName').value,
            email: document.getElementById('guestEmail').value,
            message: document.getElementById('guestMessage').value,
            timestamp: new Date().toISOString()
        };
        
        const responseDiv = document.getElementById('formResponse');
        responseDiv.textContent = 'Sending your message...';
        responseDiv.className = 'form-response';
        
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            responseDiv.textContent = '✓ Thank you! Your wishes have been sent successfully!';
            responseDiv.classList.add('success');
            
            // Clear form
            document.getElementById('messageForm').reset();
            
            // Clear response after 3 seconds
            setTimeout(() => {
                responseDiv.textContent = '';
                responseDiv.className = 'form-response';
            }, 3000);
            
        } catch (error) {
            console.error('Error:', error);
            responseDiv.textContent = '✗ Oops! Something went wrong. Please try again.';
            responseDiv.classList.add('error');
        }
    });
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
