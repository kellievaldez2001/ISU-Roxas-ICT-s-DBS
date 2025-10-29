<?php

declare(strict_types=1);

require __DIR__ . '/utils.php';
require __DIR__ . '/config.php';

$pdo = get_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare('SELECT id, code, title, instructor FROM subjects WHERE id = :id');
            $stmt->execute(['id' => (int) $_GET['id']]);
            $record = $stmt->fetch();
            if (!$record) {
                json_error('Subject not found.', 404);
            }
            json_response($record);
        }

        $stmt = $pdo->query('SELECT id, code, title, instructor FROM subjects ORDER BY code');
        $records = $stmt->fetchAll();
        json_response($records);
    }

    if ($method === 'POST') {
        $payload = parse_json_body();
        $code = trim($payload['code'] ?? '');
        $title = trim($payload['title'] ?? '');
        $instructor = trim($payload['instructor'] ?? '');

        if ($code === '' || $title === '' || $instructor === '') {
            json_error('All fields are required.', 422);
        }

        $stmt = $pdo->prepare('INSERT INTO subjects (code, title, instructor) VALUES (:code, :title, :instructor)');
        $stmt->execute([
            'code' => $code,
            'title' => $title,
            'instructor' => $instructor,
        ]);

        $id = (int) $pdo->lastInsertId();
        $stmt = $pdo->prepare('SELECT id, code, title, instructor FROM subjects WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $record = $stmt->fetch();
        json_response($record, 201);
    }

    if ($method === 'PUT') {
        $id = require_int_param('id');
        $payload = parse_json_body();

        $fields = [
            'code' => trim($payload['code'] ?? ''),
            'title' => trim($payload['title'] ?? ''),
            'instructor' => trim($payload['instructor'] ?? ''),
        ];

        if (in_array('', $fields, true)) {
            json_error('All fields are required.', 422);
        }

        $stmt = $pdo->prepare('UPDATE subjects SET code = :code, title = :title, instructor = :instructor WHERE id = :id');
        $stmt->execute($fields + ['id' => $id]);

        $stmt = $pdo->prepare('SELECT id, code, title, instructor FROM subjects WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $record = $stmt->fetch();
        if (!$record) {
            json_error('Subject not found.', 404);
        }

        json_response($record);
    }

    if ($method === 'DELETE') {
        $id = require_int_param('id');
        $stmt = $pdo->prepare('DELETE FROM subjects WHERE id = :id');
        $stmt->execute(['id' => $id]);
        if ($stmt->rowCount() === 0) {
            json_error('Subject not found.', 404);
        }
        json_response(['success' => true]);
    }

    json_error('Method not allowed.', 405);
} catch (PDOException $exception) {
    json_error('Database error occurred.', 500);
}
