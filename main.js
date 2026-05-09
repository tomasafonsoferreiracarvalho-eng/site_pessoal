/* ============================================================ */
/*  main.js — Tomás Carvalho Portfolio                         */
/* ============================================================ */

/* ------------------------------ */
/* CURSOR PERSONALIZADO           */
/* ------------------------------ */

const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Trail com lag suave
function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

/* ------------------------------ */
/* TYPING EFFECT — HERO           */
/* ------------------------------ */

const titles = [
  'Tomás Carvalho',
  'Eng. Informática',
  'Cyber Security',
  'Vibe Hacker'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-title');

function typeEffect() {
  const current = titles[titleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

/* ------------------------------ */
/* SCROLL REVEAL                  */
/* ------------------------------ */

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Pequeno delay em cascata
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ------------------------------ */
/* PROGRESS BAR — SCROLL          */
/* ------------------------------ */

const progressBar = document.getElementById('nav-progress');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + '%';
});

/* ------------------------------ */
/* NAV ACTIVE LINK                */
/* ------------------------------ */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ------------------------------ */
/* SKILL ITEMS — ENTRADA STAGGER  */
/* ------------------------------ */

const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.skill-item');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 50);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
  skillsGrid.querySelectorAll('.skill-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
  skillObserver.observe(skillsGrid);
}

/* ------------------------------ */
/* PROJECT CARDS — ENTRADA STAGGER */
/* ------------------------------ */

const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    projectCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      }, i * 80);
    });
    projectObserver.unobserve(entries[0].target);
  }
}, { threshold: 0.05 });

const projectsList = document.querySelector('.projects-list');
if (projectsList) {
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  projectObserver.observe(projectsList);
}

/* ------------------------------ */
/* EASTER EGG — KONAMI CODE       */
/* ------------------------------ */

const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      triggerHack();
    }
  } else {
    konamiIndex = 0;
  }
});

function triggerHack() {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-family: 'DM Mono', monospace; font-size: 1.2rem;
    color: #00fff3; background: rgba(0,0,0,0.95);
    border: 1px solid #00fff3; padding: 32px 48px;
    z-index: 99999; border-radius: 6px; text-align: center;
    box-shadow: 0 0 40px rgba(0,255,243,0.3);
    animation: fadeInOut 3s ease forwards;
  `;
  msg.innerHTML = `
    <div style="font-size:2rem; margin-bottom:12px">🔓</div>
    <div>ACCESS GRANTED</div>
    <div style="font-size:0.7rem; color:#666; margin-top:8px; letter-spacing:2px">// nice try, hacker</div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
      15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      80% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

/* ------------------------------ */
/* CONSOLE MESSAGE                */
/* ------------------------------ */

console.log('%c> Tomás Carvalho — Portfolio', 'color: #ff6ec7; font-family: monospace; font-size: 14px; font-weight: bold;');
console.log('%c> Bem-vindo ao código fonte.', 'color: #00fff3; font-family: monospace; font-size: 12px;');
console.log('%c> Experimenta o Konami Code: ↑↑↓↓←→←→BA', 'color: #a8a8c0; font-family: monospace; font-size: 11px;');