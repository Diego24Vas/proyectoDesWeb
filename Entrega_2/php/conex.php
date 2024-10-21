<?php
$servername = "db.inf.uct.cl"; // Nombre del servidor
$username = "rpedraza";  // Nombre de usuario de la base de datos
$password = "jV25+CCMgXZaG9360";  // Contraseña de la base de datos
$dbname = "A2024_rpedraza";  // Nombre de la base de datos

// Crear conexión usando mysqli_connect
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verificar conexión
if (!$conn) {
    die(json_encode(["error" => "Conexión fallida: " . mysqli_connect_error()]));
}

?>
