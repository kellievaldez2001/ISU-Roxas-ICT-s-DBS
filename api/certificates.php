<?php

declare(strict_types=1);

require __DIR__ . '/utils.php';
require __DIR__ . '/config.php';

$pdo = get_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare('SELECT id, student_id, subject_id, badge_id, date_issued FROM issued_badges WHERE id = :id');
            $stmt->execute(['id' => (int) $_GET['id']]);
            $record = $stmt->fetch();
            if (!$record) {
                json_error('Issued badge not found.', 404);
            }
            json_response($record);
        }

        $stmt = $pdo->query('SELECT id, student_id, subject_id, badge_id, date_issued FROM issued_badges ORDER BY date_issued DESC, id DESC');
        $records = $stmt->fetchAll();
        json_response($records);
    }

    if ($method === 'POST') {
        $payload = parse_json_body();

        $studentId = (int) ($payload['student_id'] ?? 0);
        $subjectId = (int) ($payload['subject_id'] ?? 0);
        $badgeId = (int) ($payload['badge_id'] ?? 0);
        $dateIssued = trim($payload['date_issued'] ?? '');

        if ($studentId <= 0 || $subjectId <= 0 || $badgeId <= 0 || $dateIssued === '') {
            json_error('All fields are required.', 422);
        }

        $stmt = $pdo->prepare('INSERT INTO issued_badges (student_id, subject_id, badge_id, date_issued) VALUES (:student_id, :subject_id, :badge_id, :date_issued)');
        $stmt->execute([
            'student_id' => $studentId,
            'subject_id' => $subjectId,
            'badge_id' => $badgeId,
            'date_issued' => $dateIssued,
        ]);

        $id = (int) $pdo->lastInsertId();
        $stmt = $pdo->prepare('SELECT id, student_id, subject_id, badge_id, date_issued FROM issued_badges WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $record = $stmt->fetch();
        json_response($record, 201);
    }

    if ($method === 'PUT') {
        $id = require_int_param('id');
        $payload = parse_json_body();

        $studentId = (int) ($payload['student_id'] ?? 0);
        $subjectId = (int) ($payload['subject_id'] ?? 0);
        $badgeId = (int) ($payload['badge_id'] ?? 0);
        $dateIssued = trim($payload['date_issued'] ?? '');

        if ($studentId <= 0 || $subjectId <= 0 || $badgeId <= 0 || $dateIssued === '') {
            json_error('All fields are required.', 422);
        }

        $stmt = $pdo->prepare('UPDATE issued_badges SET student_id = :student_id, subject_id = :subject_id, badge_id = :badge_id, date_issued = :date_issued WHERE id = :id');
        $stmt->execute([
            'student_id' => $studentId,
            'subject_id' => $subjectId,
            'badge_id' => $badgeId,
            'date_issued' => $dateIssued,
            'id' => $id,
        ]);

        $stmt = $pdo->prepare('SELECT id, student_id, subject_id, badge_id, date_issued FROM issued_badges WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $record = $stmt->fetch();
        if (!$record) {
            json_error('Issued badge not found.', 404);
        }

        json_response($record);
    }

    if ($method === 'DELETE') {
        $id = require_int_param('id');
        $stmt = $pdo->prepare('DELETE FROM issued_badges WHERE id = :id');
        $stmt->execute(['id' => $id]);
        if ($stmt->rowCount() === 0) {
            json_error('Issued badge not found.', 404);
        }
        json_response(['success' => true]);
    }

    json_error('Method not allowed.', 405);
} catch (PDOException $exception) {
    json_error('Database error occurred.', 500);
}
