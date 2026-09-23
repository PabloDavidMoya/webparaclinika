<?php
/**
 * Refuerzo server-side del evento Contact (clic al botón de WhatsApp) vía
 * Conversions API. Se llama con sendBeacon desde quiz.js en paralelo al
 * fbq('track','Contact', ...) del navegador, con el mismo event_id para
 * que Meta deduplique. No guarda nada en base — es solo un reenvío del
 * evento pelado, igual que el píxel: nada de contenido del test.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$configFile = __DIR__ . '/config.local.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['ok' => false]);
    exit;
}
require $configFile;
require __DIR__ . '/capi.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data) || empty($data['event_id'])) {
    http_response_code(422);
    echo json_encode(['ok' => false]);
    exit;
}

$eventId = substr((string) $data['event_id'], 0, 64);
$phone   = isset($data['phone']) ? preg_replace('/[^0-9]/', '', (string) $data['phone']) : '';
$pageUrl = isset($data['url'])   ? trim(mb_substr((string) $data['url'], 0, 255)) : null;

ns_capi_send('Contact', $eventId, [
    'phone' => $phone,
    'fbp'   => isset($data['fbp']) ? trim((string) $data['fbp']) : null,
    'fbc'   => isset($data['fbc']) ? trim((string) $data['fbc']) : null,
], [], $pageUrl);

echo json_encode(['ok' => true]);
