// ============================================ //
// SERVICE DETAIL PAGE — COMPLETE SCRIPT       //
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
    const hero = document.querySelector(".service-hero");
    if (hero) {
        // Title reveal
        const titleLines = hero.querySelectorAll(".hero-title-line");
        gsap.from(titleLines, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
            delay: 0.3,
        });

        // Divider reveal
        const divider = hero.querySelector(".service-hero-divider");
        gsap.from(divider, {
            width: 0,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            delay: 0.8,
        });

        // Description reveal
        const desc = hero.querySelector(".service-hero-desc");
        gsap.from(desc, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            delay: 1,
        });

        // CTA reveal
        const cta = hero.querySelector(".service-hero-actions");
        gsap.from(cta, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            delay: 1.2,
        });

        // Meta reveal
        const meta = hero.querySelector(".service-hero-meta");
        gsap.from(meta, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            delay: 0.2,
        });
    }

    // ========================================== //
    // SECTION REVEALS — GSAP                     //
    // ========================================== //

    // Philosophy section
    const philosophy = document.querySelector(".service-philosophy");
    if (philosophy) {
        const title = philosophy.querySelector(".philosophy-title");
        const paragraphs = philosophy.querySelectorAll(".philosophy-paragraph");

        gsap.from(title, {
            scrollTrigger: {
                trigger: philosophy,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
        });

        gsap.from(paragraphs, {
            scrollTrigger: {
                trigger: philosophy,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "expo.out",
            delay: 0.3,
        });
    }

    // Deliverables section
    const deliverables = document.querySelector(".service-deliverables");
    if (deliverables) {
        const items = deliverables.querySelectorAll(".deliverable-item");

        gsap.from(items, {
            scrollTrigger: {
                trigger: deliverables,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
        });
    }

    // Approach section
    const approach = document.querySelector(".service-approach");
    if (approach) {
        const stages = approach.querySelectorAll(".approach-stage");

        gsap.from(stages, {
            scrollTrigger: {
                trigger: approach,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
        });
    }

    // Featured work section
    const featured = document.querySelector(".service-featured");
    if (featured) {
        const cards = featured.querySelectorAll(".featured-card");

        gsap.from(cards, {
            scrollTrigger: {
                trigger: featured,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "expo.out",
        });
    }

    // Comparison section
    const comparison = document.querySelector(".service-comparison");
    if (comparison) {
        const columns = comparison.querySelectorAll(".comparison-column");

        gsap.from(columns, {
            scrollTrigger: {
                trigger: comparison,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            x: function (index) {
                return index === 0 ? -60 : 60;
            },
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.2,
        });
    }

    // Toolkit section
    const toolkit = document.querySelector(".service-toolkit");
    if (toolkit) {
        const items = toolkit.querySelectorAll(".toolkit-item");

        gsap.from(items, {
            scrollTrigger: {
                trigger: toolkit,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "expo.out",
        });
    }

    // FAQ section
    const faq = document.querySelector(".service-faq");
    if (faq) {
        const items = faq.querySelectorAll(".faq-item");

        gsap.from(items, {
            scrollTrigger: {
                trigger: faq,
                start: "top 85%",
                toggleActions: "play none none none",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "expo.out",
        });
    }

    // Final CTA
    const finalCta = document.querySelector(".service-final-cta");
    if (finalCta) {
        const title = finalCta.querySelector(".final-cta-title");
        const text = finalCta.querySelector(".final-cta-text");
        const cta = finalCta.querySelector(".btn-primary");

        gsap.from(title, {
            scrollTrigger: {
                trigger: finalCta,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
        });

        gsap.from(text, {
            scrollTrigger: {
                trigger: finalCta,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: 0.2,
        });

        gsap.from(cta, {
            scrollTrigger: {
                trigger: finalCta,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            delay: 0.4,
        });
    }

    // ========================================== //
    // FAQ ACCORDION                              //
    // ========================================== //
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const item = this.closest(".faq-item");
            const isActive = item.classList.contains("active");

            // Close all other items
            faqQuestions.forEach(function (q) {
                const parent = q.closest(".faq-item");
                if (parent !== item && parent.classList.contains("active")) {
                    parent.classList.remove("active");
                    q.setAttribute("aria-expanded", "false");
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove("active");
                this.setAttribute("aria-expanded", "false");
            } else {
                item.classList.add("active");
                this.setAttribute("aria-expanded", "true");
            }
        });
    });

    // ========================================== //
    // DELIVERABLE HOVER EFFECTS                  //
    // ========================================== //
    const deliverableItems = document.querySelectorAll(".deliverable-item");

    deliverableItems.forEach(function (item) {
        item.addEventListener("mouseenter", function () {
            const grid = this.closest(".deliverables-grid");
            const siblings = grid.querySelectorAll(".deliverable-item");

            siblings.forEach(function (sibling) {
                if (sibling !== item) {
                    sibling.style.opacity = "0.4";
                    sibling.style.transform = "scale(0.96)";
                }
            });
        });

        item.addEventListener("mouseleave", function () {
            const grid = this.closest(".deliverables-grid");
            const siblings = grid.querySelectorAll(".deliverable-item");

            siblings.forEach(function (sibling) {
                sibling.style.opacity = "1";
                sibling.style.transform = "scale(1)";
            });
        });
    });

    // ========================================== //
    // PARALLAX EFFECT ON HERO                    //
    // ========================================== //
    const heroBg = document.querySelector(".service-hero-bg");
    if (heroBg && window.innerWidth >= 1024) {
        window.addEventListener("scroll", function () {
            const scrollY = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const progress = scrollY / heroHeight;

            if (progress <= 1) {
                heroBg.style.transform = `scale(${1 + progress * 0.05})`;
                heroBg.style.opacity = 1 - progress * 0.3;
            }
        });
    }

    console.log("Service Detail — Script loaded successfully");
});