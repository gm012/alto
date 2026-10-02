<?php
declare(strict_types=1);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $status, array $data): never {
    http_response_code($status); echo json_encode($data); exit;
}
function private_dir(): string {
    // Outside public_html when /site contents are uploaded into public_html.
    $dir = dirname(__DIR__, 2) . '/alto-private';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        respond(503, ['ok'=>false,'message'=>'The form is temporarily unavailable. Please email info@altostudio.co.za.']);
    }
    return $dir;
}
function same_origin(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = ['https://altostudio.co.za','https://www.altostudio.co.za'];
    if (PHP_SAPI === 'cli-server') $allowed[] = 'http://127.0.0.1:8765';
    if ($origin !== '' && !in_array($origin, $allowed, true)) respond(403,['ok'=>false,'message'=>'Please submit this form from the ALTO website.']);
    if (($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site') respond(403,['ok'=>false,'message'=>'Request not allowed.']);
}
function read_json(): array {
    if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000) respond(413,['ok'=>false,'message'=>'Your message is too long.']);
    if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) respond(415,['ok'=>false,'message'=>'Unsupported request format.']);
    $raw = file_get_contents('php://input', false, null, 0, 16001);
    if ($raw === false || strlen($raw)>16000) respond(413,['ok'=>false,'message'=>'Your message is too long.']);
    $data = json_decode($raw, true);
    if (!is_array($data)) respond(400,['ok'=>false,'message'=>'Please check your form and try again.']);
    return $data;
}
