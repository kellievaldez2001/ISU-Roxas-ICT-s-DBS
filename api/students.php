<?php

declare(strict_types=1);

require __DIR__ . '/utils.php';
require __DIR__ . '/config.php';

$pdo = get_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare('SELECT id, student_id, name, email, course, year_level FROM students WHERE id = :id');
            $stmt->execute(['id' => (int) $_GET['id']]);
            $record = $stmt->fetch();
            if (!$record) {
                json_error('Student not found.', 404);
            }
            json_response($record);
        }

        $stmt = $pdo->query('SELECT id, student_id, name, email, course, year_level FROM students ORDER BY student_id');
        $records = $stmt->fetchAll();
        json_response($records);
    }

    if ($method === 'POST') {
        $payload = parse_json_body();
        $studentId = trim($payload['student_id'] ?? '');
        $name = trim($payload['name'] ?? '');
        $email = trim($payload['email'] ?? '');
        $course = trim($payload['course'] ?? '');
        $yearLevel = trim($payload['year_level'] ?? '');

        if ($studentId === '' || $name === '' || $email === '' || $course === '' || $yearLevel === '') {
            json_error('All fields are required.', 422);
        }

        $stmt = $pdo->prepare('INSERT INTO students (student_id, name, email, course, year_level) VALUES (:student_id, :name, :email, :course, :year_level)');
        $stmt->execute([
            'student_id' => $studentId,
            'name' => $name,
            'email' => $email,
            'course' => $course,
            'year_level' => $yearLevel,
        ]);

        $id = (int) $pdo->lastInsertId();
        $stmt = $pdo->prepare('SELECT id, student_id, name, email, course, year_level FROM students WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $record = $stmt->fetch();
        json_response($record, 201);
    }

    if ($method === 'PUT') {
        $id = require_int_param('id');
        $payload = parse_json_body();

        $fields = [
            'student_id' => trim($payload['student_id'] ?? ''),
            'name' => trim($payload['name'] ?? ''),
            'email' => trim($payload['email'] ?? ''),
            'course' => trim($payload['course'] ?? ''),
            'year_level' => trim($payload['year_level'] ?? ''),
        ];

        if (in_array('', $fields, true)) {
            json_error('All fields are required.', 422);
        }

        $stmt = $pdo->prepare('UPDATE students SET student_id = :student_id, name = :name, email = :email, course = :course, year_level = :year_level WHERE id = :id');
        $stmt->execute($fields + ['id' => $id]);

        $stmt = $pdo->prepare('SELECT id, student_id, name, email, course, year_level FROM students WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $record = $stmt->fetch();
        if (!$record) {
            json_error('Student not found.', 404);
        }

        json_response($record);
    }

    if ($method === 'DELETE') {
        $id = require_int_param('id');
        $stmt = $pdo->prepare('DELETE FROM students WHERE id = :id');
        $stmt->execute(['id' => $id]);
        if ($stmt->rowCount() === 0) {
            json_error('Student not found.', 404);
        }
        json_response(['success' => true]);
    }

    json_error('Method not allowed.', 405);
} catch (PDOException $exception) {
    json_error('Database error occurred.', 500);
}
