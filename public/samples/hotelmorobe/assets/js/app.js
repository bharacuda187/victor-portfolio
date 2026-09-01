/* =========================================================
   HOTEL MOROBE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     ELEMENTS
  ========================================================= */

  const navbar = document.querySelector(".custom-navbar");
  const pageProgress = document.getElementById("progress-bar");
  const backToTop = document.getElementById("backToTop");
  const progressCircle = document.querySelector(".progress-ring-circle");

  const navbarCollapse = document.getElementById("mainNavigation");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");

  const galleryItems = document.querySelectorAll(".gallery-item");

  const successModal = document.getElementById("successModal");
  const closeSuccess = document.getElementById("closeSuccess");

  const reservationForm = document.getElementById("reservationForm");

  const checkIn = document.getElementById("checkIn");

  const checkOut = document.getElementById("checkOut");

  /* =========================================================
     PRELOADER
  ========================================================= */

  const hidePreloader = () => {
    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    window.setTimeout(() => {
      if (preloader.parentNode) {
        preloader.remove();
      }
    }, 500);
  };

  window.addEventListener("load", hidePreloader);

  /*
     Safety fallback in case an image or external resource
     takes too long to load.
  */
  window.setTimeout(hidePreloader, 2500);

  /* =========================================================
     NAVBAR + PAGE SCROLL
  ========================================================= */

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    const documentHeight = document.documentElement.scrollHeight;

    const viewportHeight = document.documentElement.clientHeight;

    const scrollHeight = documentHeight - viewportHeight;

    /* Navbar */

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 60);

      navbar.classList.toggle("fixed", scrollTop > 60);
    }

    /* Page progress */

    if (pageProgress && scrollHeight > 0) {
      const percentage = Math.min((scrollTop / scrollHeight) * 100, 100);

      pageProgress.style.width = `${percentage}%`;
    }

    /* Back to top */

    if (backToTop) {
      backToTop.classList.toggle("show", scrollTop > 450);
    }

    /* Progress ring */

    if (progressCircle && scrollHeight > 0) {
      const radius = 26;

      const circumference = 2 * Math.PI * radius;

      const percentage = Math.min(scrollTop / scrollHeight, 1);

      progressCircle.style.strokeDasharray = circumference;

      progressCircle.style.strokeDashoffset =
        circumference - percentage * circumference;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();

  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const sections = document.querySelectorAll("section[id], header[id]");

  const navLinks = document.querySelectorAll(".nav-link");

  const updateActiveNavigation = () => {
    if (!sections.length || !navLinks.length) {
      return;
    }

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      if (window.scrollY >= sectionTop - 180) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      link.classList.toggle(
        "active",
        Boolean(currentSection && href === `#${currentSection}`),
      );
    });
  };

  window.addEventListener("scroll", updateActiveNavigation, { passive: true });

  updateActiveNavigation();

  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      const offset = window.innerWidth < 768 ? 80 : 100;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      /* Close mobile navigation */

      if (
        navbarCollapse &&
        navbarCollapse.classList.contains("show") &&
        window.bootstrap
      ) {
        const collapse = window.bootstrap.Collapse.getInstance(navbarCollapse);

        collapse?.hide();
      }
    });
  });

  /* =========================================================
     HERO SLIDER
     Smooth crossfade • 7 second interval
  ========================================================= */

  const heroSlider = document.querySelector(".hero-slider");

  if (heroSlider) {
    const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));

    const prevButton = document.querySelector(".hero-prev");

    const nextButton = document.querySelector(".hero-next");

    const currentCounter = document.querySelector(".hero-current");

    const totalCounter = document.querySelector(".hero-total");

    const heroProgress = document.querySelector(".hero-progress span");

    if (slides.length > 0) {
      const AUTOPLAY_DURATION = 7000;
      const TRANSITION_DURATION = 1400;

      let currentIndex = 0;
      let autoplayTimer = null;
      let transitionTimer = null;

      let isTransitioning = false;
      let isPaused = false;

      /* -------------------------------------------------------
         INITIAL SLIDE STATE
      ------------------------------------------------------- */

      slides.forEach((slide, index) => {
        slide.classList.remove("active");

        slide.style.opacity = index === 0 ? "1" : "0";

        slide.style.zIndex = index === 0 ? "2" : "1";

        slide.style.pointerEvents = index === 0 ? "auto" : "none";

        slide.style.transition = `opacity ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      });

      slides[0].classList.add("active");

      /* -------------------------------------------------------
         COUNTERS
      ------------------------------------------------------- */

      if (totalCounter) {
        totalCounter.textContent = String(slides.length).padStart(2, "0");
      }

      if (currentCounter) {
        currentCounter.textContent = "01";
      }

      /* -------------------------------------------------------
         RESET HERO PROGRESS
      ------------------------------------------------------- */

      const resetHeroProgress = () => {
        if (!heroProgress) {
          return;
        }

        /*
           Stop current animation.
        */
        heroProgress.style.transition = "none";

        heroProgress.style.width = "0%";

        /*
           Force reflow.

           This is important. Without it, browsers may
           optimize away the second transition because the
           width changes too quickly.
        */
        void heroProgress.offsetWidth;

        /*
           Start a fresh 7-second progress animation.
        */
        heroProgress.style.transition = `width ${AUTOPLAY_DURATION}ms linear`;

        heroProgress.style.width = "100%";
      };

      /* -------------------------------------------------------
         STOP AUTOPLAY
      ------------------------------------------------------- */

      const stopAutoplay = () => {
        if (autoplayTimer !== null) {
          window.clearTimeout(autoplayTimer);

          autoplayTimer = null;
        }
      };

      /* -------------------------------------------------------
         START AUTOPLAY
      ------------------------------------------------------- */

      const startAutoplay = () => {
        stopAutoplay();

        if (isPaused || slides.length <= 1 || isTransitioning) {
          return;
        }

        autoplayTimer = window.setTimeout(() => {
          changeSlide(1);
        }, AUTOPLAY_DURATION);
      };

      /* -------------------------------------------------------
         FINISH TRANSITION
      ------------------------------------------------------- */

      const finishTransition = (oldSlide, newSlide) => {
        oldSlide.classList.remove("active");

        oldSlide.style.opacity = "0";

        oldSlide.style.zIndex = "1";

        oldSlide.style.pointerEvents = "none";

        newSlide.classList.add("active");

        newSlide.style.opacity = "1";

        newSlide.style.zIndex = "2";

        newSlide.style.pointerEvents = "auto";

        isTransitioning = false;

        transitionTimer = null;

        if (!isPaused) {
          startAutoplay();
        }
      };

      /* -------------------------------------------------------
         CHANGE SLIDE
      ------------------------------------------------------- */

      const changeSlide = (direction) => {
        /*
           Ignore clicks while the current fade is running.
           This prevents multiple overlapping transitions.
        */
        if (isTransitioning || slides.length <= 1) {
          return;
        }

        isTransitioning = true;

        stopAutoplay();

        /* Calculate next index */

        let newIndex = currentIndex + direction;

        if (newIndex >= slides.length) {
          newIndex = 0;
        }

        if (newIndex < 0) {
          newIndex = slides.length - 1;
        }

        const oldSlide = slides[currentIndex];

        const newSlide = slides[newIndex];

        /* -----------------------------------------------------
           PREPARE INCOMING SLIDE
        ----------------------------------------------------- */

        /*
           New slide starts fully transparent.
        */
        newSlide.style.transition = "none";

        newSlide.style.opacity = "0";

        newSlide.style.zIndex = "3";

        newSlide.style.pointerEvents = "auto";

        /*
           Force layout.

           This guarantees that the browser paints the
           transparent state before we change it to opacity 1.
        */
        void newSlide.offsetWidth;

        /*
           Restore transition.
        */
        newSlide.style.transition = `opacity ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

        oldSlide.style.transition = `opacity ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

        /* -----------------------------------------------------
           START CROSSFADE
        ----------------------------------------------------- */

        requestAnimationFrame(() => {
          newSlide.style.opacity = "1";

          oldSlide.style.opacity = "0";
        });

        /* -----------------------------------------------------
           UPDATE CURRENT INDEX
        ----------------------------------------------------- */

        currentIndex = newIndex;

        /* Counter */

        if (currentCounter) {
          currentCounter.textContent = String(currentIndex + 1).padStart(
            2,
            "0",
          );
        }

        /* Progress */

        resetHeroProgress();

        /* -----------------------------------------------------
           WAIT UNTIL FADE HAS FINISHED
        ----------------------------------------------------- */

        transitionTimer = window.setTimeout(() => {
          finishTransition(oldSlide, newSlide);
        }, TRANSITION_DURATION + 40);
      };

      /* -------------------------------------------------------
         NEXT
      ------------------------------------------------------- */

      nextButton?.addEventListener("click", () => {
        changeSlide(1);
      });

      /* -------------------------------------------------------
         PREVIOUS
      ------------------------------------------------------- */

      prevButton?.addEventListener("click", () => {
        changeSlide(-1);
      });

      /* -------------------------------------------------------
         KEYBOARD NAVIGATION
      ------------------------------------------------------- */

      document.addEventListener("keydown", (event) => {
        const target = event.target;

        /*
             Don't hijack arrow keys while the visitor
             is typing into a form field.
          */
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          return;
        }

        if (event.key === "ArrowRight") {
          changeSlide(1);
        }

        if (event.key === "ArrowLeft") {
          changeSlide(-1);
        }
      });

      /* -------------------------------------------------------
         PAUSE ON HOVER
      ------------------------------------------------------- */

      heroSlider.addEventListener("mouseenter", () => {
        isPaused = true;

        stopAutoplay();

        /*
             Freeze progress visually.
          */
        if (heroProgress) {
          const computedWidth = getComputedStyle(heroProgress).width;

          heroProgress.style.transition = "none";

          heroProgress.style.width = computedWidth;
        }
      });

      /* -------------------------------------------------------
         RESUME AFTER HOVER
      ------------------------------------------------------- */

      heroSlider.addEventListener("mouseleave", () => {
        isPaused = false;

        /*
             Start a fresh interval after
             leaving the hero.
          */
        resetHeroProgress();

        startAutoplay();
      });

      /* -------------------------------------------------------
         TOUCH SWIPE
      ------------------------------------------------------- */

      let touchStartX = 0;
      let touchEndX = 0;

      heroSlider.addEventListener(
        "touchstart",
        (event) => {
          touchStartX = event.changedTouches[0].screenX;
        },
        {
          passive: true,
        },
      );

      heroSlider.addEventListener(
        "touchend",
        (event) => {
          touchEndX = event.changedTouches[0].screenX;

          const distance = touchEndX - touchStartX;

          /*
             Ignore tiny movements.
          */
          if (Math.abs(distance) < 50) {
            return;
          }

          if (distance < 0) {
            changeSlide(1);
          } else {
            changeSlide(-1);
          }
        },
        {
          passive: true,
        },
      );

      /* -------------------------------------------------------
         VISIBILITY HANDLING
      ------------------------------------------------------- */

      /*
         Pause autoplay while the browser tab is hidden.
         Resume when the visitor comes back.
      */
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopAutoplay();
        } else if (!isTransitioning) {
          resetHeroProgress();
          startAutoplay();
        }
      });

      /* -------------------------------------------------------
         START SLIDER
      ------------------------------------------------------- */

      resetHeroProgress();

      startAutoplay();
    }
  }

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

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

  /* =========================================================
     GALLERY LIGHTBOX
  ========================================================= */

  const openLightbox = (source, alt = "") => {
    if (!lightbox || !lightboxImage || !source) {
      return;
    }

    lightboxImage.src = source;

    lightboxImage.alt = alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const image = item.querySelector("img");

      if (!image) {
        return;
      }

      openLightbox(image.src, image.alt);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  /* =========================================================
     BACK TO TOP
  ========================================================= */

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* =========================================================
     SUCCESS MODAL
  ========================================================= */

  const openSuccessModal = () => {
    if (!successModal) {
      return;
    }

    successModal.classList.add("active");

    document.body.style.overflow = "hidden";
  };

  const closeSuccessModal = () => {
    if (!successModal) {
      return;
    }

    successModal.classList.remove("active");

    document.body.style.overflow = "";
  };

  closeSuccess?.addEventListener("click", closeSuccessModal);

  successModal?.addEventListener("click", (event) => {
    if (event.target === successModal) {
      closeSuccessModal();
    }
  });

  /* =========================================================
     RESERVATION FORM
  ========================================================= */

  if (reservationForm) {
    reservationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let valid = true;

      /* Required fields */

      reservationForm.querySelectorAll("[required]").forEach((field) => {
        const value = field.value.trim();

        field.classList.toggle("input-error", !value);

        if (!value) {
          valid = false;
        }
      });

      /* Date validation */

      if (checkIn?.value && checkOut?.value) {
        const checkInDate = new Date(checkIn.value);

        const checkOutDate = new Date(checkOut.value);

        if (checkOutDate <= checkInDate) {
          checkOut.classList.add("input-error");

          valid = false;

          alert("Check-out must be after check-in.");
        }
      }

      if (!valid) {
        return;
      }

      /* Submit button */

      const submitButton = reservationForm.querySelector(
        'button[type="submit"]',
      );

      const originalText = submitButton?.innerHTML || "";

      if (submitButton) {
        submitButton.disabled = true;

        submitButton.innerHTML = `
            <span
              class="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            Processing...
          `;
      }

      /*
           DEMO FORM BEHAVIOUR

           Replace this later with:
           - PHP
           - Laravel
           - Cloudflare Worker
           - Formspree
           - Booking API
        */

      window.setTimeout(() => {
        reservationForm.reset();

        if (submitButton) {
          submitButton.disabled = false;

          submitButton.innerHTML = originalText;
        }

        openSuccessModal();
      }, 900);
    });
  }

  /* =========================================================
     FORM ERROR CLEANUP
  ========================================================= */

  document.querySelectorAll(".form-control, .form-select").forEach((field) => {
    const clearError = () => {
      field.classList.remove("input-error");
    };

    field.addEventListener("input", clearError);

    field.addEventListener("change", clearError);
  });

  /* =========================================================
     DATE INPUTS
  ========================================================= */

  const today = new Date().toISOString().split("T")[0];

  if (checkIn) {
    checkIn.min = today;

    checkIn.addEventListener("change", () => {
      if (checkOut && checkIn.value) {
        checkOut.min = checkIn.value;

        if (checkOut.value && checkOut.value <= checkIn.value) {
          checkOut.value = "";
        }
      }
    });
  }

  if (checkOut) {
    checkOut.min = today;
  }

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    /* Lightbox */

    if (lightbox?.classList.contains("active")) {
      closeLightbox();
    }

    /* Success modal */

    if (successModal?.classList.contains("active")) {
      closeSuccessModal();
    }

    /* Mobile navigation */

    if (navbarCollapse?.classList.contains("show") && window.bootstrap) {
      const collapse = window.bootstrap.Collapse.getInstance(navbarCollapse);

      collapse?.hide();
    }
  });

  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});

/* =========================================================
   GALLERY COLLECTION LIGHTBOX
========================================================= */

const galleryCollections = document.querySelectorAll(".gallery-collection");

const galleryLightbox = document.getElementById("galleryLightbox");

const galleryLightboxImage = document.getElementById("galleryLightboxImage");

const galleryLightboxClose = document.getElementById("galleryLightboxClose");

const galleryLightboxPrev = document.getElementById("galleryLightboxPrev");

const galleryLightboxNext = document.getElementById("galleryLightboxNext");

const galleryLightboxCategory = document.getElementById(
  "galleryLightboxCategory",
);

const galleryLightboxTitle = document.getElementById("galleryLightboxTitle");

const galleryLightboxCounter = document.getElementById(
  "galleryLightboxCounter",
);

const galleryData = {
  hotel: {
    category: "HOTEL MOROBE",
    title: "Hotel Morobe",
    folder: "hotel",
    total: 9,
  },

  superior: {
    category: "ACCOMMODATION",
    title: "Our Superior Room",
    folder: "superior",
    total: 4,
  },

  executive: {
    category: "ACCOMMODATION",
    title: "Our Executive Room",
    folder: "executive",
    total: 4,
  },

  suite: {
    category: "ACCOMMODATION",
    title: "Our Deluxe Suite",
    folder: "suite",
    total: 7,
  },

  dining: {
    category: "DINING",
    title: "Lae Garden Restaurant & Café 411",
    folder: "dining",
    total: 4,
  },

  fitness: {
    category: "FACILITIES",
    title: "Fitness Room",
    folder: "fitness",
    total: 4,
  },
};

let activeGallery = null;
let activePhotoIndex = 0;

/* =========================================================
   OPEN PHOTO
========================================================= */

const showGalleryPhoto = () => {
  if (!activeGallery) {
    return;
  }

  const photoNumber = activePhotoIndex + 1;

  const photoPath = `assets/images/gallery/${activeGallery.folder}${photoNumber}.jpg`;

  galleryLightboxImage.src = photoPath;

  galleryLightboxImage.alt = `${activeGallery.title} - Photo ${photoNumber}`;

  galleryLightboxCategory.textContent = activeGallery.category;

  galleryLightboxTitle.textContent = activeGallery.title;

  galleryLightboxCounter.textContent = `${photoNumber} / ${activeGallery.total}`;
};

/* =========================================================
   OPEN GALLERY
========================================================= */

const openGallery = (galleryName) => {
  const gallery = galleryData[galleryName];

  if (!gallery) {
    return;
  }

  activeGallery = gallery;

  activePhotoIndex = 0;

  showGalleryPhoto();

  galleryLightbox.classList.add("active");

  galleryLightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
};

/* =========================================================
   CLOSE GALLERY
========================================================= */

const closeGallery = () => {
  galleryLightbox.classList.remove("active");

  galleryLightbox.setAttribute("aria-hidden", "true");

  galleryLightboxImage.src = "";

  document.body.style.overflow = "";

  activeGallery = null;
  activePhotoIndex = 0;
};

/* =========================================================
   NEXT PHOTO
========================================================= */

const nextGalleryPhoto = () => {
  if (!activeGallery) {
    return;
  }

  activePhotoIndex = (activePhotoIndex + 1) % activeGallery.total;

  showGalleryPhoto();
};

/* =========================================================
   PREVIOUS PHOTO
========================================================= */

const previousGalleryPhoto = () => {
  if (!activeGallery) {
    return;
  }

  activePhotoIndex =
    (activePhotoIndex - 1 + activeGallery.total) % activeGallery.total;

  showGalleryPhoto();
};

/* =========================================================
   COLLECTION CLICK
========================================================= */

galleryCollections.forEach((collection) => {
  collection.addEventListener("click", () => {
    const galleryName = collection.dataset.gallery;

    openGallery(galleryName);
  });
});

/* =========================================================
   BUTTONS
========================================================= */

galleryLightboxClose?.addEventListener("click", closeGallery);

galleryLightboxNext?.addEventListener("click", nextGalleryPhoto);

galleryLightboxPrev?.addEventListener("click", previousGalleryPhoto);

/* =========================================================
   BACKDROP CLICK
========================================================= */

galleryLightbox?.addEventListener("click", (event) => {
  if (event.target === galleryLightbox) {
    closeGallery();
  }
});

/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener("keydown", (event) => {
  if (!galleryLightbox?.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeGallery();
  }

  if (event.key === "ArrowRight") {
    nextGalleryPhoto();
  }

  if (event.key === "ArrowLeft") {
    previousGalleryPhoto();
  }
});

/* =========================================================
   TOUCH SWIPE
========================================================= */

let galleryTouchStartX = 0;

galleryLightbox?.addEventListener(
  "touchstart",
  (event) => {
    galleryTouchStartX = event.changedTouches[0].screenX;
  },
  {
    passive: true,
  },
);

galleryLightbox?.addEventListener(
  "touchend",
  (event) => {
    if (!activeGallery) {
      return;
    }

    const touchEndX = event.changedTouches[0].screenX;

    const distance = touchEndX - galleryTouchStartX;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance < 0) {
      nextGalleryPhoto();
    } else {
      previousGalleryPhoto();
    }
  },
  {
    passive: true,
  },
);
