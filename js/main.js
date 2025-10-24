// Smooth page fade transitions
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Fade in on page load
  body.style.opacity = 0;
  body.style.transition = "opacity 0.6s ease";
  requestAnimationFrame(() => (body.style.opacity = 1));

  // Fade out on link click before navigating
  document.querySelectorAll('a[href]').forEach(link => {
    const url = link.getAttribute('href');

    // Only apply to internal links (avoid external or anchors)
    if (url && !url.startsWith('http') && !url.startsWith('#')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        body.style.opacity = 0;
        setTimeout(() => {
          window.location.href = url;
        }, 250); // delay navigation until fade completes
      });
    }
  });
});
