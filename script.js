/* ==========================================
   RMC CULTURAL FOOTPRINTS - JAVASCRIPT
   ========================================== */

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Carousel Functionality
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
    autoPlayInterval = setInterval(nextSlide, 5000);
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

// Signup Form Handling
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const organization = document.getElementById('organization').value;
        const formMessage = document.getElementById('formMessage');

        try {
            // Simulate form submission
            showMessage(formMessage, 'success', '🎉 You\'re part of RMC Cultural Footprints! We\'ll keep you updated.');
            
            // Reset form
            signupForm.reset();
            
            // In a real application, you would send this data to a server
            console.log({
                fullName,
                email,
                phone,
                organization,
                timestamp: new Date().toISOString()
            });
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } catch (error) {
            showMessage(formMessage, 'error', 'Error submitting form. Please try again.');
            console.error('Error:', error);
        }
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const contactName = document.getElementById('contactName').value;
        const contactEmail = document.getElementById('contactEmail').value;
        const message = document.getElementById('message').value;
        const contactMessage = document.getElementById('contactMessage');

        try {
            // Simulate form submission
            showMessage(contactMessage, 'success', '✅ Message sent successfully! We\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to a server
            console.log({
                name: contactName,
                email: contactEmail,
                message,
                timestamp: new Date().toISOString()
            });
            
            // Clear message after 5 seconds
            setTimeout(() => {
                contactMessage.style.display = 'none';
            }, 5000);
        } catch (error) {
            showMessage(contactMessage, 'error', 'Error sending message. Please try again.');
            console.error('Error:', error);
        }
    });
}

// Helper function to show messages
function showMessage(element, type, text) {
    if (element) {
        element.textContent = text;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
    }
}

// Smooth scroll behavior for links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.objective-card, .benefit-card, .gallery-item, .footer').forEach(el => {
    observer.observe(el);
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Floating CTA button scroll visibility
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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    }
});

// Add ripple effect to buttons
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

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced form validation
const allForms = document.querySelectorAll('form');
allForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && !isValidEmail(emailInput.value)) {
            e.preventDefault();
            const formMessage = form.querySelector('.form-message');
            if (formMessage) {
                showMessage(formMessage, 'error', '❌ Please enter a valid email address.');
            }
        }
    });
});

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Log page load info
console.log('RMC Cultural Footprints - Website Loaded Successfully');
console.log('For inquiries: bigrmc001@gmail.com | 07050725817 | 09047732348');
