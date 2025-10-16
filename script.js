/* ==========================================
   RMC CULTURAL FOOTPRINTS - ENHANCED JS
   Premium interactions and animations
   ========================================== */

// ==========================================
// Mobile Menu Toggle
// ==========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when nav link is clicked
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    }
});

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ==========================================
// Carousel Functionality
// ==========================================

const carousel = document.querySelector('.carousel-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselItems = document.querySelectorAll('.carousel-item');

let currentIndex = 0;
let autoPlayInterval;

function updateCarousel() {
    if (carousel && carouselItems.length > 0) {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
    resetAutoPlay();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
    resetAutoPlay();
}

function autoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlay();
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    autoPlay();
}

// ==========================================
// Scroll-Triggered Animations
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class if not already animated
            if (!entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(
    '.section-title, .objective-card, .benefit-card, .gallery-item, .contact-item, .footer-section'
).forEach(el => {
    observer.observe(el);
});

// ==========================================
// Signup Form Handling
// ==========================================

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const organization = document.getElementById('organization').value;
        const formMessage = document.getElementById('formMessage');

        if (!isValidEmail(email)) {
            showMessage(formMessage, 'error', '❌ Please enter a valid email address.');
            return;
        }

        try {
            // Log form data (in production, send to server)
            const formData = {
                fullName,
                email,
                phone,
                organization,
                timestamp: new Date().toISOString()
            };
            console.log('Signup data:', formData);

            // Show success message
            showMessage(formMessage, 'success', '🎉 Welcome to RMC Cultural Footprints! Check your email for next steps.');
            
            // Reset form with delay
            setTimeout(() => {
                signupForm.reset();
            }, 500);
            
            // Clear message after 6 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 6000);
        } catch (error) {
            showMessage(formMessage, 'error', 'Error submitting form. Please try again.');
            console.error('Error:', error);
        }
    });
}

// ==========================================
// Contact Form Handling
// ==========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const contactName = document.getElementById('contactName').value;
        const contactEmail = document.getElementById('contactEmail').value;
        const message = document.getElementById('message').value;
        const contactMessage = document.getElementById('contactMessage');

        if (!isValidEmail(contactEmail)) {
            showMessage(contactMessage, 'error', '❌ Please enter a valid email address.');
            return;
        }

        try {
            // Log form data (in production, send to server)
            const formData = {
                name: contactName,
                email: contactEmail,
                message,
                timestamp: new Date().toISOString()
            };
            console.log('Contact data:', formData);

            // Show success message
            showMessage(contactMessage, 'success', '✅ Message sent successfully! We\'ll respond within 24 hours.');
            
            // Reset form with delay
            setTimeout(() => {
                contactForm.reset();
            }, 500);
            
            // Clear message after 6 seconds
            setTimeout(() => {
                contactMessage.style.display = 'none';
            }, 6000);
        } catch (error) {
            showMessage(contactMessage, 'error', 'Error sending message. Please try again.');
            console.error('Error:', error);
        }
    });
}

// ==========================================
// Helper Functions
// ==========================================

function showMessage(element, type, text) {
    if (element) {
        element.textContent = text;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================
// Smooth Scroll Navigation
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Header Scroll Effects
// ==========================================

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================================
// Floating CTA Button Visibility
// ==========================================

const floatingCta = document.querySelector('.floating-cta');
if (floatingCta) {
    window.addEventListener('scroll', () => {
        const signupSection = document.getElementById('signup');
        if (signupSection) {
            const signupRect = signupSection.getBoundingClientRect();
            if (signupRect.top < window.innerHeight) {
                floatingCta.style.opacity = '0';
                floatingCta.style.pointerEvents = 'none';
            } else {
                floatingCta.style.opacity = '1';
                floatingCta.style.pointerEvents = 'auto';
            }
        }
    });
}

// ==========================================
// Button Ripple Effect
// ==========================================

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        if (this.style.position === 'static') {
            this.style.position = 'relative';
        }
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==========================================
// Form Input Focus Effects
// ==========================================

const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// ==========================================
// Page Load Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ RMC Cultural Footprints - Website Loaded');
    console.log('📞 Contact: bigrmc001@gmail.com | 07050725817 | 09047732348');
    console.log('🌍 Preserving Yoruba Heritage Through Education');
});

// ==========================================
// Smooth Page Transitions
// ==========================================

window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.95';
});

// ==========================================
// Accessibility - Keyboard Navigation
// ==========================================

document.addEventListener('keydown', (e) => {
    // Tab through buttons
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('btn')) {
            focusedElement.style.outline = '2px solid var(--primary-gold)';
        }
    }
});
