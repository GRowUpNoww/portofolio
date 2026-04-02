// Performance optimization: Use passive event listeners and debouncing
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const menuIcon = document.getElementById('menu-icon');
const navItems = document.querySelectorAll('.nav-item');
const navbar = document.getElementById('navbar');
let scrollTimeout = null;
let ticking = false;

function toggleMenu() {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
}

menuToggle.addEventListener('click', toggleMenu);
navItems.forEach(item => {
    item.addEventListener('click', () => navLinks.classList.remove('active') || menuIcon.classList.add('fa-bars') || menuIcon.classList.remove('fa-times'));
});

function animateElements() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        navbar.classList.toggle('nav-scrolled', scrollY >= 70);
        
        const elements = document.querySelectorAll('.about, .skills, #portfolio, .contact, .section-title, .portfolio-item, .skill-item, .about p, input, textarea');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const screenPos = window.innerHeight / 1.3;
            el.classList.toggle('visible', rect.top < screenPos);
        });
        ticking = false;
    });
}

window.addEventListener('load', () => {
    document.querySelectorAll('.hero-image, .hero-content').forEach(el => el.classList.add('visible'));
    animateElements();
}, { once: true });

window.addEventListener('scroll', animateElements, { passive: true });
