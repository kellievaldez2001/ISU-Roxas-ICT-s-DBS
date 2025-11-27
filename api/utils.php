<?php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function json_response($data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

function json_error(string $message, int $statusCode = 400): void
{
    json_response(['error' => $message], $statusCode);
}

function parse_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
        json_error('Invalid JSON payload.', 422);
    }

    return $data;
}

function require_method(string ...$allowed): void
{
    $method = $_SERVER['REQUEST_METHOD'] ?? '';
    if (!in_array($method, $allowed, true)) {
        json_error('Method not allowed.', 405);
    }
}

function require_int_param(string $key): int
{
    $value = $_GET[$key] ?? null;
    if ($value === null || !is_numeric($value)) {
        json_error("Missing or invalid '{$key}' parameter.", 400);
    }
    return (int) $value;
}
