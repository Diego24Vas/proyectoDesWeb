<?php
include 'conex.php'; // Asegúrate de que el archivo conex.php esté correctamente configurado

// Verificar si se recibieron los datos mediante el método POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $total = $_POST['total'];

    // Verificar si todos los campos tienen valores
    if (empty($nombre) || empty($direccion) || empty($telefono) || empty($total)) {
        die(json_encode(["error" => "Todos los campos son obligatorios."]));
    }

    // Verificar la conexión a la base de datos
    if (!$conn) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    // Preparar la consulta SQL para insertar los datos en la tabla pedidos
    $sql = "INSERT INTO pedidosDesWeb (nombre, direccion, telefono, total) VALUES (?, ?, ?, ?)";

    // Preparar la sentencia
    $stmt = mysqli_prepare($conn, $sql);
    if ($stmt) {
        // Enlazar los parámetros
        mysqli_stmt_bind_param($stmt, "sssi", $nombre, $direccion, $telefono, $total);

        // Ejecutar la sentencia
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["success" => "Pedido guardado correctamente."]);
        } else {
            echo json_encode(["error" => "Error al guardar el pedido: " . mysqli_error($conn)]);
        }

        // Cerrar la sentencia
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(["error" => "Error al preparar la consulta: " . mysqli_error($conn)]);
    }

    // Cerrar la conexión
    mysqli_close($conn);
} else {
    echo json_encode(["error" => "Método de solicitud no válido."]);
}
