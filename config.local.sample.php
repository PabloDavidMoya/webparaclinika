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
