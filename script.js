
/* ==========================================
   GT WEB DESIGNS — WEBSITE INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Update the copyright year automatically
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 2. Mobile navigation menu
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the mobile menu after clicking a navigation link
        navLinks.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });

        // Close the menu if the screen returns to desktop size
        window.addEventListener("resize", function () {
            if (window.innerWidth > 950) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    // 3. Add a shadow to the header when scrolling
    const header = document.querySelector(".header");

    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 20);
        }
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });


    // 4. Smooth scrolling for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();
                return;
            }

            const target = document.getElementById(href.slice(1));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    });


    // 5. Project and service links select a project in the contact form
    const projectSelect = document.getElementById("project-type");
    const contactForm = document.getElementById("contact-form");
    const messageField = document.getElementById("message");

    document.querySelectorAll("[data-project]").forEach(function (link) {

        link.addEventListener("click", function () {
            const projectName = link.getAttribute("data-project");

            if (projectSelect && projectName) {
                const matchingOption = Array.from(
                    projectSelect.options
                ).find(function (option) {
                    return option.value === projectName;
                });

                projectSelect.value = matchingOption
                    ? matchingOption.value
                    : "Other Website";
            }

            if (messageField && projectName) {
                if (!messageField.value.trim()) {
                    messageField.value =
                        "Hello GT Web Designs, I am interested in discussing " +
                        projectName + ".";
                }
            }
        });
    });


    // 6. Prepare a contact email using the visitor's email application
    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const visitorName =
                document.getElementById("name").value.trim();

            const visitorEmail =
                document.getElementById("visitor-email").value.trim();

            const projectType =
                document.getElementById("project-type").value;

            const visitorMessage =
                document.getElementById("message").value.trim();

            const recipient = "tarigreatness2@gmail.com";

            const subject = "Website Enquiry: " + projectType;

            const body =
                "Hello GT Web Designs,\n\n" +
                "My name is: " + visitorName + "\n" +
                "My email: " + visitorEmail + "\n" +
                "Website needed: " + projectType + "\n\n" +
                "Project details:\n" + visitorMessage + "\n\n" +
                "Sent through the GT Web Designs website.";

            const mailtoLink =
                "mailto:" + recipient +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            const status = document.getElementById("form-status");

            if (status) {
                status.textContent =
                    "Opening your email app. Please review the message and press Send.";
                status.classList.add("success");
            }

            // Open the visitor's default email application
            window.location.href = mailtoLink;
        });
    }


    // 7. Log a welcome message for testing
    console.log(
        "GT Web Designs is ready! Your vision, our design."
    );

});
