// ============================================ //
// STUDIO PAGE — COMPLETE SCRIPT              //
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

menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
});

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
// REVEAL ANIMATIONS                           //
// ============================================ //

// ----- Who We Are ----- //
gsap.from('.studio-who-text', {
    scrollTrigger: {
        trigger: '.studio-who',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
});

// ----- Philosophy Mini Blocks ----- //
gsap.from('.studio-philosophy-mini-block', {
    scrollTrigger: {
        trigger: '.studio-philosophy-mini',
        start: 'top 85%',
        toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'expo.out',
});

// ----- Three Pillars ----- //
gsap.from('.studio-pillar', {
    scrollTrigger: {
        trigger: '.studio-pillars-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'expo.out',
});

// ----- Process ----- //
gsap.from('.studio-process-step', {
    scrollTrigger: {
        trigger: '.studio-process-timeline',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'expo.out',
});

// ----- Tech Stack Categories ----- //
gsap.from('.studio-tech-category', {
    scrollTrigger: {
        trigger: '.studio-tech-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'expo.out',
});

// ----- Z-Video Items ----- //
gsap.from('.values-z-item', {
    scrollTrigger: {
        trigger: '.values-z-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'expo.out',
});

// ----- Center Text ----- //
gsap.from('.values-z-center-content', {
    scrollTrigger: {
        trigger: '.values-z-center',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
});

// ----- CTA ----- //
gsap.from('.studio-cta-content', {
    scrollTrigger: {
        trigger: '.studio-cta',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
});

// ============================================ //
// HERO MOUSE EFFECT                           //
// ============================================ //
const hero = document.querySelector('.studio-hero');

if (window.innerWidth >= 1024 && hero) {
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    
    hero.addEventListener('mousemove', (e) => {
        targetX = e.clientX / window.innerWidth;
        targetY = e.clientY / window.innerHeight;
    });
    
    gsap.ticker.add(() => {
        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;
        
        const gradient = hero.querySelector('.studio-hero-gradient');
        if (gradient) {
            gradient.style.background = `
                radial-gradient(
                    ellipse at ${mouseX * 100}% ${mouseY * 100}%, 
                    rgba(200, 255, 0, ${0.02 + (1 - Math.abs(mouseX - 0.5) * 2) * 0.02}) 0%, 
                    transparent 70%
                )
            `;
        }
    });
}

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

ScrollTrigger.normalizeScroll(true);

// ============================================ //
// LOG CONSOLE                                 //
// ============================================ //
console.log('%c ALTO Studio ', 'background: #C8FF00; color: #080808; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
console.log('%c The Studio ', 'color: #F2EFE8; font-size: 14px;');
console.log('%c WE BUILD WHAT OTHERS IMAGINE. ', 'color: #C8FF00; font-size: 12px; font-style: italic;');