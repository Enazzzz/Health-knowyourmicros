document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Start fade-in immediately
  requestAnimationFrame(() => {
    body.classList.add("fade-in");
  });

  // Slide-in direction from sessionStorage
  const dir = sessionStorage.getItem("slideDir");
  if (dir === "left") {
    body.classList.add("slide-in-left");
  } else if (dir === "right") {
    body.classList.add("slide-in-right");
  }
  sessionStorage.removeItem("slideDir");

  // Arrow navigation
  document.querySelectorAll(".nav-arrow").forEach(arrow => {
    arrow.addEventListener("click", e => {
      e.preventDefault();
      const direction = arrow.dataset.dir;
      const nextPage = getNextPage(direction);

      if (!nextPage) return;

      body.classList.remove("slide-in-left", "slide-in-right", "fade-in");
      body.classList.add(direction === "next" ? "slide-out-right" : "slide-out-left");

      // Store direction for next page
      sessionStorage.setItem("slideDir", direction === "next" ? "right" : "left");

      setTimeout(() => {
        window.location.href = nextPage;
      }, 600); // match CSS transition
    });
  });
});

// same helper function as before
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
