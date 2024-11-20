<?php
include 'conex.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];

    $sql = "DELETE FROM adminDesWeb WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Usuario eliminado"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error al eliminar el usuario"]);
    }

    $stmt->close();
}

$conn->close();
?>