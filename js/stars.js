const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");
let stars = [];
const STAR_COUNT = 200;
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Star class
class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 0.5 + 0.1;
    this.opacity = Math.random();
    this.twinkleDir = Math.random() < 0.5 ? -0.01 : 0.01;
  }

  update() {
    this.y -= this.speed;
    if (this.y < 0) this.y = canvas.height;
    // twinkle
    this.opacity += this.twinkleDir;
    if (this.opacity <= 0.2 || this.opacity >= 1) this.twinkleDir *= -1;
    // slight parallax based on mouse
    this.x += (mouseX - canvas.width/2) * 0.0002;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fill();
  }
}

// Initialize stars
for(let i=0;i<STAR_COUNT;i++) stars.push(new Star());

// Mouse movement for parallax
window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animation loop
function animateStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animateStars);
}

animateStars();
