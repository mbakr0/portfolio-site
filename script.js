const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let currentTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme;

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.style.colorScheme = theme;
  themeToggle.querySelector('span').textContent = theme === 'dark' ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
}

setTheme(currentTheme);
themeToggle.addEventListener('click', () => {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

// Mobile menu toggle
const links = document.querySelectorAll('.nav-links a');
links.forEach(a => a.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('mobile-open')));

// Project filtering script
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.projects .card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    cards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});


function togglePdfViewer() {
  const viewer = document.getElementById('pdf-viewer-container');
  const btnText = document.getElementById('pdf-btn-text');

  if (viewer.classList.contains('hidden')) {
    viewer.classList.remove('hidden');
    btnText.textContent = 'Hide Resume PDF';
    viewer.setAttribute('scroll-padding-top', '200px');
    requestAnimationFrame(() => {
    viewer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
  } else {
    viewer.classList.add('hidden');
    btnText.textContent = 'View Resume PDF';

  }
}
const projectModal = document.getElementById("projectModal");
const modalContent = projectModal.querySelector(".project-modal__content");

const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalLink = document.getElementById("modalLink");


const modalSubtitle = document.getElementById("modalSubtitle");

const modalPreviewWrapper = document.getElementById("modalPreviewWrapper");
const modalPreview = document.getElementById("modalPreview");


const modalFeaturesSection = document.getElementById("modalFeaturesSection");
const modalFeatures = document.getElementById("modalFeatures");


const modalDemoLink = document.getElementById("modalDemoLink");


let previousFocus = null;

function openProjectModal(project) {

  modalSubtitle.textContent = project.subtitle || "";


  modalFeatures.replaceChildren();

  (project.features || []).forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    modalFeatures.appendChild(item);
  });

  modalFeaturesSection.hidden = !project.features?.length;


  if (project.image) {
    modalPreview.src = project.image;
    modalPreview.alt = `${project.title} preview`;
    modalPreviewWrapper.hidden = false;
  } else {
    modalPreview.removeAttribute("src");
    modalPreview.alt = "";
    modalPreviewWrapper.hidden = true;
  }

  if (project.link) {
    modalLink.href = project.link;
    modalLink.hidden = false;
  } else {
    modalLink.removeAttribute("href");
    modalLink.hidden = true;
  }

  if (project.demo) {
    modalDemoLink.href = project.demo;
    modalDemoLink.hidden = false;
  } else {
    modalDemoLink.removeAttribute("href");
    modalDemoLink.hidden = true;
  }

  previousFocus = document.activeElement;

  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category || "Project";
  modalDescription.textContent = project.description;

  modalTech.replaceChildren();

  (project.tech || []).forEach((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    modalTech.appendChild(tag);
  });

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  modalContent.focus();
}

function closeProjectModal() {
  if (!projectModal.classList.contains("is-open")) return;

  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (previousFocus instanceof HTMLElement) {
    previousFocus.focus();
  }
}

// Close button and backdrop
projectModal.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProjectModal);
});

// Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

// Connect your existing project cards
document.querySelectorAll(".card").forEach((card) => {
  card.style.cursor = "pointer";

  card.addEventListener("click", (event) => {
    // Keep existing links and buttons working normally.
    if (event.target.closest("a, button")) return;


    openProjectModal({
      title: card.dataset.title ||
        card.querySelector("h3")?.textContent.trim() ||
        "Project Details",
      category: card.dataset.category || "Featured Project",
      subtitle: card.dataset.subtitle || "",
      description: card.dataset.description || "",
      features: (card.dataset.features || "")
        .split("|")
        .map(item => item.trim())
        .filter(Boolean),
      tech: (card.dataset.tech || "")
        .split(",")
        .map(item => item.trim())
        .filter(Boolean),
      image: card.dataset.image || "",
      link: card.dataset.link || "",
      demo: card.dataset.demo || ""
    });

  });
});

