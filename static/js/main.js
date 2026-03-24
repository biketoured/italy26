/* ══════════════════════════════════════════════════════════════
   SHARED JS — italy26
   Loaded by every page via <script src="/italy26/static/js/main.js">
   ══════════════════════════════════════════════════════════════ */

// ── PAGE DETECTION ──────────────────────────────────────────
// Returns a short page identifier based on the current URL.
// Used to hide the active page link and set the home href.
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('sweden2024'))        return 'sweden2024';
  if (path.includes('donate'))            return 'donate';
  if (path.includes('/blog/') && path.includes('post')) return 'post';
  if (path.includes('/blog/'))            return 'blog';
  return 'index'; // default — root index.html
}

// ── PATH PREFIX ─────────────────────────────────────────────
// Pages inside subfolders (e.g. blog/) need ../ prefixes.
function getPrefix() {
  const path = window.location.pathname;
  if (path.includes('/blog/')) return '../';
  return '';
}

// ── NAV INJECTION ───────────────────────────────────────────
// Builds and injects the shared nav into <nav id="shared-nav">.
// Pass the page name to hide the correct link and set home href.
function injectNav(page) {
  page = page || getCurrentPage();
  const p = getPrefix();

  // Nav link definitions
  // Each entry: { id, href, en, sv, it }
  const links = [
    { id: 'blog',      href: p + 'blog/index.html',  en: 'Blog',        sv: 'Blogg',       it: 'Blog'        },
    { id: 'donate',    href: p + 'donate.html',       en: 'Donate',      sv: 'Donera',      it: 'Dona'        },
    { id: 'links',     href: p + 'index.html#links',  en: 'Links',       sv: 'Länkar',      it: 'Link'        },
    { id: 'routes',    href: p + 'dashboard',         en: 'Routes',      sv: 'Rutter',      it: 'Percorsi'    },
    { id: 'sweden2024',href: p + 'sweden2024.html',   en: 'Sweden 2024', sv: 'Sverige 2024',it: 'Svezia 2024' },
  ];

  // Home link — hidden on index, points to index from everywhere else
  const homeHidden = (page === 'index') ? 'hidden' : '';
  const homeHref   = p + 'index.html';

  const navHTML = `
    <a href="${homeHref}" class="nav-home ${homeHidden}"
       data-en="Home" data-sv="Hem" data-it="Home">Home</a>

    <div class="lang-switcher">
      <button class="lang-btn active" data-lang="en" title="English">
        <img src="${p}assets/images/flaguk.png" alt="English" width="50" height="50">
      </button>
      <button class="lang-btn" data-lang="sv" title="Svenska">
        <img src="${p}assets/images/flagse.png" alt="Svenska" width="50" height="50">
      </button>
      <button class="lang-btn" data-lang="it" title="Italiano">
        <img src="${p}assets/images/flagit.png" alt="Italiano" width="50" height="50">
      </button>
    </div>

    <ul class="nav-links">
      ${links.map(l => `
        <li class="${l.id === page ? 'hidden' : ''}">
          <a href="${l.href}"
             data-en="${l.en}"
             data-sv="${l.sv}"
             data-it="${l.it}">${l.en}</a>
        </li>`).join('')}
    </ul>`;

  const nav = document.getElementById('shared-nav');
  if (nav) {
    nav.innerHTML = navHTML;
  } else {
    // Fallback — create nav if not present
    const el = document.createElement('nav');
    el.id = 'shared-nav';
    el.innerHTML = navHTML;
    document.body.insertBefore(el, document.body.firstChild);
  }
}

// ── FOOTER INJECTION ────────────────────────────────────────
function injectFooter() {
  const footer = document.getElementById('shared-footer');
  if (!footer) return;
  footer.innerHTML = `
    <span class="logo">Edvard Appelberg</span>
    <p data-en="Skellefteå, Sweden — Built with HTML &amp; CSS"
       data-sv="Skellefteå, Sverige — Byggd med HTML &amp; CSS"
       data-it="Skellefteå, Svezia — Costruito con HTML &amp; CSS">
      Skellefteå, Sweden — Built with HTML &amp; CSS
    </p>`;
}

// ── LANGUAGE SWITCHER ────────────────────────────────────────
let currentLang = 'en';

function applyLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll('[data-en]').forEach(el => {
    const translation = el.getAttribute('data-' + lang);
    if (translation) el.innerHTML = translation;
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  localStorage.setItem('preferred-lang', lang);
}

function initLanguage() {
  // Wire up flag buttons — use event delegation on body in case nav
  // is injected after this script runs
  document.addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (btn) applyLanguage(btn.getAttribute('data-lang'));
  });

  // Restore saved language
  const saved = localStorage.getItem('preferred-lang');
  if (saved && saved !== 'en') applyLanguage(saved);
}

