<?php
include 'conex.php'; // Incluir el archivo de conexión a la base de datos

// Preparar la consulta SQL para obtener todos los usuarios
$sql = "SELECT id, nombre, apellido, cargo FROM adminDesWeb";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    $usuarios = array();

    // Obtener los datos fila por fila
    while($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }

    // Devolver los datos en formato JSON
    echo json_encode($usuarios);
} else {
    // Si no hay usuarios, devolver un array vacío
    echo json_encode([]);
}

// Cerrar la conexión
$conn->close();
?>