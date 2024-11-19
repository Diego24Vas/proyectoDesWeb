<?php
include 'conex.php'; // Incluir el archivo de conexión a la base de datos

// Preparar la consulta SQL para obtener todos los contactos
$sql = "SELECT id, nombre, email, mensaje FROM contactosDesWeb";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    $contactos = array();

    // Obtener los datos fila por fila
    while($row = $result->fetch_assoc()) {
        $contactos[] = $row;
    }

    // Devolver los datos en formato JSON
    echo json_encode($contactos);
} else {
    // Si no hay contactos, devolver un array vacío
    echo json_encode([]);
}

// Cerrar la conexión
$conn->close();
?>
