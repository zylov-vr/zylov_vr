/* ============================================================
   ZYLOV VR — ARMOUR PLUS — Main Stylesheet v2
   ============================================================ */

:root {
  --red:        #e63946;
  --red-dark:   #c1121f;
  --red-glow:   rgba(230, 57, 70, 0.35);
  --gold:       #ffd60a;

  --bg:         #0a0b0d;
  --bg2:        #111318;
  --bg3:        #1a1d24;
  --surface:    #1e2229;
  --border:     rgba(255,255,255,0.07);
  --text:       #e8eaf0;
  --text2:      #9aa0b0;
  --text3:      #5a6070;
  --logo-zylov: #ffffff;
  --logo-vr:    #e63946;
  --nav-bg:     rgba(10,11,13,0.92);
  --splash-bg:  #ffffff;
  --splash-zylov: #000000;
  --splash-vr:    #e63946;
}

[data-theme="light"] {
  --bg:         #f2f3f5;
  --bg2:        #e8e9ec;
  --bg3:        #dddee2;
  --surface:    #ffffff;
  --border:     rgba(0,0,0,0.09);
  --text:       #111318;
  --text2:      #4a5060;
  --text3:      #9aa0b0;
  --logo-zylov: #111318;
  --logo-vr:    #e63946;
  --nav-bg:     rgba(242,243,245,0.94);
  --splash-bg:  #111318;
  --splash-zylov: #ffffff;
  --splash-vr:    #e63946;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  transition: background 0.4s, color 0.4s;
}
a { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* ============================================================
   SPLASH SCREEN — Ultra Premium
   ============================================================ */
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--splash-bg);
  transition: background 0.6s;
  overflow: hidden;
}

.splash-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(230,57,70,0.12) 0%, transparent 70%);
  pointer-events: none;
}

/* Canvas for particle FX */
.splash-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Logo wrapper with animated lines */
.splash-logo-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
}

.splash-line-left,
.splash-line-right {
  position: absolute;
  top: 50%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--red));
  width: 0;
  transform: translateY(-50%);
  animation: lineExpand 0.8s 1.8s ease-out forwards;
}

.splash-line-left {
  right: calc(100% - 50px);
  background: linear-gradient(90deg, transparent, var(--red));
  transform-origin: right center;
}

.splash-line-right {
  left: calc(100% - 50px);
  background: linear-gradient(90deg, var(--red), transparent);
  transform-origin: left center;
}

@keyframes lineExpand {
  from { width: 0; opacity: 0; }
  to   { width: min(35vw, 280px); opacity: 1; }
}

.splash-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.splash-logo {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

/* Letter-by-letter animation — each letter is a span injected by JS */
.splash-zylov .letter,
.splash-vr .letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(-40px) rotateX(90deg);
  animation: letterDrop 0.5s ease-out forwards;
}

@keyframes letterDrop {
  0%   { opacity: 0; transform: translateY(-60px) rotateX(90deg) scale(1.3); filter: blur(8px); }
  60%  { opacity: 1; transform: translateY(6px) rotateX(-8deg) scale(1.02); filter: blur(0); }
  80%  { transform: translateY(-3px) rotateX(4deg); }
  100% { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); filter: blur(0); }
}

.splash-zylov {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(3rem, 10vw, 7.5rem);
  font-weight: 900;
  color: var(--splash-zylov);
  letter-spacing: 0.06em;
  text-shadow: 0 0 80px rgba(255,255,255,0.08);
  transition: color 0.5s;
  perspective: 800px;
}

.splash-vr {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2.2rem, 7.5vw, 5.8rem);
  font-weight: 900;
  color: var(--splash-vr);
  letter-spacing: 0.04em;
  text-shadow:
    0 0 20px rgba(230,57,70,0.9),
    0 0 60px rgba(230,57,70,0.5),
    0 0 120px rgba(230,57,70,0.25);
  perspective: 800px;
}

/* Tagline typewriter */
.splash-tagline {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(0.75rem, 1.8vw, 1rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text3);
  min-height: 1.4em;
  opacity: 0;
  animation: fadeInUp 0.5s 2.5s both;
}

/* Progress bar */
.splash-bar-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  animation: fadeInUp 0.5s 2.6s both;
}

.splash-bar {
  width: clamp(160px, 35vw, 300px);
  height: 2px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  overflow: hidden;
}

.splash-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--red-dark), var(--red), #ff6b7a);
  border-radius: 2px;
  width: 0;
  animation: barFill 2s 1s ease-out forwards;
  box-shadow: 0 0 8px var(--red);
}

@keyframes barFill {
  0%   { width: 0%; }
  100% { width: 100%; }
}

.splash-percent {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.72rem;
  color: var(--red);
  min-width: 36px;
  text-align: left;
}

/* Dissolve */
.splash.dissolving {
  animation: splashDissolve 1s ease-in forwards;
}

@keyframes splashDissolve {
  0%   { opacity: 1; filter: blur(0); transform: scale(1); }
  50%  { opacity: 0.6; filter: blur(6px); transform: scale(1.03); }
  100% { opacity: 0; filter: blur(20px); transform: scale(1.08); pointer-events: none; }
}

