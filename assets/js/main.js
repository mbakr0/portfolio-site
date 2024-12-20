class Swiper {
    constructor(s, param2) {

    }

}

/**
 * Template Name: Personal
 * Updated: Mar 10 2023 with Bootstrap v5.2.3
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)

        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Scrolls to an element with header offset
     */
    const scrollTo = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function() {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * scroll with offset on links with a class name .scrollTo
     */
    on('click', '#navbar .nav-link', function(e) {
        let section = select(this.hash)
        if (section) {
            e.preventDefault()

            let navbar = select('#navbar')
            let header = select('#header')
            let sections = select('section', true)
            let navLinks = select('#navbar .nav-link', true)

            navLinks.forEach((item) => {
                item.classList.remove('active')
            })

            this.classList.add('active')

            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }

            if (this.hash === '#header') {
                header.classList.remove('header-top')
                sections.forEach((item) => {
                    item.classList.remove('section-show')
                })
                return;
            }

            if (!header.classList.contains('header-top')) {
                header.classList.add('header-top')
                setTimeout(function() {
                    sections.forEach((item) => {
                        item.classList.remove('section-show')
                    })
                    section.classList.add('section-show')

                }, 350);
            } else {
                sections.forEach((item) => {
                    item.classList.remove('section-show')
                })
                section.classList.add('section-show')
            }

            scrollTo()
        }
    }, true)

    /**
     * Activate/show sections on load with hash links
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            let initial_nav = select(window.location.hash)

            if (initial_nav) {
                let header = select('#header')
                let navLinks = select('#navbar .nav-link', true)

                header.classList.add('header-top')

                navLinks.forEach((item) => {
                    if (item.getAttribute('href') === window.location.hash) {
                        item.classList.add('active')
                    } else {
                        item.classList.remove('active')
                    }
                })

                setTimeout(function() {
                    initial_nav.classList.add('section-show')
                }, 350);

                scrollTo()
            }
        }
    });

    /**
     * Skills animation
     */
    let skillsContent = select('.skills-content');
    if (skillsContent) {
        new Waypoint({
            element: skillsContent,
            offset: '80%',
            handler: function() {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    /**
     * portfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows',
            });

            let portfolioFilters = select('#portfolio-filters li', true);

            on('click', '#portfolio-filters li', function(e) {
                e.preventDefault();
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
            }, true);
        }

    });

    /**
     * portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

})()