/* =========================================================
   Mateus Mendes · Portfolio — interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---------- I18n : aplicar idioma salvo ou iniciar ---------- */
  var supportedLangs = ['fr', 'pt', 'es', 'en'];

  function applyLanguage(lang) {
    if (!lang) return;
    lang = lang.toLowerCase();

    try {
      localStorage.setItem('user_lang_pref', lang);
      localStorage.setItem('lang', lang);
      localStorage.setItem('mm_lang', lang);
    } catch (e) {}

    var cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = lang.toUpperCase();

    if (window.MMI18N) {
      if (typeof window.MMI18N.set === 'function') window.MMI18N.set(lang);
      else if (typeof window.MMI18N.setLang === 'function') window.MMI18N.setLang(lang);
      else if (typeof window.MMI18N.apply === 'function') window.MMI18N.apply(lang);
      else if (typeof window.MMI18N.changeLanguage === 'function') window.MMI18N.changeLanguage(lang);
    }

    var menuBtns = document.querySelectorAll('.lang__menu [data-lang-btn]');
    menuBtns.forEach(function (b) {
      if (b.getAttribute('data-lang-btn') === lang) {
        b.classList.add('is-active');
      } else {
        b.classList.remove('is-active');
      }
    });
  }

  if (window.MMI18N && typeof window.MMI18N.init === 'function') {
    window.MMI18N.init();
  }

  /* ---------- Modal de Seleção de Idioma ---------- */
  var langModal = document.getElementById('language-modal');

  if (langModal) {
    var urlParams = new URLSearchParams(window.location.search);
    var langFromUrl = urlParams.get('lang');
    var langSaved = null;

    try {
      langSaved = localStorage.getItem('user_lang_pref') || localStorage.getItem('lang') || localStorage.getItem('mm_lang');
    } catch (e) {}

    if (langFromUrl && supportedLangs.indexOf(langFromUrl.toLowerCase()) !== -1) {
      applyLanguage(langFromUrl);
    } else if (langSaved && supportedLangs.indexOf(langSaved.toLowerCase()) !== -1) {
      applyLanguage(langSaved);
    } else {
      langModal.classList.add('active');
    }

    var modalBtns = langModal.querySelectorAll('[data-lang-btn]');
    modalBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var chosen = btn.getAttribute('data-lang-btn');
        applyLanguage(chosen);

        var menuBtn = document.querySelector('.lang__menu [data-lang-btn="' + chosen + '"]');
        if (menuBtn) menuBtn.click();

        langModal.classList.remove('active');
      });
    });
  }

  /* ---------- Dropdown de langue (Nav) ---------- */
  var langPicker = document.getElementById('langPicker');
  var langToggle = document.getElementById('langToggle');
  if (langPicker && langToggle) {
    langToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = langPicker.classList.toggle('is-open');
      langToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.querySelectorAll('.lang__menu [data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var l = btn.getAttribute('data-lang-btn');
        applyLanguage(l);
        langPicker.classList.remove('is-open');
        langToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!langPicker.contains(e.target)) {
        langPicker.classList.remove('is-open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        langPicker.classList.remove('is-open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');

  /* ---------- Nav : fond solide au scroll ---------- */
  var hero = document.querySelector('.hero');
  function onScroll() {
    var trigger = hero ? hero.offsetHeight - 90 : 120;
    nav.classList.toggle('is-solid', window.scrollY > trigger);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  function closeMenu() {
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Lien de navigation actif ---------- */
  var sections = ['parcours', 'expertise', 'marques', 'logiciels', 'produits', 'projets', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navMap = {};
  if (links) {
    links.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var id = href.replace('#', '');
      navMap[id] = a;
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.values(navMap).forEach(function (a) { a.classList.remove('active'); });
          var active = navMap[e.target.id];
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal discret à l'apparition ---------- */
  var revealTargets = document.querySelectorAll(
    '.parcours__body, .parcours__aside, .expertise__head, .pillar, .ai-card, ' +
    '.divider__inner, .case, .soft, .prod, .contact__inner'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealTargets.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Aperçus en direct (projets) ---------- */
  var frames = Array.prototype.slice.call(document.querySelectorAll('.live__ifr'));

  function scaleFrame(ifr) {
    var frame = ifr.parentElement;
    if (!frame) return;
    var s = frame.clientWidth / 1280;
    ifr.style.transform = 'scale(' + s + ')';
  }

  function loadFrame(ifr) {
    if (ifr.dataset.loaded) return;
    ifr.dataset.loaded = '1';
    var src = (ifr.getAttribute('data-src') || '').replace(/^http:/, 'https:');
    scaleFrame(ifr);
    ifr.addEventListener('load', function () { ifr.classList.add('is-ready'); });
    ifr.src = src;
  }

  if (frames.length) {
    frames.forEach(scaleFrame);
    var st;
    window.addEventListener('resize', function () {
      clearTimeout(st);
      st = setTimeout(function () { frames.forEach(scaleFrame); }, 150);
    });

    if (window.matchMedia('(min-width: 720px)').matches && 'IntersectionObserver' in window) {
      var frameObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { loadFrame(e.target); obs.unobserve(e.target); }
        });
      }, { rootMargin: '400px 0px' });
      frames.forEach(function (f) { frameObs.observe(f); });
    }
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbClose = lb ? lb.querySelector('.lightbox__close') : null;

  function openLb(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    if (!lb || !lbImg) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.querySelectorAll(
    '.case__gallery img, .soft__shots img, .prod__shots img, .case__cover img'
  ).forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () { openLb(img.src, img.alt); });
  });

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) {
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb && lb.classList.contains('is-open')) closeLb();
  });

})();