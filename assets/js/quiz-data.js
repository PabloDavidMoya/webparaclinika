/* ============================================================
   NUTRISLIM — contenido del test de salud
   ------------------------------------------------------------
   Las 17 áreas del cuestionario original de la clínica, con sus
   síntomas. Se quitó la opción "Ninguna" de cada grupo: no marcar
   nada ya significa ninguna, y eran 17 decisiones de más.

   ⚠  Por ahora inglés y español. Los otros siete idiomas del sitio
      caen a inglés hasta que se traduzcan estos 84 síntomas, que es
      texto médico y necesita revisión profesional.
   ============================================================ */

window.NS_QUIZ = {

en: {
  intro:  { kicker:'Free health assessment',
            title:'Let\'s map what your body is telling you.',
            lead:'Seventeen areas, one screen at a time. Mark only what has been happening <em>regularly over the last 30 days</em>. It takes about two minutes and costs nothing.',
            honest:'Be honest — nobody sees this but you.',
            start:'Start' },
  ui:     { next:'Next', back:'Back', of:'of', skip:'Nothing here',
            seeResult:'See my result', restart:'Start over',
            areasFlagged:'areas with something flagged' },
  result: { kicker:'Your result',
            low:'Your body is not raising many flags.',
            mid:'There are signals worth looking at.',
            high:'Your body is asking for a proper look.',
            lowText:'Few recurring symptoms in the last 30 days. Keep an eye on the areas below.',
            midText:'Enough recurring symptoms to be worth a conversation. It does not mean something is wrong — it means it is worth finding out why.',
            highText:'Above ten recurring symptoms. In our experience that pattern rarely resolves on its own, and it is exactly what a full assessment is for.',
            symptoms:'symptoms marked',
            top:'Where your body flagged the most',
            cta:'Send my result and book',
            ctaNote:'Opens WhatsApp with your score already written.',
            again:'Do it again',
            legal:'This is an orientation tool, not a diagnosis. It does not replace a medical consultation, and no result here should be used to start, stop or change any treatment.' },
  wa:     { line1:'Hi! I did the health assessment on the website.',
            line2:'My score:', line3:'symptoms in', line4:'areas.',
            line5:'Where I flagged the most:', line6:'I would like to book a consultation.' },
  areas: [
    { n:'Digestive tract',      items:['Bloating','Nausea or vomiting','Stomach pain or cramps','Heartburn','Belching','Gas','Anal itching','Diarrhoea','Constipation','Blood or mucus in stool'] },
    { n:'Weight',               items:['Excess weight','Difficulty gaining weight','Compulsive appetite','Little appetite','Sugar cravings'] },
    { n:'Thyroid',              items:['Difficulty losing weight','Sensitivity to cold','Hair loss','Dry skin'] },
    { n:'Genitourinary',        items:['Frequent infections','Urgent or frequent urination','Abnormal discharge','Genital itching'] },
    { n:'Joints and muscles',   items:['Joint pain or discomfort','Osteoarthritis','Swollen joints','Increasing leg pain'] },
    { n:'Mouth and throat',     items:['Chronic cough','Throat clearing','Sore throat','Painful sores','Coated tongue'] },
    { n:'Heart',                items:['Irregular or skipped beats','High cholesterol','Chest pain'] },
    { n:'Teeth',                items:['Swollen or bleeding gums','Tartar build-up','Frequent cavities'] },
    { n:'Skin',                 items:['Acne','Itchy skin','Flushing or redness'] },
    { n:'Ears',                 items:['Ear pain or infection','Ringing in the ears','Red ears','Hearing loss'] },
    { n:'Nose',                 items:['Blocked nose','Chronically red or swollen','Sinus problems','Sneezing fits','Excess mucus'] },
    { n:'Respiratory',          items:['Chest congestion','Asthma','Shortness of breath','Wheezing','Persistent cough','Difficulty breathing'] },
    { n:'Eyes',                 items:['Watery or itchy','Red eyelids','Red eyes','Bags or dark circles'] },
    { n:'Head',                 items:['Headaches','Dizziness','Vertigo'] },
    { n:'Mind and emotions',    items:['Trouble focusing','Stuttering or broken speech','Easily distracted','Poor memory','Trouble finishing things','Trouble with numbers','Learning difficulties','Poor performance at school or work','Trouble making decisions','Confusion','Mood swings','Anxiety','Anger','Frustration','Low mood'] },
    { n:'Energy and sleep',     items:['Apathy or lethargy','Fatigue','Hyperactivity','Insomnia','Unrefreshing sleep','Poor physical coordination'] },
    { n:'Anything else',        items:['Something that does not fit any of the above'] }
  ]
},

es: {
  intro:  { kicker:'Test de salud gratuito',
            title:'Vamos a mapear lo que tu cuerpo te está diciendo.',
            lead:'Diecisiete áreas, una pantalla por vez. Marcá solo lo que te pasa <em>de forma recurrente en los últimos 30 días</em>. Toma unos dos minutos y no cuesta nada.',
            honest:'Sé honesto — esto no lo ve nadie más que vos.',
            start:'Empezar' },
  ui:     { next:'Siguiente', back:'Atrás', of:'de', skip:'Nada de esto',
            seeResult:'Ver mi resultado', restart:'Empezar de nuevo',
            areasFlagged:'áreas con algo marcado' },
  result: { kicker:'Tu resultado',
            low:'Tu cuerpo no está levantando muchas señales.',
            mid:'Hay señales que vale la pena mirar.',
            high:'Tu cuerpo está pidiendo que lo miren en serio.',
            lowText:'Pocos síntomas recurrentes en los últimos 30 días. Prestá atención a las áreas de abajo.',
            midText:'Suficientes síntomas recurrentes como para que valga una conversación. No significa que algo ande mal: significa que vale la pena averiguar por qué.',
            highText:'Más de diez síntomas recurrentes. Ese patrón rara vez se resuelve solo, y es exactamente para lo que sirve una evaluación completa.',
            symptoms:'síntomas marcados',
            top:'Donde tu cuerpo marcó más',
            cta:'Enviar mi resultado y agendar',
            ctaNote:'Abre WhatsApp con tu puntaje ya escrito.',
            again:'Hacerlo de nuevo',
            legal:'Esto es una herramienta de orientación, no un diagnóstico. No reemplaza una consulta médica, y ningún resultado de acá debe usarse para iniciar, suspender ni modificar un tratamiento.' },
  wa:     { line1:'¡Hola! Hice el test de salud en la web.',
            line2:'Mi puntaje:', line3:'síntomas en', line4:'áreas.',
            line5:'Donde marqué más:', line6:'Me gustaría agendar una consulta.' },
  areas: [
    { n:'Tracto digestivo',     items:['Sensación de hinchazón','Náuseas o vómitos','Dolor estomacal o cólicos','Acidez','Eructos','Flatulencias','Comezón anal','Diarrea','Estreñimiento','Sangre o mucosidad en las heces'] },
    { n:'Peso',                 items:['Peso excesivo','Dificultad para ganar peso','Apetito compulsivo','Poco apetito','Antojo por dulces'] },
    { n:'Tiroides',             items:['Dificultad para bajar de peso','Sensibilidad al frío','Pérdida del cabello','Piel seca'] },
    { n:'Genito-urinario',      items:['Infecciones frecuentes','Necesidad de orinar con urgencia o frecuencia','Flujo genital anormal','Comezón genital'] },
    { n:'Articulaciones y músculos', items:['Dolor o molestia articular','Artrosis','Articulaciones hinchadas','Dolor creciente en las piernas'] },
    { n:'Boca y garganta',      items:['Tos crónica','Carraspera','Dolor de garganta','Llagas dolorosas','Lengua saburral'] },
    { n:'Corazón',              items:['Latidos irregulares o salteados','Colesterol elevado','Dolor de pecho'] },
    { n:'Dientes',              items:['Encías inflamadas o sangrantes','Sarro','Tendencia a las caries'] },
    { n:'Piel',                 items:['Acné','Comezón en la piel','Rubores o enrojecimientos'] },
    { n:'Oídos',                items:['Dolor o infección de oídos','Zumbido en los oídos','Enrojecimiento de las orejas','Pérdida de audición'] },
    { n:'Nariz',                items:['Nariz tapada','Crónicamente roja o inflamada','Problemas sinusales','Ataques de estornudos','Exceso de moco'] },
    { n:'Respiratorio',         items:['Congestión del pecho','Asma','Falta de aliento','Silbido al respirar','Tos persistente','Dificultad respiratoria'] },
    { n:'Ojos',                 items:['Llorosos o con picazón','Párpados rojos','Ojos rojos','Bolsas u ojeras'] },
    { n:'Cabeza',               items:['Dolores de cabeza','Mareos','Vértigo'] },
    { n:'Mente y emociones',    items:['Falta de atención','Habla entrecortada o tartamudeo','Fácil distracción','Memoria pobre','Dificultad para terminar lo que empezás','Dificultad con los números','Dificultad de aprendizaje','Bajo rendimiento en el estudio o el trabajo','Dificultad para tomar decisiones','Confusión','Cambios de carácter','Ansiedad','Enojo','Frustración','Ánimo bajo'] },
    { n:'Energía y sueño',      items:['Apatía o letargo','Fatiga','Hiperactividad','Insomnio','Sueño que no descansa','Poca coordinación física'] },
    { n:'¿Algo más?',           items:['Algo que no entra en ninguna de las anteriores'] }
  ]
}

};
