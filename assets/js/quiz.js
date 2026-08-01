/* ============================================================
   NUTRISLIM — motor del test
   Sin dependencias. Una pantalla por área, avance con teclado o
   con el dedo, progreso guardado y resultado que viaja a WhatsApp.
   ============================================================ */

(function () {
  'use strict';

  /* El navegador restaura la posición de scroll después del load y pisa
     cualquier scrollTo nuestro: al refrescar, el test aparecía a media
     página. Siempre arranca en la portada, así que no hay nada que
     restaurar. */
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  } catch (e) {}

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

  function hexA(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n>>16)&255) + ',' + ((n>>8)&255) + ',' + (n&255) + ',' + a.toFixed(2) + ')';
  }

  /* ==========================================================
     EL CUERPO
     Media silueta dibujada de un solo trazo: baja por el perfil,
     rodea la mano, vuelve por la axila, sigue el costado, la
     pierna y sube por la cara interna. Espejada da el cuerpo
     entero sin línea central. Tres medidas —hombro, cintura y
     cadera— cambian según la silueta elegida.
     ========================================================== */

  function bodyPath(kind) {
    var SH, WA, HI;                    /* menor x = más ancho */
    if (kind === 'f')      { SH = 58; WA = 78; HI = 58; }
    else if (kind === 'm') { SH = 50; WA = 71; HI = 66; }
    else                   { SH = 54; WA = 75; HI = 62; }

    return 'M100 12'
      + 'C87 12 79 24 79 40'
      + 'C79 53 86 63 91 67'
      + 'C91 71 91 74 89 78'
      + 'C86 84 78 86 70 90'
      + 'C63 93 ' + (SH+3) + ' 99 ' + SH + ' 107'
      + 'C' + (SH-3) + ' 116 ' + (SH-5) + ' 128 ' + (SH-6) + ' 142'
      + 'C' + (SH-7) + ' 160 ' + (SH-9) + ' 180 ' + (SH-10) + ' 198'
      + 'C' + (SH-11) + ' 210 ' + (SH-12) + ' 222 ' + (SH-12) + ' 231'
      + 'C' + (SH-12) + ' 238 ' + (SH-8) + ' 242 ' + (SH-4) + ' 239'
      + 'C' + (SH-1) + ' 236 ' + (SH+1) + ' 229 ' + (SH+2) + ' 221'
      + 'C' + (SH+4) + ' 204 ' + (SH+6) + ' 186 ' + (SH+8) + ' 170'
      + 'C' + (SH+10) + ' 152 ' + (SH+12) + ' 134 ' + (SH+14) + ' 120'
      + 'C' + (SH+15) + ' 116 ' + (SH+16) + ' 114 ' + (SH+17) + ' 112'
      + 'C' + (WA-2) + ' 130 ' + (WA-1) + ' 152 ' + WA + ' 172'
      + 'C' + (WA+1) + ' 190 ' + (HI+5) + ' 202 ' + (HI+5) + ' 216'
      + 'C' + (HI+2) + ' 230 ' + HI + ' 248 ' + HI + ' 270'
      + 'C' + HI + ' 292 ' + (HI+2) + ' 310 ' + (HI+3) + ' 330'
      + 'C' + (HI+4) + ' 352 ' + (HI+6) + ' 382 ' + (HI+8) + ' 410'
      + 'C' + (HI+8) + ' 422 ' + (HI+10) + ' 430 ' + (HI+16) + ' 430'
      + 'C86 430 94 430 96 428'
      + 'C98 426 97 416 96 404'
      + 'C95 380 94 352 93 326'
      + 'C92 300 94 274 97 252'
      + 'C98 246 99 242 100 238';
  }

  function bodyShape(kind) {
    var d = bodyPath(kind);
    return '<path class="b-line" d="' + d + '"/>'
         + '<path class="b-line" d="' + d + '" transform="translate(200 0) scale(-1 1)"/>';
  }

  /* Dónde se enciende cada una de las 17 áreas, en el orden del test.
     Va por índice, no por nombre: así vale igual en los nueve idiomas. */
  var ZONE = [
    [{x:100,y:180,r:27}],                                            /* O1 digestivo */
    [{x:100,y:150,r:40}],                                            /* O2 peso */
    [{x:100,y:74, r:13}],                                            /* O3 tiroides */
    [{x:100,y:216,r:22}],                                            /* O4 genito-urinario */
    [{x:60,y:104,r:16},{x:140,y:104,r:16},
     {x:78,y:330,r:16},{x:122,y:330,r:16}],                          /* O5 articulaciones */
    [{x:100,y:56, r:12}],                                            /* O6 boca y garganta */
    [{x:94, y:124,r:22}],                                            /* O7 corazón */
    [{x:100,y:60, r:10}],                                            /* O8 dientes */
    [],                                                              /* O9 piel → contorno */
    [{x:80,y:42,r:9},{x:120,y:42,r:9}],                              /* 1O oídos */
    [{x:100,y:46, r:9}],                                             /* 11 nariz */
    [{x:88,y:120,r:19},{x:112,y:120,r:19}],                          /* 12 respiratorio */
    [{x:91,y:35,r:8},{x:109,y:35,r:8}],                              /* 13 ojos */
    [{x:100,y:38, r:26}],                                            /* 14 cabeza */
    [{x:100,y:34, r:34}],                                            /* 15 mente */
    [{x:100,y:200,r:110}],                                           /* 16 energía → todo */
    [{x:100,y:150,r:16}]                                             /* 17 algo más */
  ];

  function bodySVG(kind, id) {
    var grads = '', glows = '', rings = '';
    ZONE.forEach(function (pts, i) {
      if (!pts.length) return;
      var tint = TINT[i % TINT.length], gid = 'g' + id + i;
      grads += '<radialGradient id="' + gid + '">'
             +   '<stop offset="0"   stop-color="' + tint + '" stop-opacity=".95"/>'
             +   '<stop offset=".45" stop-color="' + tint + '" stop-opacity=".55"/>'
             +   '<stop offset=".75" stop-color="' + tint + '" stop-opacity=".18"/>'
             +   '<stop offset="1"   stop-color="' + tint + '" stop-opacity="0"/>'
             + '</radialGradient>';
      pts.forEach(function (p) {
        glows += '<circle class="b-zone" data-a="' + i + '" cx="' + p.x + '" cy="' + p.y
               + '" r="' + (p.r * 1.3) + '" fill="url(#' + gid + ')"/>';
        rings += '<circle class="b-ring" data-a="' + i + '" cx="' + p.x + '" cy="' + p.y
               + '" r="' + (p.r * 0.8) + '" stroke="' + tint + '"/>';
      });
    });
    var sh = bodyShape(kind);
    return '<svg viewBox="0 0 200 470" aria-hidden="true">'
      + '<defs>' + grads + '<clipPath id="c' + id + '">' + sh + '</clipPath></defs>'
      + '<g class="b-base">' + sh + '</g>'
      + '<g clip-path="url(#c' + id + ')">' + glows + '</g>'
      + '<g>' + rings + '</g>'
      + '</svg>';
  }

  /* ── idioma ────────────────────────────────────────────────
     El test está en los mismos nueve idiomas que el sitio.
     Se prueba primero el código completo —«zh-Hant» no se puede
     recortar a dos letras— y recién después el corto. */
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    var saved = null;
    try { saved = localStorage.getItem('ns-lang'); } catch (e) {}
    var want = q || saved || 'en';
    if (window.NS_QUIZ[want]) return want;
    var short = want.slice(0, 2);
    return window.NS_QUIZ[short] ? short : 'en';
  }

  var LANG = pickLang();
  var T    = window.NS_QUIZ[LANG];
  var AREA = T.areas;

  document.documentElement.lang = LANG;

  /* Cirílico, hangul e ideogramas necesitan tipografías propias:
     Fraunces y Space Mono sólo tienen alfabeto latino. Se bajan
     sólo si el idioma elegido las necesita, y una sola vez. */
  var fontsLoaded = {};
  function loadFont() {
    var list = window.NS_LANGS || [];
    var meta = list.filter(function (l) { return l.code === LANG; })[0];
    var fonts = window.NS_FONTS || {};
    if (!meta || !meta.font || fontsLoaded[meta.font] || !fonts[meta.font]) return;
    fontsLoaded[meta.font] = true;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fonts[meta.font];
    document.head.appendChild(link);
  }
  loadFont();

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
    /* No se guarda el idioma: los índices marcados valen igual en los nueve,
       así que el progreso sobrevive a un cambio de idioma. */
    var saved = JSON.parse(localStorage.getItem('ns-quiz') || 'null');
    if (saved && saved.picked && saved.picked.length === AREA.length) {
      picked = saved.picked;
    }
  } catch (e) {}

  function save() {
    try { localStorage.setItem('ns-quiz', JSON.stringify({ picked: picked })); } catch (e) {}
  }

  /* ── textos fijos ─────────────────────────────────────────── */
  function paintStatic() {
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
    $('#bKicker').textContent = T.body.kicker;
    $('#bTitle').textContent  = T.body.title;
    $('#bSub').textContent    = T.body.sub;
    $('#bLegend1').textContent = T.body.legend1;
    $('#bLegend2').textContent = T.body.legend2;
    paintPick();
    document.title = T.intro.kicker + ' — NutriSlim';
  }
  paintStatic();

  /* ── cambio de idioma en vivo ─────────────────────────────────
     Las respuestas no se pierden: las 17 áreas y los 85 síntomas
     están en el mismo orden en los nueve idiomas, así que los
     índices marcados siguen siendo válidos. */
  function markLangUI() {
    var meta = (window.NS_LANGS || []).filter(function (l) { return l.code === LANG; })[0];
    $$('.lang__opt').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.lang === LANG);
      b.setAttribute('aria-current', b.dataset.lang === LANG);
    });
    var code = $('#langCode'), flag = $('#langFlag use');
    if (code && meta) code.textContent = meta.short;
    if (flag) flag.setAttribute('href', '#fl-' + LANG);
  }

  function setLang(code) {
    if (!window.NS_QUIZ[code] || code === LANG) return;
    LANG = code;
    T    = window.NS_QUIZ[LANG];
    AREA = T.areas;
    document.documentElement.lang = LANG;
    loadFont();
    paintStatic();
    markLangUI();

    try { localStorage.setItem('ns-lang', LANG); } catch (e) {}
    var url = new URL(location.href);
    url.searchParams.set('lang', LANG);
    history.replaceState(null, '', url);

    if (step >= 0 && step < AREA.length) render(step);
    else if (step >= AREA.length) finish();
  }

  markLangUI();

  var langBox = $('#lang'), langBtn = $('#langToggle');
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
  $$('.lang__opt').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); closeLang(); });
  });

  /* ── el cuerpo: elección y pintado ────────────────────────── */
  var kind = 'n';
  try { kind = localStorage.getItem('ns-body') || 'n'; } catch (e) {}

  function buildBodies() {
    $('#bodyA').innerHTML = bodySVG(kind, 'A');
    $('#bodyB').innerHTML = bodySVG(kind, 'B');
  }

  function paintBody(host, upto, pop) {
    var svg = $('svg', host); if (!svg) return;
    var base = $('.b-base', svg);

    AREA.forEach(function (a, i) {
      if (upto !== undefined && i > upto) return;
      var n = picked[i].length, ratio = n / a.items.length;
      var tint = TINT[i % TINT.length];

      if (!ZONE[i] || !ZONE[i].length) {          /* la piel tiñe el contorno */
        $$('.b-line', base).forEach(function (pt) {
          pt.style.stroke = n ? hexA(tint, 0.42 + ratio * 0.34) : '';
          pt.style.fill   = n ? hexA(tint, 0.05 + ratio * 0.07) : '';
        });
        return;
      }

      $$('.b-zone[data-a="' + i + '"]', svg).forEach(function (c) {
        c.style.setProperty('--lvl', (n ? 0.28 + 0.55 * ratio : 0).toFixed(2));
        c.classList.toggle('is-on', n > 0);
      });

      if (pop === i && n > 0) {
        $$('.b-zone[data-a="' + i + '"], .b-ring[data-a="' + i + '"]', svg).forEach(function (el) {
          el.classList.remove('pop'); void el.getBoundingClientRect(); el.classList.add('pop');
        });
      }
    });
  }

  function paintPick() {
    var box = $('#bPick'); if (!box) return;
    box.innerHTML = '';
    [['f', T.body.f], ['m', T.body.m], ['n', T.body.n]].forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'bpick__b' + (kind === o[0] ? ' is-on' : '');
      b.dataset.cursor = T.intro.start;
      b.innerHTML = '<svg viewBox="0 0 200 470" aria-hidden="true"><g class="b-base">'
                  + bodyShape(o[0]) + '</g></svg><span>' + o[1] + '</span>';
      b.addEventListener('click', function () {
        kind = o[0];
        try { localStorage.setItem('ns-body', kind); } catch (e) {}
        $$('.bpick__b').forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        buildBodies();
        setTimeout(function () { go(0); }, 280);
      });
      box.appendChild(b);
    });
  }

  /* ── pantallas ────────────────────────────────────────────── */
  var screens = { intro: $('#qIntro'), pick: $('#qBodyPick'), stage: $('#qStage'), result: $('#qResult') };

  function show(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].classList.toggle('is-on', k === name);
    });
    window.scrollTo(0, 0);
  }

  /* ── una pregunta ─────────────────────────────────────────── */
  function render(i) {
    /* Cada área es una pantalla nueva: si el visitante bajó a marcar la
       última ficha, la siguiente pregunta tiene que empezar arriba. */
    window.scrollTo(0, 0);
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
        paintBody($('#bodyA'), i, i);     /* respuesta inmediata en el cuerpo */
      });
      box.appendChild(b);
    });

    paintNext(i);
    paintBody($('#bodyA'), i);
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
    /* Plantilla por idioma: el espaciado alrededor de los números no es
       igual en todas las lenguas — el coreano y el chino no llevan espacio
       antes del contador, el francés sí lo lleva antes de los dos puntos. */
    var linea = T.wa.score.replace('{n}', total).replace('{a}', areas);

    var msg = [
      T.wa.line1, '',
      linea,
      top ? T.wa.line5 + ' ' + top : '', '',
      T.wa.line6
    ].filter(Boolean).join('\n');

    $('#rCta').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
    paintBody($('#bodyB'));
  }

  /* ── controles ────────────────────────────────────────────── */
  $('#qStart').addEventListener('click', function () {
    step = -0.5; show('pick'); $('#qbar').classList.add('is-hidden');
  });
  $('#qNext').addEventListener('click',  function () { go(step + 1); });
  $('#qBack').addEventListener('click',  function () {
    if (step === 0) { step = -0.5; show('pick'); $('#qbar').classList.add('is-hidden'); }
    else go(step - 1);
  });
  $('#rAgain').addEventListener('click', function () {
    picked = AREA.map(function () { return []; });
    save(); buildBodies(); go(-1);
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

  buildBodies();
  go(-1);
})();
