<?php
include('conex.php'); // Asegúrate de que conex.php contiene $conn

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = md5($_POST['password']);

    $sql = "SELECT id FROM adminDesWeb WHERE id = ? AND clave = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            session_start();
            $_SESSION['username'] = $username;
            $_SESSION['admin_id'] = $row['id']; // Almacena el id en la sesión
            header("Location: ../admin/"); // Redirigir al index de admin
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
