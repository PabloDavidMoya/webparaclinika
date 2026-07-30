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
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    }

    walk(el);
  }

  $$('.split').forEach(split);

  /* ==========================================================
     2 · REVELADOS al entrar en pantalla
     ========================================================== */

  var targets = $$('.reveal, .split');
  targets.forEach(function (el) {
    if (el.dataset.delay) el.style.setProperty('--d', el.dataset.delay);
  });

  if (REDUCED || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
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
     3 · TELÓN DE APERTURA
     Nunca espera a los assets: dura lo que dura y se corre.
     En la segunda visita de la sesión, no aparece.
     ========================================================== */

  var loader = $('#loader');
  var dock   = $('#dock');

  function openDock() { if (dock) dock.classList.add('is-in'); }

  function skipLoader() {
    document.documentElement.classList.remove('is-loading');
    if (loader) loader.classList.add('is-gone');
    openDock();
  }

  if (!loader || REDUCED || sessionStorage.getItem('ns-seen')) {
    skipLoader();
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
    }, DUR + 180);
  }

  /* ==========================================================
     4 · CURSOR
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
     5 · DOCK — la máscara que se desliza
     ========================================================== */

  var menu = $('#dockMenu');
  var mask = $('#dockMask');

  if (menu && mask) {
    var items = $$('.dock__item', menu);

    function moveMask(li) {
      if (!li) { mask.style.opacity = '0'; return; }
      var a = li.querySelector('a') || li;
      mask.style.opacity   = '1';
      mask.style.width     = a.offsetWidth + 'px';
      mask.style.transform = 'translateX(' + (a.offsetLeft) + 'px)';
    }

    function activeItem() {
      return items.find(function (li) { return li.classList.contains('is-active'); });
    }

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

    window.addEventListener('load',   function () { moveMask(activeItem()); });
    window.addEventListener('resize', function () { moveMask(activeItem()); });
    setTimeout(function () { moveMask(activeItem()); }, 300);
  }

  /* ==========================================================
     6 · SLIDER DE CASOS
     ========================================================== */

  var track = $('#casesTrack');

  if (track) {
    var slides = $$('.case', track);
    var idx    = 0;
    var elIdx  = $('#caseIndex');
    var elTot  = $('#caseTotal');

    if (elTot) elTot.textContent = pad(slides.length, 4);

    function go(n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      if (elIdx) elIdx.textContent = pad(idx + 1, 4);
    }

    var next = $('#caseNext');
    var prev = $('#casePrev');
    if (next) next.addEventListener('click', function () { go(idx + 1); });
    if (prev) prev.addEventListener('click', function () { go(idx - 1); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft')  go(idx - 1);
    });

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
     7 · TABLA DE ÁREAS — la foto que sigue al mouse
     ========================================================== */

  var preview = $('#tablePreview');
  var table   = $('#areasTable');

  if (preview && table && FINE && !REDUCED) {
    var px = 0, py = 0, tx = 0, ty = 0, live = false;

    $$('.row', table).forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        var img = row.dataset.img;
        if (img) {
          preview.style.setProperty('--img', "url('" + img + "')");
          preview.removeAttribute('data-label');
        } else {
          preview.style.removeProperty('--img');
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
      tx = e.clientX + 190;
      ty = e.clientY;
      /* que no se escape por el borde derecho */
      if (tx > window.innerWidth - 170) tx = e.clientX - 190;
    }, { passive: true });

    (function follow() {
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;
      if (live) preview.style.top = py + 'px', preview.style.left = px + 'px';
      requestAnimationFrame(follow);
    })();
  }

  /* ==========================================================
     8 · MÉTODO — acordeón de las 6 R
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
     9 · AÑO
     ========================================================== */

  var year = $('#year');
  if (year) year.textContent = pad(new Date().getFullYear(), 4);

})();
