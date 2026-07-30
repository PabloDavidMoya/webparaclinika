# NutriSlim — sitio web

Sitio estático de una sola página para **Policlínica NutriSlim** (Asunción, Paraguay).
Sin dependencias, sin build, sin framework: se abre `index.html` y funciona.

**Inglés por defecto**, con selector a español en la barra de navegación.

---

## Ver el sitio

Doble clic en `index.html`, o para servirlo localmente:

```bash
python -m http.server 8000
# después: http://localhost:8000
```

## Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "NutriSlim — primera versión"
gh repo create nutrislim-web --public --source=. --push
```

Después, en el repo: **Settings → Pages → Source: `main` / root**.
Queda en `https://<usuario>.github.io/nutrislim-web/`.

---

## Estructura

```
index.html          ← contenido en INGLÉS, como texto real
assets/
  css/style.css     ← sistema de diseño completo, comentado por secciones
  js/i18n.js        ← diccionario español (sólo lo que cambia)
  js/app.js         ← idioma, telón, cursor, dock, slider, tabla, acordeón
  img/              ← acá van las fotos reales
```

---

## Idiomas

El **inglés vive dentro del HTML como texto real**, no en el JavaScript.
Eso importa por dos razones: si el JS falla o tarda, la página igual se ve
completa; y Google indexa el inglés directamente del HTML, sin depender de
que ejecute scripts.

`assets/js/i18n.js` contiene **sólo el español** — lo que cambia cuando el
visitante toca `ES`. Cada elemento traducible lleva una clave:

```html
<p data-i18n="hero.eyebrow">Reset-Your-Metabolism®</p>
```

También se traducen atributos:

| Atributo | Para qué |
|---|---|
| `data-i18n` | el contenido del elemento (acepta HTML, ej. `<em>`) |
| `data-i18n-label` | la etiqueta de los espacios de foto |
| `data-i18n-cursor` | el texto que aparece dentro del cursor |

El idioma elegido se guarda en `localStorage` y queda en la URL (`?lang=es`),
así se puede compartir un enlace directo a la versión en español.

**Para agregar portugués**: duplicar el bloque `es` de `i18n.js` como `pt`,
traducir los valores, y sumar el botón en el dock:

```html
<span class="lang__sep">/</span>
<button class="lang__btn" data-lang="pt" lang="pt">PT</button>
```

**Detección automática del navegador**: está desactivada a propósito, para que
la primera impresión sea siempre en inglés. Para activarla, poner `AUTO = true`
en `app.js` (sección 2).

### Cuando el sitio crezca

Este esquema es el correcto para una página. Cuando haya varias páginas y se
empiece a pelear posicionamiento en Google en inglés y en español, conviene
pasar a **URLs separadas** (`/en/` y `/es/`) generadas desde este mismo
diccionario. Los `hreflang` del `<head>` ya están puestos y sólo habría que
apuntarlos a las nuevas rutas.

---

## Cómo poner las fotos

Todos los espacios de imagen son `.media` con una etiqueta que dice qué va ahí.
Para colocar una foto, se agrega la variable `--img` en el propio elemento:

```html
<figure class="hero__media media" style="--img:url('assets/img/consultorio.jpg')"></figure>
```

La etiqueta gris desaparece sola cuando hay imagen. No hay que tocar el CSS.

En la tabla de áreas, cada fila acepta su propia foto en el atributo `data-img`:

```html
<a class="row" href="#contacto" data-img="assets/img/tiroides.jpg" data-cursor="Ver">
```

**Fotos recomendadas** (todas horizontales salvo donde se indique):

| Ubicación | Qué va | Proporción sugerida |
|---|---|---|
| Hero | Consultorio o la Dra. Lilian, plano amplio | 16:9 |
| Casos (×4) | Retrato de cada paciente | 4:5 |
| Método | Momento de consulta, manos, detalle | 4:5 vertical |
| Áreas (×6) | Una imagen por área | 3:4 vertical |

---

## Sistema de diseño

**Color** — cuatro, nada más:

| Variable | Valor | Uso |
|---|---|---|
| `--bg` | `#f3f1ec` | fondo dominante |
| `--dark` | `#1a2418` | tinta (verde carbón, nunca negro puro) |
| `--overlay` | `#121a11` | secciones invertidas |
| `--olive` | `#6f8039` | único acento |
| `--lime` | `#a9c04f` | acento vivo, uso mínimo sobre fondo oscuro |
| `--sand` | `#c7bfae` | arena |

**Tipografía** — tres familias, tres trabajos:

- `Fraunces` — titulares, con cursivas dentro de la misma frase para acentuar
- `Inter` — cuerpo de texto
- `Space Mono` — etiquetas, numeración, datos clínicos, coordenadas

**Detalle**: los números usan la letra `O` en lugar del cero (`2O26`, `OOO1 / OOO4`).
Es deliberado, no un error. Está en `pad()` dentro de `app.js`.

**Movimiento**: todo usa `--expoOut: cubic-bezier(.16,1,.3,1)`.

---

## ⚠️ Textos pendientes de validación médica

Estos bloques están escritos como maqueta y **tienen que ser confirmados o
reescritos por la Dra. Lilian antes de publicar**:

- **Las 6 R** (sección Método). Las cinco primeras son las estándar de la medicina
  funcional (Remover, Reemplazar, Reinocular, Reparar, Reequilibrar). La sexta,
  "Reeducar — la R de NutriSlim", es una interpretación a partir del propio lema de
  la clínica ("no medicación sino educación"). **Hay que confirmar cuál es realmente
  la sexta R y qué dice cada una.**
- **Ficha del OligoCheck** (cantidad de minerales, duración del escaneo). Son valores
  de referencia; hay que reemplazarlos por los reales del equipo.
- **Caso de Carmen Ortellado**: falta el cierre de la historia.
- Todos los testimonios necesitan **autorización firmada del paciente** antes de
  publicarse, sobre todo el de un menor de edad.

## Criterio de comunicación

Todo el texto habla de **evaluar, acompañar y encontrar la causa**.
Nunca de curar ni de garantizar resultados.

No es solo una cuestión legal: en Estados Unidos (FTC/FDA) y en Europa
(Reglamento CE 1924/2006) las afirmaciones de curación hacen que Meta y Google
rechacen los anuncios. Y en salud, la confianza es el activo — una promesa
exagerada la destruye más rápido de lo que cualquier campaña la construye.

Si se agrega texto nuevo, tiene que respetar ese criterio.
