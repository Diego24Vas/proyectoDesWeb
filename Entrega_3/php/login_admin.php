<?php
include('conex.php'); // Asegúrate de que conex.php contiene $conn

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = md5($_POST['password']);


    $sql = "SELECT * FROM adminDesWeb WHERE id = ? AND clave = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            session_start();
            $_SESSION['id'] = $username;
            header("Location: ../admin/index.html"); // Redirigir al index de admin
            exit;
        } else {
            echo "Usuario o contraseña incorrectos";
        }
        $stmt->close();
    } else {
        echo "Error en la consulta: " . $conn->error;
    }
    $conn->close();
}
?>
