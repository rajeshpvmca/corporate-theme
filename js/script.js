// ===== Preloader =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => (preloader.style.display = "none"), 600);
  }, 3000);
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
if (navToggle && navMenu)
  navToggle.addEventListener("click", () => navMenu.classList.toggle("open"));

// ===== Banner Slider =====
const slides = document.querySelectorAll(".slide");
if (slides.length) {
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  function startSlider() {
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  const slidePrev = document.getElementById("slidePrev");
  const slideNext = document.getElementById("slideNext");
  if (slidePrev) slidePrev.addEventListener("click", () => { clearInterval(slideInterval); goToSlide(currentSlide - 1); startSlider(); });
  if (slideNext) slideNext.addEventListener("click", () => { clearInterval(slideInterval); goToSlide(currentSlide + 1); startSlider(); });
  startSlider();
}

// ===== Portfolio Slider =====
const portfolioSlider = document.getElementById("portfolioSlider");
if (portfolioSlider) {
  const portfolioItems = portfolioSlider.querySelectorAll(".portfolio-item");
  let portIndex = 0;

  function getPortItemWidth() { return portfolioItems[0].offsetWidth + 30; }
  function updatePortSlider() { portfolioSlider.style.transform = `translateX(-${portIndex * getPortItemWidth()}px)`; }

  const portPrev = document.getElementById("portPrev");
  const portNext = document.getElementById("portNext");
  if (portPrev) portPrev.addEventListener("click", () => { portIndex = Math.max(0, portIndex - 1); updatePortSlider(); });
  if (portNext) portNext.addEventListener("click", () => {
    const maxIndex = portfolioItems.length - Math.floor(portfolioSlider.parentElement.offsetWidth / getPortItemWidth());
    portIndex = Math.min(maxIndex, portIndex + 1);
    updatePortSlider();
  });
}

// ===== Testimonial Slider =====
const testItems = document.querySelectorAll(".testimonial-item");
if (testItems.length) {
  let testIndex = 0;

  function goToTestimonial(index) {
    testItems[testIndex].classList.remove("active");
    testIndex = (index + testItems.length) % testItems.length;
    testItems[testIndex].classList.add("active");
  }

  const testPrev = document.getElementById("testPrev");
  const testNext = document.getElementById("testNext");
  if (testPrev) testPrev.addEventListener("click", () => goToTestimonial(testIndex - 1));
  if (testNext) testNext.addEventListener("click", () => goToTestimonial(testIndex + 1));
}

// ===== Scroll Top =====
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  window.addEventListener("scroll", () => scrollTopBtn.classList.toggle("show", window.scrollY > 400));
  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ===== Intersection Observer for fade-in + counters + skill bars =====
let countersStarted = false;
let skillsStarted = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Fade-in elements
      if (entry.target.classList.contains("fade-in")) {
        entry.target.classList.add("visible");
      }

      // Counters
      if (entry.target.classList.contains("counter") && !countersStarted) {
        countersStarted = true;
        document.querySelectorAll(".count").forEach((el) => animateCount(el));
      }

      // Skill bars
      if (entry.target.classList.contains("experience") && !skillsStarted) {
        skillsStarted = true;
        document.querySelectorAll(".skill-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width + "%";
        });
      }
    });
  },
  { threshold: 0.2 },
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
document
  .querySelectorAll(".counter, .experience")
  .forEach((el) => observer.observe(el));

// ===== Counter Animation =====
function animateCount(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else el.textContent = Math.floor(current);
  }, 16);
}
