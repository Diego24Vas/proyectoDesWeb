<?php
include 'conex.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];

    $sql = "DELETE FROM contactosDesWeb WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Contacto eliminado"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error al eliminar el contacto"]);
    }

    $stmt->close();
}

$conn->close();
?>