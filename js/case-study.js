// ============================================ //
// CASE STUDY — COMPLETE PREMIUM SCRIPT        //
// ============================================ //

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ========================================== //
    // REGISTER GSAP PLUGINS                       //
    // ========================================== //
    gsap.registerPlugin(ScrollTrigger);

    // ========================================== //
    // NAVIGATION                                  //
    // ========================================== //
    const navbar = document.getElementById("nav");
    let lastScrollY = window.scrollY;

    if (navbar) {
        window.addEventListener("scroll", function () {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                navbar.classList.add("hidden");
            } else {
                navbar.classList.remove("hidden");
            }
            if (currentScrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
            lastScrollY = currentScrollY;
        });
    }

    // ========================================== //
    // MENU                                       //
    // ========================================== //
    const menuToggle = document.getElementById("menuToggle");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuLinks = document.querySelectorAll(".menu-link");

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener("click", function () {
            const isActive = menuToggle.classList.toggle("active");
            menuOverlay.classList.toggle("active");
            document.body.style.overflow = isActive ? "hidden" : "";
        });

        menuLinks.forEach(function (link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const href = this.getAttribute("href");
                if (href) {
                    menuToggle.classList.remove("active");
                    menuOverlay.classList.remove("active");
                    document.body.style.overflow = "";
                    window.location.href = href;
                }
            });
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && menuOverlay.classList.contains("active")) {
                menuToggle.classList.remove("active");
                menuOverlay.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    // ========================================== //
    // SCROLL PROGRESS BAR                        //
    // ========================================== //
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + "%";
    });

    // ========================================== //
    // HERO ANIMATIONS                            //
    // ========================================== //
    gsap.from(".case-hero-meta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.3,
    });

    gsap.from(".case-hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.4,
    });

    gsap.from(".case-hero-category", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.6,
    });

    gsap.from(".case-hero-desc", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.8,
    });

    gsap.from(".case-hero-info", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        delay: 1,
    });

    // ========================================== //
    // SCROLL REVEAL ANIMATIONS                   //
    // ========================================== //

    // Intent
    gsap.from(".case-intent-objective", {
        scrollTrigger: {
            trigger: ".case-intent",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
    });

    gsap.from(".case-intent-text", {
        scrollTrigger: {
            trigger: ".case-intent",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "expo.out",
    });

    gsap.from(".case-intent-detail", {
        scrollTrigger: {
            trigger: ".case-intent-details",
            start: "top 85%",
            toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "expo.out",
    });

    // Showcase images
    gsap.from(".case-showcase-image", {
        scrollTrigger: {
            trigger: ".case-showcase",
            start: "top 85%",
            toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "expo.out",
    });

    // Process steps
    gsap.from(".case-process-step", {
        scrollTrigger: {
            trigger: ".case-process-timeline",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "expo.out",
    });

    // Challenge blocks
    gsap.from(".case-challenge-block", {
        scrollTrigger: {
            trigger: ".case-challenge",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "expo.out",
    });

    // Gallery items
    gsap.from(".case-gallery-item", {
        scrollTrigger: {
            trigger: ".case-gallery-grid",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "expo.out",
    });

    // Next project
    gsap.from(".case-next-content", {
        scrollTrigger: {
            trigger: ".case-next",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
    });

    console.log("Case Study — Script loaded successfully");
});