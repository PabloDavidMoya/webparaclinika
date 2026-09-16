/* ============================================================
   NUTRISLIM — consentimiento de cookies y píxel de Meta
   ------------------------------------------------------------
   Regla de la casa: hasta que el visitante no acepta, el
   navegador NO abre una sola conexión con Facebook. El script
   de Meta ni siquiera se descarga. Por eso acá no se usa el
   "consent mode" de Meta (que carga el píxel y después le pide
   que no mire): si alguien rechaza, no queremos haberle hecho
   ni el pedido a connect.facebook.net.

   ⚠ NUNCA mandar a Meta nada de lo que el visitante responde en
   el test. Ni el puntaje, ni las áreas marcadas, ni el nombre.
   Son datos de salud: viajan sólo al WhatsApp de la clínica,
   que es donde el paciente eligió mandarlos. Los eventos de
   abajo son señales peladas — "empezó", "terminó", "fue a
   WhatsApp" — sin un solo dato de la persona. Ver README.
   ============================================================ */
(function () {
  'use strict';

  var PIXEL_ID = '296743103251171';   /* Pixel Nutrislim */
  var KEY      = 'ns-consent';        /* 'granted' | 'denied' */
  var KEY_AT   = 'ns-consent-at';     /* cuándo lo decidió, ISO */

  /* Los eventos que ocurren antes de que decida quedan acá. Si
     acepta, se mandan; si rechaza, se tiran. Nada sale antes. */
  var queue = [];
  var ready = false;

  /* ── almacenamiento tolerante ──────────────────────────────
     En modo incógnito o con las cookies bloqueadas, localStorage
     tira excepción al tocarlo. Sin consentimiento guardado el
     banner vuelve a aparecer, que es el lado correcto del error. */
  function get(k)    { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ── idioma ────────────────────────────────────────────────
     Mismo criterio que el resto del sitio: lo que el visitante
     eligió, si no lo que trae el navegador, si no inglés. */
  function lang() {
    var saved = get('ns-lang');
    var dict  = window.NS_I18N || {};
    if (saved && dict[saved]) return saved;

    var want = (navigator.language || 'en').toLowerCase();
    if (dict[want]) return want;

    var base = want.split('-')[0];
    var hit  = Object.keys(dict).filter(function (c) {
      return c.toLowerCase().split('-')[0] === base;
    })[0];
    return hit || 'en';
  }

  /* El inglés no vive en NS_I18N —en el resto del sitio es el
     texto real del HTML—, así que para el banner, que se arma
     por JS, hace de fallback este bloque. */
  var EN = {
    'ck.text'  : 'We use our own cookies and Meta cookies to understand how people reach this site. Nothing you answer in the test is stored or shared.',
    'ck.accept': 'Accept',
    'ck.reject': 'Essential only',
    'ck.more'  : 'Cookie policy',
    'ck.aria'  : 'Cookie notice'
  };

  function t(key) {
    var dict = window.NS_I18N || {};
    var code = lang();
    return (dict[code] && dict[code][key]) || EN[key] || '';
  }

  /* ── el píxel ──────────────────────────────────────────────
     Snippet oficial de Meta, recortado: sin <noscript>, porque
     esa imagen dispara sin pasar por el consentimiento. */
  function loadPixel() {
    if (window.fbq) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return; n=f.fbq=function(){
        n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
      };
      if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[];
      t=b.createElement(e); t.async=!0; t.src=v;
      s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function grant() {
    set(KEY, 'granted');
    set(KEY_AT, new Date().toISOString());
    loadPixel();
    ready = true;
    queue.splice(0).forEach(function (ev) { window.fbq('track', ev); });
  }

  function deny() {
    set(KEY, 'denied');
    set(KEY_AT, new Date().toISOString());
    queue.length = 0;
    ready = false;
  }

  /* ── API pública ───────────────────────────────────────────
     window.nsTrack('Lead'). Si todavía no decidió, espera; si
     dijo que no, se pierde en silencio, que es lo que queremos. */
  window.nsTrack = function (name) {
    if (!name) return;
    if (ready && window.fbq) { window.fbq('track', name); return; }
    if (get(KEY) === 'denied') return;
    if (queue.length < 20) queue.push(name);
  };

  window.nsConsentRevoke = function () {
    deny();
    set(KEY, '');            /* vuelve a "sin decidir" */
    location.reload();
  };

  /* ── el banner ─────────────────────────────────────────────
     Estilos propios e inyectados: el banner tiene que funcionar
     aunque se lo pegue en una página que no cargó quiz.css.
     Los colores salen de las variables del tema, así acompaña
     a bosque, salvia y a los que vengan. */
  function paint() {
    var css = document.createElement('style');
    css.textContent = [
      /* El test corre sobre fondo oscuro y la home sobre crema, así
         que un panel del color del tema desaparece en una de las dos.
         Lo que lo despega en ambas es el borde de acento más una
         sombra franca, no el color de fondo. */
      '.ckbar{position:fixed;z-index:9999;left:1rem;right:1rem;bottom:1rem;',
      'max-width:34rem;margin-inline:auto;padding:1.15rem 1.25rem;',
      'background:rgba(var(--scrim-rgb,18,26,17),.97);',
      'color:var(--light,#f3f1ec);',
      'border:1px solid rgba(var(--accent-rgb,111,128,57),.65);',
      'border-radius:.75rem;box-shadow:0 1rem 3rem rgba(0,0,0,.55);',
      '-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);',
      'font-family:Inter,system-ui,sans-serif;font-size:.875rem;line-height:1.55;',
      'opacity:0;transform:translateY(.75rem);transition:opacity .4s,transform .4s}',
      '.ckbar.is-on{opacity:1;transform:none}',
      '.ckbar p{margin:0 0 .9rem;color:var(--light,#f3f1ec);opacity:.92}',
      '.ckbar a{color:var(--lime,#a9c04f);text-underline-offset:.2em}',
      '.ckbar__row{display:flex;gap:.5rem;flex-wrap:wrap}',
      '.ckbar button{flex:1 1 auto;min-width:8rem;cursor:pointer;',
      'padding:.6rem 1rem;border-radius:.4rem;font:inherit;font-weight:500;',
      'border:1px solid var(--lime,#a9c04f);background:transparent;color:var(--lime,#a9c04f)}',
      '.ckbar button.is-primary{background:var(--lime,#a9c04f);color:#121a11;border-color:var(--lime,#a9c04f)}',
      '.ckbar button:focus-visible{outline:2px solid var(--light,#f3f1ec);outline-offset:2px}',
      '@media (prefers-reduced-motion:reduce){.ckbar{transition:none}}'
    ].join('');
    document.head.appendChild(css);

    var bar = document.createElement('aside');
    bar.className = 'ckbar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', t('ck.aria') || 'Cookies');

    var p = document.createElement('p');
    p.textContent = t('ck.text') + ' ';
    var a = document.createElement('a');
    a.href = 'cookies.html';
    a.textContent = t('ck.more');
    p.appendChild(a);

    var row = document.createElement('div');
    row.className = 'ckbar__row';

    var no = document.createElement('button');
    no.type = 'button';
    no.textContent = t('ck.reject');

    var si = document.createElement('button');
    si.type = 'button';
    si.className = 'is-primary';
    si.textContent = t('ck.accept');

    function close() {
      bar.classList.remove('is-on');
      setTimeout(function () { bar.remove(); }, 400);
    }
    no.addEventListener('click', function () { deny();  close(); });
    si.addEventListener('click', function () { grant(); close(); });

    row.appendChild(no);
    row.appendChild(si);
    bar.appendChild(p);
    bar.appendChild(row);
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add('is-on'); });
  }

  /* ── arranque ──────────────────────────────────────────────
     Ya decidido: se respeta y no se molesta más. Sin decidir:
     el banner espera a que el DOM exista. */
  var saved = get(KEY);
  if (saved === 'granted') { grant(); return; }
  if (saved === 'denied')  { return; }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint);
  } else {
    paint();
  }
})();
