<?php
// Incluir el archivo de conexión
include 'conex.php';

// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $cargo = $_POST['cargo'];
    $password = md5($_POST['password']); // Encriptar la contraseña con md5

    // Preparar la consulta SQL para insertar los datos
    $sql = "INSERT INTO adminDesWeb (id, nombre, apellido, cargo, clave) VALUES ('$id', '$nombre', '$apellido', '$cargo', '$password')";

    // Ejecutar la consulta y verificar si fue exitosa
    if (mysqli_query($conn, $sql)) {
        // Mostrar mensaje de éxito y redirigir a index.html
        echo "<div class='alert alert-success' role='alert'>
                Nuevo usuario agregado exitosamente. Redirigiendo...
              </div>";
        echo "<script>
                setTimeout(function() {
                    window.location.href = '../admin/index.html';
                }, 3000); // Redirigir después de 3 segundos
              </script>";
    } else {
        echo "<div class='alert alert-danger' role='alert'>
                Error: " . $sql . "<br>" . mysqli_error($conn) . "
              </div>";
    }

    // Cerrar la conexión
    mysqli_close($conn);
}
?>
