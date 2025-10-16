/* ==========================================
   RMC CULTURAL FOOTPRINTS - MINIMAL JS
   Clean interactions, subtle effects only
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
// Scroll-Triggered Animations (Subtle Fade-In)
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll(
    '.section-title, .objective-card, .benefit-card, .gallery-item, .contact-item'
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
            showMessage(formMessage, 'error', 'Please enter a valid email address.');
            return;
        }

        try {
            const formData = {
                fullName,
                email,
                phone,
                organization,
                timestamp: new Date().toISOString()
            };
            console.log('Signup data:', formData);

            showMessage(formMessage, 'success', 'Welcome! Check your email for next steps.');
            
            setTimeout(() => {
                signupForm.reset();
            }, 500);
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
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
            showMessage(contactMessage, 'error', 'Please enter a valid email address.');
            return;
        }

        try {
            const formData = {
                name: contactName,
                email: contactEmail,
                message,
                timestamp: new Date().toISOString()
            };
            console.log('Contact data:', formData);

            showMessage(contactMessage, 'success', 'Message sent successfully! We\'ll respond within 24 hours.');
            
            setTimeout(() => {
                contactForm.reset();
            }, 500);
            
            setTimeout(() => {
                contactMessage.style.display = 'none';
            }, 5000);
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
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.05)';
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
// Form Input Focus Effects
// ==========================================

const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// ==========================================
// Page Load Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('RMC Cultural Footprints - Website Ready');
    console.log('Contact: bigrmc001@gmail.com | 07050725817 | 09047732348');
});
