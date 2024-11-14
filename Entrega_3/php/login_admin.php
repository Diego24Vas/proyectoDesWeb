<?php
include('conex.php'); // Asegúrate de que conex.php contiene $conn

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $clave = md5($_POST['clave']);

    $sql = "SELECT * FROM adminDesWeb WHERE id = ? AND clave = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ss", $id, $clave);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            session_start();
            $_SESSION['id'] = $id;
            header("Location: ../admin/index.php"); // Redirigir al index de admin
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
