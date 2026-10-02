// ============================================ //
// CONTACT PAGE — THE ENTRY POINT              //
// ============================================ //

// ============================================ //
// REGISTER GSAP PLUGINS                       //
// ============================================ //
gsap.registerPlugin(ScrollTrigger);

// ============================================ //
// NAVIGATION                                  //
// ============================================ //
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// ============================================ //
// MENU                                         //
// ============================================ //
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');

if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
        const isActive = menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
}

menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target) {
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            window.location.href = target;
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================ //
// SCROLL PROGRESS BAR                         //
// ============================================ //
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

// ============================================ //
// HERO HEADING REVEAL — FIXED                 //
// ============================================ //
gsap.to('.contact-hero-line', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    delay: 0.5,
    ease: 'expo.out'
});

// ============================================ //
// STUDIO INFORMATION REVEAL                   //
// ============================================ //
gsap.from('.contact-studio-item', {
    scrollTrigger: {
        trigger: '.contact-studio',
        start: 'top 85%',
        toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'expo.out',
});

// ============================================ //
// FORM STEP REVEALS                           //
// ============================================ //
gsap.from('.contact-form-step', {
    scrollTrigger: {
        trigger: '.contact-form-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'expo.out',
});

// ============================================ //
// FINAL STATEMENT ANIMATION                   //
// ============================================ //
gsap.from('.contact-statement-title', {
    scrollTrigger: {
        trigger: '.contact-statement',
        start: 'top 75%',
        toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    filter: 'blur(6px)',
    duration: 1.2,
    ease: 'expo.out',
});

gsap.from('.contact-statement-line', {
    scrollTrigger: {
        trigger: '.contact-statement',
        start: 'top 75%',
        toggleActions: 'play none none none',
    },
    scaleX: 0,
    duration: 1,
    delay: 0.2,
    ease: 'expo.out',
});

// ============================================ //
// REFRESH AFTER LOAD                          //
// ============================================ //
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

// ============================================ //
// RESIZE HANDLER                              //
// ============================================ //
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ============================================ //
// PERFORMANCE CONFIG                          //
// ============================================ //
ScrollTrigger.config({
    ignoreMobileResize: true
});

// Native scrolling preserves keyboard and touch behaviour.

// ============================================ //
// LOG CONSOLE                                 //
// ============================================ //
console.log('%c ALTO Studio ', 'background: #C8FF00; color: #080808; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
console.log('%c The Entry Point ', 'color: #F2EFE8; font-size: 14px;');
console.log('%c WE BUILD WHAT OTHERS IMAGINE. ', 'color: #C8FF00; font-size: 12px; font-style: italic;');