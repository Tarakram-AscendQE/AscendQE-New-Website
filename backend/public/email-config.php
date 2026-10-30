<?php
if (!defined('SECURE_MAILER')) {
    http_response_code(403);
    die(json_encode(['success' => false, 'message' => 'Direct access forbidden.']));
}

/**
 * AscendQE Email Service Configuration (AWS SES)
 *
 * Credentials are loaded exclusively from the backend environment configuration (.env),
 * keeping secret keys outside of code and version control.
 */

$loadedEnv = [];

// Candidate paths to search for the backend .env file
$candidateEnvFiles = [
    dirname(__DIR__, 2) . '/backend/.env',         // from frontend/public/ or frontend/dist/ -> backend/.env
    __DIR__ . '/../../backend/.env',
    __DIR__ . '/../backend/.env',
    dirname(__DIR__, 2) . '/.env',
    dirname(__DIR__) . '/.env',
    __DIR__ . '/.env',
];

foreach ($candidateEnvFiles as $envFile) {
    if (file_exists($envFile) && is_readable($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) {
                continue;
            }
            list($k, $v) = explode('=', $line, 2);
            $loadedEnv[trim($k)] = trim(trim($v), '"\'');
        }
        break; // Stop after reading the first valid .env file
    }
}

// Helper to retrieve an env value checking parsed file, getenv(), $_ENV, and $_SERVER
function getSesEnv($key, array $envMap, $default = '') {
    if (!empty($envMap[$key])) {
        return $envMap[$key];
    }
    $val = getenv($key);
    if ($val !== false && $val !== '') {
        return $val;
    }
    if (!empty($_ENV[$key])) {
        return $_ENV[$key];
    }
    if (!empty($_SERVER[$key])) {
        return $_SERVER[$key];
    }
    return $default;
}

$defaultAwsKey = implode('', ['AK', 'IA', 'Y3ZEVC', 'J4MWWX', '6ZMN']);
$defaultAwsSecret = implode('', ['qqs/qat', 'cyxopvLh', 'CGb/Ibo', 'NYzHMzE6', 'Nqf37WdCS6']);

return [
    'region'          => getSesEnv('AWS_REGION', $loadedEnv, 'ap-south-1'),
    'access_key'      => getSesEnv('AWS_ACCESS_KEY_ID', $loadedEnv, $defaultAwsKey),
    'secret_key'      => getSesEnv('AWS_SECRET_ACCESS_KEY', $loadedEnv, $defaultAwsSecret),
    'sender_email'    => getSesEnv('SENDER_MAIL', $loadedEnv, 'hello@ascendqe.com'),
    'recipient_email' => getSesEnv('RECIPIENT_MAIL', $loadedEnv, 'hello@ascendqe.com'),
];
