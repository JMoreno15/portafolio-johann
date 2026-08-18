/* =========================================
   LUCIDE ICONS
========================================= */

lucide.createIcons();

/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");

const navigation = document.getElementById("navigation");

const navLinks = document.querySelectorAll(".nav-link");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  document.body.classList.toggle("menu-open", isOpen);

  menuButton.setAttribute("aria-expanded", isOpen);
});

/* Cerrar menú al hacer click */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
  });
});

/* =========================================
   NAVEGACIÓN ACTIVA
========================================= */

const sections = document.querySelectorAll("section[id]");

const updateActiveNavigation = () => {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    const sectionId = section.getAttribute("id");

    const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (!link) {
      return;
    }

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateActiveNavigation);

/* =========================================
   PROJECT CAROUSEL
========================================= */

const projectsCarousel = document.getElementById("projectsCarousel");

const previousButton = document.getElementById("prevProject");

const nextButton = document.getElementById("nextProject");

const swipeHint = document.getElementById("swipeHint");

let swipeHintHidden = false;

/* =========================================
   REINICIAR CARRUSEL AL IR A PROYECTOS
========================================= */

/*
  Seleccionamos todos los enlaces que
  llevan a #proyectos.

  Esto incluye:

  1. El botón "Proyectos" del menú
  2. El botón "Ver mis proyectos" del Hero
*/

const projectsLinks = document.querySelectorAll('a[href="#proyectos"]');

projectsLinks.forEach((link) => {
  link.addEventListener("click", () => {
    /*
      Volvemos al primer proyecto.
    */

    projectsCarousel.scrollTo({
      left: 0,
      behavior: "instant",
    });

    /*
      Reiniciamos el estado del mensaje
      "Desliza para ver más".
    */

    swipeHintHidden = false;

    /*
      Volvemos a mostrar el mensaje.
    */

    swipeHint.classList.remove("hidden");
  });
});

/* =========================================
   CÁLCULO DEL DESPLAZAMIENTO
========================================= */

const getScrollAmount = () => {
  const card = projectsCarousel.querySelector(".project-card");

  if (!card) {
    return 400;
  }

  return card.offsetWidth + 20;
};

/* =========================================
   PROYECTO ANTERIOR
========================================= */

previousButton.addEventListener("click", () => {
  projectsCarousel.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth",
  });
});

/* =========================================
   PROYECTO SIGUIENTE
========================================= */

nextButton.addEventListener("click", () => {
  projectsCarousel.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth",
  });
});

/* =========================================
   INDICACIÓN DE DESLIZAMIENTO EN MÓVIL
========================================= */

projectsCarousel.addEventListener(
  "scroll",
  () => {
    /*
      Si el usuario empieza a desplazar
      el carrusel horizontalmente, ocultamos
      la indicación.
    */

    if (projectsCarousel.scrollLeft > 5 && !swipeHintHidden) {
      swipeHintHidden = true;

      swipeHint.classList.add("hidden");
    }
  },
  {
    passive: true,
  },
);

/* =========================================
   DRAG PARA PC
========================================= */

let isDragging = false;

let startX = 0;

let scrollStart = 0;

projectsCarousel.addEventListener("mousedown", (event) => {
  isDragging = true;

  projectsCarousel.classList.add("dragging");

  startX = event.pageX;

  scrollStart = projectsCarousel.scrollLeft;
});

projectsCarousel.addEventListener("mouseleave", () => {
  isDragging = false;

  projectsCarousel.classList.remove("dragging");
});

projectsCarousel.addEventListener("mouseup", () => {
  isDragging = false;

  projectsCarousel.classList.remove("dragging");
});

projectsCarousel.addEventListener("mousemove", (event) => {
  if (!isDragging) {
    return;
  }

  event.preventDefault();

  const distance = event.pageX - startX;

  projectsCarousel.scrollLeft = scrollStart - distance;
});

/*
   IMPORTANTE:

   Se mantiene el desplazamiento táctil
   nativo del navegador.

   No agregamos JavaScript para touch/swipe,
   evitando conflictos con el navegador.
*/

/* =========================================
   AÑO AUTOMÁTICO
========================================= */

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

/* =========================================
   ANIMACIÓN AL APARECER
========================================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  },
);

document
  .querySelectorAll(".skill-card, .info-card, .timeline-item, .education-card")
  .forEach((element) => {
    observer.observe(element);
  });
