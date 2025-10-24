document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const slideDir = sessionStorage.getItem("slideDir");

  // FIRST PAGE LOAD FADE-IN ONLY
  if (currentPage === "index.html" && !slideDir) {
    // fade in on initial load
    requestAnimationFrame(() => {
      body.classList.add("fade-in");
    });
  } 
  // CAROUSEL NAVIGATION: apply slide-in only
  else if (slideDir) {
    body.classList.add(slideDir === "left" ? "slide-in-left" : "slide-in-right");
    sessionStorage.removeItem("slideDir");
  }

  // Arrow navigation
  document.querySelectorAll(".nav-arrow").forEach(arrow => {
    arrow.addEventListener("click", e => {
      e.preventDefault();
      const direction = arrow.dataset.dir;
      const nextPage = getNextPage(direction);

      if (!nextPage) return;

      // REMOVE fade-in completely to prevent any fade-out
      body.classList.remove("fade-in", "slide-in-left", "slide-in-right");
      // add slide-out animation based on arrow
      body.classList.add(direction === "next" ? "slide-out-right" : "slide-out-left");

      // store direction for next page slide-in
      sessionStorage.setItem("slideDir", direction === "next" ? "right" : "left");

      // navigate after animation
      setTimeout(() => {
        window.location.href = nextPage;
      }, 600); // matches CSS transition duration
    });
  });
});

// helper for carousel
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
