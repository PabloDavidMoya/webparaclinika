# NutriSlim — sitio web

Sitio estático de una sola página para **Policlínica NutriSlim** (Asunción, Paraguay).
Sin dependencias, sin build, sin framework: se abre `index.html` y funciona.

**Inglés por defecto**, con selector de idioma —y banderita— en la barra de navegación.
Nueve idiomas: inglés, español, portugués, francés, italiano, alemán, ruso,
chino tradicional y coreano.

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

El idioma elegido se guarda en `localStorage` y queda en la URL (`?lang=de`),
así se puede compartir un enlace directo a cualquier versión.

### Las banderas

Están dibujadas a mano en SVG dentro del propio `index.html`, como un sprite de
`<symbol>` al principio del `<body>`. No son emojis (que cambian según el
sistema operativo y en Windows salen en blanco y negro) ni imágenes externas:
se ven idénticas en todos lados y no cuestan una sola petición al servidor.

Para usar una: `<svg class="flag"><use href="#fl-de"></use></svg>`

> La bandera del inglés es la del Reino Unido. Si preferís la de Estados Unidos
> por el mercado al que apuntamos, se cambia sólo el `<symbol id="fl-en">`.

### Tipografías por sistema de escritura

Fraunces y Space Mono **sólo tienen alfabeto latino**. Si no se hiciera nada, el
ruso y el coreano caerían en la fuente por defecto del sistema y el sitio
perdería justamente lo que lo hace ver caro. Por eso:

| Idioma | Titulares | Cuerpo | Monoespaciada |
|---|---|---|---|
| en · es · pt · fr · it · de | Fraunces | Inter | Space Mono |
| ru | Playfair Display | Inter | JetBrains Mono |
| zh-Hant | Noto Serif TC | Noto Sans TC | Noto Sans TC |
| ko | Noto Serif KR | Noto Sans KR | Noto Sans KR |

Se cargan **sólo cuando el visitante elige ese idioma** (`loadFont()` en
`app.js`), así nadie paga el peso de una tipografía que no va a usar.
Los ajustes finos de interletrado y cuerpo están en `style.css`, sección 3-BIS:
el hangul ocupa más alto y no tolera el tracking ancho; el cirílico en
versalitas necesita algo menos de espaciado.

### Agregar otro idioma

1. Duplicar un bloque en `i18n.js` y traducir los valores.
2. Sumarlo a `NS_LANGS` con su código, etiqueta y sigla.
3. Dibujar la bandera como `<symbol id="fl-xx">` en `index.html`.
4. Agregar la opción en `#langMenu` y el `<link rel="alternate" hreflang="xx">`.

Si el idioma usa otro sistema de escritura (árabe, chino, japonés, hebreo),
además hay que sumar sus tipografías a `NS_FONTS` y marcarlo con `font:` en
`NS_LANGS`. **Árabe y hebreo se escriben de derecha a izquierda** y eso no está
resuelto: harían falta ajustes de dirección en todo el layout.

**Detección automática del navegador**: está desactivada a propósito, para que
la primera impresión sea siempre en inglés. Para activarla, poner `AUTO = true`
en `app.js` (sección 2).

### Por qué chino tradicional y no simplificado

El código es `zh-Hant` (chino tradicional, el que se usa en Taiwán), no `zh-Hans`.
No es un detalle técnico, es una decisión de mercado:

- Paraguay es uno de los poquísimos países que mantiene **relaciones diplomáticas
  formales con Taiwán**. Hay comunidad taiwanesa en Asunción, vínculos
  institucionales, y un paciente taiwanés puede efectivamente viajar y llegar a
  la clínica.
- China continental sería otro proyecto entero: **Google está bloqueado**, con lo
  cual las tipografías de este sitio no cargarían y habría que auto-alojarlas;
  y todo el embudo —WhatsApp, Instagram— es invisible allá. Haría falta WeChat,
  Baidu y Xiaohongshu.

> **A tener en cuenta**: en Taiwán la mensajería dominante es **LINE**, no
> WhatsApp. Si el mercado taiwanés se activa de verdad, el botón de contacto de
> esa versión debería apuntar a LINE.

### ⚠ Las traducciones necesitan revisión nativa

Están escritas con criterio, pero es copy médico y hay que hacerlo bien:

- **Alemán**: Alemania tiene la ley de publicidad sanitaria más estricta de
  Europa (Heilmittelwerbegesetz). La diferencia entre *begleiten* (acompañar) y
  *behandeln* (tratar) no es de estilo, es legal.
- **Ruso, chino y coreano**: revisar con un hablante nativo antes de publicar.
  Una preposición mal puesta en un texto de salud destruye la credibilidad que
  el diseño construyó.
- En los seis idiomas se respetó el criterio de **evaluar y acompañar, nunca
  curar ni garantizar**. Si alguien retoca una traducción, tiene que mantenerlo.

### Cuando el sitio crezca

Este esquema es el correcto para una página. Cuando haya varias páginas y se
empiece a pelear posicionamiento en Google en inglés y en español, conviene
pasar a **URLs separadas** (`/en/` y `/es/`) generadas desde este mismo
diccionario. Los `hreflang` del `<head>` ya están puestos y sólo habría que
apuntarlos a las nuevas rutas.

