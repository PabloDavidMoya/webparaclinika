<?php
/**
 * Conversions API de Meta — un solo lugar para mandar eventos server-side,
 * para no repetir la llamada curl en cada endpoint nuevo que se sume con
 * las próximas campañas. Nunca debe romper el flujo del sitio: cualquier
 * fallo de Meta se traga acá adentro.
 *
 * Regla que no se toca (ver assets/js/consent.js): a Meta no le va ni un
 * dato del test. custom_data se manda vacío salvo que el llamador pase
 * algo explícitamente — y lo único que se pasa hoy es la URL de origen,
 * nunca puntaje ni síntomas.
 */

function ns_capi_send($eventName, $eventId, array $userData = [], array $customData = [], $eventSourceUrl = null) {
    if (!defined('FB_PIXEL_ID') || FB_PIXEL_ID === '' || !defined('FB_CAPI_TOKEN') || FB_CAPI_TOKEN === '') {
        return null;
    }

    $ud = [];
    if (!empty($userData['phone'])) {
        $ud['ph'] = [hash('sha256', $userData['phone'])];
    }
    if (!empty($userData['email'])) {
        $ud['em'] = [hash('sha256', strtolower(trim($userData['email'])))];
    }
    if (!empty($userData['fbp'])) {
        $ud['fbp'] = $userData['fbp'];
    }
    if (!empty($userData['fbc'])) {
        $ud['fbc'] = $userData['fbc'];
    }
    if (!empty($_SERVER['REMOTE_ADDR'])) {
        $ud['client_ip_address'] = $_SERVER['REMOTE_ADDR'];
    }
    if (!empty($_SERVER['HTTP_USER_AGENT'])) {
        $ud['client_user_agent'] = $_SERVER['HTTP_USER_AGENT'];
    }

    $event = [
        'event_name'    => $eventName,
        'event_time'    => time(),
        'event_id'      => (string) $eventId,
        'action_source' => 'website',
        'user_data'     => $ud,
    ];
    if ($eventSourceUrl) {
        $event['event_source_url'] = $eventSourceUrl;
    }
    if ($customData) {
        $event['custom_data'] = $customData;
    }

    $payload = ['data' => [$event]];
    if (defined('FB_CAPI_TEST_CODE') && FB_CAPI_TEST_CODE !== '') {
        $payload['test_event_code'] = FB_CAPI_TEST_CODE;
    }

    try {
        $ch = curl_init('https://graph.facebook.com/v21.0/' . FB_PIXEL_ID . '/events?access_token=' . urlencode(FB_CAPI_TOKEN));
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_TIMEOUT        => 3,
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS     => json_encode($payload),
        ]);
        $resp = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return ['code' => $code, 'body' => $resp];
    } catch (Throwable $e) {
        return ['error' => $e->getMessage()];
    }
}
