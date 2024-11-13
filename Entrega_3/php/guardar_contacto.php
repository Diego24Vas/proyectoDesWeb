<?php
include 'conex.php'; // Asegúrate de que el archivo conex.php esté correctamente configurado

// Verificar si se recibieron los datos mediante el método POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $mensaje = $_POST['mensaje'];
    
    

    // Verificar si todos los campos tienen valores
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        die(json_encode(["error" => "Todos los campos son obligatorios."]));
    }

    echo "Datos recibidos: Nombre - $nombre, Email - $email, Mensaje - $mensaje"; // Depuración
    // Preparar la consulta SQL para insertar los datos en la tabla contactos
    $sql = "INSERT INTO contactosDesWeb (nombre, email, mensaje) VALUES (?, ?, ?)";

    // Preparar la sentencia
    $stmt = mysqli_prepare($conn, $sql);
    if ($stmt) {
        // Enlazar los parámetros
        mysqli_stmt_bind_param($stmt, "sss", $nombre, $email, $mensaje);

        // Ejecutar la sentencia
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["success" => "Contacto guardado exitosamente."]);
        } else {
            echo json_encode(["error" => "Error al guardar el contacto: " . mysqli_stmt_error($stmt)]);
        }

        // Cerrar la sentencia
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(["error" => "Error al preparar la consulta: " . mysqli_error($conn)]);
    }

    // Cerrar la conexión
    mysqli_close($conn);
}
?>
