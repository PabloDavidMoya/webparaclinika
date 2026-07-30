/* ============================================================
   NUTRISLIM — diccionario de idiomas
   ------------------------------------------------------------
   El inglés NO vive acá: vive en el HTML, como texto real.
   Así la página funciona completa y es indexable aunque el JS
   falle o tarde. Este archivo sólo contiene lo que cambia
   cuando el visitante elige otro idioma.

   Para agregar un idioma nuevo (portugués, por ejemplo):
   duplicar el bloque `es` como `pt`, traducir los valores, y
   sumar el botón en el dock:  <button data-lang="pt">PT</button>
   ============================================================ */

window.NS_I18N = {

  es: {

    /* — metadatos del documento — */
    'meta.title': 'NutriSlim — Medicina funcional, metabolismo y longevidad',
    'meta.desc' : 'Medicina ortomolecular y ciencia de la longevidad. No tratamos el síntoma: evaluamos la causa. Asunción, Paraguay. Consultas presenciales y online.',

    /* — navegación — */
    'nav.areas' : 'Áreas',
    'nav.method': 'Método',
    'nav.cases' : 'Casos',
    'nav.tech'  : 'Tecnología',
    'nav.book'  : 'Agendar',

    /* — etiquetas del cursor — */
    'cur.start': 'Empezar',
    'cur.view' : 'Ver',
    'cur.book' : 'Agendar',
    'cur.open' : 'Abrir',
    'cur.prev' : 'Anterior',
    'cur.next' : 'Siguiente',

    /* — espacios de imagen — */
    'ph.hero'    : 'FOTO AMPLIA · CONSULTORIO / DRA. LILIAN',
    'ph.portrait': 'RETRATO · PACIENTE',
    'ph.method'  : 'FOTO · PROCESO DE CONSULTA',

    /* — hero — */
    'hero.eyebrow': 'Resetea-tu-metabolismo®',
    'hero.title'  : 'Una clínica de <em>medicina funcional</em> que no trata el síntoma — investiga <em>por qué</em> tu cuerpo dejó de funcionar.',
    'hero.cta1'   : 'Hacer el test gratuito',
    'hero.cta2'   : 'Conocer el método',
    'hero.m1'     : 'MEDICINA ORTOMOLECULAR',
    'hero.m2'     : 'METABOLISMO',
    'hero.m3'     : 'CIENCIA DE LA LONGEVIDAD',

    /* — casos — */
    'cases.eyebrow'   : 'Casos',
    'cases.disclaimer': 'Testimonios individuales publicados con autorización de cada paciente. Los resultados varían según cada caso. NutriSlim evalúa y acompaña; no reemplaza el tratamiento indicado por el médico tratante.',

    'c1.tag' : 'DIABETES TIPO 1 · 12 AÑOS',
    'c1.text': 'Llegó con registros de glucemia que alcanzaban los 584&nbsp;mg/dL. Durante las primeras semanas de acompañamiento los valores descendieron de forma progresiva y sostenida, con controles documentados por su equipo tratante.',
    'c1.k1'  : 'INGRESO',
    'c1.k2'  : 'INTERMEDIO',
    'c1.k3'  : 'ACTUAL',

    'c2.tag' : 'FERTILIDAD · 29 AÑOS',
    'c2.text': 'Llegó a la clínica como último intento de cumplir su sueño de ser mamá, después de años de estudios que no daban respuesta. Empezó su tratamiento con mucha ilusión y a los dos meses quedó embarazada.',
    'c2.k1'  : 'CONSULTA',
    'c2.v1'  : 'EVALUACIÓN INTEGRAL',
    'c2.k2'  : 'TIEMPO',
    'c2.v2'  : '2 MESES',

    'c3.tag' : 'SÍNTOMAS DIGESTIVOS',
    'c3.text': '«Me siento muchísimo mejor.» Después de identificar sus alimentos agresores y reordenar su alimentación, describe una mejora sostenida en digestión, energía y descanso.',
    'c3.k1'  : 'ENFOQUE',
    'c3.v1'  : 'SENSIBILIDADES ALIMENTARIAS',

    'c4.tag' : 'SALUD HORMONAL',
    'c4.text': '«Volver a vivir con tranquilidad»: su relato después de años conviviendo con síntomas que ningún estudio de rutina lograba explicar.',
    'c4.k1'  : 'ENFOQUE',
    'c4.v1'  : 'EQUILIBRIO HORMONAL',

    /* — áreas — */
    'areas.eyebrow': 'Áreas clínicas',
    'areas.title'  : 'Una misma pregunta<br>en cada especialidad.',
    'areas.th2'    : 'ÁREA',
    'areas.th3'    : 'ENFOQUE',

    'a1.n': 'Metabolismo, obesidad y salud integrativa',
    'a1.d': 'Desequilibrios metabólicos, digestivos, hormonales e inflamatorios',
    'a2.n': 'Tiroides y salud hormonal',
    'a2.d': 'Energía, descanso, temperatura, concentración y estado emocional',
    'a3.n': 'Diabetes y salud metabólica',
    'a3.d': 'Acompañamiento en diabetes tipo 1, tipo 2 y gestacional',
    'a4.n': 'Enfermedades autoinmunes e inflamatorias',
    'a4.d': 'Alimentación y hábitos orientados a reducir la carga inflamatoria',
    'a5.n': 'Salud hormonal femenina',
    'a5.d': 'Menopausia, equilibrio hormonal y envejecimiento saludable',
    'a6.n': 'Salud hormonal masculina y andropausia',
    'a6.d': 'Energía, vitalidad, equilibrio hormonal y longevidad',

    /* — método — */
    'method.eyebrow': 'El método',
    'method.title'  : 'Las 6 R.<br>Cinco de la medicina funcional<br>y <em>una nuestra</em>.',

    'r1.n': 'Remover',
    'r1.t': 'Identificar y retirar los alimentos y factores que el organismo no tolera bien y que sostienen la respuesta inflamatoria.',
    'r2.n': 'Reemplazar',
    'r2.t': 'Reponer lo que hace falta para que la digestión y la absorción de nutrientes vuelvan a funcionar.',
    'r3.n': 'Reinocular',
    'r3.t': 'Recomponer la flora intestinal, donde se aloja cerca del 70&nbsp;% del sistema inmune.',
    'r4.n': 'Reparar',
    'r4.t': 'Acompañar la recuperación de la mucosa intestinal con los nutrientes que el propio cuerpo utiliza.',
    'r5.n': 'Reequilibrar',
    'r5.t': 'Ordenar descanso, estrés y hábitos: el sistema nervioso autónomo gobierna el metabolismo las 24 horas.',
    'r6.n': 'Reeducar <em>— la R de NutriSlim</em>',
    'r6.t': 'Que el paciente entienda su propio cuerpo y pueda sostenerlo sin depender de nosotros. No medicación: educación.',

    /* — tecnología — */
    'tech.eyebrow': 'Tecnología',
    'tech.title'  : 'OligoCheck.<br>Lo que un análisis<br>de rutina <em>no mira</em>.',
    'tech.lead'   : 'Un escaneo no invasivo que evalúa el estado de minerales, el estrés oxidativo y la posible presencia de metales tóxicos. Es el punto de partida que recomendamos: antes de proponer un plan, queremos ver qué está pasando realmente.',
    'tech.cta'    : 'Agendar evaluación',
    'tech.h2'     : 'ESCANEO · NO INVASIVO',
    'tech.p1'     : 'MINERALES',
    'tech.p2'     : 'ESTRÉS OXIDATIVO',
    'tech.p3'     : 'METALES TÓXICOS',
    'tech.p4'     : 'DURACIÓN',
    'tech.p5'     : 'PINCHAZOS',
    'tech.yes1'   : 'SÍ',
    'tech.yes2'   : 'SÍ',
    'tech.dur'    : '~2O MIN',
    'tech.foot'   : 'Herramienta de evaluación complementaria. No constituye diagnóstico por sí sola.',

    /* — cierre — */
    'cta.eyebrow': 'Empezá por acá',
    'cta.title'  : 'El test de salud es <em>gratuito</em> y toma tres minutos.',
    'cta.lead'   : 'Diecisiete áreas del cuerpo, una lista de síntomas y un puntaje. Si supera las diez dolencias, conviene que hablemos.',
    'cta.b1'     : 'Hacer el test',
    'cta.b2'     : 'Escribir por WhatsApp',

    /* — pie — */
    'foot.h1'   : 'Áreas',
    'foot.a1'   : 'Metabolismo y obesidad',
    'foot.a2'   : 'Tiroides',
    'foot.a3'   : 'Diabetes',
    'foot.a4'   : 'Autoinmunes',
    'foot.a5'   : 'Hormonal femenina',
    'foot.a6'   : 'Hormonal masculina',
    'foot.h2'   : 'Clínica',
    'foot.c1'   : 'El método',
    'foot.c2'   : 'Casos',
    'foot.c4'   : 'Agendar',
    'foot.h3'   : 'Contacto',
    'foot.hours': 'Lun a Vie 8:OO–18:OO<br>Sábados 8:OO–13:OO',
    'foot.bar'  : 'MEDICINA ORTOMOLECULAR · LONGEVIDAD'
  }

};