---

## Cómo poner las fotos

Todos los espacios de imagen son `.media` con una etiqueta que dice qué va ahí.
Para colocar una foto se agrega la clase `has-img` y la imagen de fondo:

```html
<figure class="hero__media media has-img"
        style="background-image:url('assets/img/consultorio.jpg'); --pos:center 22%">
</figure>
```

- `has-img` apaga la etiqueta gris y enciende el tratamiento de color.
- `--pos` controla el encuadre (equivale a `background-position`). Como la foto
  se recorta para llenar el espacio, este valor decide qué parte se ve.
  `center 22%` deja aire sobre la cabeza; `center 50%` es el centro exacto.

> **Ojo con las rutas.** No usar una variable CSS para la imagen: Chrome resuelve
> las `url()` que viven dentro de una variable como relativas a la *hoja de
> estilos*, no al documento, y la ruta termina en `assets/css/assets/img/…`.
> Por eso `background-image` va escrito directo en el `style`.

En la tabla de áreas, cada fila acepta su propia foto en el atributo `data-img`:

```html
<a class="row" href="#contacto" data-img="assets/img/tiroides.jpg" data-cursor="Ver">
```

### El tratamiento de color

Toda foto con `has-img` recibe `saturate(.74) contrast(1.04)` más una capa de
oliva a carbón por encima. No es decoración: es lo que hace que fotos de
distintas fuentes —banco de imágenes, cámara del consultorio, celular— se vean
como si pertenecieran al mismo sitio. Sin eso, cada foto trae su propia
temperatura de color y la página se desarma.

Si alguna foto ya viene graduada y no hay que tocarla, se le agrega la clase
`media--raw` y queda tal cual.

**Fotos recomendadas** (todas horizontales salvo donde se indique):

| Ubicación | Qué va | Proporción sugerida |
|---|---|---|
| Hero | Consultorio o la Dra. Lilian, plano amplio | 16:9 |
| Casos (×4) | Retrato de cada paciente | 4:5 |
| Método | Momento de consulta, manos, detalle | 4:5 vertical |
| Áreas (×6) | Una imagen por área | 3:4 vertical |

---

## El test de salud (`test.html`)

Reescritura del cuestionario de la clínica. El original tiene los 84 síntomas
en una sola página y pide nombre, teléfono y email **antes** de empezar.

Acá: **un área por pantalla**, 17 pantallas, chips en vez de casillas, barra de
progreso, avance con teclado (`Enter`, flechas) o deslizando con el dedo, y el
progreso guardado en `localStorage` por si cierran a la mitad.

Tres decisiones que cambian la conversión:

1. **No se piden datos.** Ni al principio ni al final. El resultado se ve
   completo, gratis y sin registrarse.
2. **Se eliminó la opción "Ninguna"** de cada grupo. No marcar nada ya
   significa ninguna: eran 17 decisiones inútiles. El botón lo dice solo —
   si no marcaste nada dice «Nada de esto», si marcaste algo dice «Siguiente».
3. **El resultado viaja a WhatsApp ya escrito.** El botón final abre WhatsApp
   con el puntaje, la cantidad de áreas y las tres donde más marcó. La clínica
   recibe un mensaje con contexto en vez de un «hola, información».

> **No hay backend y es a propósito.** Un formulario que no guarda nada es peor
> que no tenerlo. Cuando haya CRM, se agrega el envío ahí y el enlace de
> WhatsApp queda como segunda vía.

### Idiomas del test

Por ahora **inglés y español**. Los otros siete caen a inglés. Son 84 síntomas
de vocabulario médico por idioma: hay que traducirlos con criterio profesional,
no automáticamente. El contenido está en `assets/js/quiz-data.js` y agregar un
idioma es duplicar el bloque.

### El criterio legal

La pantalla de resultado dice, en el idioma que corresponda, que es una
herramienta de orientación y no un diagnóstico, que no reemplaza la consulta y
que ningún resultado debe usarse para iniciar, suspender ni modificar un
tratamiento. **Ese texto no se saca.**

## La apertura

1. Sube el telón oscuro (1 s).
2. La foto queda **sola en pantalla completa**, con el velo apenas insinuado.
3. A los ~2,6 s el velo termina de bajar y el título entra palabra por palabra.

El tiempo que la foto se sostiene sola se cambia en `app.js`, sección 4:

```js
var HERO_HOLD = REDUCED ? 0 : (seen ? 1100 : 2600);
```

En la segunda visita de la sesión se acorta a 1,1 s — el efecto ya lo vieron y
esperar de nuevo molesta. Con `prefers-reduced-motion` el texto aparece de una.

El encuadre del hero está en `--pos:72% 26%`: corre a la persona hacia la
derecha para dejar la izquierda libre para el texto. El velo (`.hero__scrim`)
son dos degradados cruzados —uno lateral, uno inferior— que garantizan que el
texto se lea sea cual sea la foto que se ponga.

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
