<?php
session_start();

if (!isset($_SESSION['id'])) {
    header("Location: : ../php/login_admin.php");
    exit();
}

// Obtener el usuario desde la sesión
$id = $_SESSION['id'];

include('../php/conex.php');

// Verificar si la conexión fue exitosa
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Consulta para obtener el nombre y apellido del usuario
$sql = "SELECT nombre, apellido FROM adminDesWeb WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($nombre, $apellido);

if ($stmt->fetch()) {
    // Usuario encontrado, se puede mostrar su nombre y apellido
} else {
    // En caso de que no se encuentre el usuario
    echo "Usuario no encontrado.";
    exit();
}

$stmt->close();
$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>admin</title>
</head>
<body>
    <p>admin</p>
    <h1 class="display-4">Bienvenido, <?php echo htmlspecialchars($nombre . " " . $apellido); ?>!</h1>
</body>
</html>