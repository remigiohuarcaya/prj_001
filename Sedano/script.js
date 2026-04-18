/* ===== CUSTOM CURSOR ===== */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
 
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
 
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
  dot.style.transform = 'translate(-50%, -50%)';
});
 
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
 
document.querySelectorAll('a, button, .tech-badge, .contact-btn, .info-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '50px';
    ring.style.height = '50px';
    ring.style.borderColor = '#ff00c8';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '32px';
    ring.style.height = '32px';
    ring.style.borderColor = '#00fff7';
  });
});
 
/* ===== MATRIX CANVAS ===== */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
 
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initMatrix();
});
 
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\';
let columns, drops;
 
function initMatrix() {
  const fontSize = 13;
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(1);
}
 
initMatrix();
 
function drawMatrix() {
  ctx.fillStyle = 'rgba(2, 8, 16, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00fff7';
  ctx.font = '13px Share Tech Mono, monospace';
 
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillStyle = Math.random() > 0.95
      ? '#ffffff'
      : `rgba(0, 255, 247, ${Math.random() * 0.5 + 0.1})`;
    ctx.fillText(char, i * 13, drops[i] * 13);
 
    if (drops[i] * 13 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
 
setInterval(drawMatrix, 50);
 
/* ===== TYPEWRITER ===== */
const phrases = [
  'Desarrollador Web',
  'Estudiante apasionado',
  'Problem Solver',
  'Future Full Stack Dev',
  'Git & GitHub enthusiast'
];
 
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typer = document.getElementById('typewriter');
 
function typeEffect() {
  const current = phrases[phraseIndex];
 
  if (!isDeleting) {
    typer.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typer.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
 
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}
 
typeEffect();
 
/* ===== COUNTER ANIMATION ===== */
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
 
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}
 
/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
 
      // Animate skill bars
      if (entry.target.classList.contains('skill-item')) {
        const fill = entry.target.querySelector('.skill-fill');
        setTimeout(() => fill.classList.add('animate'), 200);
      }
 
      // Animate counters
      if (entry.target.classList.contains('stat-num')) {
        animateCount(entry.target);
      }
    }
  });
}, { threshold: 0.2 });
 
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
 
// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
 
document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));
 
/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(2, 8, 16, 0.95)';
    navbar.style.borderBottomColor = 'rgba(0,255,247,0.25)';
    navbar.style.boxShadow = '0 4px 40px rgba(0,0,0,0.8)';
  } else {
    navbar.style.background = 'rgba(2, 8, 16, 0.8)';
    navbar.style.borderBottomColor = 'rgba(0,255,247,0.15)';
    navbar.style.boxShadow = 'none';
  }
});
 
/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
 
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
 
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#00fff7';
    }
  });
});
 
/* ===== TECH BADGE CLICK RIPPLE ===== */
document.querySelectorAll('.tech-badge').forEach(badge => {
  badge.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(0,255,247,0.3);
      width:0; height:0;
      top:50%; left:50%;
      transform:translate(-50%,-50%);
      animation: ripple 0.6s ease-out;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
 
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { width:200px; height:200px; opacity:0; }
  }
`;
document.head.appendChild(style);