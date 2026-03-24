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
  if (path.includes('route'))             return 'routes';
  return 'index'; // default — root index.html
}

// ── PATH PREFIX ─────────────────────────────────────────────
// Pages inside subfolders (e.g. blog/) need ../ prefixes.
function getPrefix() {
  const path = window.location.pathname;
  if (path.includes('/blog/')) return '../';
  return '';
}


// ── NAV THEME CONFIG ─────────────────────────────────────────
// Edit these to control nav bg and link colours per page.
const NAV_THEMES = {
  'index': {
    bg:        'rgba(30, 61, 47, 0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#8C7B65',
    linkHover: '#C4B49A',
  },
  'sweden2024': {
    bg:        'rgba(74, 122, 150, 0.97)',
    border:    'rgba(184,212,224,0.2)',
    link:      'rgba(184,212,224,0.7)',
    linkHover: '#FDFAF4',
  },
  'donate': {
    bg:        'rgba(74, 122, 150, 0.97)',
    border:    'rgba(184,212,224,0.2)',
    link:      'rgba(184,212,224,0.7)',
    linkHover: '#FDFAF4',
  },
  'routes': {
    bg:        'rgba(30, 61, 47, 0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#8C7B65',
    linkHover: '#C4B49A',
  },
  'blog': {
    bg:        'rgba(30, 61, 47, 0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#8C7B65',
    linkHover: '#C4B49A',
  },
  'post': {
    bg:        'rgba(30, 61, 47, 0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#8C7B65',
    linkHover: '#C4B49A',
  },
};

function applyNavTheme(page) {
  const t = NAV_THEMES[page] || NAV_THEMES['index'];
  let el = document.getElementById('nav-theme-vars');
  if (!el) {
    el = document.createElement('style');
    el.id = 'nav-theme-vars';
    document.head.appendChild(el);
  }
  el.textContent = `:root {
    --nav-bg:          ${t.bg};
    --nav-border:      ${t.border};
    --nav-link:        ${t.link};
    --nav-link-hover:  ${t.linkHover};
  }`;
}