/* ============================================================
   UTILITIES
   ============================================================ */
.hidden { display: none !important; }
.red { color: var(--red); }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ============================================================
   NAVBAR
   ============================================================ */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  transition: background 0.4s, border-color 0.4s;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-logo { display: flex; align-items: center; }
.logo-box { display: flex; align-items: baseline; gap: 2px; }

.logo-zylov, #aboutZylov, #footerZylov {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: 1.25rem;
  color: var(--logo-zylov);
  letter-spacing: 0.06em;
  transition: color 0.4s;
}
.logo-vr, #aboutVr, #footerVr {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: 1rem;
  color: var(--logo-vr);
  letter-spacing: 0.04em;
  text-shadow: 0 0 12px rgba(230,57,70,0.5);
  transition: color 0.4s, text-shadow 0.4s;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.nav-link {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text2);
  padding: 6px 14px;
  border-radius: 6px;
  transition: color 0.25s, background 0.25s;
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px; left: 50%; right: 50%;
  height: 2px;
  background: var(--red);
  border-radius: 2px;
  transition: left 0.25s, right 0.25s;
}
.nav-link:hover, .nav-link.active { color: var(--text); }
.nav-link:hover::after, .nav-link.active::after { left: 14px; right: 14px; }

.nav-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Language */
.lang-selector { position: relative; }
.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: var(--text2);
  padding: 7px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: color 0.25s, background 0.25s, border-color 0.25s;
}
.lang-btn:hover { color: var(--text); border-color: var(--red); }

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 150px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
  z-index: 200;
}
.lang-dropdown.open { opacity: 1; transform: translateY(0); pointer-events: all; }

.lang-option {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text2);
  transition: background 0.2s, color 0.2s;
}
.lang-option:hover { background: var(--bg3); color: var(--text); }
.lang-option.active { color: var(--red); }

/* Theme */
.theme-toggle {
  width: 38px; height: 38px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  transition: background 0.25s, border-color 0.25s, transform 0.2s;
}
.theme-toggle:hover { border-color: var(--red); transform: rotate(20deg); }

/* Burger */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
}
.burger span {
  display: block;
  width: 22px; height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
.burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger.open span:nth-child(2) { opacity: 0; }
.burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ============================================================
   SECTIONS
   ============================================================ */
.section {
  min-height: 100vh;
  padding-top: 64px;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 12px;
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--text);
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.section-desc {
  font-size: 1.05rem;
  color: var(--text2);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.65;
}

/* ============================================================
   HERO SECTION
   ============================================================ */
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 100vh;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 75%);
  opacity: 0.5;
}

.hero-scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent, transparent 3px,
    rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px
  );
  pointer-events: none;
}

.hero-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 860px;
  padding: 24px;
  animation: fadeInUp 0.8s 0.2s both;
}

.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(3.5rem, 14vw, 10rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
}

.hero-welcome {
  display: block;
  color: var(--text);
  text-shadow:
    0 0 80px rgba(255,255,255,0.06),
    0 2px 0 rgba(0,0,0,0.4);
}

.hero-sub {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text2);
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  text-align: center;
  color: var(--text3);
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.scroll-arrow {
  margin-top: 6px;
  animation: scrollBounce 2s ease-in-out infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(6px); opacity: 1; }
}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 13px 30px;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.06);
  opacity: 0;
  transition: opacity 0.25s;
}
.btn:hover::before { opacity: 1; }

.btn-primary {
  background: var(--red);
  color: #fff;
  border-color: var(--red-dark);
  box-shadow: 0 4px 20px var(--red-glow);
}
.btn-primary:hover {
  background: var(--red-dark);
  box-shadow: 0 6px 28px rgba(230,57,70,0.55);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--surface);
  color: var(--text);
  border-color: var(--border);
}
.btn-secondary:hover {
  border-color: var(--red);
  color: var(--red);
  transform: translateY(-2px);
}

/* ============================================================
   GAMES SECTION
   ============================================================ */
#games { background: var(--bg2); }

.games-grid {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.game-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.game-card:hover {
  transform: translateY(-6px);
  border-color: rgba(230,57,70,0.4);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(230,57,70,0.1);
}

.card-glow {
  position: absolute;
  top: -60px; left: 50%;
  transform: translateX(-50%);
  width: 300px; height: 200px;
  background: radial-gradient(ellipse, rgba(230,57,70,0.18) 0%, transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.game-card:hover .card-glow { opacity: 1; }

.card-badge {
  position: absolute;
  top: 16px; right: 16px;
  z-index: 5;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 4px 12px;
  border-radius: 4px;
  background: var(--red);
  color: #fff;
  box-shadow: 0 0 12px var(--red-glow);
}

/* Card art */
.card-image {
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #0f111a 0%, #1a1d2e 50%, #0d0f15 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-image::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--red), transparent);
  opacity: 0.7;
}
.card-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.01) 4px, rgba(255,255,255,0.01) 5px);
  pointer-events: none;
}

.card-tank-art { position: relative; width: 100%; height: 100%; }
.art-ground {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40px;
  background: linear-gradient(transparent, rgba(60,40,20,0.4));
}

