<?php

declare(strict_types=1);

require __DIR__ . '/utils.php';
require __DIR__ . '/config.php';

$pdo = get_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare('SELECT id, title, description, image_url FROM badges WHERE id = :id');
            $stmt->execute(['id' => (int) $_GET['id']]);
            $record = $stmt->fetch();
            if (!$record) {
                json_error('Badge not found.', 404);
            }
            json_response($record);
        }

        $stmt = $pdo->query('SELECT id, title, description, image_url FROM badges ORDER BY title');
        $records = $stmt->fetchAll();
        json_response($records);
    }

    if ($method === 'POST') {
        $payload = parse_json_body();
        $title = trim($payload['title'] ?? '');
        $description = trim($payload['description'] ?? '');
        $imageUrl = trim($payload['image_url'] ?? '');

        if ($title === '' || $description === '') {
            json_error('Title and description are required.', 422);
        }

        $stmt = $pdo->prepare('INSERT INTO badges (title, description, image_url) VALUES (:title, :description, :image_url)');
        $stmt->execute([
            'title' => $title,
            'description' => $description,
            'image_url' => $imageUrl !== '' ? $imageUrl : null,
        ]);

        $id = (int) $pdo->lastInsertId();
        $stmt = $pdo->prepare('SELECT id, title, description, image_url FROM badges WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $record = $stmt->fetch();
        json_response($record, 201);
    }

    if ($method === 'PUT') {
        $id = require_int_param('id');
        $payload = parse_json_body();

        $fields = [
            'title' => trim($payload['title'] ?? ''),
            'description' => trim($payload['description'] ?? ''),
            'image_url' => trim($payload['image_url'] ?? ''),
        ];

        if ($fields['title'] === '' || $fields['description'] === '') {
            json_error('Title and description are required.', 422);
        }

        $stmt = $pdo->prepare('UPDATE badges SET title = :title, description = :description, image_url = :image_url WHERE id = :id');
        $stmt->execute([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'image_url' => $fields['image_url'] !== '' ? $fields['image_url'] : null,
            'id' => $id,
        ]);

        $stmt = $pdo->prepare('SELECT id, title, description, image_url FROM badges WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $record = $stmt->fetch();
        if (!$record) {
            json_error('Badge not found.', 404);
        }

        json_response($record);
    }

    if ($method === 'DELETE') {
        $id = require_int_param('id');
        $stmt = $pdo->prepare('DELETE FROM badges WHERE id = :id');
        $stmt->execute(['id' => $id]);
        if ($stmt->rowCount() === 0) {
            json_error('Badge not found.', 404);
        }
        json_response(['success' => true]);
    }

    json_error('Method not allowed.', 405);
} catch (PDOException $exception) {
    json_error('Database error occurred.', 500);
}
