/* ============================================================
   NUTRISLIM — motor del test
   Sin dependencias. Una pantalla por área, avance con teclado o
   con el dedo, progreso guardado y resultado que viaja a WhatsApp.
   ============================================================ */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE    = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var WA = '595991638194';

  /* Un tinte por área. Todos desaturados y de la misma familia: dan
     variedad sin que la pantalla se vuelva un semáforo. */
  var TINT = [
    '#A9C04F', '#C7BFAE', '#C5A059', '#8FB3A8', '#B9A88C', '#C9A08F',
    '#C98A85', '#D7CFC0', '#C4A6B4', '#9FB4C7', '#A8BFA0', '#92B7B3',
    '#BFC79A', '#CDBBA0', '#B3ABC9', '#A7C2B8', '#C7BFAE'
  ];

  function pad(n, len) {
    return String(n).padStart(len || 2, '0').replace(/0/g, 'O');
  }

  /* ── idioma ────────────────────────────────────────────────
     El test existe en inglés y español. Los demás idiomas del
     sitio caen a inglés hasta que se traduzcan los síntomas. */
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    var saved = null;
    try { saved = localStorage.getItem('ns-lang'); } catch (e) {}
    var want = (q || saved || 'en').slice(0, 2);
    return window.NS_QUIZ[want] ? want : 'en';
  }

  var LANG = pickLang();
  var T    = window.NS_QUIZ[LANG];
  var AREA = T.areas;

  document.documentElement.lang = LANG;

  /* la paleta viaja igual que en el resto del sitio */
  (function theme() {
    var q = new URLSearchParams(location.search).get('theme');
    var saved = null;
    try { saved = localStorage.getItem('ns-theme'); } catch (e) {}
    var t = q || saved || 'bosque';
    if (['bosque', 'salvia', 'noche'].indexOf(t) < 0) t = 'bosque';
    document.documentElement.setAttribute('data-theme', t);
  })();

  /* ── estado ───────────────────────────────────────────────── */
  var picked = AREA.map(function () { return []; });   // índices marcados por área
  var step   = -1;                                     // -1 portada, n área, AREA.length resultado

  try {
    var saved = JSON.parse(localStorage.getItem('ns-quiz') || 'null');
    if (saved && saved.lang === LANG && saved.picked && saved.picked.length === AREA.length) {
      picked = saved.picked;
    }
  } catch (e) {}

  function save() {
    try { localStorage.setItem('ns-quiz', JSON.stringify({ lang: LANG, picked: picked })); } catch (e) {}
  }

  /* ── textos fijos ─────────────────────────────────────────── */
  $('#iKicker').textContent = T.intro.kicker;
  $('#iTitle').textContent  = T.intro.title;
  $('#iLead').innerHTML     = T.intro.lead;
  $('#iHonest').textContent = T.intro.honest;
  $('#qStart').textContent  = T.intro.start;
  $('#qOf').textContent     = T.ui.of;
  $('#qTotal').textContent  = pad(AREA.length);
  $('#qBack').textContent   = T.ui.back;
  $('#rKicker').textContent = T.result.kicker;
  $('#rScoreL').textContent = T.result.symptoms;
  $('#rTopLabel').textContent = T.result.top;
  $('#rCta').textContent    = T.result.cta;
  $('#rAgain').textContent  = T.result.again;
  $('#rLegal').textContent  = T.result.legal;
  document.title = T.intro.kicker + ' — NutriSlim';

  /* ── pantallas ────────────────────────────────────────────── */
  var screens = { intro: $('#qIntro'), stage: $('#qStage'), result: $('#qResult') };

  function show(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].classList.toggle('is-on', k === name);
    });
    window.scrollTo(0, 0);
  }

  /* ── una pregunta ─────────────────────────────────────────── */
  function render(i) {
    var a = AREA[i];
    $('#qAreaN').textContent = pad(i + 1, 3);
    $('#qAreaT').textContent = a.n;
    $('#qStep').textContent  = pad(i + 1);
    $('#qbarFill').style.transform = 'scaleX(' + ((i + 1) / AREA.length) + ')';

    /* ícono y color propios del área */
    var tint = TINT[i % TINT.length];
    $('#qStage').style.setProperty('--tint', tint);
    $('#qbarFill').style.background = tint;
    var ico = $('#qAreaI');
    ico.querySelector('use').setAttribute('href', '#a' + (i + 1));
    ico.style.animation = 'none'; void ico.offsetWidth; ico.style.animation = '';

    var box = $('#qChips');
    box.innerHTML = '';
    a.items.forEach(function (label, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'qchip' + (picked[i].indexOf(k) > -1 ? ' is-on' : '');
      b.textContent = label;
      b.addEventListener('click', function () {
        var at = picked[i].indexOf(k);
        if (at > -1) picked[i].splice(at, 1); else picked[i].push(k);
        b.classList.toggle('is-on', at === -1);
        save();
        paintNext(i);
      });
      box.appendChild(b);
    });

    paintNext(i);
    $('#qBack').style.visibility = i === 0 ? 'hidden' : 'visible';
  }

  /* El botón cuenta lo que pasa: si no marcaste nada dice
     "nada de esto", si marcaste algo dice "siguiente". Nunca
     hay que elegir una opción "ninguna". */
  function paintNext(i) {
    var n = picked[i].length;
    var last = i === AREA.length - 1;
    $('#qNext').textContent = last ? T.ui.seeResult : (n ? T.ui.next : T.ui.skip);
  }

  function go(i) {
    step = i;
    if (i < 0)               { show('intro');  $('#qbar').classList.add('is-hidden'); return; }
    if (i >= AREA.length)    { finish(); return; }
    $('#qbar').classList.remove('is-hidden');
    show('stage');
    render(i);
  }

  /* ── resultado ────────────────────────────────────────────── */
  function finish() {
    show('result');
    $('#qbar').classList.add('is-hidden');

    var total = picked.reduce(function (s, p) { return s + p.length; }, 0);
    var areas = picked.filter(function (p) { return p.length; }).length;

    $('#rScore').textContent = pad(total, total > 9 ? 2 : 1);

    var band = total <= 5 ? 'low' : (total <= 10 ? 'mid' : 'high');
    $('#rTitle').textContent = T.result[band];
    $('#rText').textContent  = T.result[band + 'Text'];

    /* barras: cada área, proporción marcada sobre el total del área */
    var rows = AREA.map(function (a, i) {
      return { n: i + 1, name: a.n, hit: picked[i].length, max: a.items.length, tint: TINT[i % TINT.length] };
    }).sort(function (x, y) {
      /* manda la cantidad real. Si ordenara por proporción, un área de
         un solo ítem treparía al primer puesto con un solo clic. */
      return y.hit - x.hit || (y.hit / y.max) - (x.hit / x.max);
    });

    var box = $('#rBars');
    box.innerHTML = '';
    rows.forEach(function (r, k) {
      var el = document.createElement('div');
      el.className = 'rbar' + (r.hit ? '' : ' rbar--zero');
      el.style.setProperty('--w', r.max ? (r.hit / r.max) : 0);
      if (r.hit) el.style.setProperty('--tint', r.tint);
      el.innerHTML =
        '<span class="rbar__n">' + pad(r.n, 3) + '</span>' +
        '<svg class="rbar__i" viewBox="0 0 24 24" aria-hidden="true"><use href="#a' + r.n + '"></use></svg>' +
        '<span class="rbar__t">' + r.name + '<span class="rbar__line"><i></i></span></span>' +
        '<span class="rbar__v">' + (r.hit || '·') + '</span>';
      box.appendChild(el);
      /* se llenan una tras otra, no todas de golpe */
      setTimeout(function () { el.classList.add('is-in'); }, REDUCED ? 0 : 90 + k * 55);
    });

    /* el puntaje viaja a WhatsApp ya escrito */
    var top = rows.filter(function (r) { return r.hit; }).slice(0, 3)
                  .map(function (r) { return r.name + ' (' + r.hit + ')'; }).join(', ');
    var msg = [
      T.wa.line1, '',
      T.wa.line2 + ' ' + total + ' ' + T.wa.line3 + ' ' + areas + ' ' + T.wa.line4,
      top ? T.wa.line5 + ' ' + top : '', '',
      T.wa.line6
    ].filter(Boolean).join('\n');

    $('#rCta').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }

  /* ── controles ────────────────────────────────────────────── */
  $('#qStart').addEventListener('click', function () { go(0); });
  $('#qNext').addEventListener('click',  function () { go(step + 1); });
  $('#qBack').addEventListener('click',  function () { go(step - 1); });
  $('#rAgain').addEventListener('click', function () {
    picked = AREA.map(function () { return []; });
    save(); go(-1);
  });

  document.addEventListener('keydown', function (e) {
    if (step < 0 && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go(0); return; }
    if (step < 0 || step >= AREA.length) return;
    if (e.key === 'Enter' || e.key === 'ArrowRight') go(step + 1);
    if (e.key === 'ArrowLeft' && step > 0) go(step - 1);
  });

  /* deslizar con el dedo */
  var sx = null;
  document.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (sx === null || step < 0 || step >= AREA.length) return;
    var d = e.changedTouches[0].clientX - sx;
    if (Math.abs(d) > 70) go(step + (d < 0 ? 1 : -1));
    sx = null;
  }, { passive: true });

  /* ── cursor, igual que en el resto del sitio ──────────────── */
  if (FINE && !REDUCED) {
    var cur = $('#cursor'), dot = $('.cursor__dot'), lab = $('.cursor__label');
    var mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY; cur.classList.add('is-on');
    }, { passive: true });
    (function loop() {
      cx += (mx - cx) * 0.19; cy += (my - cy) * 0.19;
      dot.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      lab.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var hit = e.target.closest('[data-cursor]');
      if (hit) { lab.textContent = hit.dataset.cursor; cur.classList.add('is-lg'); }
      else cur.classList.remove('is-lg');
    });
  }

  go(-1);
})();
