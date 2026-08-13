
/* =========================================================
   CLINT CONCEPT ENGINEERING
   HERO SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       SELECT ELEMENTS
    ----------------------------------------------------- */

    const hero = document.querySelector(".hero");

    const slides = document.querySelectorAll(".hero-slide");

    const nextButton = document.querySelector(".hero-next");

    const previousButton = document.querySelector(".hero-prev");

    const currentSlideNumber =
        document.querySelector(".current-slide");

    const progressBar =
        document.querySelector(".hero-progress span");


    /* -----------------------------------------------------
       CHECK IF SLIDER EXISTS
    ----------------------------------------------------- */

    if (
        !hero ||
        !slides.length ||
        !nextButton ||
        !previousButton
    ) {
        return;
    }


    /* -----------------------------------------------------
       SETTINGS
    ----------------------------------------------------- */

    let currentIndex = 0;

    let slideTimer = null;

    let isPaused = false;

    const slideDuration = 7000;


    /* -----------------------------------------------------
       SHOW SLIDE
    ----------------------------------------------------- */

    function showSlide(index) {

        /*
         * Remove active class from every slide
         */

        slides.forEach((slide) => {

            slide.classList.remove("active");

        });


        /*
         * Add active class to selected slide
         */

        slides[index].classList.add("active");


        /*
         * Update counter
         */

        if (currentSlideNumber) {

            currentSlideNumber.textContent =
                String(index + 1).padStart(2, "0");

        }


        /*
         * Restart progress bar
         */

        restartProgress();


        /*
         * Restart automatic slider
         */

        startTimer();
    }


    /* -----------------------------------------------------
       NEXT SLIDE
    ----------------------------------------------------- */

    function nextSlide() {

        currentIndex++;

        if (currentIndex >= slides.length) {

            currentIndex = 0;

        }

        showSlide(currentIndex);
    }


    /* -----------------------------------------------------
       PREVIOUS SLIDE
    ----------------------------------------------------- */

    function previousSlide() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex = slides.length - 1;

        }

        showSlide(currentIndex);
    }


    /* -----------------------------------------------------
       AUTOMATIC SLIDER
    ----------------------------------------------------- */

    function startTimer() {

        clearTimeout(slideTimer);


        if (isPaused) {
            return;
        }


        slideTimer = setTimeout(() => {

            nextSlide();

        }, slideDuration);

    }


    /* -----------------------------------------------------
       PROGRESS BAR
    ----------------------------------------------------- */

    function restartProgress() {

        if (!progressBar) {
            return;
        }


        /*
         * Reset animation
         */

        progressBar.style.transition = "none";

        progressBar.style.width = "0%";


        /*
         * Force browser reflow
         */

        void progressBar.offsetWidth;


        /*
         * Start animation
         */

        if (!isPaused) {

            progressBar.style.transition =
                `width ${slideDuration}ms linear`;

            progressBar.style.width = "100%";

        }

    }


    /* -----------------------------------------------------
       NEXT BUTTON
    ----------------------------------------------------- */

    nextButton.addEventListener(
        "click",
        () => {

            nextSlide();

        }
    );


    /* -----------------------------------------------------
       PREVIOUS BUTTON
    ----------------------------------------------------- */

    previousButton.addEventListener(
        "click",
        () => {

            previousSlide();

        }
    );


    /* -----------------------------------------------------
       PAUSE ON HOVER
    ----------------------------------------------------- */

    hero.addEventListener(
        "mouseenter",
        () => {

            isPaused = true;

            clearTimeout(slideTimer);


            if (progressBar) {

                const currentWidth =
                    getComputedStyle(progressBar).width;

                progressBar.style.transition = "none";

                progressBar.style.width =
                    currentWidth;

            }

        }
    );


    /* -----------------------------------------------------
       RESUME AFTER HOVER
    ----------------------------------------------------- */

    hero.addEventListener(
        "mouseleave",
        () => {

            isPaused = false;

            restartProgress();

            startTimer();

        }
    );


    /* -----------------------------------------------------
       KEYBOARD CONTROLS
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            /*
             * Ignore keyboard controls when typing
             */

            const activeElement =
                document.activeElement;

            if (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA" ||
                activeElement.tagName === "SELECT"
            ) {
                return;
            }


            if (event.key === "ArrowRight") {

                nextSlide();

            }


            if (event.key === "ArrowLeft") {

                previousSlide();

            }

        }
    );


    /* -----------------------------------------------------
       TOUCH / SWIPE SUPPORT
    ----------------------------------------------------- */

    let touchStartX = 0;

    let touchEndX = 0;


    hero.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    hero.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;


        /*
         * Swipe left
         */

        if (swipeDistance < -50) {

            nextSlide();

        }


        /*
         * Swipe right
         */

        if (swipeDistance > 50) {

            previousSlide();

        }

    }


    /* -----------------------------------------------------
       INITIALIZE SLIDER
    ----------------------------------------------------- */

    showSlide(currentIndex);

});

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuButton =
    document.querySelector(".mobile-menu-button");

