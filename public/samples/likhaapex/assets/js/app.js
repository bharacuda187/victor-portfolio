/*=========================================
        COUNTER
=========================================*/

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        let current = 0;

        const increment = target / 80;

        const update = () => {

            current += increment;

            if (current < target) {

                counter.textContent = Math.ceil(current);

                requestAnimationFrame(update);

            } else {

                counter.textContent = target + "+";

            }

        };

        update();

        observer.unobserve(counter);

    });

});

counters.forEach(counter => observer.observe(counter));