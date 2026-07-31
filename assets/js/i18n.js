/* ============================================================
   NUTRISLIM — diccionarios de idioma
   ------------------------------------------------------------
   El inglés NO vive acá: vive en el HTML, como texto real.
   Así la página funciona completa y es indexable aunque el JS
   falle o tarde. Este archivo sólo contiene lo que cambia
   cuando el visitante elige otro idioma.

   Para agregar un idioma: duplicar un bloque, traducir los
   valores, y sumarlo a NS_LANGS de abajo.

   ⚠  Las traducciones a RU y KO son de trabajo. Antes de
      publicar necesitan revisión de un hablante nativo con
      criterio médico. Ver README.
   ============================================================ */

/* Orden y etiquetas del menú de idiomas.
   `font` indica si ese idioma necesita cargar tipografías extra. */
window.NS_LANGS = [
  { code: 'en', label: 'English',   short: 'EN' },
  { code: 'es', label: 'Español',   short: 'ES' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'it', label: 'Italiano',  short: 'IT' },
  { code: 'de', label: 'Deutsch',   short: 'DE' },
  { code: 'ru', label: 'Русский',   short: 'RU', font: 'cyrillic' },
  { code: 'ko', label: '한국어',      short: 'KO', font: 'korean'   }
];

/* Tipografías que hacen falta según el sistema de escritura.
   Se cargan sólo cuando el visitante elige ese idioma. */
window.NS_FONTS = {
  cyrillic: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;700&display=swap',
  korean:   'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600&family=Noto+Sans+KR:wght@300;400;500&display=swap'
};

