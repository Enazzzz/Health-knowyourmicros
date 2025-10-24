document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const slideDir = sessionStorage.getItem("slideDir");

  // Only fade-in on first index load
  if (currentPage === "index.html" && !slideDir) {
    body.classList.add("fade-in");
  } 
  // Carousel slide-in only
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

      // Only slide classes — no fade-out
      body.classList.remove("fade-in", "slide-in-left", "slide-in-right");
      body.classList.add(direction === "next" ? "slide-out-right" : "slide-out-left");

      sessionStorage.setItem("slideDir", direction === "next" ? "right" : "left");

      setTimeout(() => {
        window.location.href = nextPage;
      }, 600);
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
