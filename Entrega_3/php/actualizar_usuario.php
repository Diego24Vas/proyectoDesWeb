<?php
include 'conex.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$cargo = $data['cargo'];

$query = "UPDATE adminDesWeb SET nombre = ?, apellido = ?, cargo = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('sssi', $nombre, $apellido, $cargo, $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Usuario actualizado correctamente']);
} else {
    echo json_encode(['message' => 'Error al actualizar el usuario']);
}

$stmt->close();
$conn->close();
?>