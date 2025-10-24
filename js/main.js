// Fade-in sections as they scroll into view
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(20px)";
  observer.observe(section);
});
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);

function initCanvas() {
  resizeCanvas();
  requestAnimationFrame(initCanvas); // ensures canvas resizes dynamically
}
initCanvas();
