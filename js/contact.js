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
// PROJECT TYPE SELECTION — FIXED              //
// ============================================ //
const options = document.querySelectorAll('.contact-form-option');

// Create a hidden input for project type if it doesn't exist
let projectTypeInput = document.getElementById('projectType');
if (!projectTypeInput) {
    projectTypeInput = document.createElement('input');
    projectTypeInput.type = 'hidden';
    projectTypeInput.id = 'projectType';
    projectTypeInput.name = 'projectType';
    const form = document.getElementById('contactForm');
    if (form) {
        form.appendChild(projectTypeInput);
    }
}

options.forEach((option) => {
    option.addEventListener('click', () => {
        // Remove active from all
        options.forEach((o) => o.classList.remove('active'));
        
        // Add active to clicked
        option.classList.add('active');
        
        // Get the radio input inside and set its checked state
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            // Set hidden input value
            projectTypeInput.value = radio.value;
        }
    });
});

// Also handle radio input changes directly
document.querySelectorAll('input[name="projectType"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        options.forEach((o) => o.classList.remove('active'));
        const parent = radio.closest('.contact-form-option');
        if (parent) {
            parent.classList.add('active');
            projectTypeInput.value = radio.value;
        }
    });
});

// ============================================ //
// FORM SUBMISSION                             //
// ============================================ //
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const projectType = projectTypeInput ? projectTypeInput.value : '';
        const timeline = document.getElementById('timeline').value;
        
        // Basic validation
        if (!name || !email || !message || !projectType) {
            const btn = contactForm.querySelector('.btn-primary');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '⚠ PLEASE COMPLETE ALL FIELDS';
                btn.style.background = '#FF6B6B';
                btn.style.color = '#FFFFFF';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);
            }
            return;
        }
        
        // Success
        console.log('Form submitted:', { name, email, projectType, message, timeline });
        
        const btn = contactForm.querySelector('.btn-primary');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ INQUIRY SENT';
            btn.style.background = '#C8FF00';
            btn.style.color = '#080808';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                contactForm.reset();
                // Reset project type selection
                options.forEach((o) => o.classList.remove('active'));
                if (projectTypeInput) projectTypeInput.value = '';
            }, 3000);
        }
    });
}

// ============================================ //
// INPUT FOCUS ANIMATIONS                      //
// ============================================ //
const formInputs = document.querySelectorAll('.contact-form-group input, .contact-form-group textarea, .contact-form-group select');

formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
        const label = input.closest('.contact-form-group').querySelector('label');
        if (label) {
            gsap.to(label, {
                color: '#C8FF00',
                duration: 0.3,
                ease: 'expo.out',
            });
        }
    });
    
    input.addEventListener('blur', () => {
        const label = input.closest('.contact-form-group').querySelector('label');
        if (label) {
            gsap.to(label, {
                color: 'rgba(8,8,8,0.3)',
                duration: 0.3,
                ease: 'expo.out',
            });
        }
    });
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

ScrollTrigger.normalizeScroll(true);

// ============================================ //
// LOG CONSOLE                                 //
// ============================================ //
console.log('%c ALTO Studio ', 'background: #C8FF00; color: #080808; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
console.log('%c The Entry Point ', 'color: #F2EFE8; font-size: 14px;');
console.log('%c WE BUILD WHAT OTHERS IMAGINE. ', 'color: #C8FF00; font-size: 12px; font-style: italic;');