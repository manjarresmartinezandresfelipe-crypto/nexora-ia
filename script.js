/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {
  const mobileNav = document.getElementById("mobile-nav");
  const menuButton = document.getElementById("menu-btn");

  const isOpen = mobileNav.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", isOpen);

  menuButton.textContent = isOpen ? "✕" : "☰";
}


/* Close menu when clicking outside */

document.addEventListener("click", (event) => {
  const mobileNav = document.getElementById("mobile-nav");
  const menuButton = document.getElementById("menu-btn");

  if (
    mobileNav.classList.contains("open") &&
    !mobileNav.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }
});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================
   SCROLL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }

    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================
   CONTACT FORM
========================= */

function submitForm(event) {

  event.preventDefault();

  const name =
    document.getElementById("name").value.trim();

  const business =
    document.getElementById("business").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const message =
    document.getElementById("message").value.trim();


  if (!name || !email || !message) {
    return;
  }


  const subject =
    encodeURIComponent(
      `New Nexora AI inquiry from ${name}`
    );


  const body =
    encodeURIComponent(
`Hello Nexora AI,

I would like to discuss a project.

Name: ${name}
Business: ${business || "Not provided"}
Email: ${email}

Project details:
${message}

Thank you.`
    );


  /*
    This opens the visitor's default email application.
    The inquiry will be sent to Nexora AI.
  */

  window.location.href =
    `mailto:ianexora3@gmail.com?subject=${subject}&body=${body}`;
}


/* =========================
   SMOOTH NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target =
      document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});
