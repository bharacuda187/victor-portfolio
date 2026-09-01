/* ==================================================
   LAE CITY HOTEL
   MAIN JAVASCRIPT
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     ELEMENTS
  ================================================== */

  const navbar = document.querySelector(".custom-navbar");
  const progressBar = document.getElementById("progress-bar");
  const backToTop = document.getElementById("backToTop");
  const progressCircle = document.querySelector(".progress-ring-circle");

  /* ==================================================
     PRELOADER
  ================================================== */

  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    setTimeout(() => {
      preloader.remove();
    }, 500);
  });

  /* ==================================================
     SCROLL HANDLER
  ================================================== */

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    /* ----------------------------------------------
       SCROLL PROGRESS BAR
    ---------------------------------------------- */

    if (progressBar && scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;

      progressBar.style.width = `${progress}%`;
    }

    /* ----------------------------------------------
       FLOATING NAVBAR
    ---------------------------------------------- */

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 60);
    }

    /* ----------------------------------------------
       BACK TO TOP
    ---------------------------------------------- */

    if (backToTop) {
      backToTop.classList.toggle("show", scrollTop > 400);
    }

    /* ----------------------------------------------
       BACK TO TOP PROGRESS RING
    ---------------------------------------------- */

    if (progressCircle && scrollHeight > 0) {
      const radius = 28;
      const circumference = 2 * Math.PI * radius;

      progressCircle.style.strokeDasharray = circumference;

      const progress = Math.min(scrollTop / scrollHeight, 1);

      progressCircle.style.strokeDashoffset =
        circumference - progress * circumference;
    }
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  handleScroll();

  /* ==================================================
     ACTIVE NAVIGATION
  ================================================== */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const updateActiveNavigation = () => {
    if (!sections.length || !navLinks.length) return;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      if (window.scrollY >= sectionTop - 180) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (
        currentSection &&
        link.getAttribute("href") === `#${currentSection}`
      ) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNavigation, {
    passive: true,
  });

  updateActiveNavigation();

  /* ==================================================
     SMOOTH SCROLL
  ================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      const navbarOffset = 100;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* ==================================================
     MOBILE NAVBAR AUTO CLOSE
  ================================================== */

  const navbarCollapse = document.querySelector(".navbar-collapse");

  const navbarToggler = document.querySelector(".navbar-toggler");

  const bootstrapCollapse =
    window.bootstrap && navbarCollapse
      ? bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
          toggle: false,
        })
      : null;

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (
        window.innerWidth < 992 &&
        navbarCollapse &&
        navbarCollapse.classList.contains("show")
      ) {
        bootstrapCollapse?.hide();
      }
    });
  });

  /* ==================================================
     HERO SLIDER
  ================================================== */

  const heroCarousel = document.querySelector("#heroCarousel");

  if (heroCarousel && window.bootstrap && window.bootstrap.Carousel) {
    new window.bootstrap.Carousel(heroCarousel, {
      interval: 6000,
      ride: "carousel",
      pause: false,
      touch: true,
      wrap: true,
    });
  }

  /* ==================================================
     SCROLL REVEAL
  ================================================== */

  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("active");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    reveals.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    reveals.forEach((element) => {
      element.classList.add("active");
    });
  }

  /* ==================================================
     GALLERY LIGHTBOX
  ================================================== */

  const galleryItems = document.querySelectorAll(".gallery-item");

  const lightbox = document.querySelector(".lightbox");

  const lightboxImage = document.querySelector(".lightbox-image");

  const lightboxClose = document.querySelector(".lightbox-close");

  const openLightbox = (imageSource, imageAlt = "") => {
    if (!lightbox || !lightboxImage || !imageSource) {
      return;
    }

    lightboxImage.src = imageSource;
    lightboxImage.alt = imageAlt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const image = item.querySelector("img");

      if (!image) return;

      openLightbox(image.src, image.alt);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  /* ==================================================
     BACK TO TOP
  ================================================== */

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ==================================================
     SUCCESS MODAL
  ================================================== */

  const successModal = document.getElementById("successModal");

  const closeModal = document.getElementById("closeModal");

  const openSuccessModal = () => {
    if (!successModal) return;

    successModal.classList.add("active");

    document.body.style.overflow = "hidden";
  };

  const closeSuccessModal = () => {
    if (!successModal) return;

    successModal.classList.remove("active");

    document.body.style.overflow = "";
  };

  if (closeModal) {
    closeModal.addEventListener("click", closeSuccessModal);
  }

  if (successModal) {
    successModal.addEventListener("click", (event) => {
      if (event.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  /* ==================================================
     HOTEL RESERVATION FORM
  ================================================== */

  const reservationForm = document.querySelector("form.reservation-form");

  if (reservationForm) {
    reservationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const fields = reservationForm.querySelectorAll(
        "input[required], select[required], textarea[required]",
      );

      let isValid = true;

      fields.forEach((field) => {
        const value = field.value.trim();

        if (!value) {
          field.classList.add("input-error");

          isValid = false;
        } else {
          field.classList.remove("input-error");
        }
      });

      if (!isValid) return;

      const submitButton = reservationForm.querySelector(
        'button[type="submit"]',
      );

      const originalText = submitButton ? submitButton.innerHTML : "";

      if (submitButton) {
        submitButton.disabled = true;

        submitButton.innerHTML = "Processing...";
      }

      setTimeout(() => {
        reservationForm.reset();

        if (submitButton) {
          submitButton.disabled = false;

          submitButton.innerHTML = originalText;
        }

        openSuccessModal();
      }, 1000);
    });
  }

  /* ==================================================
     CONTACT FORM
  ================================================== */

  const contactForm = document.querySelector("form.contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const fields = contactForm.querySelectorAll(
        "input[required], select[required], textarea[required]",
      );

      let isValid = true;

      fields.forEach((field) => {
        const value = field.value.trim();

        if (!value) {
          field.classList.add("input-error");

          isValid = false;
        } else {
          field.classList.remove("input-error");
        }
      });

      if (!isValid) return;

      const submitButton = contactForm.querySelector('button[type="submit"]');

      const originalText = submitButton ? submitButton.innerHTML : "";

      if (submitButton) {
        submitButton.disabled = true;

        submitButton.innerHTML = "Sending...";
      }

      setTimeout(() => {
        contactForm.reset();

        if (submitButton) {
          submitButton.disabled = false;

          submitButton.innerHTML = originalText;
        }

        openSuccessModal();
      }, 1000);
    });
  }

  /* ==================================================
     FORM VALIDATION CLEANUP
  ================================================== */

  document.querySelectorAll(".form-control, .form-select").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("input-error");
    });

    field.addEventListener("change", () => {
      field.classList.remove("input-error");
    });
  });

  /* ==================================================
     ESCAPE KEY HANDLER
  ================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (lightbox && lightbox.classList.contains("active")) {
      closeLightbox();
    }

    if (successModal && successModal.classList.contains("active")) {
      closeSuccessModal();
    }

    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      bootstrapCollapse?.hide();
    }
  });

  /* ==================================================
     PREVENT FORM DEMO SUBMISSIONS
  ================================================== */

  document.querySelectorAll("form.newsletter").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');

      if (emailInput && !emailInput.value.trim()) {
        emailInput.focus();

        return;
      }

      form.reset();
    });
  });
});