window.NS_I18N = {

/* ══════════════════════════════════════════════════════ ESPAÑOL */
es: {
  'meta.title': 'NutriSlim — Medicina funcional, metabolismo y longevidad',
  'meta.desc' : 'Medicina ortomolecular y ciencia de la longevidad. No tratamos el síntoma: evaluamos la causa. Asunción, Paraguay. Consultas presenciales y online.',

  'nav.areas':'Áreas', 'nav.method':'Método', 'nav.cases':'Casos', 'nav.tech':'Tecnología', 'nav.book':'Agendar',
  'cur.start':'Empezar', 'cur.view':'Ver', 'cur.book':'Agendar', 'cur.open':'Abrir', 'cur.prev':'Anterior', 'cur.next':'Siguiente',
  'ph.hero':'FOTO AMPLIA · CONSULTORIO / DRA. LILIAN', 'ph.portrait':'RETRATO · PACIENTE', 'ph.method':'FOTO · PROCESO DE CONSULTA',

  'hero.eyebrow':'Resetea-tu-metabolismo®',
  'hero.title'  :'Una clínica de <em>medicina funcional</em> que no trata el síntoma — investiga <em>por qué</em> tu cuerpo dejó de funcionar.',
  'hero.cta1':'Hacer el test gratuito', 'hero.cta2':'Conocer el método',
  'hero.m1':'MEDICINA ORTOMOLECULAR', 'hero.m2':'METABOLISMO', 'hero.m3':'CIENCIA DE LA LONGEVIDAD',

  'cases.eyebrow':'Casos',
  'cases.disclaimer':'Testimonios individuales publicados con autorización de cada paciente. Los resultados varían según cada caso. NutriSlim evalúa y acompaña; no reemplaza el tratamiento indicado por el médico tratante.',
  'c1.tag':'DIABETES TIPO 1 · 12 AÑOS',
  'c1.text':'Llegó con registros de glucemia que alcanzaban los 584&nbsp;mg/dL. Durante las primeras semanas de acompañamiento los valores descendieron de forma progresiva y sostenida, con controles documentados por su equipo tratante.',
  'c1.k1':'INGRESO', 'c1.k2':'INTERMEDIO', 'c1.k3':'ACTUAL',
  'c2.tag':'FERTILIDAD · 29 AÑOS',
  'c2.text':'Llegó a la clínica como último intento de cumplir su sueño de ser mamá, después de años de estudios que no daban respuesta. Empezó su tratamiento con mucha ilusión y a los dos meses quedó embarazada.',
  'c2.k1':'CONSULTA', 'c2.v1':'EVALUACIÓN INTEGRAL', 'c2.k2':'TIEMPO', 'c2.v2':'2 MESES',
  'c3.tag':'SÍNTOMAS DIGESTIVOS',
  'c3.text':'«Me siento muchísimo mejor.» Después de identificar sus alimentos agresores y reordenar su alimentación, describe una mejora sostenida en digestión, energía y descanso.',
  'c3.k1':'ENFOQUE', 'c3.v1':'SENSIBILIDADES ALIMENTARIAS',
  'c4.tag':'SALUD HORMONAL',
  'c4.text':'«Volver a vivir con tranquilidad»: su relato después de años conviviendo con síntomas que ningún estudio de rutina lograba explicar.',
  'c4.k1':'ENFOQUE', 'c4.v1':'EQUILIBRIO HORMONAL',

  'areas.eyebrow':'Áreas clínicas',
  'areas.title':'Una misma pregunta<br>en cada especialidad.',
  'areas.th2':'ÁREA', 'areas.th3':'ENFOQUE',
  'a1.n':'Metabolismo, obesidad y salud integrativa', 'a1.d':'Desequilibrios metabólicos, digestivos, hormonales e inflamatorios',
  'a2.n':'Tiroides y salud hormonal',                 'a2.d':'Energía, descanso, temperatura, concentración y estado emocional',
  'a3.n':'Diabetes y salud metabólica',               'a3.d':'Acompañamiento en diabetes tipo 1, tipo 2 y gestacional',
  'a4.n':'Enfermedades autoinmunes e inflamatorias',  'a4.d':'Alimentación y hábitos orientados a reducir la carga inflamatoria',
  'a5.n':'Salud hormonal femenina',                   'a5.d':'Menopausia, equilibrio hormonal y envejecimiento saludable',
  'a6.n':'Salud hormonal masculina y andropausia',    'a6.d':'Energía, vitalidad, equilibrio hormonal y longevidad',

  'method.eyebrow':'El método',
  'method.title':'Las 6 R.<br>Cinco de la medicina funcional<br>y <em>una nuestra</em>.',
  'r1.n':'Remover',      'r1.t':'Identificar y retirar los alimentos y factores que el organismo no tolera bien y que sostienen la respuesta inflamatoria.',
  'r2.n':'Reemplazar',   'r2.t':'Reponer lo que hace falta para que la digestión y la absorción de nutrientes vuelvan a funcionar.',
  'r3.n':'Reinocular',   'r3.t':'Recomponer la flora intestinal, donde se aloja cerca del 70&nbsp;% del sistema inmune.',
  'r4.n':'Reparar',      'r4.t':'Acompañar la recuperación de la mucosa intestinal con los nutrientes que el propio cuerpo utiliza.',
  'r5.n':'Reequilibrar', 'r5.t':'Ordenar descanso, estrés y hábitos: el sistema nervioso autónomo gobierna el metabolismo las 24 horas.',
  'r6.n':'Reeducar <em>— la R de NutriSlim</em>', 'r6.t':'Que el paciente entienda su propio cuerpo y pueda sostenerlo sin depender de nosotros. No medicación: educación.',

  'tech.eyebrow':'Tecnología',
  'tech.title':'OligoCheck.<br>Lo que un análisis<br>de rutina <em>no mira</em>.',
  'tech.lead':'Un escaneo no invasivo que evalúa el estado de minerales, el estrés oxidativo y la posible presencia de metales tóxicos. Es el punto de partida que recomendamos: antes de proponer un plan, queremos ver qué está pasando realmente.',
  'tech.cta':'Agendar evaluación', 'tech.h2':'ESCANEO · NO INVASIVO',
  'tech.p1':'MINERALES', 'tech.p2':'ESTRÉS OXIDATIVO', 'tech.p3':'METALES TÓXICOS', 'tech.p4':'DURACIÓN', 'tech.p5':'PINCHAZOS',
  'tech.yes1':'SÍ', 'tech.yes2':'SÍ', 'tech.dur':'~2O MIN',
  'tech.foot':'Herramienta de evaluación complementaria. No constituye diagnóstico por sí sola.',

  'cta.eyebrow':'Empezá por acá',
  'cta.title':'El test de salud es <em>gratuito</em> y toma tres minutos.',
  'cta.lead':'Diecisiete áreas del cuerpo, una lista de síntomas y un puntaje. Si supera las diez dolencias, conviene que hablemos.',
  'cta.b1':'Hacer el test', 'cta.b2':'Escribir por WhatsApp',

  'foot.h1':'Áreas', 'foot.a1':'Metabolismo y obesidad', 'foot.a2':'Tiroides', 'foot.a3':'Diabetes',
  'foot.a4':'Autoinmunes', 'foot.a5':'Hormonal femenina', 'foot.a6':'Hormonal masculina',
  'foot.h2':'Clínica', 'foot.c1':'El método', 'foot.c2':'Casos', 'foot.c4':'Agendar',
  'foot.h3':'Contacto', 'foot.hours':'Lun a Vie 8:OO–18:OO<br>Sábados 8:OO–13:OO',
  'foot.bar':'MEDICINA ORTOMOLECULAR · LONGEVIDAD'
},

/* ══════════════════════════════════════════════════ PORTUGUÊS */
pt: {
  'meta.title':'NutriSlim — Medicina funcional, metabolismo e longevidade',
  'meta.desc' :'Medicina ortomolecular e ciência da longevidade. Não tratamos o sintoma: avaliamos a causa. Assunção, Paraguai. Consultas presenciais e online.',

  'nav.areas':'Áreas', 'nav.method':'Método', 'nav.cases':'Casos', 'nav.tech':'Tecnologia', 'nav.book':'Agendar',
  'cur.start':'Começar', 'cur.view':'Ver', 'cur.book':'Agendar', 'cur.open':'Abrir', 'cur.prev':'Anterior', 'cur.next':'Próximo',
  'ph.hero':'FOTO AMPLA · CONSULTÓRIO / DRA. LILIAN', 'ph.portrait':'RETRATO · PACIENTE', 'ph.method':'FOTO · PROCESSO DE CONSULTA',

  'hero.eyebrow':'Reinicie-seu-metabolismo®',
  'hero.title':'Uma clínica de <em>medicina funcional</em> que não trata o sintoma — investiga <em>por que</em> o seu corpo parou de funcionar.',
  'hero.cta1':'Fazer o teste gratuito', 'hero.cta2':'Conhecer o método',
  'hero.m1':'MEDICINA ORTOMOLECULAR', 'hero.m2':'METABOLISMO', 'hero.m3':'CIÊNCIA DA LONGEVIDADE',

  'cases.eyebrow':'Casos',
  'cases.disclaimer':'Depoimentos individuais publicados com autorização de cada paciente. Os resultados variam de caso para caso. A NutriSlim avalia e acompanha; não substitui o tratamento indicado pelo médico responsável.',
  'c1.tag':'DIABETES TIPO 1 · 12 ANOS',
  'c1.text':'Chegou com registros de glicemia que atingiam 584&nbsp;mg/dL. Nas primeiras semanas de acompanhamento os valores caíram de forma progressiva e sustentada, com controles documentados pela sua equipe médica.',
  'c1.k1':'NA CHEGADA', 'c1.k2':'INTERMEDIÁRIO', 'c1.k3':'ATUAL',
  'c2.tag':'FERTILIDADE · 29 ANOS',
  'c2.text':'Chegou à clínica como última tentativa de realizar o sonho de ser mãe, depois de anos de exames que não davam resposta. Começou o tratamento cheia de esperança e dois meses depois engravidou.',
  'c2.k1':'CONSULTA', 'c2.v1':'AVALIAÇÃO INTEGRAL', 'c2.k2':'TEMPO', 'c2.v2':'2 MESES',
  'c3.tag':'SINTOMAS DIGESTIVOS',
  'c3.text':'«Me sinto muito melhor.» Depois de identificar os alimentos que o corpo não tolerava e reorganizar a alimentação, ela descreve uma melhora sustentada na digestão, na energia e no descanso.',
  'c3.k1':'FOCO', 'c3.v1':'SENSIBILIDADES ALIMENTARES',
  'c4.tag':'SAÚDE HORMONAL',
  'c4.text':'«Voltar a viver com tranquilidade»: o relato dela depois de anos convivendo com sintomas que nenhum exame de rotina conseguia explicar.',
  'c4.k1':'FOCO', 'c4.v1':'EQUILÍBRIO HORMONAL',

  'areas.eyebrow':'Áreas clínicas',
  'areas.title':'Uma mesma pergunta<br>em cada especialidade.',
  'areas.th2':'ÁREA', 'areas.th3':'FOCO',
  'a1.n':'Metabolismo, obesidade e saúde integrativa', 'a1.d':'Desequilíbrios metabólicos, digestivos, hormonais e inflamatórios',
  'a2.n':'Tireoide e saúde hormonal',                  'a2.d':'Energia, descanso, temperatura, concentração e estado emocional',
  'a3.n':'Diabetes e saúde metabólica',                'a3.d':'Acompanhamento em diabetes tipo 1, tipo 2 e gestacional',
  'a4.n':'Doenças autoimunes e inflamatórias',         'a4.d':'Alimentação e hábitos voltados a reduzir a carga inflamatória',
  'a5.n':'Saúde hormonal feminina',                    'a5.d':'Menopausa, equilíbrio hormonal e envelhecimento saudável',
  'a6.n':'Saúde hormonal masculina e andropausa',      'a6.d':'Energia, vitalidade, equilíbrio hormonal e longevidade',

  'method.eyebrow':'O método',
  'method.title':'Os 6 R.<br>Cinco da medicina funcional<br>e <em>um nosso</em>.',
  'r1.n':'Remover',      'r1.t':'Identificar e retirar os alimentos e fatores que o organismo não tolera bem e que sustentam a resposta inflamatória.',
  'r2.n':'Repor',        'r2.t':'Repor o que falta para que a digestão e a absorção de nutrientes voltem a funcionar.',
  'r3.n':'Reinocular',   'r3.t':'Recompor a flora intestinal, onde vive cerca de 70&nbsp;% do sistema imune.',
  'r4.n':'Reparar',      'r4.t':'Acompanhar a recuperação da mucosa intestinal com os nutrientes que o próprio corpo utiliza.',
  'r5.n':'Reequilibrar', 'r5.t':'Organizar descanso, estresse e hábitos: o sistema nervoso autônomo governa o metabolismo 24 horas por dia.',
  'r6.n':'Reeducar <em>— o R da NutriSlim</em>', 'r6.t':'Que o paciente entenda o próprio corpo e consiga sustentá-lo sem depender de nós. Não medicação: educação.',

  'tech.eyebrow':'Tecnologia',
  'tech.title':'OligoCheck.<br>O que um exame<br>de rotina <em>não olha</em>.',
  'tech.lead':'Um escaneamento não invasivo que avalia o estado dos minerais, o estresse oxidativo e a possível presença de metais tóxicos. É o ponto de partida que recomendamos: antes de propor um plano, queremos ver o que está realmente acontecendo.',
  'tech.cta':'Agendar avaliação', 'tech.h2':'ESCANEAMENTO · NÃO INVASIVO',
  'tech.p1':'MINERAIS', 'tech.p2':'ESTRESSE OXIDATIVO', 'tech.p3':'METAIS TÓXICOS', 'tech.p4':'DURAÇÃO', 'tech.p5':'AGULHADAS',
  'tech.yes1':'SIM', 'tech.yes2':'SIM', 'tech.dur':'~2O MIN',
  'tech.foot':'Ferramenta de avaliação complementar. Não constitui diagnóstico por si só.',

  'cta.eyebrow':'Comece por aqui',
  'cta.title':'O teste de saúde é <em>gratuito</em> e leva três minutos.',
  'cta.lead':'Dezessete áreas do corpo, uma lista de sintomas e uma pontuação. Se passar de dez queixas, vale a pena conversarmos.',
  'cta.b1':'Fazer o teste', 'cta.b2':'Falar pelo WhatsApp',

  'foot.h1':'Áreas', 'foot.a1':'Metabolismo e obesidade', 'foot.a2':'Tireoide', 'foot.a3':'Diabetes',
  'foot.a4':'Autoimunes', 'foot.a5':'Hormonal feminina', 'foot.a6':'Hormonal masculina',
  'foot.h2':'Clínica', 'foot.c1':'O método', 'foot.c2':'Casos', 'foot.c4':'Agendar',
  'foot.h3':'Contato', 'foot.hours':'Seg a Sex 8:OO–18:OO<br>Sábados 8:OO–13:OO',
  'foot.bar':'MEDICINA ORTOMOLECULAR · LONGEVIDADE'
},

/* ═══════════════════════════════════════════════════ ITALIANO */
it: {
  'meta.title':'NutriSlim — Medicina funzionale, metabolismo e longevità',
  'meta.desc' :'Medicina ortomolecolare e scienza della longevità. Non trattiamo il sintomo: valutiamo la causa. Asunción, Paraguay. Consulti in sede e online.',

  'nav.areas':'Aree', 'nav.method':'Metodo', 'nav.cases':'Casi', 'nav.tech':'Tecnologia', 'nav.book':'Prenota',
  'cur.start':'Inizia', 'cur.view':'Vedi', 'cur.book':'Prenota', 'cur.open':'Apri', 'cur.prev':'Precedente', 'cur.next':'Successivo',
  'ph.hero':'FOTO AMPIA · STUDIO / DOTT.SSA LILIAN', 'ph.portrait':'RITRATTO · PAZIENTE', 'ph.method':'FOTO · PROCESSO DI VISITA',

  'hero.eyebrow':'Resetta-il-tuo-metabolismo®',
  'hero.title':'Una clinica di <em>medicina funzionale</em> che non tratta il sintomo — indaga <em>perché</em> il tuo corpo ha smesso di funzionare.',
  'hero.cta1':'Fai il test gratuito', 'hero.cta2':'Scopri il metodo',
  'hero.m1':'MEDICINA ORTOMOLECOLARE', 'hero.m2':'METABOLISMO', 'hero.m3':'SCIENZA DELLA LONGEVITÀ',

  'cases.eyebrow':'Casi',
  'cases.disclaimer':'Testimonianze individuali pubblicate con l’autorizzazione di ciascun paziente. I risultati variano da caso a caso. NutriSlim valuta e accompagna; non sostituisce il trattamento prescritto dal medico curante.',
  'c1.tag':'DIABETE TIPO 1 · 12 ANNI',
  'c1.text':'È arrivato con valori glicemici che raggiungevano i 584&nbsp;mg/dL. Nelle prime settimane di percorso i valori sono scesi in modo progressivo e costante, con controlli documentati dalla sua équipe medica.',
  'c1.k1':'ALL’ARRIVO', 'c1.k2':'INTERMEDIO', 'c1.k3':'ATTUALE',
  'c2.tag':'FERTILITÀ · 29 ANNI',
  'c2.text':'È arrivata in clinica come ultimo tentativo di realizzare il sogno di diventare mamma, dopo anni di esami senza risposta. Ha iniziato il percorso piena di speranza e due mesi dopo è rimasta incinta.',
  'c2.k1':'VISITA', 'c2.v1':'VALUTAZIONE COMPLETA', 'c2.k2':'TEMPO', 'c2.v2':'2 MESI',
  'c3.tag':'SINTOMI DIGESTIVI',
  'c3.text':'«Mi sento molto meglio.» Dopo aver individuato gli alimenti che il corpo non tollerava e riorganizzato l’alimentazione, racconta un miglioramento costante di digestione, energia e riposo.',
  'c3.k1':'FOCUS', 'c3.v1':'SENSIBILITÀ ALIMENTARI',
  'c4.tag':'SALUTE ORMONALE',
  'c4.text':'«Tornare a vivere serena»: il suo racconto dopo anni di sintomi che nessun esame di routine riusciva a spiegare.',
  'c4.k1':'FOCUS', 'c4.v1':'EQUILIBRIO ORMONALE',

  'areas.eyebrow':'Aree cliniche',
  'areas.title':'Una stessa domanda<br>in ogni specialità.',
  'areas.th2':'AREA', 'areas.th3':'FOCUS',
  'a1.n':'Metabolismo, obesità e salute integrativa', 'a1.d':'Squilibri metabolici, digestivi, ormonali e infiammatori',
  'a2.n':'Tiroide e salute ormonale',                 'a2.d':'Energia, riposo, temperatura, concentrazione e stato emotivo',
  'a3.n':'Diabete e salute metabolica',               'a3.d':'Accompagnamento nel diabete di tipo 1, tipo 2 e gestazionale',
  'a4.n':'Malattie autoimmuni e infiammatorie',       'a4.d':'Alimentazione e abitudini per ridurre il carico infiammatorio',
  'a5.n':'Salute ormonale femminile',                 'a5.d':'Menopausa, equilibrio ormonale e invecchiamento in salute',
  'a6.n':'Salute ormonale maschile e andropausa',     'a6.d':'Energia, vitalità, equilibrio ormonale e longevità',

  'method.eyebrow':'Il metodo',
  'method.title':'Le 6 R.<br>Cinque della medicina funzionale<br>e <em>una nostra</em>.',
  'r1.n':'Rimuovere',     'r1.t':'Individuare ed eliminare gli alimenti e i fattori che l’organismo non tollera bene e che alimentano la risposta infiammatoria.',
  'r2.n':'Reintegrare',   'r2.t':'Ripristinare ciò che manca perché digestione e assorbimento dei nutrienti tornino a funzionare.',
  'r3.n':'Reinoculare',   'r3.t':'Ricostruire la flora intestinale, dove risiede circa il 70&nbsp;% del sistema immunitario.',
  'r4.n':'Riparare',      'r4.t':'Accompagnare il recupero della mucosa intestinale con i nutrienti che il corpo stesso utilizza.',
  'r5.n':'Riequilibrare', 'r5.t':'Rimettere in ordine riposo, stress e abitudini: il sistema nervoso autonomo governa il metabolismo 24 ore su 24.',
  'r6.n':'Rieducare <em>— la R di NutriSlim</em>', 'r6.t':'Che il paziente comprenda il proprio corpo e sappia sostenerlo senza dipendere da noi. Non farmaci: educazione.',

  'tech.eyebrow':'Tecnologia',
  'tech.title':'OligoCheck.<br>Ciò che un esame<br>di routine <em>non guarda</em>.',
  'tech.lead':'Una scansione non invasiva che valuta lo stato dei minerali, lo stress ossidativo e la possibile presenza di metalli tossici. È il punto di partenza che consigliamo: prima di proporre un piano, vogliamo vedere cosa sta davvero succedendo.',
  'tech.cta':'Prenota una valutazione', 'tech.h2':'SCANSIONE · NON INVASIVA',
  'tech.p1':'MINERALI', 'tech.p2':'STRESS OSSIDATIVO', 'tech.p3':'METALLI TOSSICI', 'tech.p4':'DURATA', 'tech.p5':'AGHI',
  'tech.yes1':'SÌ', 'tech.yes2':'SÌ', 'tech.dur':'~2O MIN',
  'tech.foot':'Strumento di valutazione complementare. Da solo non costituisce diagnosi.',

  'cta.eyebrow':'Inizia da qui',
  'cta.title':'Il test di salute è <em>gratuito</em> e richiede tre minuti.',
  'cta.lead':'Diciassette aree del corpo, un elenco di sintomi e un punteggio. Se supera i dieci disturbi, è il caso di parlarne.',
  'cta.b1':'Fai il test', 'cta.b2':'Scrivici su WhatsApp',

  'foot.h1':'Aree', 'foot.a1':'Metabolismo e obesità', 'foot.a2':'Tiroide', 'foot.a3':'Diabete',
  'foot.a4':'Autoimmuni', 'foot.a5':'Ormonale femminile', 'foot.a6':'Ormonale maschile',
  'foot.h2':'Clinica', 'foot.c1':'Il metodo', 'foot.c2':'Casi', 'foot.c4':'Prenota',
  'foot.h3':'Contatti', 'foot.hours':'Lun–Ven 8:OO–18:OO<br>Sabato 8:OO–13:OO',
  'foot.bar':'MEDICINA ORTOMOLECOLARE · LONGEVITÀ'
},

/* ═══════════════════════════════════════════════════ DEUTSCH */
de: {
  'meta.title':'NutriSlim — Funktionelle Medizin, Stoffwechsel und Langlebigkeit',
  'meta.desc' :'Orthomolekulare Medizin und Longevity-Wissenschaft. Wir behandeln nicht das Symptom, sondern beurteilen die Ursache. Asunción, Paraguay. Vor Ort und online.',

  'nav.areas':'Bereiche', 'nav.method':'Methode', 'nav.cases':'Fälle', 'nav.tech':'Technologie', 'nav.book':'Termin',
  'cur.start':'Starten', 'cur.view':'Ansehen', 'cur.book':'Termin', 'cur.open':'Öffnen', 'cur.prev':'Zurück', 'cur.next':'Weiter',
  'ph.hero':'WEITWINKEL · PRAXIS / DR. LILIAN', 'ph.portrait':'PORTRÄT · PATIENT', 'ph.method':'FOTO · SPRECHSTUNDE',

  'hero.eyebrow':'Setz-deinen-Stoffwechsel-zurück®',
  'hero.title':'Eine Praxis für <em>funktionelle Medizin</em>, die nicht das Symptom behandelt — sondern untersucht, <em>warum</em> Ihr Körper nicht mehr funktioniert.',
  'hero.cta1':'Kostenlosen Test machen', 'hero.cta2':'Die Methode ansehen',
  'hero.m1':'ORTHOMOLEKULARE MEDIZIN', 'hero.m2':'STOFFWECHSEL', 'hero.m3':'LONGEVITY-WISSENSCHAFT',

  'cases.eyebrow':'Fälle',
  'cases.disclaimer':'Einzelne Erfahrungsberichte, veröffentlicht mit Einwilligung der jeweiligen Patientin bzw. des Patienten. Die Ergebnisse sind von Fall zu Fall verschieden. NutriSlim beurteilt und begleitet; wir ersetzen keine ärztlich verordnete Behandlung.',
  'c1.tag':'TYP-1-DIABETES · 12 JAHRE',
  'c1.text':'Er kam mit Blutzuckerwerten von bis zu 584&nbsp;mg/dL. In den ersten Wochen der Begleitung gingen die Werte schrittweise und anhaltend zurück, dokumentiert durch sein behandelndes Team.',
  'c1.k1':'BEI ANKUNFT', 'c1.k2':'ZWISCHENWERT', 'c1.k3':'AKTUELL',
  'c2.tag':'KINDERWUNSCH · 29 JAHRE',
  'c2.text':'Sie kam als letzter Versuch, ihren Wunsch nach einem Kind zu erfüllen — nach Jahren von Untersuchungen ohne Antwort. Sie begann voller Hoffnung, und zwei Monate später war sie schwanger.',
  'c2.k1':'BERATUNG', 'c2.v1':'GESAMTBEURTEILUNG', 'c2.k2':'ZEITRAUM', 'c2.v2':'2 MONATE',
  'c3.tag':'VERDAUUNGSBESCHWERDEN',
  'c3.text':'«Mir geht es viel besser.» Nachdem die Lebensmittel erkannt wurden, die ihr Körper nicht verträgt, und die Ernährung neu geordnet war, beschreibt sie eine anhaltende Verbesserung von Verdauung, Energie und Schlaf.',
  'c3.k1':'SCHWERPUNKT', 'c3.v1':'NAHRUNGSMITTELUNVERTRÄGLICHKEITEN',
  'c4.tag':'HORMONGESUNDHEIT',
  'c4.text':'«Wieder ruhig leben»: ihr Bericht nach Jahren mit Beschwerden, die keine Routineuntersuchung erklären konnte.',
  'c4.k1':'SCHWERPUNKT', 'c4.v1':'HORMONELLES GLEICHGEWICHT',

  'areas.eyebrow':'Klinische Bereiche',
  'areas.title':'Dieselbe Frage<br>in jedem Fachgebiet.',
  'areas.th2':'BEREICH', 'areas.th3':'SCHWERPUNKT',
  'a1.n':'Stoffwechsel, Übergewicht und integrative Gesundheit', 'a1.d':'Stoffwechsel-, Verdauungs-, Hormon- und Entzündungsungleichgewichte',
  'a2.n':'Schilddrüse und Hormongesundheit',                     'a2.d':'Energie, Schlaf, Temperatur, Konzentration und Stimmung',
  'a3.n':'Diabetes und Stoffwechselgesundheit',                  'a3.d':'Begleitung bei Typ-1-, Typ-2- und Schwangerschaftsdiabetes',
  'a4.n':'Autoimmun- und entzündliche Erkrankungen',             'a4.d':'Ernährung und Gewohnheiten zur Senkung der Entzündungslast',
  'a5.n':'Hormongesundheit der Frau',                            'a5.d':'Wechseljahre, hormonelles Gleichgewicht und gesundes Altern',
  'a6.n':'Hormongesundheit des Mannes und Andropause',           'a6.d':'Energie, Vitalität, hormonelles Gleichgewicht und Langlebigkeit',

  'method.eyebrow':'Die Methode',
  'method.title':'Die 6 R.<br>Fünf aus der funktionellen Medizin<br>und <em>eines von uns</em>.',
  'r1.n':'Remove — Entfernen',     'r1.t':'Die Lebensmittel und Faktoren erkennen und weglassen, die der Körper schlecht verträgt und die die Entzündungsreaktion aufrechterhalten.',
  'r2.n':'Replace — Ersetzen',     'r2.t':'Wieder zuführen, was fehlt, damit Verdauung und Nährstoffaufnahme wieder funktionieren.',
  'r3.n':'Reinoculate — Besiedeln','r3.t':'Die Darmflora wieder aufbauen, in der rund 70&nbsp;% des Immunsystems sitzen.',
  'r4.n':'Repair — Reparieren',    'r4.t':'Die Erholung der Darmschleimhaut mit den Nährstoffen begleiten, die der Körper selbst verwendet.',
  'r5.n':'Rebalance — Ausgleichen','r5.t':'Schlaf, Stress und Gewohnheiten ordnen: Das autonome Nervensystem steuert den Stoffwechsel rund um die Uhr.',
  'r6.n':'Reeducate <em>— das R von NutriSlim</em>', 'r6.t':'Damit die Patientin oder der Patient den eigenen Körper versteht und ihn ohne uns tragen kann. Keine Medikation: Bildung.',

  'tech.eyebrow':'Technologie',
  'tech.title':'OligoCheck.<br>Worauf ein Routinelabor<br><em>nicht schaut</em>.',
  'tech.lead':'Ein nicht invasiver Scan, der den Mineralstoffstatus, oxidativen Stress und das mögliche Vorliegen toxischer Metalle beurteilt. Das ist der Ausgangspunkt, den wir empfehlen: Bevor wir einen Plan vorschlagen, wollen wir sehen, was tatsächlich vorliegt.',
  'tech.cta':'Beurteilung vereinbaren', 'tech.h2':'SCAN · NICHT INVASIV',
  'tech.p1':'MINERALSTOFFE', 'tech.p2':'OXIDATIVER STRESS', 'tech.p3':'TOXISCHE METALLE', 'tech.p4':'DAUER', 'tech.p5':'NADELN',
  'tech.yes1':'JA', 'tech.yes2':'JA', 'tech.dur':'~2O MIN',
  'tech.foot':'Ergänzendes Beurteilungsinstrument. Für sich allein keine Diagnose.',

  'cta.eyebrow':'Hier beginnen',
  'cta.title':'Der Gesundheitstest ist <em>kostenlos</em> und dauert drei Minuten.',
  'cta.lead':'Siebzehn Körperbereiche, eine Symptomliste und ein Punktwert. Liegt er über zehn Beschwerden, sollten wir sprechen.',
  'cta.b1':'Test machen', 'cta.b2':'Über WhatsApp schreiben',

  'foot.h1':'Bereiche', 'foot.a1':'Stoffwechsel und Übergewicht', 'foot.a2':'Schilddrüse', 'foot.a3':'Diabetes',
  'foot.a4':'Autoimmun', 'foot.a5':'Hormone Frau', 'foot.a6':'Hormone Mann',
  'foot.h2':'Praxis', 'foot.c1':'Die Methode', 'foot.c2':'Fälle', 'foot.c4':'Termin',
  'foot.h3':'Kontakt', 'foot.hours':'Mo–Fr 8:OO–18:OO<br>Samstags 8:OO–13:OO',
  'foot.bar':'ORTHOMOLEKULARE MEDIZIN · LONGEVITY'
},

/* ═══════════════════════════════════════════════════ РУССКИЙ */
ru: {
  'meta.title':'NutriSlim — Функциональная медицина, метаболизм и долголетие',
  'meta.desc' :'Ортомолекулярная медицина и наука о долголетии. Мы не лечим симптом — мы выясняем причину. Асунсьон, Парагвай. Очные и онлайн-консультации.',

  'nav.areas':'Направления', 'nav.method':'Метод', 'nav.cases':'Случаи', 'nav.tech':'Технология', 'nav.book':'Запись',
  'cur.start':'Начать', 'cur.view':'Смотреть', 'cur.book':'Запись', 'cur.open':'Открыть', 'cur.prev':'Назад', 'cur.next':'Далее',
  'ph.hero':'ОБЩИЙ ПЛАН · КЛИНИКА / Д-Р ЛИЛИАН', 'ph.portrait':'ПОРТРЕТ · ПАЦИЕНТ', 'ph.method':'ФОТО · ПРИЁМ',

  'hero.eyebrow':'Перезапусти-свой-метаболизм®',
  'hero.title':'Клиника <em>функциональной медицины</em>, которая лечит не симптом, а выясняет, <em>почему</em> ваш организм перестал работать.',
  'hero.cta1':'Пройти бесплатный тест', 'hero.cta2':'Узнать о методе',
  'hero.m1':'ОРТОМОЛЕКУЛЯРНАЯ МЕДИЦИНА', 'hero.m2':'МЕТАБОЛИЗМ', 'hero.m3':'НАУКА О ДОЛГОЛЕТИИ',

  'cases.eyebrow':'Случаи',
  'cases.disclaimer':'Индивидуальные отзывы, опубликованные с согласия каждого пациента. Результаты различаются в каждом случае. NutriSlim проводит оценку и сопровождение; мы не заменяем лечение, назначенное лечащим врачом.',
  'c1.tag':'ДИАБЕТ 1 ТИПА · 12 ЛЕТ',
  'c1.text':'Обратился с показателями глюкозы, доходившими до 584&nbsp;мг/дл. За первые недели сопровождения значения снижались постепенно и устойчиво, под контролем его лечащей команды.',
  'c1.k1':'ПРИ ОБРАЩЕНИИ', 'c1.k2':'ПРОМЕЖУТОЧНО', 'c1.k3':'СЕЙЧАС',
  'c2.tag':'ФЕРТИЛЬНОСТЬ · 29 ЛЕТ',
  'c2.text':'Пришла в клинику как к последней попытке осуществить мечту стать мамой — после лет обследований, которые не давали ответа. Она начала с надеждой, и через два месяца наступила беременность.',
  'c2.k1':'КОНСУЛЬТАЦИЯ', 'c2.v1':'КОМПЛЕКСНАЯ ОЦЕНКА', 'c2.k2':'СРОК', 'c2.v2':'2 МЕСЯЦА',
  'c3.tag':'СИМПТОМЫ ПИЩЕВАРЕНИЯ',
  'c3.text':'«Мне намного лучше.» После того как были выявлены продукты, которые её организм не переносил, и питание было перестроено, она отмечает устойчивое улучшение пищеварения, энергии и сна.',
  'c3.k1':'ФОКУС', 'c3.v1':'ПИЩЕВАЯ ЧУВСТВИТЕЛЬНОСТЬ',
  'c4.tag':'ГОРМОНАЛЬНОЕ ЗДОРОВЬЕ',
  'c4.text':'«Снова жить спокойно»: её рассказ после лет с симптомами, которые не могло объяснить ни одно рутинное обследование.',
  'c4.k1':'ФОКУС', 'c4.v1':'ГОРМОНАЛЬНЫЙ БАЛАНС',

  'areas.eyebrow':'Клинические направления',
  'areas.title':'Один и тот же вопрос<br>в каждой специальности.',
  'areas.th2':'НАПРАВЛЕНИЕ', 'areas.th3':'ФОКУС',
  'a1.n':'Метаболизм, ожирение и интегративное здоровье', 'a1.d':'Метаболические, пищеварительные, гормональные и воспалительные нарушения',
  'a2.n':'Щитовидная железа и гормональное здоровье',     'a2.d':'Энергия, сон, температура, концентрация и эмоциональное состояние',
  'a3.n':'Диабет и метаболическое здоровье',              'a3.d':'Сопровождение при диабете 1, 2 типа и гестационном',
  'a4.n':'Аутоиммунные и воспалительные заболевания',     'a4.d':'Питание и привычки для снижения воспалительной нагрузки',
  'a5.n':'Женское гормональное здоровье',                 'a5.d':'Менопауза, гормональный баланс и здоровое старение',
  'a6.n':'Мужское гормональное здоровье и андропауза',    'a6.d':'Энергия, жизненный тонус, гормональный баланс и долголетие',

  'method.eyebrow':'Метод',
  'method.title':'Шесть R.<br>Пять из функциональной медицины<br>и <em>одно наше</em>.',
  'r1.n':'Remove — Убрать',        'r1.t':'Выявить и убрать продукты и факторы, которые организм плохо переносит и которые поддерживают воспалительный ответ.',
  'r2.n':'Replace — Восполнить',   'r2.t':'Восполнить недостающее, чтобы пищеварение и усвоение нутриентов снова заработали.',
  'r3.n':'Reinoculate — Заселить', 'r3.t':'Восстановить микрофлору кишечника, где находится около 70&nbsp;% иммунной системы.',
  'r4.n':'Repair — Восстановить',  'r4.t':'Поддержать восстановление слизистой кишечника нутриентами, которые использует сам организм.',
  'r5.n':'Rebalance — Уравновесить','r5.t':'Привести в порядок сон, стресс и привычки: вегетативная нервная система управляет метаболизмом круглосуточно.',
  'r6.n':'Reeducate <em>— R от NutriSlim</em>', 'r6.t':'Чтобы пациент понимал собственный организм и мог поддерживать его без нас. Не лекарства — знание.',

  'tech.eyebrow':'Технология',
  'tech.title':'OligoCheck.<br>То, на что рутинный анализ<br><em>не смотрит</em>.',
  'tech.lead':'Неинвазивное сканирование, оценивающее состояние минералов, окислительный стресс и возможное присутствие токсичных металлов. Это отправная точка, которую мы рекомендуем: прежде чем предлагать план, мы хотим увидеть, что происходит на самом деле.',
  'tech.cta':'Записаться на оценку', 'tech.h2':'СКАНИРОВАНИЕ · НЕИНВАЗИВНО',
  'tech.p1':'МИНЕРАЛЫ', 'tech.p2':'ОКИСЛИТЕЛЬНЫЙ СТРЕСС', 'tech.p3':'ТОКСИЧНЫЕ МЕТАЛЛЫ', 'tech.p4':'ДЛИТЕЛЬНОСТЬ', 'tech.p5':'УКОЛЫ',
  'tech.yes1':'ДА', 'tech.yes2':'ДА', 'tech.dur':'~2O МИН',
  'tech.foot':'Вспомогательный инструмент оценки. Сам по себе не является диагнозом.',

  'cta.eyebrow':'Начните отсюда',
  'cta.title':'Тест здоровья <em>бесплатный</em> и занимает три минуты.',
  'cta.lead':'Семнадцать областей организма, список симптомов и балл. Если он выше десяти жалоб — нам стоит поговорить.',
  'cta.b1':'Пройти тест', 'cta.b2':'Написать в WhatsApp',

  'foot.h1':'Направления', 'foot.a1':'Метаболизм и вес', 'foot.a2':'Щитовидная железа', 'foot.a3':'Диабет',
  'foot.a4':'Аутоиммунные', 'foot.a5':'Женские гормоны', 'foot.a6':'Мужские гормоны',
  'foot.h2':'Клиника', 'foot.c1':'Метод', 'foot.c2':'Случаи', 'foot.c4':'Запись',
  'foot.h3':'Контакты', 'foot.hours':'Пн–Пт 8:OO–18:OO<br>Суббота 8:OO–13:OO',
  'foot.bar':'ОРТОМОЛЕКУЛЯРНАЯ МЕДИЦИНА · ДОЛГОЛЕТИЕ'
},

/* ═══════════════════════════════════════════════════════ 한국어 */
ko: {
  'meta.title':'NutriSlim — 기능의학, 대사 그리고 장수',
  'meta.desc' :'정분자의학과 장수 과학. 증상이 아니라 원인을 평가합니다. 파라과이 아순시온. 대면 및 온라인 진료.',

  'nav.areas':'진료분야', 'nav.method':'방법', 'nav.cases':'사례', 'nav.tech':'기술', 'nav.book':'예약',
  'cur.start':'시작', 'cur.view':'보기', 'cur.book':'예약', 'cur.open':'열기', 'cur.prev':'이전', 'cur.next':'다음',
  'ph.hero':'와이드 컷 · 진료실 / 릴리안 원장', 'ph.portrait':'인물 · 환자', 'ph.method':'사진 · 진료 과정',

  'hero.eyebrow':'대사를-다시-세팅하다®',
  'hero.title':'증상을 치료하는 대신, 몸이 <em>왜</em> 제대로 작동하지 않게 되었는지를 밝히는 <em>기능의학</em> 클리닉입니다.',
  'hero.cta1':'무료 검사 받기', 'hero.cta2':'방법 살펴보기',
  'hero.m1':'정분자의학', 'hero.m2':'대사', 'hero.m3':'장수 과학',

  'cases.eyebrow':'사례',
  'cases.disclaimer':'각 환자의 동의를 받아 게재한 개별 후기입니다. 결과는 사례마다 다릅니다. NutriSlim은 평가하고 동행하며, 주치의가 처방한 치료를 대체하지 않습니다.',
  'c1.tag':'제1형 당뇨 · 12세',
  'c1.text':'혈당 수치가 584&nbsp;mg/dL까지 오른 상태로 내원했습니다. 동행 초기 몇 주 동안 수치는 점진적이고 꾸준하게 내려갔으며, 담당 의료진이 기록으로 확인했습니다.',
  'c1.k1':'내원 시', 'c1.k2':'중간', 'c1.k3':'현재',
  'c2.tag':'난임 · 29세',
  'c2.text':'답을 주지 못한 수년간의 검사 끝에, 엄마가 되고 싶다는 꿈을 위한 마지막 시도로 클리닉을 찾았습니다. 희망을 안고 시작했고 두 달 뒤 임신했습니다.',
  'c2.k1':'상담', 'c2.v1':'종합 평가', 'c2.k2':'기간', 'c2.v2':'2개월',
  'c3.tag':'소화기 증상',
  'c3.text':'«훨씬 좋아졌습니다.» 몸이 받아들이지 못하던 음식을 찾아내고 식사를 다시 구성한 뒤, 소화와 에너지, 수면이 꾸준히 좋아졌다고 말합니다.',
  'c3.k1':'초점', 'c3.v1':'음식 민감성',
  'c4.tag':'호르몬 건강',
  'c4.text':'«다시 편안하게 살기»: 어떤 일반 검사로도 설명되지 않던 증상과 함께 보낸 수년 뒤의 이야기입니다.',
  'c4.k1':'초점', 'c4.v1':'호르몬 균형',

  'areas.eyebrow':'진료 분야',
  'areas.title':'모든 진료과에서<br>같은 하나의 질문.',
  'areas.th2':'분야', 'areas.th3':'초점',
  'a1.n':'대사, 비만 그리고 통합 건강', 'a1.d':'대사·소화·호르몬·염증의 불균형',
  'a2.n':'갑상선과 호르몬 건강',        'a2.d':'에너지, 수면, 체온, 집중력, 정서 상태',
  'a3.n':'당뇨와 대사 건강',            'a3.d':'제1형·제2형·임신성 당뇨 동행',
  'a4.n':'자가면역 및 염증성 질환',     'a4.d':'염증 부담을 낮추는 식사와 생활 습관',
  'a5.n':'여성 호르몬 건강',            'a5.d':'폐경, 호르몬 균형, 건강한 노화',
  'a6.n':'남성 호르몬 건강과 남성 갱년기','a6.d':'활력, 에너지, 호르몬 균형, 장수',

  'method.eyebrow':'방법',
  'method.title':'6개의 R.<br>기능의학에서 다섯,<br>그리고 <em>우리의 하나</em>.',
  'r1.n':'Remove — 제거',    'r1.t':'몸이 잘 견디지 못하고 염증 반응을 유지시키는 음식과 요인을 찾아 덜어냅니다.',
  'r2.n':'Replace — 보충',   'r2.t':'소화와 영양소 흡수가 다시 작동하도록 부족한 것을 채웁니다.',
  'r3.n':'Reinoculate — 재정착','r3.t':'면역계의 약 70&nbsp;%가 자리한 장내 세균총을 다시 세웁니다.',
  'r4.n':'Repair — 회복',    'r4.t':'몸이 스스로 사용하는 영양소로 장 점막의 회복을 돕습니다.',
  'r5.n':'Rebalance — 재균형','r5.t':'휴식과 스트레스, 습관을 정돈합니다. 자율신경계가 하루 종일 대사를 다스립니다.',
  'r6.n':'Reeducate <em>— NutriSlim의 R</em>', 'r6.t':'환자가 자기 몸을 이해하고 우리에게 기대지 않고도 유지할 수 있도록. 약이 아니라 배움입니다.',

  'tech.eyebrow':'기술',
  'tech.title':'OligoCheck.<br>일반 혈액검사가<br><em>보지 않는 것</em>.',
  'tech.lead':'미네랄 상태와 산화 스트레스, 독성 중금속의 존재 가능성을 평가하는 비침습 스캔입니다. 저희가 권하는 출발점입니다. 계획을 제안하기 전에, 실제로 무슨 일이 일어나고 있는지 보고 싶기 때문입니다.',
  'tech.cta':'평가 예약하기', 'tech.h2':'스캔 · 비침습',
  'tech.p1':'미네랄', 'tech.p2':'산화 스트레스', 'tech.p3':'독성 중금속', 'tech.p4':'소요 시간', 'tech.p5':'주삿바늘',
  'tech.yes1':'예', 'tech.yes2':'예', 'tech.dur':'약 2O분',
  'tech.foot':'보조 평가 도구입니다. 그 자체로 진단이 되지는 않습니다.',

  'cta.eyebrow':'여기서 시작하세요',
  'cta.title':'건강 검사는 <em>무료</em>이며 3분이면 됩니다.',
  'cta.lead':'몸의 열일곱 개 영역, 증상 목록, 그리고 점수. 열 가지를 넘는다면 한번 이야기해 보는 게 좋습니다.',
  'cta.b1':'검사 받기', 'cta.b2':'WhatsApp으로 문의',

  'foot.h1':'진료분야', 'foot.a1':'대사와 비만', 'foot.a2':'갑상선', 'foot.a3':'당뇨',
  'foot.a4':'자가면역', 'foot.a5':'여성 호르몬', 'foot.a6':'남성 호르몬',
  'foot.h2':'클리닉', 'foot.c1':'방법', 'foot.c2':'사례', 'foot.c4':'예약',
  'foot.h3':'연락처', 'foot.hours':'월–금 8:OO–18:OO<br>토요일 8:OO–13:OO',
  'foot.bar':'정분자의학 · 장수'
}

};
