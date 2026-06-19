/* ============================================================
   REKA RUANG — Main JavaScript
   Navigation, scroll effects, animations, contact form
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initScrollAnimations();
    initHero();
    initContactForm();
});

/* ── Navbar ── */
function initNav() {
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!navbar) return;

    /* Scroll behavior — only for transparent navbars (homepage) */
    if (navbar.classList.contains("transparent")) {
        const onScroll = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 60);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* Hamburger toggle */
    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            const isOpen = hamburger.classList.toggle("open");
            mobileMenu.classList.toggle("open", isOpen);
            hamburger.setAttribute("aria-expanded", isOpen);
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        /* Close on nav link click */
        mobileMenu.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                mobileMenu.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });

        /* Close on outside click */
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove("open");
                mobileMenu.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            }
        });
    }

    /* Active nav link */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });

    /* Keyboard trap in mobile menu */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu?.classList.contains("open")) {
            hamburger.classList.remove("open");
            mobileMenu.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
            hamburger.focus();
        }
    });
}

/* ── Hero parallax / bg load animation ── */
function initHero() {
    const heroBg = document.querySelector(".hero-bg");
    if (!heroBg) return;

    const img = new Image();
    img.onload = () => heroBg.classList.add("loaded");
    img.src = heroBg.style.backgroundImage
        ? heroBg.style.backgroundImage.replace(/url\(["']?/, "").replace(/["']?\)/, "")
        : "assets/images/hero-bg.png";

    heroBg.classList.add("loaded");

    /* Subtle parallax on scroll */
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
        }
    }, { passive: true });
}

/* ── Scroll-triggered fade-in ── */
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

/* Public re-trigger for dynamically rendered cards */
window.triggerFadeIns = function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => observer.observe(el));
};

/* ── Contact Form ── */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateForm(form)) {
            simulateFormSubmit(form);
        }
    });

    /* Live validation on blur */
    form.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("blur", () => validateField(input));
        input.addEventListener("input", () => {
            if (input.classList.contains("error")) validateField(input);
        });
    });
}

function validateField(input) {
    const group = input.closest(".form-group");
    const errorEl = group?.querySelector(".field-error");
    let message = "";

    if (input.required && !input.value.trim()) {
        message = "This field is required.";
    } else if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        message = "Please enter a valid email address.";
    } else if (input.name === "phone" && input.value && !/^[\d\s\+\-\(\)]{6,20}$/.test(input.value)) {
        message = "Please enter a valid phone number.";
    }

    if (message) {
        input.classList.add("error");
        if (errorEl) { errorEl.textContent = message; errorEl.classList.add("visible"); }
        return false;
    } else {
        input.classList.remove("error");
        if (errorEl) errorEl.classList.remove("visible");
        return true;
    }
}

function validateForm(form) {
    let valid = true;
    form.querySelectorAll("input[required], textarea[required]").forEach((input) => {
        if (!validateField(input)) valid = false;
    });
    return valid;
}

function simulateFormSubmit(form) {
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite"><path d="M21 12a9 9 0 11-4.22-7.63"/></svg>
    Sending…
  </span>`;
    btn.disabled = true;

    setTimeout(() => {
        form.style.display = "none";
        const success = document.getElementById("form-success");
        if (success) success.classList.add("visible");
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1600);
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
            window.scrollTo({ top, behavior: "smooth" });
        }
    });
});

/* CSS for spin animation */
const style = document.createElement("style");
style.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(style);
