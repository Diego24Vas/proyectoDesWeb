<?php
$servername = "db.inf.uct.cl";    // Nombre del servidor
$username = "rpedraza";           // Nombre de usuario de la base de datos
$password = "jV25+CCMgXZaG9360";  // Contraseña de la base de datos
$dbname = "A2024_rpedraza";       // Nombre de la base de datos

try {
    // Crear conexión usando PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    
    // Establecer el modo de error de PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    // Si hay un error en la conexión, mostrar mensaje
    die(json_encode(["error" => "Conexión fallida: " . $e->getMessage()]));
}
?>
