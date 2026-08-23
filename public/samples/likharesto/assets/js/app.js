/*==================================================
    LIKHA RESTAURANT PREMIUM TEMPLATE V1.0
    APP.JS
    CREATED BY: LIKHA DIGITAL SOLUTION
===================================================*/

/*==========================================
    PRELOADER
==========================================*/

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    preloader.style.opacity = "0";

    preloader.style.visibility = "hidden";

    preloader.style.transition = ".5s";

    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
});

/*==========================================
    SCROLL PROGRESS BAR
==========================================*/

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = progress + "%";
});

/*==========================================
    STICKY / FLOATING NAVBAR
==========================================*/

const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

/*==========================================
    ACTIVE NAVIGATION
==========================================*/

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/*==========================================
    HERO PARALLAX
==========================================*/

const hero = document.querySelector(".hero");

const heroImage = document.querySelector(".hero-image");

const cards = document.querySelectorAll(".floating-card");

hero.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 35;

  const y = (window.innerHeight / 2 - e.pageY) / 35;

  heroImage.style.transform = `translate(${x}px,${y}px)`;

  cards.forEach((card, index) => {
    const speed = (index + 1) * 8;

    card.style.transform = `translate(${x / speed}px,${y / speed}px, 0)`;
  });
});

hero.addEventListener("mouseleave", () => {
  heroImage.style.transform = "translate(0,0)";

  cards.forEach((card) => {
    card.style.transform = "translate(0,0)";
  });
});

/*==================================
        SCROLL REVEAL
===================================*/

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

reveals.forEach((section) => {
  revealObserver.observe(section);
});

/*==================================
        BACK TO TOP
===================================*/

const backToTop = document.getElementById("backToTop");
const progressCircle = document.querySelector(".progress-ring-circle");

const radius = 28;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollTop / docHeight;

  progressCircle.style.strokeDashoffset =
    circumference - progress * circumference;

  backToTop.classList.toggle("show", scrollTop > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/*==========================================
    SMOOTH SCROLL
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();

    const offset = 100; // Adjust if needed

    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,

      behavior: "smooth",
    });
  });
});

/*==================================
        MENU FILTER
===================================*/

const filterButtons = document.querySelectorAll(".dish-filters button");
const dishItems = document.querySelectorAll(".dish-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    dishItems.forEach((item) => {
      const match = filter === "all" || item.dataset.category === filter;

      if (match) {
        item.style.display = "";

        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 20);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(.9)";

        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

/*==================================
        GALLERY LIGHTBOX
===================================*/

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");

    lightboxImage.src = image.src;

    lightbox.classList.add("show");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("show");
  }
});

/*==================================
        ANIMATED COUNTERS
===================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = parseFloat(counter.dataset.target);

      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);

        const value = target * progress;

        if (target % 1 !== 0) {
          counter.textContent = value.toFixed(1);
        } else if (target >= 1000) {
          counter.textContent = Math.floor(value).toLocaleString();
        } else {
          counter.textContent = Math.floor(value);
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (target === 25000) {
            counter.textContent = "25K+";
          } else if (target === 15) {
            counter.textContent = "15+";
          } else {
            counter.textContent = target.toFixed(1);
          }
        }
      }

      requestAnimationFrame(update);

      counterObserver.unobserve(counter);
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/*==================================
        FAVORITE BUTTON
===================================*/

document.querySelectorAll(".favorite-btn").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    const icon = button.querySelector("i");

    if (button.classList.contains("active")) {
      icon.classList.remove("bi-heart");
      icon.classList.add("bi-heart-fill");
    } else {
      icon.classList.remove("bi-heart-fill");
      icon.classList.add("bi-heart");
    }
  });
});

/*==================================
        RESERVATION FORM
===================================*/

const reservationForm = document.querySelector(".reservation-form");

if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const guests = document.getElementById("guests").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const fields = [
      document.getElementById("name"),
      document.getElementById("email"),
      document.getElementById("phone"),
      document.getElementById("guests"),
      document.getElementById("date"),
      document.getElementById("time"),
    ];

    let valid = true;

    fields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("input-error");

        valid = false;
      } else {
        field.classList.remove("input-error");
      }
    });

    if (!valid) return;

    const submitBtn = reservationForm.querySelector("button");

    submitBtn.disabled = true;

    submitBtn.innerHTML = "Booking...";

    setTimeout(() => {
      document.getElementById("successModal").classList.add("show");

      reservationForm.reset();

      submitBtn.disabled = false;

      submitBtn.innerHTML = "Reserve Now";
    }, 1800);
  });
}

document.querySelectorAll(".form-control, .form-select").forEach(field => {

    field.addEventListener("input", () => {

        field.classList.remove("input-error");

    });

});

/*==================================
        SUCCESS MODAL
===================================*/

const modal = document.getElementById("successModal");

const closeModal = document.getElementById("closeModal");

if (modal && closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}
