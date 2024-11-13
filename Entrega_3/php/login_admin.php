<?php
// Incluir el archivo de conexión
include('conex.php');

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $username = $_POST['identificador'];
    $password = $_POST['password'];

    // Consulta para buscar el usuario en la base de datos
    $sql = "SELECT * FROM adminDesWeb WHERE id = :identificador AND password = :clave";

    try {
        // Preparar la consulta
        $stmt = $conn->prepare($sql);

        // Bind de los parámetros para evitar inyecciones SQL
        $stmt->bindParam(':identificador', $username);
        $stmt->bindParam(':clave', $password);

        // Ejecutar la consulta
        $stmt->execute();

        // Verificar si se encontró un resultado
        if ($stmt->rowCount() > 0) {
            // Usuario y contraseña correctos, iniciar sesión o redirigir
            session_start();
            $_SESSION['identificador'] = $username;
            header("Location: dashboard.php"); // Redirigir a la página principal después de iniciar sesión
            exit;
        } else {
            // Usuario o contraseña incorrectos
            echo "Usuario o contraseña incorrectos";
        }
    } catch (PDOException $e) {
        // Si hay algún error en la consulta, mostrar mensaje
        echo "Error: " . $e->getMessage();
    }
}
?>
