<?php
/**
 * Copiar como config.local.php y subir a mano por el Administrador de
 * archivos de Hostinger (nunca por git: config.local.php está en
 * .gitignore porque el repo es público).
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'u613764194_ns_leads');
define('DB_USER', 'u613764194_nutrislim_app');
define('DB_PASS', 'REEMPLAZAR');

// Opcional: si se define, guardar-lead.php intenta además crear el
// contacto en Brevo. Si se deja vacío, solo se guarda en la base local.
define('BREVO_API_KEY', '');
define('BREVO_LIST_ID', 0);

// A dónde le llega el resultado completo del test al terminar (nombre,
// WhatsApp y cada síntoma marcado). Requiere BREVO_API_KEY cargada.
// CLINIC_EMAIL también se usa como remitente ante Brevo (tiene que estar
// verificado ahí). CLINIC_EMAIL_2 es opcional: un destinatario extra en
// copia, no necesita verificación.
define('CLINIC_EMAIL', '');
define('CLINIC_EMAIL_2', '');

// Conversions API de Meta (server-side). Se generan en Events Manager ->
// Orígenes de datos -> el píxel -> Configuración -> Conversions API ->
// "Implementación manual". Si se deja vacío, capi.php no manda nada y el
// sitio sigue funcionando solo con el píxel del navegador.
define('FB_PIXEL_ID', '296743103251171');
define('FB_CAPI_TOKEN', '');
// Solo mientras se prueba: código de la pestaña "Test Events" en Events
// Manager. Sacarlo (dejar '') antes de lanzar campañas de verdad, si no
// los eventos de producción no cuentan para optimización.
define('FB_CAPI_TEST_CODE', '');
