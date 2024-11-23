<?php
include 'conex.php'; // Asegúrate de que el archivo conex.php esté correctamente configurado

// Verificar si se recibieron los datos mediante el método POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $mensaje = $_POST['mensaje'];

    // Verificar si todos los campos tienen valores
    if (empty($nombre) || empty($correo) || empty($mensaje)) {
        die();
    }

    // Preparar la consulta SQL para insertar los datos en la tabla contactos
    $sql = "INSERT INTO contactosDesWeb (nombre, correo, mensaje) VALUES (?, ?, ?)";

    // Preparar la sentencia
    $stmt = mysqli_prepare($conn, $sql);
    if ($stmt) {
        // Enlazar los parámetros
        mysqli_stmt_bind_param($stmt, "sss", $nombre, $correo, $mensaje);

        // Ejecutar la sentencia
        mysqli_stmt_execute($stmt);

        // Cerrar la sentencia
        mysqli_stmt_close($stmt);
    }

    // Cerrar la conexión
    mysqli_close($conn);
}
?>