// ── NAV INJECTION ───────────────────────────────────────────
// Builds and injects the shared nav into <nav id="shared-nav">.
// Pass the page name to hide the correct link and set home href.
function injectNav(page) {
  page = page || getCurrentPage();
  const p = getPrefix();
  applyNavTheme(page);

  // Nav link definitions
  // Each entry: { id, href, en, sv, it }
  const links = [
    { id: 'blog',      href: p + 'blog/index.html',  en: 'Blog',        sv: 'Blogg',       it: 'Blog'        },
    { id: 'donate',    href: p + 'donate.html',       en: 'Donate',      sv: 'Donera',      it: 'Dona'        },
    { id: 'links',     href: p + 'index.html#links',  en: 'Links',       sv: 'Länkar',      it: 'Link'        },
    { id: 'routes',    href: p + 'route.html',         en: 'Routes',      sv: 'Rutter',      it: 'Percorsi'    },
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
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
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
  // ── Per-page thumb image ──
  const PAGE_IMAGES = {
    'index':      'pizza.png',
    'donate':     'pizza.png',
    'blog':       'pizza.png',
    'post':       'pizza.png',
    'sweden2024': 'sun.png',
    'routes':     'pizza.png',
  };
  const thumbImage = PAGE_IMAGES[getCurrentPage()] || 'pizza.png';

  // Per-page flag image: sweden2024 → flaguk, all others → flagit
  const PAGE_FLAGS = { 'sweden2024': 'flagse.png' };
  const flagImg = PAGE_FLAGS[getCurrentPage()] || 'flagit.png';

  const html = `
    <div id="pizza-scrollbar">
      <div class="sb-track"></div>
      <div class="sb-flag top">
        <img src="${getPrefix()}assets/images/${flagImg}" alt="flag" width="30" height="30">
      </div>
      <div id="pizza-thumb">
        <img src="${getPrefix()}assets/images/${thumbImage}" alt="scroll position">
      </div>
      <div class="sb-flag bottom">
        <img src="${getPrefix()}assets/images/${flagImg}" alt="flag" width="30" height="30">
      </div>
    </div>`;

  // Hide native scrollbar
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    html { scrollbar-width: none; }
    html::-webkit-scrollbar { display: none; }
    #pizza-scrollbar {
      position: fixed; right: 0; top: 0; bottom: 0;
      width: 44px; z-index: 9999;
      display: flex; flex-direction: column;
      align-items: center; justify-content: space-between;
      padding: 0;
      cursor: pointer;
      user-select: none;
    }
    .sb-track {
      position: absolute; top: 0; bottom: 0; left: 50%;
      width: 2px; background: rgba(196,180,154,0.15);
      transform: translateX(-50%);
    }
    .sb-flag {
      position: relative; z-index: 2; width: 28px;
      flex-shrink: 0;
    }
    .sb-flag .banner {
      display: flex; width: 100%; height: 18px; overflow: hidden;
      border-radius: 2px; box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    }
    .sb-flag .banner span { flex: 1; }
    #pizza-thumb {
      position: absolute; left: 50%; transform: translateX(-50%);
      width: 36px; height: 36px; z-index: 3;
      display: flex; align-items: center; justify-content: center;
      cursor: grab;
    }
    #pizza-thumb:active { cursor: grabbing; }
    #pizza-thumb img { width: 32px; height: 32px; object-fit: contain; }
    @media (max-width: 768px) {
      #pizza-scrollbar { width: 36px; }
      #pizza-thumb { width: 30px; height: 30px; }
      #pizza-thumb img { width: 26px; height: 26px; }
    }
  `;
  document.head.appendChild(styleEl);
  document.body.insertAdjacentHTML('beforeend', html);

  const scrollbar  = document.getElementById('pizza-scrollbar');
  const thumb      = document.getElementById('pizza-thumb');
  const img        = thumb.querySelector('img');
  const TRACK_PAD  = 30;   // px reserved for each flag at top/bottom

  // ── Spin physics (rAF-based — no CSS animation, no snapping) ──
  const TARGET_DEG_S = 240;    // deg/s while scrolling (1 rev per 1.5s)
  const DECAY        = 0.9925; // exponential friction per normalised 60fps frame
  const STOP_THRESH  = 0.5;    // deg/s below which we call it stopped

  let angle       = 0;
  let speed       = 0;
  let lastTime    = null;      // null = loop is not running
  let rafId       = null;
  let isScrolling = false;

  function spinFrame(now) {
    // Guard: if the loop was cancelled between scheduling and firing, bail cleanly
    if (rafId === null) return;

    if (lastTime === null) lastTime = now;
    const dt = Math.min(now - lastTime, 64) / 1000;  // cap at 64ms for tab-blur spikes
    lastTime = now;

    if (isScrolling) {
      speed = TARGET_DEG_S;
    } else {
      speed *= Math.pow(DECAY, dt * 60);  // frame-rate independent
    }

    if (!isScrolling && speed < STOP_THRESH) {
      // Come to a full stop — clean up completely
      speed   = 0;
      rafId   = null;
      lastTime = null;
      img.style.transform = `rotate(${angle % 360}deg)`;
      return;
    }

    angle = (angle + speed * dt) % 360;   // keep angle tidy to avoid float drift
    img.style.transform = `rotate(${angle}deg)`;
    rafId = requestAnimationFrame(spinFrame);
  }

  function ensureSpinning() {
    if (rafId !== null) return;   // loop already running, isScrolling flag handles speed
    lastTime = null;              // will be initialised on first frame
    rafId = requestAnimationFrame(spinFrame);
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

  // ── Click-to-jump (works for mouse and touch) ──
  function jumpToY(clientY) {
    const rect       = scrollbar.getBoundingClientRect();
    const clickY     = clientY - rect.top;
    const trackRange = scrollbar.offsetHeight - TRACK_PAD * 2 - thumb.offsetHeight;
    const progress   = Math.min(1, Math.max(0, (clickY - TRACK_PAD) / trackRange));
    const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: progress * maxScroll, behavior: 'smooth' });
  }
  scrollbar.addEventListener('click', e => {
    if (thumb.contains(e.target)) return;
    jumpToY(e.clientY);
  });
  scrollbar.addEventListener('touchstart', e => {
    if (thumb.contains(e.target)) return;
    jumpToY(e.touches[0].clientY);
    e.preventDefault();
  }, { passive: false });

  // ── Drag — pointer events work for both mouse and touch ──
  let dragging = false, dragStartY = 0, dragStartScroll = 0;

  thumb.addEventListener('pointerdown', e => {
    dragging        = true;
    dragStartY      = e.clientY;
    dragStartScroll = window.scrollY;
    thumb.setPointerCapture(e.pointerId); // keeps events on thumb even if mouse leaves
    e.preventDefault();
  });
  thumb.addEventListener('pointermove', e => {
    if (!dragging) return;
    const trackRange = scrollbar.offsetHeight - TRACK_PAD * 2 - thumb.offsetHeight;
    const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
    const newScroll  = dragStartScroll + ((e.clientY - dragStartY) / trackRange) * maxScroll;
    window.scrollTo(0, Math.max(0, Math.min(maxScroll, newScroll)));
  });
  thumb.addEventListener('pointerup',     () => { dragging = false; });
  thumb.addEventListener('pointercancel', () => { dragging = false; });

  updateThumb();
}
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initLanguage();
  injectPizzaScrollbar();
});
