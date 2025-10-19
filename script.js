/* =========================
   matrix + hamburger script
   ========================= */

// MATRIX BACKGROUND
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // recalc columns when resized
  columns = Math.floor(canvas.width / fontSize);
  drops.length = columns;
  for (let i = 0; i < columns; i++) if (!drops[i]) drops[i] = 1;
}

const letters = "01░▒▓#@$%&*<>/\\|CODEFORGE";
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawMatrix(){
  ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#10941093";
  ctx.font = fontSize + "px monospace";

  for(let i=0;i<drops.length;i++){
    const ch = letters.charAt(Math.floor(Math.random()*letters.length));
    ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
const matrixInterval = setInterval(drawMatrix, 35);


// HAMBURGER MENU (safe DOM ready)
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  } else {
    console.warn("Hamburger or nav-menu element not found.");
  }
});