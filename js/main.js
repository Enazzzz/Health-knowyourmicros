document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Add fade-in / slide-in class based on history direction
  if (sessionStorage.getItem("slideDir") === "left") {
    body.classList.add("slide-in-left");
  } else {
    body.classList.add("slide-in-right");
  }
  sessionStorage.removeItem("slideDir");

  // Handle page transitions via arrow navigation
  document.querySelectorAll(".nav-arrow").forEach(arrow => {
    arrow.addEventListener("click", e => {
      const dir = arrow.dataset.dir;
      const nextPage = getNextPage(dir);

      if (nextPage) {
        e.preventDefault();
        body.classList.remove("slide-in-left", "slide-in-right");
        body.classList.add(dir === "next" ? "slide-out-right" : "slide-out-left");

        sessionStorage.setItem("slideDir", dir === "next" ? "right" : "left");

        setTimeout(() => {
          window.location.href = nextPage;
        }, 600);
      }
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
