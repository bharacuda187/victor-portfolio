/* =========================================
   LIKHA MODERNA
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     GLOBAL — ELEMENTS
  ========================================= */

  const floatingNav = document.querySelector(".floating-nav");

  const galleryTrack = document.querySelector(".gallery-track");

  const galleryThumbs = document.querySelectorAll(".gallery-thumb");

  const lightbox = document.getElementById("galleryLightbox");

  const lightboxImage = document.getElementById("lightboxImage");

  const lightboxClose = document.getElementById("lightboxClose");

  const lightboxPrev = document.getElementById("lightboxPrev");

  const lightboxNext = document.getElementById("lightboxNext");

  const lightboxCounter = document.getElementById("lightboxCounter");

  const lightboxTitle = document.getElementById("lightboxTitle");

  /* =========================================
     GLOBAL — SCROLL NAVIGATION
  ========================================= */

  if (floatingNav) {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        floatingNav.classList.add("scrolled");
      } else {
        floatingNav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();
  }

  /* =========================================
   GLOBAL — BACK TO TOP
========================================= */

  const footerTop = document.querySelector(".footer-top");

  if (footerTop) {
    footerTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================
     SECTION 01 — FEATURED SPACE
  ========================================= */

  /*
     Section 01 currently uses the existing
     HTML/CSS layout and does not require
     JavaScript functionality.
  */

  /* =========================================
     SECTION 02 — GALLERY
  ========================================= */

  const galleryImages = [
    {
      src: "assets/images/featured-space.jpg",
      title: "Modern Living",
    },

    {
      src: "assets/images/minimalist.jpg",
      title: "Quiet Forms",
    },

    {
      src: "assets/images/gallery-01.jpg",
      title: "Material & Light",
    },

    {
      src: "assets/images/contemporary-br.jpg",
      title: "Private Space",
    },

    {
      src: "assets/images/modern-kitchen.jpg",
      title: "Modern Kitchen",
    },

    {
      src: "assets/images/architectural.jpg",
      title: "Architectural Details",
    },
  ];

  let currentGalleryIndex = 0;

  /* -----------------------------------------
     GALLERY — LIGHTBOX
  ----------------------------------------- */

  function updateLightbox() {
    if (!lightboxImage) {
      return;
    }

    const image = galleryImages[currentGalleryIndex];

    lightboxImage.src = image.src;

    lightboxImage.alt = image.title;

    if (lightboxTitle) {
      lightboxTitle.textContent = image.title;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${String(currentGalleryIndex + 1).padStart(2, "0")} / ${String(galleryImages.length).padStart(2, "0")}`;
    }
  }

  function openLightbox(index) {
    if (!lightbox) {
      return;
    }

    currentGalleryIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;

    updateLightbox();
  }

  function previousImage() {
    currentGalleryIndex =
      (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;

    updateLightbox();
  }

  /* -----------------------------------------
     GALLERY — DESKTOP DRAG
  ----------------------------------------- */

  if (galleryTrack) {
    let isDragging = false;

    let startX = 0;

    let startScrollLeft = 0;

    let dragDistance = 0;

    galleryTrack.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }

      isDragging = true;

      dragDistance = 0;

      startX = event.pageX;

      startScrollLeft = galleryTrack.scrollLeft;

      galleryTrack.classList.add("is-dragging");
    });

    galleryTrack.addEventListener("mousemove", (event) => {
      if (!isDragging) {
        return;
      }

      const distance = event.pageX - startX;

      dragDistance = Math.abs(distance);

      galleryTrack.scrollLeft = startScrollLeft - distance;
    });

    const stopDragging = () => {
      if (!isDragging) {
        return;
      }

      isDragging = false;

      galleryTrack.classList.remove("is-dragging");
    };

    galleryTrack.addEventListener("mouseup", stopDragging);

    galleryTrack.addEventListener("mouseleave", stopDragging);

    galleryThumbs.forEach((thumb) => {
      thumb.addEventListener("click", (event) => {
        if (dragDistance > 5) {
          event.preventDefault();

          event.stopPropagation();

          dragDistance = 0;

          return;
        }

        const index = Number(thumb.dataset.index);

        openLightbox(index);
      });
    });
  }

  /* =========================================
     SECTION 03 — THE DETAILS
  ========================================= */

  /*
     Section 03 currently uses the existing
     HTML/CSS layout and does not require
     JavaScript functionality.
  */

  /* =========================================
     SECTION 04 — SPACES
  ========================================= */

  const spaceItems = document.querySelectorAll(".space-item");

  const spacesPreview = document.querySelector(".spaces-preview");

  const spacesPreviewImage = document.getElementById("spacesPreviewImage");

  const spacesPreviewTitle = document.getElementById("spacesPreviewTitle");

  if (spaceItems.length && spacesPreview && spacesPreviewImage) {
    spaceItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const image = item.dataset.image;

        const title = item.querySelector(".space-name")?.textContent.trim();

        if (!image) {
          return;
        }

        spaceItems.forEach((space) => {
          space.classList.remove("active");
        });

        item.classList.add("active");

        spacesPreview.classList.add("is-changing");

        setTimeout(() => {
          spacesPreviewImage.src = image;

          spacesPreviewImage.alt = title || "Modern interior";

          if (spacesPreviewTitle) {
            spacesPreviewTitle.textContent = (title || "").toUpperCase();
          }

          spacesPreview.classList.remove("is-changing");
        }, 180);
      });
    });
  }

  /* =========================================
   SECTION 05 — CONTACT
========================================= */

  const openContactModal = document.getElementById("openContactModal");

  const closeContactModal = document.getElementById("closeContactModal");

  const contactModal = document.getElementById("contactModal");

  const contactModalBackdrop = document.querySelector(
    ".contact-modal-backdrop",
  );

  /* -----------------------------------------
   OPEN CONTACT MODAL
----------------------------------------- */

  if (openContactModal && contactModal) {
    openContactModal.addEventListener("click", () => {
      contactModal.classList.add("active");

      contactModal.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";
    });
  }

  /* -----------------------------------------
   CLOSE CONTACT MODAL
----------------------------------------- */

  const closeContact = () => {
    if (!contactModal) {
      return;
    }

    contactModal.classList.remove("active");

    contactModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  };

  if (closeContactModal) {
    closeContactModal.addEventListener("click", closeContact);
  }

  if (contactModalBackdrop) {
    contactModalBackdrop.addEventListener("click", closeContact);
  }

  /* -----------------------------------------
   CONTACT MODAL — ESCAPE KEY
----------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      contactModal &&
      contactModal.classList.contains("active")
    ) {
      closeContact();
    }
  });

  /* -----------------------------------------
     SECTION 02 — LIGHTBOX CONTROLS
  ----------------------------------------- */

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", nextImage);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", previousImage);
  }

  /* -----------------------------------------
     SECTION 02 — LIGHTBOX BACKDROP
  ----------------------------------------- */

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  /* -----------------------------------------
     SECTION 02 — LIGHTBOX KEYBOARD
  ----------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("active")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowRight") {
      nextImage();
    }

    if (event.key === "ArrowLeft") {
      previousImage();
    }
  });
});