// ── PIZZA SCROLLBAR ─────────────────────────────────────────
function injectPizzaScrollbar() {
  const html = `
    <div id="bike-scrollbar">
      <div class="sb-track"></div>
      <div class="sb-flag top">
        <div class="banner">
          <span style="background:#009246"></span>
          <span style="background:#fff;border-left:0.5px solid #ddd;border-right:0.5px solid #ddd"></span>
          <span style="background:#CE2B37"></span>
        </div>
        <div class="pole"></div>
      </div>
      <div id="bike-thumb">
        <img src="${getPrefix()}assets/images/pizza.png" alt="scroll position">
      </div>
      <div class="sb-flag bottom">
        <div class="banner">
          <span style="background:#009246"></span>
          <span style="background:#fff;border-left:0.5px solid #ddd;border-right:0.5px solid #ddd"></span>
          <span style="background:#CE2B37"></span>
        </div>
        <div class="pole"></div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', html);

  const scrollbar  = document.getElementById('bike-scrollbar');
  const thumb      = document.getElementById('bike-thumb');
  const img        = thumb.querySelector('img');
  const TRACK_PAD  = 56;   // px reserved for each flag at top/bottom

  // ── Spin physics (rAF-based — no CSS animation, no snapping) ──
  // We own the angle entirely. Each frame: angle += degsPerMs * elapsed.
  // Deceleration uses exponential decay: speed *= DECAY each frame.
  // This is the standard approach for spinning objects (same as iOS momentum scroll).
  //
  // Target speed: 1.5s per revolution = 1/1.5 rev/s = 240 deg/s
  // Decay: chosen so speed halves roughly every 300ms → feels swift but smooth.

  const TARGET_DEG_S = 240;          // deg/s while scrolling (1 rev per 1.5s)
  const DECAY        = 0.9925;       // multiply speed by this each rAF frame (~16ms)
  const STOP_THRESH  = 0.5;          // deg/s below which we treat as stopped

  let angle     = 0;                 // current rotation in degrees
  let speed     = 0;                 // current deg/s
  let lastTime  = performance.now();
  let rafId     = null;
  let isScrolling = false;

  function spinFrame(now) {
    const dt = Math.min(now - lastTime, 64) / 1000;   // seconds; cap at 64ms (tab blur)
    lastTime = now;

    if (isScrolling) {
      speed = TARGET_DEG_S;
    } else {
      speed *= Math.pow(DECAY, dt * 60);   // frame-rate independent decay
      if (speed < STOP_THRESH) { speed = 0; rafId = null; img.style.transform = `rotate(${angle % 360}deg)`; return; }
    }

    angle += speed * dt;
    img.style.transform = `rotate(${angle % 360}deg)`;
    rafId = requestAnimationFrame(spinFrame);
  }

  function ensureSpinning() {
    if (!rafId) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(spinFrame);
    }
  }

  // ── Thumb position ──
  function updateThumb() {
    const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    const barH       = scrollbar.offsetHeight;
    const trackRange = barH - TRACK_PAD * 2 - thumb.offsetHeight;
    thumb.style.top  = Math.round(TRACK_PAD + progress * trackRange) + 'px';
  }

  // ── Scroll listener ──
  window.addEventListener('scroll', () => {
    updateThumb();
    isScrolling = true;
    ensureSpinning();
    clearTimeout(scrollbar._stopTimer);
    scrollbar._stopTimer = setTimeout(() => { isScrolling = false; }, 120);
  }, { passive: true });

  // ── Click-to-jump ──
  scrollbar.addEventListener('click', e => {
    if (thumb.contains(e.target)) return;
    const rect       = scrollbar.getBoundingClientRect();
    const clickY     = e.clientY - rect.top;
    const trackRange = scrollbar.offsetHeight - TRACK_PAD * 2 - thumb.offsetHeight;
    const progress   = Math.min(1, Math.max(0, (clickY - TRACK_PAD) / trackRange));
    const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: progress * maxScroll, behavior: 'smooth' });
  });

  // ── Drag ──
  let dragging = false, dragStartY = 0, dragStartScroll = 0;

  thumb.addEventListener('mousedown', e => {
    dragging       = true;
    dragStartY     = e.clientY;
    dragStartScroll = window.scrollY;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const trackRange = scrollbar.offsetHeight - TRACK_PAD * 2 - thumb.offsetHeight;
    const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, dragStartScroll + ((e.clientY - dragStartY) / trackRange) * maxScroll);
  });
  document.addEventListener('mouseup', () => { dragging = false; });

  updateThumb();
}
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initLanguage();
  injectPizzaScrollbar();
});