.art-tank {
  position: absolute;
  bottom: 28px; left: 50%;
  transform: translateX(-50%);
  width: 200px; height: 100px;
  animation: tankRock 4s ease-in-out infinite;
}
@keyframes tankRock {
  0%, 100% { transform: translateX(-50%) rotate(-0.5deg); }
  50%       { transform: translateX(-50%) rotate(0.5deg); }
}
.art-body {
  position: absolute;
  bottom: 20px; left: 10px;
  width: 180px; height: 50px;
  background: linear-gradient(180deg, #4a5060 0%, #2d323d 100%);
  border-radius: 6px 14px 6px 6px;
  box-shadow: inset 0 2px 6px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.5);
}
.art-turret {
  position: absolute;
  bottom: 60px; left: 60px;
  width: 80px; height: 38px;
  background: linear-gradient(180deg, #5a6070 0%, #3a3f4d 100%);
  border-radius: 6px 10px 0 0;
}
.art-barrel {
  position: absolute;
  bottom: 78px; left: 120px;
  width: 80px; height: 10px;
  background: linear-gradient(180deg, #6a7080, #3a3f4d);
  border-radius: 0 6px 6px 0;
}
.art-tracks-l {
  position: absolute;
  bottom: 0; left: 0;
  width: 200px; height: 26px;
  background: linear-gradient(180deg, #3a3f4d, #2a2d35);
  border-radius: 13px;
}
.art-smoke {
  position: absolute;
  top: 20px; right: 60px;
  width: 30px; height: 30px;
  background: radial-gradient(circle, rgba(200,200,200,0.15) 0%, transparent 70%);
  border-radius: 50%;
  animation: smokePuff 3s ease-in-out infinite;
}
@keyframes smokePuff {
  0%   { transform: translateY(0) scale(1); opacity: 0.15; }
  50%  { transform: translateY(-20px) scale(1.8); opacity: 0.25; }
  100% { transform: translateY(-40px) scale(2.5); opacity: 0; }
}

/* Card content */
.card-content { padding: 24px; }

.card-platform {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 8px;
}

.card-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.7rem;
  font-weight: 900;
  color: var(--text);
  margin-bottom: 12px;
  letter-spacing: 0.05em;
}

.card-desc {
  font-size: 0.92rem;
  color: var(--text2);
  line-height: 1.65;
  margin-bottom: 20px;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
  padding: 14px;
  background: var(--bg3);
  border-radius: 10px;
  border: 1px solid var(--border);
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  color: var(--text2);
}
.detail-row i { width: 16px; color: var(--red); flex-shrink: 0; }
.detail-row strong { margin-left: auto; color: var(--text); }

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tag {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  background: var(--bg3);
  color: var(--text2);
  border: 1px solid var(--border);
}

.card-btn { width: 100%; justify-content: center; }

/* ============================================================
   ABOUT SECTION — centered text only
   ============================================================ */
#about { background: var(--bg); }

.about-center {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.about-company-name {
  display: flex;
  align-items: baseline;
  gap: 4px;
  justify-content: center;
  margin-bottom: 28px;
}

.about-zylov {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--text);
  letter-spacing: 0.06em;
  transition: color 0.4s;
}

.about-vr {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--red);
  letter-spacing: 0.04em;
  text-shadow: 0 0 20px rgba(230,57,70,0.5);
}

.about-p {
  font-size: 1.05rem;
  color: var(--text2);
  line-height: 1.85;
  margin-bottom: 18px;
}

/* ============================================================
   FOOTER
   ============================================================ */
.footer {
  background: var(--bg2);
  border-top: 1px solid var(--border);
  padding: 36px 24px;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.footer-logo {
  display: flex;
  align-items: baseline;
  gap: 3px;
  margin-bottom: 4px;
}

.footer-zylov {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--text);
  letter-spacing: 0.08em;
  transition: color 0.4s;
}

.footer-vr {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--red);
  letter-spacing: 0.06em;
  text-shadow: 0 0 12px rgba(230,57,70,0.5);
}

.footer-game {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--text3);
}

/* ============================================================
   MAIN SITE ENTRANCE
   ============================================================ */
.main-site { animation: siteReveal 0.7s ease-out both; }

@keyframes siteReveal {
  from { opacity: 0; transform: scale(0.98); }
  to   { opacity: 1; transform: scale(1); }
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 900px) {
  .nav-links { display: none; }
  .burger { display: flex; }
  .nav-links.mobile-open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 64px; left: 0; right: 0;
    background: var(--nav-bg);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    padding: 16px 24px 24px;
    gap: 4px;
  }
}

@media (max-width: 600px) {
  .nav-container { gap: 8px; }
  .lang-btn span { display: none; }
}

/* ============================================================
   THEME LOGO FLASH
   ============================================================ */
.logo-theme-flash { animation: logoFlash 0.5s ease-out; }
@keyframes logoFlash {
  0%   { opacity: 1; }
  30%  { opacity: 0; }
  70%  { opacity: 0; }
  100% { opacity: 1; }
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
