document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  body.classList.add("fade-in");

  // Handle page transitions
  document.querySelectorAll("a[href]").forEach(link => {
    const url = link.getAttribute("href");
    if (!url.startsWith("http") && !url.startsWith("#")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        body.classList.remove("fade-in");
        body.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = url;
        }, 300); // match CSS transition time
      });
    }
  });
});
