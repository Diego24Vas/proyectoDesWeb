<?php
$servername = ""; // Nombre del servidor
$username = "";   // Nombre de usuario
$password = "";   // Contraseña
$dbname = "";     // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa";
?>