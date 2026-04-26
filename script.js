// =============================================
// Smart Agriculture Assistant - Main JavaScript
// =============================================

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function isMobile() {
    return window.innerWidth <= 992;
}

function closeMobileMenu() {
    if (navMenu) {
        navMenu.classList.remove('show');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMobile()) closeMobileMenu();
    });
});

window.addEventListener('resize', () => {
    if (!isMobile()) closeMobileMenu();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
});

// Scroll Reveal Animation
const revealEls = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;
    revealEls.forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add('show');
        }
    });
}

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 140) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${current}`);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intro Loader Animation
const introLoader = document.getElementById('introLoader');

window.addEventListener('load', () => {
    document.body.classList.add('loading');
    
    if (introLoader) {
        setTimeout(() => introLoader.classList.add('open'), 1600);
        setTimeout(() => {
            introLoader.classList.add('hide');
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 3000);
    } else {
        document.body.classList.remove('loading');
    }
    
    revealOnScroll();
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    revealOnScroll();
    updateActiveLink();
}, { passive: true });

// EmailJS Configuration
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// EmailJS Public Key (Free tier - for demo purposes)
// Replace with your own EmailJS credentials for production
const EMAILJS_PUBLIC_KEY = 'nmWUaQ9f36QEOvFM2';
const SERVICE_ID = 'service_a5uxvsc';
const TEMPLATE_ID = 'template_k2ydvce';

if (typeof emailjs !== 'undefined') {
    emailjs.init({ 
        publicKey: EMAILJS_PUBLIC_KEY, 
        blockHeadless: true, 
        limitRate: { id: 'contact-form', throttle: 10000 } 
    });
}

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status sending';
        
        try {
            if (typeof emailjs !== 'undefined') {
                await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, '#contact-form');
                formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                // Fallback: simulate successful submission for demo
                console.log('EmailJS not loaded - simulating success');
                formStatus.textContent = 'Message sent successfully! (Demo mode)';
                formStatus.className = 'form-status success';
                contactForm.reset();
            }
        } catch (err) {
            console.error('EmailJS error:', err);
            formStatus.textContent = 'Failed to send message. Please try again later.';
            formStatus.className = 'form-status error';
        }
        
        // Clear status message after 5 seconds
        setTimeout(() => {
            if (formStatus && !formStatus.textContent.includes('sending')) {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }
        }, 5000);
    });
}

// Technology slider duplicate items for seamless loop
const techTrack = document.querySelector('.tech-track');
if (techTrack && techTrack.children.length > 0) {
    const items = Array.from(techTrack.children);
    const halfLength = Math.ceil(items.length / 2);
    for (let i = 0; i < halfLength; i++) {
        const clone = items[i].cloneNode(true);
        techTrack.appendChild(clone);
    }
}

// Add hover effect for dropdown summaries
const dropdowns = document.querySelectorAll('.domain-dropdown');
dropdowns.forEach(dropdown => {
    const summary = dropdown.querySelector('summary');
    if (summary) {
        summary.addEventListener('mouseenter', () => {
            if (!dropdown.hasAttribute('open')) {
                summary.style.backgroundColor = 'var(--green-50)';
            }
        });
        summary.addEventListener('mouseleave', () => {
            if (!dropdown.hasAttribute('open')) {
                summary.style.backgroundColor = '';
            }
        });
    }
});

// Timeline items - ensure smooth animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('toggle', function() {
        if (this.open) {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
});

// Remove loading class fallback
setTimeout(() => {
    if (document.body.classList.contains('loading')) {
        document.body.classList.remove('loading');
    }
}, 5000);