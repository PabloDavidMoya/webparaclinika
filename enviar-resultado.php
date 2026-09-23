<?php
/**
 * Se llama al terminar el test (finish() en quiz.js), con el detalle
 * completo: nombre, WhatsApp y qué síntomas marcó en cada área. Guarda
 * todo en la base y le manda un email a la clínica con el detalle, para
 * que no tengan que repreguntar todo de nuevo en la primera consulta.
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

$name  = isset($data['name'])  ? trim(mb_substr((string) $data['name'], 0, 120)) : '';
$phone = isset($data['phone']) ? preg_replace('/[^0-9]/', '', (string) $data['phone']) : '';
$locale  = isset($data['locale'])  ? trim(mb_substr((string) $data['locale'], 0, 10))  : null;
$gender  = isset($data['gender'])  ? trim(mb_substr((string) $data['gender'], 0, 5))   : null;
$band    = isset($data['band'])    ? trim(mb_substr((string) $data['band'], 0, 10))    : null;
$total   = isset($data['total'])   ? (int) $data['total']  : 0;
$pageUrl = isset($data['url'])     ? trim(mb_substr((string) $data['url'], 0, 255))    : null;

// areas: [{ name, items: [...] }] — ya vienen filtradas a las que
// tuvieron al menos un ítem marcado, ver quiz.js.
$areas = [];
if (isset($data['areas']) && is_array($data['areas'])) {
    foreach ($data['areas'] as $a) {
        if (!isset($a['name']) || !isset($a['items']) || !is_array($a['items']) || !count($a['items'])) continue;
        $areas[] = [
            'name'  => mb_substr((string) $a['name'], 0, 120),
            'items' => array_map(function ($it) { return mb_substr((string) $it, 0, 160); }, array_slice($a['items'], 0, 40)),
        ];
    }
}

if ($name === '' || $phone === '') {
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

    // Idempotente: si ya existe no hace nada. Evita depender de correr
    // una migración aparte a mano en phpMyAdmin.
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS test_results (' .
        'id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, ' .
        'name VARCHAR(120) NOT NULL, ' .
        'phone VARCHAR(40) NOT NULL, ' .
        'locale VARCHAR(10) DEFAULT NULL, ' .
        'gender VARCHAR(5) DEFAULT NULL, ' .
        'band VARCHAR(10) DEFAULT NULL, ' .
        'total INT UNSIGNED DEFAULT 0, ' .
        'areas_json TEXT, ' .
        'page_url VARCHAR(255) DEFAULT NULL, ' .
        'emailed TINYINT(1) NOT NULL DEFAULT 0, ' .
        'created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP' .
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );

    $stmt = $pdo->prepare(
        'INSERT INTO test_results (name, phone, locale, gender, band, total, areas_json, page_url) ' .
        'VALUES (:name, :phone, :locale, :gender, :band, :total, :areas_json, :page_url)'
    );
    $stmt->execute([
        ':name'       => $name,
        ':phone'      => $phone,
        ':locale'     => $locale,
        ':gender'     => $gender,
        ':band'       => $band,
        ':total'      => $total,
        ':areas_json' => json_encode($areas, JSON_UNESCAPED_UNICODE),
        ':page_url'   => $pageUrl,
    ]);
    $resultId = $pdo->lastInsertId();
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false]);
    exit;
}

// Refuerzo server-side del Lead vía Conversions API. event_id lo manda
// quiz.js — el mismo que usó fbq('track','Lead', ...) en el navegador,
// para que Meta deduplique en vez de contar dos veces.
if (!empty($data['event_id'])) {
    ns_capi_send('Lead', substr((string) $data['event_id'], 0, 64), [
        'phone' => $phone,
        'fbp'   => isset($data['fbp']) ? trim((string) $data['fbp']) : null,
        'fbc'   => isset($data['fbc']) ? trim((string) $data['fbc']) : null,
    ], [], $pageUrl);
}

// El email es lo que de verdad pidió la clínica: que les llegue el
// detalle completo para no repreguntar todo en la primera consulta.
$emailed = false;
if (defined('BREVO_API_KEY') && BREVO_API_KEY !== '' && defined('CLINIC_EMAIL') && CLINIC_EMAIL !== '') {
    try {
        $bandLabel = ['low' => 'Bajo', 'mid' => 'Medio', 'high' => 'Alto'];
        $html = '<p><strong>Nombre:</strong> ' . htmlspecialchars($name) . '</p>';
        $html .= '<p><strong>WhatsApp:</strong> ' . htmlspecialchars($phone) . '</p>';
        $html .= '<p><strong>Nivel general:</strong> ' . htmlspecialchars($bandLabel[$band] ?? $band) . ' (' . $total . ' síntomas marcados)</p>';
        $html .= '<hr>';
        if ($areas) {
            foreach ($areas as $a) {
                $html .= '<p><strong>' . htmlspecialchars($a['name']) . '</strong><br>';
                $html .= htmlspecialchars(implode(', ', $a['items']));
                $html .= '</p>';
            }
        } else {
            $html .= '<p>No marcó síntomas en ninguna área.</p>';
        }

        $to = [['email' => CLINIC_EMAIL, 'name' => 'Policlínica Nutrislim']];
        if (defined('CLINIC_EMAIL_2') && CLINIC_EMAIL_2 !== '') {
            $to[] = ['email' => CLINIC_EMAIL_2, 'name' => 'Policlínica Nutrislim'];
        }

        $payload = [
            'sender'      => ['name' => 'Test NutriSlim', 'email' => CLINIC_EMAIL],
            'to'          => $to,
            'subject'     => 'Test completado — ' . $name,
            'htmlContent' => $html,
        ];

        $ch = curl_init('https://api.brevo.com/v3/smtp/email');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_TIMEOUT        => 5,
            CURLOPT_HTTPHEADER     => [
                'api-key: ' . BREVO_API_KEY,
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode($payload),
        ]);
        $resp = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($code >= 200 && $code < 300) {
            $emailed = true;
            $upd = $pdo->prepare('UPDATE test_results SET emailed = 1 WHERE id = ?');
            $upd->execute([$resultId]);
        }
        if (isset($_GET['debug'])) {
            echo json_encode(['ok' => true, 'brevo' => ['code' => $code, 'body' => $resp]]);
            exit;
        }
    } catch (Throwable $e) {
        if (isset($_GET['debug'])) {
            echo json_encode(['ok' => true, 'brevo' => ['error' => $e->getMessage()]]);
            exit;
        }
    }
}

echo json_encode(['ok' => true]);
