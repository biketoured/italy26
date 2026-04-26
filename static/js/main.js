/* ══════════════════════════════════════════════════════════════
   SHARED JS — italy26
   Loaded by every page via <script src="/italy26/static/js/main.js">
   ══════════════════════════════════════════════════════════════ */


// ── PAGE DETECTION ──────────────────────────────────────────
// Returns a short page identifier based on the current URL.
// Used to hide the active page link and set the home href.
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('sweden2024'))                      return 'sweden2024';
  if (path.includes('donate'))                          return 'donate';
  if (path.includes('flaskpost'))                       return 'flaskpost';
  if (path.includes('blog') && path.includes('post'))   return 'post';
  if (path.includes('blog'))                            return 'blog';
  if (path.includes('route'))                           return 'route';
  if (path.includes('contact'))                         return 'contact';
  return 'index';
}
// ── NAV THEME CONFIG ─────────────────────────────────────────
// Edit these to control nav bg and link colours per page.
const NAV_THEMES = {
  'index': {
    bg:        'rgba(30,61,47,0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#8C7B65',
    linkHover: '#C4B49A',
  },
  'sweden2024': {
    bg:        'rgba(74,122,150,0.97)',
    border:    'rgba(184,212,224,0.2)',
    link:      'rgba(184,212,224,0.7)',
    linkHover: '#FDFAF4',
  },
  'donate': {
    bg:        'rgba(74,122,150,0.97)',
    border:    'rgba(184,212,224,0.2)',
    link:      'rgba(184,212,224,0.7)',
    linkHover: '#FDFAF4',
  },
  'flaskpost': {
    bg:        'rgba(42,31,18,0.96)',
    border:    'rgba(200,169,126,0.2)',
    link:      'rgba(200,169,126,0.65)',
    linkHover: '#e0c49a',
  },
  'route': {
    bg:        'rgba(30,61,47,0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#8C7B65',
    linkHover: '#C4B49A',
  },
  'blog': {
    bg:        'rgba(30,61,47,0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#8C7B65',
    linkHover: '#C4B49A',
  },
  'post': {
    bg:        'rgba(30,61,47,0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#8C7B65',
    linkHover: '#C4B49A',
  },
  'contact': {
    bg:        'rgba(30,61,47,0.96)',
    border:    'rgba(196,180,154,0.15)',
    link:      '#d4c5ac',
    linkHover: '#FDFAF4',
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
  }
  `;
}

function getPrefix() {
  return window.location.pathname.includes('/blog/') ? '../' : '';
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
    { id: 'donate',     href: p + 'donate.html',       en: 'Donate',      sv: 'Donera',      it: 'Dona'        },
    { id: 'blog',       href: p + 'blog/index.html',   en: 'Blog',        sv: 'Blogg',       it: 'Blog'        },
    { id: 'route',      href: p + 'route.html',        en: 'Route',       sv: 'Färdplan',    it: 'Mappa'       },
    { id: 'sweden2024', href: p + 'sweden2024.html',   en: 'Sweden 2024', sv: 'Sverige 2024',it: 'Svezia 2024' },
    { id: 'contact',    href: p + 'contact.html',      en: 'Contact',     sv: 'Kontakt',     it: 'Contatto'    },
  ];

  // Home link — hidden on index, points to index from everywhere else
  const homeHidden = (page === 'index') ? 'hidden' : '';
  const homeHref   = p + 'index.html';

  // Mobile links — same as desktop minus current page (filtered below)
  const mobileLinks = links;

  const tripStart = new Date('2026-05-10');
  const tripEnd   = new Date('2026-06-20');
  const today     = new Date();
  const tripDay   = Math.floor((today - tripStart) / 86400000) + 1;
  const badgeDay  = (today >= tripStart && today <= tripEnd && tripDay >= 1 && tripDay <= 40)
                    ? tripDay : 0;

  const navHTML = `
    <div class="nav-badge" title="Italy 2026 — Day ${badgeDay} of 40">
      <img class="nav-badge-sun" src="${p}assets/images/sun.png" alt="sun">
      <div class="nav-badge-text">
        <span class="nav-badge-label">Day</span>
        <span class="nav-badge-day">${badgeDay}</span>
        <span class="nav-badge-total">/ 40</span>
      </div>
    </div>

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
        <li class="${l.id === page ? 'hidden' : ''}" style="min-width:6rem; text-align:center;">
          <a href="${l.href}"
             data-en="${l.en}"
             data-sv="${l.sv}"
             data-it="${l.it}">${l.en}</a>
        </li>`).join('')}
    </ul>

    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <div class="nav-dropdown" id="nav-dropdown">
      <ul>
        ${mobileLinks.filter(l => l.id !== page).map(l => `
          <li>
            <a href="${l.href}"
               data-en="${l.en}"
               data-sv="${l.sv}"
               data-it="${l.it}">${l.en}</a>
          </li>`).join('')}
      </ul>
    </div>`;

  const nav = document.getElementById('shared-nav');
  if (nav) {
    nav.innerHTML = navHTML;
  } else {
    const el = document.createElement('nav');
    el.id = 'shared-nav';
    el.innerHTML = navHTML;
    document.body.insertBefore(el, document.body.firstChild);
  }

  // ── Hamburger toggle ──
  const hamburger = document.getElementById('nav-hamburger');
  const dropdown  = document.getElementById('nav-dropdown');
  if (hamburger && dropdown) {
    hamburger.addEventListener('click', () => {
      const isOpen = dropdown.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    dropdown.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        dropdown.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        dropdown.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
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
    </p>
    <div id="footer-attribution"></div>`;
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
    'donate':     'heart.png',
    'blog':       'wheel.png',
    'post':       'sun.png',
    'sweden2024': 'mayflower.png',
    'route':     'tomato.png',
    'flaskpost':  'flaskpost.png',
  };
  const thumbImage = PAGE_IMAGES[getCurrentPage()] || 'pizza.png';

  const html = `
    <div id="pizza-scrollbar">
      <div class="sb-track"></div>
      <div id="pizza-thumb">
        <img src="${getPrefix()}assets/images/${thumbImage}" alt="scroll position">
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', html);

  // Match scrollbar background to nav theme
  const currentPage = getCurrentPage();
  const navTheme = NAV_THEMES[currentPage] || NAV_THEMES['index'];
  const sb = document.getElementById('pizza-scrollbar');
  if (sb) sb.style.background = navTheme.bg.replace(/,\s*[\d.]+\)$/, ', 1)');

  const scrollbar  = document.getElementById('pizza-scrollbar');
  const thumb      = document.getElementById('pizza-thumb');
  const img        = thumb.querySelector('img');
  const TRACK_PAD  = 26;   // half of thumb height so pizza stays within viewport

  // ── Spin physics (rAF-based — no CSS animation, no snapping) ──
  const TARGET_DEG_S = 360;    // deg/s while scrolling (1 rev per 1.5s)
  const DECAY        = 0.99; // exponential friction per normalised 60fps frame
  const STOP_THRESH  = 3;    // deg/s below which we call it stopped

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
  // ── Scrollbar fade-out after 15s of inactivity ──
  let fadeTimer = null;
  function showScrollbar() {
    scrollbar.style.transition = 'opacity 0.5s ease';
    scrollbar.style.opacity    = '1';
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => {
      scrollbar.style.transition = 'opacity 2s ease';
      scrollbar.style.opacity    = '0';
    }, 15000);
  }
  // Show on load, start the 15s countdown immediately
  showScrollbar();

  window.addEventListener('scroll', () => {
    updateThumb();
    isScrolling = true;
    ensureSpinning();
    showScrollbar();
    clearTimeout(scrollbar._stopTimer);
    scrollbar._stopTimer = setTimeout(() => { isScrolling = false; }, 120);

    // ── Apple drop — trigger when user reaches the very bottom ──
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0 && window.scrollY >= maxScroll - 2) {
      spawnAppleDrop();
    }
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

  // ── Apple drop animation ────────────────────────────────────
  // Spawns a copy of the thumb image that falls from the scrollbar,
  // bounces like a dropped apple, drifts left, then rests on the floor.
  // Each apple is physically independent — different bounce power + drift speed.
  // Constraints: max bounce height = 1/5 vh, max leftward travel = 1/3 vw.

  const appleDropState = {
    fired:   false,   // only fire once per page-bottom visit
    settled: [],      // refs to resting apple elements (for cleanup on scroll up)
  };

  // Re-arm when user scrolls away from the bottom so they can see it again
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0 && window.scrollY < maxScroll - 80) {
      appleDropState.fired = false;
    }
  }, { passive: true });

  function spawnAppleDrop() {
    if (appleDropState.fired) return;
    appleDropState.fired = true;

    const imgSrc   = img.src;                  // same image as the real thumb
    const thumbW   = thumb.offsetWidth;        // ~60 px
    const thumbH   = thumb.offsetHeight;       // ~60 px
    const sbRect   = scrollbar.getBoundingClientRect();

    // Floor = bottom of the viewport (fixed coords)
    const floorY   = window.innerHeight - thumbH - 6;

    // Starting position = where the real thumb currently is (bottom of bar)
    const startX   = sbRect.left + (sbRect.width - thumbW) / 2;
    const startY   = sbRect.top + (scrollbar.offsetHeight - TRACK_PAD - thumbH);

    // How many apples fall? 1 to 3 — one per "previous" bottom visit would also work,
    // but one feels clean and physical. Extend count here if you want a cascade.
    const COUNT = 1;

    for (let i = 0; i < COUNT; i++) {
      launchApple(imgSrc, startX, startY, floorY, thumbW, thumbH, i * 120);
    }
  }

  function launchApple(src, startX, startY, floorY, w, h, delayMs) {
    // ── Randomised physics per apple ──
    const maxBounceH  = window.innerHeight / 5;          // hard cap: 1/5 vh
    const maxDriftX   = window.innerWidth  / 3;          // hard cap: 1/3 vw (leftward)
    const bounceDecay = 0.42 + Math.random() * 0.18;     // 0.42–0.60 — bounciness
    const driftPxPerS = 60  + Math.random() * 120;       // 60–180 px/s leftward drift
    const initBounceH = (maxBounceH * 0.55) + Math.random() * (maxBounceH * 0.45); // 55–100% of cap
    const spinDir     = Math.random() < 0.5 ? 1 : -1;   // clockwise or counter
    const spinRpm     = 0.25 + Math.random() * 0.5;       // 1.5–4 rotations per bounce

    // Create element
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      width: ${w}px; height: ${h}px;
      left: ${startX}px; top: ${startY}px;
      z-index: 999;
      pointer-events: none;
      display: flex; align-items: center; justify-content: center;
      transform-origin: center center;
      will-change: transform, top, left;
    `;
    const appleImg = document.createElement('img');
    appleImg.src = src;
    appleImg.style.cssText = `width:50px;height:50px;border-radius:50%;display:block;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.4));`;
    el.appendChild(appleImg);
    document.body.appendChild(el);

    let posX      = startX;
    let posY      = startY;
    let velY      = 0;             // px/s downward
    let bounceH   = initBounceH;   // current peak height for this bounce
    let angle     = 0;             // current rotation degrees
    let totalDrift = 0;            // how far left we've gone
    let resting   = false;
    let lastTs    = null;
    const GRAVITY = 1800;          // px/s²

    // Phases: 'falling' → 'bouncing' → 'resting'
    let phase = 'falling';

    setTimeout(() => {
      function frame(ts) {
        if (resting) return;
        if (lastTs === null) lastTs = ts;
        const dt = Math.min((ts - lastTs) / 1000, 0.05); // cap dt at 50ms
        lastTs = ts;

        if (phase === 'falling' || phase === 'bouncing') {
          velY += GRAVITY * dt;
          posY += velY * dt;

          // Drift left — respect the 1/3 vw cap
          const driftThisFrame = Math.min(driftPxPerS * dt, maxDriftX - totalDrift);
          if (driftThisFrame > 0) {
            posX      -= driftThisFrame;
            totalDrift += driftThisFrame;
          }

          // Rotation — proportional to horizontal speed
          angle += spinDir * spinRpm * 360 * dt;

          // Hit the floor?
          if (posY >= floorY) {
            posY = floorY;
            phase = 'bouncing';

            // Next bounce height
            bounceH *= bounceDecay;

            if (bounceH < 4) {
              // Too small to bother — come to rest
              resting = true;
              el.style.top  = floorY + 'px';
              el.style.left = posX  + 'px';
              appleImg.style.transform = `rotate(${Math.round(angle)}deg)`;
              appleDropState.settled.push(el);
              return;
            }

            // Bounce: set upward velocity to reach bounceH
            // v² = 2·g·h  →  v = √(2·g·h)
            velY = -Math.sqrt(2 * GRAVITY * bounceH);
          }

          el.style.top  = Math.round(posY) + 'px';
          el.style.left = Math.round(posX) + 'px';
          appleImg.style.transform = `rotate(${angle % 360}deg)`;
        }

        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, delayMs);
  }

  updateThumb();
}
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initLanguage();
  injectPizzaScrollbar();
});