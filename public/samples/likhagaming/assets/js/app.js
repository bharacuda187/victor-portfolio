/*==================================================
            BHARACUDA GAMING TEMPLATE V1.0
====================================================*/


/*==================================================
                    PRELOADER
==================================================*/

window.addEventListener("load",()=>{

    const preloader=document.getElementById("preloader");

    if(preloader){

        preloader.style.opacity="0";
        preloader.style.visibility="hidden";
        preloader.style.transition=".5s";

        setTimeout(()=>{

            preloader.remove();

        },500);

    }

});

/*==================================================
                SCROLL PROGRESS BAR
==================================================*/

const progressBar=document.getElementById("progress-bar");

window.addEventListener("scroll",()=>{

    const scrollTop=document.documentElement.scrollTop;

    const scrollHeight=

        document.documentElement.scrollHeight-

        document.documentElement.clientHeight;

    const progress=(scrollTop/scrollHeight)*100;

    progressBar.style.width=progress+"%";

});

/*==================================================
                STICKY NAVBAR
==================================================*/

const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {

    navbar.classList.toggle("scrolled", window.scrollY > 60);

});

/*==================================================
        NAVBAR ACTIVE INDICATOR
==================================================*/

const indicator = document.querySelector(".nav-indicator");
const navLinks = document.querySelectorAll(".navbar .nav-link");

function moveIndicator(link){

    if(!indicator || !link) return;

    const parent = link.parentElement.parentElement;

    const left = link.offsetLeft;
    const width = link.offsetWidth;

    indicator.style.left = left + "px";
    indicator.style.width = width + "px";
    indicator.style.opacity = "1";

}

navLinks.forEach(link=>{

    link.addEventListener("mouseenter",()=>{

        moveIndicator(link);

    });

});

const activeLink=document.querySelector(".navbar .nav-link.active");

if(activeLink){

    moveIndicator(activeLink);

}

/*==========================================
        COPY SERVER IP
==========================================*/

const copyBtn = document.getElementById("copyIP");

if (copyBtn) {

    copyBtn.addEventListener("click", () => {

        const ip = document.getElementById("serverIP").textContent.trim();

        navigator.clipboard.writeText(ip);

        copyBtn.innerHTML =
            '<i class="bi bi-check-lg me-2"></i>Copied!';

        setTimeout(() => {

            copyBtn.innerHTML =
                '<i class="bi bi-copy me-2"></i>Copy Server IP';

        }, 2000);

    });

}

/*==================================================
            COUNTER ANIMATION
==================================================*/

function animateCounter(id, target, duration = 1500) {
  const el = document.getElementById(id);

  if (!el) return;

  let start = 0;
  const increment = target / (duration / 16);

  function update() {
    start += increment;

    if (start >= target) {
      el.textContent = target.toLocaleString();
      return;
    }

    el.textContent = Math.floor(start).toLocaleString();

    requestAnimationFrame(update);
  }

  update();
}

window.addEventListener("load", () => {
  animateCounter("playerCounter", 126);
  animateCounter("pingCounter", 18);
  animateCounter("mapCounter", 4500);
});

/*==================================================
            SERVER CARD TILT
==================================================*/

const serverCard = document.querySelector(".server-panel");

if (serverCard) {

    serverCard.addEventListener("mousemove", (e) => {

        const rect = serverCard.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        serverCard.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    serverCard.addEventListener("mouseleave", () => {

        serverCard.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

}

if(window.innerWidth > 992){

    // Mouse Tilt Code

}

/*==================================================
                SCROLL REVEAL
==================================================*/

const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    reveals.forEach((item) => {

        const top = item.getBoundingClientRect().top;

        if (top < trigger) {

            item.classList.add("active");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/*==================================================
                BACK TO TOP
==================================================*/

const backToTop = document.getElementById("backToTop");

const progressCircle = document.querySelector(".progress-ring-circle");

const circumference = 176;

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollTop / documentHeight;

    progressCircle.style.strokeDashoffset =
        circumference - (progress * circumference);

    if(scrollTop > 500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});