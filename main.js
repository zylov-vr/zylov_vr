/* ============================================================
   ZYLOV VR — Main JS v2
   ============================================================ */
'use strict';

let currentLang  = localStorage.getItem('zvr_lang')  || 'ru';
let currentTheme = localStorage.getItem('zvr_theme') || 'dark';

const splash       = document.getElementById('splash');
const mainSite     = document.getElementById('mainSite');
const themeToggle  = document.getElementById('themeToggle');
const langBtn      = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langCurrent  = document.getElementById('langCurrent');
const langOptions  = document.querySelectorAll('.lang-option');
const burger       = document.getElementById('burger');
const navLinks     = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');
const navbar       = document.getElementById('navbar');

/* ============================================================
   CANVAS PARTICLES (Splash)
   ============================================================ */
let canvasAnim = null;

function initSplashCanvas() {
  const canvas = document.getElementById('splashCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Particles
  const particles = [];
  const COUNT = 55;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? '#e63946' : '#ffffff'
    });
  }

  // Lines connecting nearby particles
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 130) * 0.12;
          ctx.strokeStyle = `rgba(230,57,70,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color === '#e63946'
        ? `rgba(230,57,70,${p.alpha})`
        : `rgba(255,255,255,${p.alpha * 0.6})`;
      ctx.fill();
    });

    canvasAnim = requestAnimationFrame(draw);
  }

  draw();
}

/* ============================================================
   LETTER-BY-LETTER ANIMATION
   ============================================================ */
function animateLetters() {
  const zylovEl = document.getElementById('splashZylov');
  const vrEl    = document.getElementById('splashVr');
  if (!zylovEl || !vrEl) return;

  const zylovText = 'ZYLOV';
  const vrText    = 'VR';

  // Build letter spans for ZYLOV
  zylovEl.innerHTML = '';
  [...zylovText].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = char;
    span.style.animationDelay = `${0.15 + i * 0.11}s`;
    zylovEl.appendChild(span);
  });

  // Build letter spans for VR — delayed after ZYLOV
  vrEl.innerHTML = '';
  [...vrText].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = char;
    span.style.animationDelay = `${0.15 + zylovText.length * 0.11 + 0.05 + i * 0.13}s`;
    vrEl.appendChild(span);
  });
}

/* ============================================================
   PERCENT COUNTER
   ============================================================ */
function animatePercent() {
  const el = document.getElementById('splashPercent');
  if (!el) return;
  const duration = 2000; // matches bar fill
  const startDelay = 1000;
  let start = null;

  setTimeout(() => {
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
      el.textContent = Math.round(eased * 100) + '%';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, startDelay);
}

/* ============================================================
   TYPEWRITER for tagline
   ============================================================ */
function typewriterTagline() {
  const el = document.getElementById('splashTagline');
  if (!el) return;
  const texts = {
    ru: 'Входим на поле боя...',
    en: 'Entering the battlefield...',
    de: 'Betreten des Schlachtfelds...',
    uk: 'Входимо на поле бою...'
  };
  const text = texts[currentLang] || texts.ru;
  el.textContent = '';
  let i = 0;
  // Starts at 2.5s (matches CSS animation)
  setTimeout(() => {
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 55);
  }, 2500);
}

/* ============================================================
   SPLASH INIT & DISMISS
   ============================================================ */
function hideSplash() {
  if (canvasAnim) cancelAnimationFrame(canvasAnim);
  splash.classList.add('dissolving');
  setTimeout(() => {
    splash.style.display = 'none';
    mainSite.classList.remove('hidden');
    initReveal();
  }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme, false);
  applyLang(currentLang, false);
  initSplashCanvas();
  animateLetters();
  animatePercent();
  typewriterTagline();

  // Dismiss after ~3.8s (letters + bar + buffer)
  setTimeout(hideSplash, 3800);
});

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme, animate = true) {
  const html = document.documentElement;
  const icon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

  if (animate) {
    document.querySelectorAll('.logo-box, .about-company-name, .footer-logo').forEach(el => {
      el.classList.remove('logo-theme-flash');
      void el.offsetWidth;
      el.classList.add('logo-theme-flash');
    });
  }

  html.setAttribute('data-theme', theme);
  currentTheme = theme;
  localStorage.setItem('zvr_theme', theme);
  if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
  });
}

/* ============================================================
   LANGUAGE
   ============================================================ */
function applyLang(lang, animate = true) {
  const t = window.translations[lang];
  if (!t) return;
  currentLang = lang;
  localStorage.setItem('zvr_lang', lang);

  if (langCurrent) langCurrent.textContent = lang.toUpperCase();

  langOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.documentElement.lang = lang;
}

if (langBtn) {
  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });
}

document.addEventListener('click', () => {
  if (langDropdown) langDropdown.classList.remove('open');
});

if (langDropdown) langDropdown.addEventListener('click', e => e.stopPropagation());

langOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    applyLang(opt.dataset.lang, true);
    langDropdown.classList.remove('open');
  });
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
if (burger) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
  });
}

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    burger && burger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

/* ============================================================
   ACTIVE NAV + SCROLL
   ============================================================ */
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= 80) current = sec.id;
  });
  navLinkItems.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 30px rgba(0,0,0,0.25)'
    : 'none';
}, { passive: true });

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const targets = document.querySelectorAll(
    '.game-card, .about-center, .section-header'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});
