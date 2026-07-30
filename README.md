# NutriSlim — sitio web

Sitio estático de una sola página para **Policlínica NutriSlim** (Asunción, Paraguay).
Sin dependencias, sin build, sin framework: se abre `index.html` y funciona.

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
index.html
assets/
  css/style.css     ← sistema de diseño completo, comentado por secciones
  js/app.js         ← telón, cursor, dock, slider, tabla, acordeón
  img/              ← acá van las fotos reales
```

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
