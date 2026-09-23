/**
 * Widget de chat de Amy. Habla directo con el motor de amy-agent por HTTP,
 * sin pasar por WhatsApp/Meta — por eso puede estar activo aunque el número
 * de producción todavía no exista.
 *
 * Configuración vía `window.AMY_CONFIG` antes de este script:
 *   { apiBase: "https://mary-agent-vrba.onrender.com", cliente: "nutrislim" }
 */
(function () {
  "use strict";

  var CONFIG = window.AMY_CONFIG || {};
  var API_BASE = (CONFIG.apiBase || "").replace(/\/$/, "");
  var CLIENTE = CONFIG.cliente || "";
  if (!API_BASE || !CLIENTE) {
    console.warn("[amy-widget] Falta AMY_CONFIG.apiBase o AMY_CONFIG.cliente; el widget no se activa.");
    return;
  }

  var CLAVE_SESION = "amy_sesion_id";
  var CLAVE_HISTORIAL = "amy_historial_" + CLIENTE;

  function idSesion() {
    try {
      var existente = localStorage.getItem(CLAVE_SESION);
      if (existente) return existente;
      var nuevo = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2))
        .replace(/-/g, "");
      localStorage.setItem(CLAVE_SESION, nuevo);
      return nuevo;
    } catch (e) {
      // localStorage bloqueado (navegación privada): la sesión no persiste
      // entre recargas, pero el chat funciona igual durante la visita.
      return "temp" + Date.now();
    }
  }

  function leerHistorialLocal() {
    try {
      return JSON.parse(sessionStorage.getItem(CLAVE_HISTORIAL) || "[]");
    } catch (e) {
      return [];
    }
  }

  function guardarHistorialLocal(turnos) {
    try {
      sessionStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(turnos.slice(-40)));
    } catch (e) {
      /* sin espacio o bloqueado: no es crítico, se pierde solo el repintado */
    }
  }

  var sesionId = idSesion();

  // Despierta el servidor (Render free duerme a los 15 min de inactividad)
  // antes de que la persona llegue a abrir el chat, para que no le toque
  // esperar 30-50s en el primer mensaje.
  fetch(API_BASE + "/", { mode: "cors" }).catch(function () {});

  var raiz = document.createElement("div");
  raiz.innerHTML =
    '<button class="amy-boton" type="button" aria-label="Abrir chat con Amy" data-abierto="false">' +
    '  <img class="amy-boton__ojo" src="assets/img/amy-ojo.webp" alt="" aria-hidden="true">' +
    '  <span class="amy-boton__cerrar">' +
    '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
    "  </span>" +
    "</button>" +
    '<section class="amy-panel" data-abierto="false" aria-hidden="true">' +
    '  <header class="amy-panel__header">' +
    '    <div class="amy-panel__avatar">A</div>' +
    "    <div>" +
    '      <div class="amy-panel__titulo">Amy</div>' +
    '      <div class="amy-panel__subtitulo">Policlínica NutriSlim</div>' +
    "    </div>" +
    "  </header>" +
    '  <div class="amy-panel__mensajes" role="log" aria-live="polite"></div>' +
    '  <form class="amy-panel__form">' +
    '    <textarea class="amy-panel__input" rows="1" placeholder="Escribí tu consulta…" aria-label="Tu mensaje"></textarea>' +
    '    <button class="amy-panel__enviar" type="submit" aria-label="Enviar">' +
    '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>' +
    "    </button>" +
    "  </form>" +
    "</section>";
  document.body.appendChild(raiz);

  var boton = raiz.querySelector(".amy-boton");
  var panel = raiz.querySelector(".amy-panel");
  var listaMensajes = raiz.querySelector(".amy-panel__mensajes");
  var form = raiz.querySelector(".amy-panel__form");
  var input = raiz.querySelector(".amy-panel__input");
  var botonEnviar = raiz.querySelector(".amy-panel__enviar");

  var abierto = false;
  var yaAbrioUnaVez = false;

  function pintarBurbuja(texto, rol) {
    var burbuja = document.createElement("div");
    burbuja.className = "amy-burbuja amy-burbuja--" + (rol === "assistant" ? "amy" : "yo");
    burbuja.textContent = texto;
    listaMensajes.appendChild(burbuja);
    listaMensajes.scrollTop = listaMensajes.scrollHeight;
  }

  function mostrarEscribiendo() {
    var aviso = document.createElement("div");
    aviso.className = "amy-escribiendo";
    aviso.innerHTML = "<span></span><span></span><span></span>";
    aviso.dataset.aviso = "escribiendo";
    listaMensajes.appendChild(aviso);
    listaMensajes.scrollTop = listaMensajes.scrollHeight;
    return aviso;
  }

  function alternarPanel(mostrar, enfocar) {
    abierto = mostrar;
    boton.dataset.abierto = String(mostrar);
    panel.dataset.abierto = String(mostrar);
    panel.setAttribute("aria-hidden", String(!mostrar));
    if (mostrar) {
      if (enfocar !== false) input.focus();
      if (!yaAbrioUnaVez) {
        yaAbrioUnaVez = true;
        var previos = leerHistorialLocal();
        if (previos.length) {
          previos.forEach(function (t) {
            pintarBurbuja(t.content, t.role);
          });
        } else {
          pintarBurbuja(
            "Hola, soy Amy 🙂 Contame qué te gustaría saber o directamente decime qué síntoma te preocupa.",
            "assistant"
          );
        }
      }
    }
  }

  boton.addEventListener("click", function () {
    alternarPanel(!abierto);
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && abierto) alternarPanel(false);
  });

  input.addEventListener("input", function () {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 90) + "px";
  });

  input.addEventListener("keydown", function (evento) {
    // La página puede tener sus propios atajos de teclado (el test de salud
    // avanza con Enter/flechas, por ejemplo). Lo que se escribe acá es texto
    // del chat, nunca un atajo de la página — frenamos la propagación entera,
    // no solo el Enter, así ninguna tecla se le escapa al resto del sitio.
    evento.stopPropagation();
    if (evento.key === "Enter" && !evento.shiftKey) {
      evento.preventDefault();
      form.requestSubmit();
    }
  });

  var enviando = false;

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var texto = input.value.trim();
    if (!texto || enviando) return;

    enviando = true;
    botonEnviar.disabled = true;
    input.value = "";
    input.style.height = "auto";

    pintarBurbuja(texto, "user");
    var historial = leerHistorialLocal();
    historial.push({ role: "user", content: texto });
    guardarHistorialLocal(historial);

    var aviso = mostrarEscribiendo();

    fetch(API_BASE + "/chat/web/" + encodeURIComponent(CLIENTE), {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje: texto, sesion_id: sesionId }),
    })
      .then(function (respuesta) {
        return respuesta.json().catch(function () {
          return {};
        });
      })
      .then(function (datos) {
        aviso.remove();
        var respuestas =
          datos && Array.isArray(datos.respuestas) && datos.respuestas.length
            ? datos.respuestas
            : ["Perdona, no te llegué a entender. ¿Me lo repetís?"];

        respuestas.forEach(function (texto, i) {
          setTimeout(function () {
            pintarBurbuja(texto, "assistant");
            var h = leerHistorialLocal();
            h.push({ role: "assistant", content: texto });
            guardarHistorialLocal(h);
          }, i * 500);
        });
      })
      .catch(function () {
        aviso.remove();
        pintarBurbuja(
          "Perdona, no me pude conectar ahora mismo. ¿Probás de nuevo en un momento, o nos escribís por WhatsApp?",
          "assistant"
        );
      })
      .finally(function () {
        enviando = false;
        botonEnviar.disabled = false;
      });
  });

  // ── Amy se presenta sola al terminar el test de salud (test.html) ──
  // No le pide nada al modelo: el texto sale de una plantilla local, igual
  // que la plantilla de apertura de WhatsApp. Solo queda "recordado" en el
  // historial del servidor para que, si la persona contesta, Amy sepa de
  // qué le está hablando.
  // Junta hasta `limite` áreas en una frase ("tiroides (4) y digestión (3)").
  // Van con el conteo real: eso es lo que después le permite a Amy contestar
  // con soltura si le preguntan "¿y por qué tiroides?" sin inventar nada —
  // este mismo texto queda sembrado como su primer mensaje.
  function listaAreas(areas, limite) {
    var top = areas.slice(0, limite || 3).map(function (a) {
      return a.nombre.toLowerCase() + " (" + a.marcados + ")";
    });
    if (top.length <= 1) return top.join("");
    return top.slice(0, -1).join(", ") + " y " + top[top.length - 1];
  }

  function textoAperturaTest(detalle) {
    var nombre = (detalle.name || "").trim().split(" ")[0];
    var saludo = "¡Hola" + (nombre ? ", " + nombre : "") + "!";
    var areas = Array.isArray(detalle.areas) ? detalle.areas : [];
    var lista = listaAreas(areas, 3) || detalle.top1 || "";
    var resto = areas.length > 3 ? ", entre otras" : "";

    if (!detalle.total) {
      return (
        saludo +
        " Vi que terminaste el test 🙂 No marcaste demasiados síntomas, buena señal. " +
        "Si de todos modos querés que te cuente cómo trabajamos en la clínica, contame."
      );
    }
    if (detalle.band === "high") {
      return (
        saludo +
        " Vi tu resultado — marcaste bastantes síntomas, sobre todo en " + lista + resto + ". " +
        "Quiero ayudarte a entender qué puede estar pasando. ¿Me contás un poco más de cómo te sentís, o vemos directamente cuándo podés venir a la consulta?"
      );
    }
    if (detalle.band === "mid") {
      return (
        saludo +
        " Vi tu resultado — tenés varias señales, principalmente en " + lista + resto + ". " +
        "¿Querés que te cuente cómo trabajamos eso en la consulta, o me contás un poco más primero?"
      );
    }
    return (
      saludo +
      " Tu resultado salió bastante liviano, pero si " + (lista || "algo") + " te viene molestando igual te puedo contar cómo lo revisamos. ¿Te interesa?"
    );
  }

  document.addEventListener("ns:quiz-result", function (evento) {
    var detalle = evento.detail || {};
    var texto = textoAperturaTest(detalle);

    setTimeout(function () {
      if (!yaAbrioUnaVez) {
        yaAbrioUnaVez = true;
        leerHistorialLocal().forEach(function (t) {
          pintarBurbuja(t.content, t.role);
        });
      }
      pintarBurbuja(texto, "assistant");
      var h = leerHistorialLocal();
      h.push({ role: "assistant", content: texto });
      guardarHistorialLocal(h);
      alternarPanel(true, false);

      // Se siembra en el servidor sin llamar al modelo (mismo mecanismo que
      // la plantilla de apertura de WhatsApp). Si falla, no es grave: la
      // burbuja local ya se ve, solo se perdería la continuidad si la
      // persona contesta y el servidor no la tiene registrada.
      fetch(API_BASE + "/chat/web/" + encodeURIComponent(CLIENTE), {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sesion_id: sesionId, apertura: texto }),
      }).catch(function () {});
    }, 1200);
  });
})();
