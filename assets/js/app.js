/* ============================================================
   NUTRISLIM — comportamiento
   Sin dependencias. Vanilla JS, un solo archivo.
   ============================================================ */

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE    = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Cero tipográfico: 7 → "OO7", 100 → "1OO" */
  function pad(n, len) {
    return String(n).padStart(len || 3, '0').replace(/0/g, 'O');
  }

  /* ==========================================================
     1 · SPLIT — parte los titulares en palabras animables
     ========================================================== */

  function split(el) {
    var i = 0;

    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag  = document.createDocumentFragment();

          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }

            var outer = document.createElement('span');
            var inner = document.createElement('span');
            outer.className = 'word';
            inner.textContent = part;
            inner.style.setProperty('--i', i++);
            outer.appendChild(inner);
            frag.appendChild(outer);
          });

          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR' && !child.classList.contains('word')) {
          walk(child);
        }
      });
    }

    walk(el);
  }

  /* ==========================================================
     2 · IDIOMA
     El inglés está en el HTML como texto real; el diccionario
     sólo trae lo que cambia. Sin JS, la página queda en inglés
     y funcional. La elección se guarda y se refleja en la URL.
     ========================================================== */

  var DICT      = window.NS_I18N  || {};
  var LIST      = window.NS_LANGS || [{ code: 'en', short: 'EN' }];
  var FONTS     = window.NS_FONTS || {};
  var LANGS     = LIST.map(function (l) { return l.code; });
  var AUTO      = false;   /* ponerlo en true para detectar el idioma del navegador */
  var originals = [];
  var loaded    = {};

  function meta(code) {
    return LIST.filter(function (l) { return l.code === code; })[0] || LIST[0];
  }

  /* Las tipografías de cirílico y hangul se bajan sólo si hacen falta */
  function loadFont(code) {
    var need = meta(code).font;
    if (!need || loaded[need] || !FONTS[need]) return;
    loaded[need] = true;
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = FONTS[need];
    document.head.appendChild(link);
  }

  /* Se guarda el HTML original (inglés) antes de tocar nada */
  $$('[data-i18n], [data-i18n-label], [data-i18n-cursor]').forEach(function (el) {
    originals.push({
      el:    el,
      html:  el.hasAttribute('data-i18n') ? el.innerHTML : null,
      label: el.getAttribute('data-label'),
      curs:  el.getAttribute('data-cursor')
    });
  });

  function readLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q && LANGS.indexOf(q) > -1) return q;

    var saved = null;
    try { saved = localStorage.getItem('ns-lang'); } catch (e) {}
    if (saved && LANGS.indexOf(saved) > -1) return saved;

    if (AUTO) {
      var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
      if (LANGS.indexOf(nav) > -1) return nav;
    }
    return 'en';
  }

  function applyLang(lang, push) {
    var d = DICT[lang] || null;

    loadFont(lang);

    originals.forEach(function (o) {
      var el = o.el;

      if (o.html !== null) {
        var k = el.getAttribute('data-i18n');
        var v = (d && d[k] !== undefined) ? d[k] : o.html;
        if (el.innerHTML !== v) el.innerHTML = v;
        if (el.classList.contains('split')) split(el);
      }

      if (o.label !== null) {
        var kl = el.getAttribute('data-i18n-label');
        el.setAttribute('data-label', (d && d[kl] !== undefined) ? d[kl] : o.label);
      }

      if (o.curs !== null) {
        var kc = el.getAttribute('data-i18n-cursor');
        if (kc) el.setAttribute('data-cursor', (d && d[kc] !== undefined) ? d[kc] : o.curs);
      }
    });

    document.documentElement.lang = lang;

    if (d && d['meta.title']) document.title = d['meta.title'];
    else if (lang === 'en')   document.title = 'NutriSlim — Functional medicine, metabolism and longevity';

    var metaEl = $('#metaDesc');
    if (metaEl && d && d['meta.desc']) metaEl.setAttribute('content', d['meta.desc']);

    $$('.lang__opt').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.lang === lang);
      b.setAttribute('aria-current', b.dataset.lang === lang);
    });

    var code = $('#langCode');
    var flag = $('#langFlag use');
    if (code) code.textContent = meta(lang).short;
    if (flag) flag.setAttribute('href', '#fl-' + lang);

    try { localStorage.setItem('ns-lang', lang); } catch (e) {}

    if (push) {
      var url = new URL(location.href);
      if (lang === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    }

    document.dispatchEvent(new CustomEvent('ns:lang', { detail: { lang: lang } }));
  }

  applyLang(readLang(), false);

  /* ==========================================================
     2-BIS · PALETA
     Herramienta de decisión: la elección queda en la URL, así se
     puede mandar un enlace directo a cada versión. Cuando esté
     decidida, se borra este bloque y el del HTML.
     ========================================================== */

  var THEMES = ['bosque', 'salvia', 'noche'];

  function applyTheme(name, push) {
    if (THEMES.indexOf(name) < 0) name = THEMES[0];
    document.documentElement.setAttribute('data-theme', name);

    $$('.theme__opt').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.theme === name);
    });

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content',
        getComputedStyle(document.documentElement).getPropertyValue('--overlay').trim());
    }

    try { localStorage.setItem('ns-theme', name); } catch (e) {}

    if (push) {
      var url = new URL(location.href);
      if (name === THEMES[0]) url.searchParams.delete('theme');
      else url.searchParams.set('theme', name);
      history.replaceState(null, '', url);
    }
  }

  (function initTheme() {
    var q = new URLSearchParams(location.search).get('theme');
    var saved = null;
    try { saved = localStorage.getItem('ns-theme'); } catch (e) {}
    applyTheme(q || saved || THEMES[0], false);
  })();

  var themeBox = $('#theme');
  var themeBtn = $('#themeToggle');

  function closeTheme() {
    if (!themeBox) return;
    themeBox.classList.remove('is-open');
    if (themeBtn) themeBtn.setAttribute('aria-expanded', 'false');
  }

  if (themeBox && themeBtn) {
    themeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = themeBox.classList.toggle('is-open');
      themeBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', function (e) {
      if (!themeBox.contains(e.target)) closeTheme();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeTheme();
    });
  }

  $$('.theme__opt').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(btn.dataset.theme, true);
      closeTheme();
    });
  });

  /* — menú desplegable de idiomas — */
  var langBox = $('#lang');
  var langBtn = $('#langToggle');

  function closeLang() {
    if (!langBox) return;
    langBox.classList.remove('is-open');
    if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
  }

  if (langBox && langBtn) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = langBox.classList.toggle('is-open');
      langBtn.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', function (e) {
      if (!langBox.contains(e.target)) closeLang();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLang();
    });
  }

  $$('.lang__opt').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.dataset.lang, true);
      closeLang();
    });
  });

  /* Los titulares que no llevan traducción también se parten */
  $$('.split').forEach(function (el) {
    if (!el.querySelector('.word')) split(el);
  });

  /* ==========================================================
     3 · REVELADOS al entrar en pantalla
     ========================================================== */

  var targets = $$('.reveal, .split');
  targets.forEach(function (el) {
    if (el.dataset.delay) el.style.setProperty('--d', el.dataset.delay);
  });

  /* Los del hero no los maneja el observador: esperan al temporizador */
  var held = $$('[data-hold="hero"]');
  targets = targets.filter(function (el) { return el.dataset.hold !== 'hero'; });

  if (REDUCED || !('IntersectionObserver' in window)) {
    targets.concat(held).forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================
     4 · TELÓN DE APERTURA
     Nunca espera a los assets: dura lo que dura y se corre.
     En la segunda visita de la sesión, no aparece.
     ========================================================== */

  var loader = $('#loader');
  var dock   = $('#dock');
  var seen   = sessionStorage.getItem('ns-seen');

  /* Cuánto se sostiene sola la foto del hero antes de que entre el texto.
     En la segunda visita de la sesión se acorta: el efecto ya lo vieron. */
  var HERO_HOLD = REDUCED ? 0 : (seen ? 1100 : 2600);

  function openDock() { if (dock) dock.classList.add('is-in'); }

  function revealHero() {
    var hero = $('.hero');
    if (hero) hero.classList.add('is-ready');
    held.forEach(function (el) { el.classList.add('is-in'); });
  }

  if (!loader || REDUCED || seen) {
    document.documentElement.classList.remove('is-loading');
    if (loader) loader.classList.add('is-gone');
    openDock();
    setTimeout(revealHero, HERO_HOLD);
  } else {
    document.documentElement.classList.add('is-loading');

    var count = $('#loaderCount');
    var t0    = performance.now();
    var DUR   = 620;

    (function tick(now) {
      var p = Math.min(1, (now - t0) / DUR);
      var eased = 1 - Math.pow(1 - p, 3);
      if (count) count.textContent = pad(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);

    setTimeout(function () {
      loader.classList.add('is-done');
      document.documentElement.classList.remove('is-loading');
      openDock();
      sessionStorage.setItem('ns-seen', '1');
      setTimeout(function () { loader.classList.add('is-gone'); }, 1100);
      /* el telón tarda 1 s en subir; recién ahí empieza a contar la foto */
      setTimeout(revealHero, 1000 + HERO_HOLD);
    }, DUR + 180);
  }

  /* ==========================================================
     5 · CURSOR
     El punto es crema; la capa madre invierte con difference.
     ========================================================== */

  if (FINE && !REDUCED) {
    var cur   = $('#cursor');
    var dot   = $('.cursor__dot', cur);
    var label = $('.cursor__label', cur);
    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var cx = mx, cy = my;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cur.classList.add('is-on');
    }, { passive: true });

    document.addEventListener('mouseleave', function () { cur.classList.remove('is-on'); });

    (function loop() {
      cx += (mx - cx) * 0.19;
      cy += (my - cy) * 0.19;
      dot.style.transform   = 'translate(' + cx + 'px,' + cy + 'px)';
      label.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var hit = e.target.closest('[data-cursor]');
      if (hit) {
        label.textContent = hit.dataset.cursor;
        cur.classList.add('is-lg');
      } else {
        cur.classList.remove('is-lg');
      }
    });
  }

  /* ==========================================================
     6 · DOCK — la máscara que se desliza
     ========================================================== */

  var menu = $('#dockMenu');
  var mask = $('#dockMask');

  if (menu && mask) {
    var items = $$('.dock__item', menu);

    var moveMask = function (li) {
      if (!li) { mask.style.opacity = '0'; return; }
      var a = li.querySelector('a') || li;
      mask.style.opacity   = '1';
      mask.style.width     = a.offsetWidth + 'px';
      mask.style.transform = 'translateX(' + a.offsetLeft + 'px)';
    };

    var activeItem = function () {
      return items.find(function (li) { return li.classList.contains('is-active'); });
    };

    items.forEach(function (li) {
      li.addEventListener('mouseenter', function () { moveMask(li); });
    });
    menu.addEventListener('mouseleave', function () { moveMask(activeItem()); });

    /* La sección visible manda sobre el estado activo */
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var link = menu.querySelector('a[href="#' + e.target.id + '"]');
          if (!link) return;
          items.forEach(function (li) { li.classList.remove('is-active'); });
          link.parentElement.classList.add('is-active');
          if (!menu.matches(':hover')) moveMask(link.parentElement);
        });
      }, { rootMargin: '-45% 0px -45% 0px' });

      ['casos', 'areas', 'metodo', 'tecnologia', 'contacto'].forEach(function (id) {
        var s = document.getElementById(id);
        if (s) spy.observe(s);
      });
    }

    /* el ancho de los ítems cambia con el idioma */
    document.addEventListener('ns:lang', function () {
      setTimeout(function () { moveMask(activeItem()); }, 60);
    });

    window.addEventListener('load',   function () { moveMask(activeItem()); });
    window.addEventListener('resize', function () { moveMask(activeItem()); });
    setTimeout(function () { moveMask(activeItem()); }, 300);
  }

  /* ==========================================================
     7 · SLIDER DE CASOS
     ========================================================== */

  var track = $('#casesTrack');

  if (track) {
    var slides = $$('.case', track);
    var idx    = 0;
    var elIdx  = $('#caseIndex');
    var elTot  = $('#caseTotal');

    if (elTot) elTot.textContent = pad(slides.length, 4);

    /* — avance automático —
       Cada caso queda en pantalla el tiempo suficiente para leerlo. Se
       frena si el visitante pasa el mouse por encima, si toca las flechas
       o si la pestaña deja de estar visible: nadie vuelve para encontrar
       que el carrusel siguió corriendo solo. */
    var AUTO   = 3400;   /* tiempo que queda cada caso en pantalla */
    var bar    = $('#caseBar');
    var stage  = $('.cases');
    var timer  = null;
    var hover  = false;

    if (bar) bar.style.setProperty('--auto', AUTO + 'ms');

    /* Se mide en el momento, no con una bandera guardada: así no depende
       de que el observador haya llegado a dispararse. */
    function inView() {
      if (!stage) return true;
      var r = stage.getBoundingClientRect();
      var vis = Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0));
      return r.height > 0 && vis / r.height >= 0.3;
    }

    function stopAuto() {
      clearTimeout(timer);
      timer = null;
      if (bar) bar.classList.remove('is-running');
    }

    function startAuto() {
      stopAuto();
      if (REDUCED || hover || document.hidden || slides.length < 2 || !inView()) return;
      if (bar) {
        void bar.offsetWidth;            /* reinicia la animación de la barra */
        bar.classList.add('is-running');
      }
      timer = setTimeout(function () { go(idx + 1); }, AUTO);
    }

    var go = function (n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      if (elIdx) elIdx.textContent = pad(idx + 1, 4);
      startAuto();
    };

    var next = $('#caseNext');
    var prev = $('#casePrev');
    if (next) next.addEventListener('click', function () { go(idx + 1); });
    if (prev) prev.addEventListener('click', function () { go(idx - 1); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft')  go(idx - 1);
    });

    if (stage) {
      stage.addEventListener('mouseenter', function () { hover = true;  stopAuto(); });
      stage.addEventListener('mouseleave', function () { hover = false; startAuto(); });
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAuto(); else startAuto();
    });

    /* al entrar o salir de pantalla, arranca o frena.
       Con un freno por tiempo, no con requestAnimationFrame: leer una
       posición no necesita esperar al próximo cuadro, y así sigue
       funcionando aunque el navegador esté frenando las animaciones. */
    var last = 0;
    function onScroll() {
      var now = Date.now();
      if (now - last < 150) return;
      last = now;
      if (inView()) { if (!timer) startAuto(); }
      else stopAuto();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    /* deslizar con el dedo */
    var sx = null;
    track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var d = e.changedTouches[0].clientX - sx;
      if (Math.abs(d) > 48) go(idx + (d < 0 ? 1 : -1));
      sx = null;
    }, { passive: true });

    go(0);
  }

  /* ==========================================================
     8 · TABLA DE ÁREAS — la foto que sigue al mouse
     ========================================================== */

  var preview = $('#tablePreview');
  var table   = $('#areasTable');

  if (preview && table && FINE && !REDUCED) {
    var px = 0, py = 0, tx = 0, ty = 0, live = false;

    $$('.row', table).forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        var img = row.dataset.img;
        if (img) {
          preview.style.backgroundImage = "url('" + img + "')";
          preview.classList.add('has-img');
        } else {
          preview.style.backgroundImage = '';
          preview.classList.remove('has-img');
          preview.setAttribute('data-label', row.querySelector('.row__id').textContent);
        }
        preview.classList.add('is-on');
        live = true;
      });
      row.addEventListener('mouseleave', function () {
        preview.classList.remove('is-on');
        live = false;
      });
    });

    table.addEventListener('mousemove', function (e) {
      tx = e.clientX + 148;
      ty = e.clientY;
      /* que no se escape por el borde derecho */
      if (tx > window.innerWidth - 120) tx = e.clientX - 148;
    }, { passive: true });

    (function follow() {
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;
      if (live) { preview.style.top = py + 'px'; preview.style.left = px + 'px'; }
      requestAnimationFrame(follow);
    })();
  }

  /* ==========================================================
     9 · MÉTODO — acordeón de las 6 R
     ========================================================== */

  var steps = $$('#steps .step');

  steps.forEach(function (step) {
    var head = $('.step__head', step);
    if (!head) return;
    head.addEventListener('click', function () {
      var open = step.classList.contains('is-open');
      steps.forEach(function (s) { s.classList.remove('is-open'); });
      if (!open) step.classList.add('is-open');
    });
  });

  /* ==========================================================
     10 · AÑO
     ========================================================== */

  var year = $('#year');
  if (year) year.textContent = pad(new Date().getFullYear(), 4);

})();
