<?php
/**
 * Guarda el lead del "gate de nombre" del test (nombre + WhatsApp) antes
 * de que dependa de que la persona termine el test y toque el botón de
 * WhatsApp. Ese paso final se pierde seguido; esto deja un registro
 * propio que no depende de él. Ver quiz.js -> $('#gForm').
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

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

$name  = isset($data['name'])  ? trim(mb_substr((string) $data['name'], 0, 120))  : '';
$phone = isset($data['phone']) ? trim(mb_substr((string) $data['phone'], 0, 40))  : '';
$locale  = isset($data['locale'])  ? trim(mb_substr((string) $data['locale'], 0, 10))   : null;
$pageUrl = isset($data['url'])     ? trim(mb_substr((string) $data['url'], 0, 255))     : null;
$stage   = isset($data['stage'])   ? trim(mb_substr((string) $data['stage'], 0, 20))    : 'midgate';

// El teléfono llega tal cual lo escribió la persona (wa.me no exige un
// formato estricto); solo se sacan espacios/símbolos que no aportan nada.
$phoneDigits = preg_replace('/[^0-9+]/', '', $phone);

if ($name === '' || $phoneDigits === '') {
    http_response_code(422);
    echo json_encode(['ok' => false]);
    exit;
}

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare(
        'INSERT INTO leads (name, phone, locale, page_url, stage) VALUES (:name, :phone, :locale, :page_url, :stage)'
    );
    $stmt->execute([
        ':name'     => $name,
        ':phone'    => $phoneDigits,
        ':locale'   => $locale,
        ':page_url' => $pageUrl,
        ':stage'    => $stage,
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false]);
    exit;
}

// Best-effort: si hay API key de Brevo cargada, además crear/actualizar
// el contacto allá. Si falla, el lead ya quedó guardado en la base local
// igual — esto nunca debe tirar abajo la respuesta.
if (defined('BREVO_API_KEY') && BREVO_API_KEY !== '') {
    try {
        $payload = [
            'attributes'  => ['SMS' => $phoneDigits, 'PRENOM' => $name],
            'updateEnabled' => true,
        ];
        if (defined('BREVO_LIST_ID') && BREVO_LIST_ID) {
            $payload['listIds'] = [(int) BREVO_LIST_ID];
        }

        $ch = curl_init('https://api.brevo.com/v3/contacts');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_TIMEOUT        => 4,
            CURLOPT_HTTPHEADER     => [
                'api-key: ' . BREVO_API_KEY,
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode($payload),
        ]);
        curl_exec($ch);
        curl_close($ch);
    } catch (Throwable $e) {
        // se ignora a propósito: Brevo es un plus, no el registro principal
    }
}

echo json_encode(['ok' => true]);