const mobileNavigation =
    document.querySelector(".mobile-navigation");

const mobileCloseButton =
    document.querySelector(".mobile-close-button");

const mobileNavLinks =
    document.querySelectorAll(
        ".mobile-nav-link:not(.mobile-dropdown-trigger)"
    );

const mobileDropdownTriggers =
    document.querySelectorAll(
        ".mobile-dropdown-trigger"
    );


/* =========================================================
   OPEN MOBILE MENU
========================================================= */

function openMobileMenu() {

    if (!mobileNavigation) return;

    mobileNavigation.classList.add("open");

    document.body.style.overflow = "hidden";

    if (mobileMenuButton) {

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu() {

    if (!mobileNavigation) return;

    mobileNavigation.classList.remove("open");

    document.body.style.overflow = "";

    if (mobileMenuButton) {

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* =========================================================
   MENU BUTTON
========================================================= */

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        openMobileMenu
    );

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (mobileCloseButton) {

    mobileCloseButton.addEventListener(
        "click",
        closeMobileMenu
    );

}


/* =========================================================
   MOBILE LINKS
========================================================= */

mobileNavLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


/* =========================================================
   MOBILE DROPDOWNS
========================================================= */

mobileDropdownTriggers.forEach((trigger) => {

    trigger.addEventListener(
        "click",
        () => {

            const dropdown =
                trigger.closest(
                    ".mobile-nav-dropdown"
                );


            if (!dropdown) return;


            /*
             * Close other dropdowns
             */

            document
                .querySelectorAll(
                    ".mobile-nav-dropdown.open"
                )
                .forEach((item) => {

                    if (item !== dropdown) {

                        item.classList.remove("open");

                        const button =
                            item.querySelector(
                                ".mobile-dropdown-trigger"
                            );

                        if (button) {

                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }

                });


            /*
             * Toggle current dropdown
             */

            dropdown.classList.toggle("open");


            const isOpen =
                dropdown.classList.contains("open");


            trigger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

});


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   CLOSE MENU WHEN RESIZING TO DESKTOP
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900
        ) {

            closeMobileMenu();

        }

    }
);

/* =========================================================
   PROJECT FILTER
========================================================= */

const projectFilters =
    document.querySelectorAll(".project-filter");

const projectCards =
    document.querySelectorAll(".project-card");


projectFilters.forEach((filter) => {

    filter.addEventListener("click", () => {

        const selectedCategory =
            filter.getAttribute("data-filter");


        /* -----------------------------------------
           UPDATE ACTIVE BUTTON
        ----------------------------------------- */

        projectFilters.forEach((button) => {

            button.classList.remove("active");

        });

        filter.classList.add("active");


        /* -----------------------------------------
           FILTER PROJECTS
        ----------------------------------------- */

        projectCards.forEach((card) => {

            const projectCategory =
                card.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                projectCategory === selectedCategory
            ) {

                card.classList.remove("hidden");

                card.classList.add("project-visible");

            } else {

                card.classList.add("hidden");

                card.classList.remove("project-visible");

            }

        });

    });

});