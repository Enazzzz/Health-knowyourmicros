document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Only fade-in if this is index.html and not a slide navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const slideDir = sessionStorage.getItem("slideDir");

  if (currentPage === "index.html" && !slideDir) {
    // fade-in only for first index page load
    requestAnimationFrame(() => {
      body.classList.add("fade-in");
    });
  } else if (slideDir) {
    // apply slide-in classes based on stored direction
    body.classList.add(slideDir === "left" ? "slide-in-left" : "slide-in-right");
    sessionStorage.removeItem("slideDir");
  }

  // Arrow navigation (carousel)
  document.querySelectorAll(".nav-arrow").forEach(arrow => {
    arrow.addEventListener("click", e => {
      e.preventDefault();
      const direction = arrow.dataset.dir;
      const nextPage = getNextPage(direction);

      if (!nextPage) return;

      body.classList.remove("slide-in-left", "slide-in-right", "fade-in");
      body.classList.add(direction === "next" ? "slide-out-right" : "slide-out-left");

      // store direction for next page
      sessionStorage.setItem("slideDir", direction === "next" ? "right" : "left");

      setTimeout(() => {
        window.location.href = nextPage;
      }, 600); // match CSS transition
    });
  });
});

function getNextPage(direction) {
  const pages = [
    "index.html",
    "vitamin-b6.html",
    "vitamin-b12.html",
    "vitamin-c.html",
    "vitamin-d.html",
    "iron.html",
    "calcium.html",
    "superfoods.html"
  ];

  const current = window.location.pathname.split("/").pop() || "index.html";
  const index = pages.indexOf(current);

  if (direction === "next" && index < pages.length - 1) return pages[index + 1];
  if (direction === "prev" && index > 0) return pages[index - 1];
  return null;
}
