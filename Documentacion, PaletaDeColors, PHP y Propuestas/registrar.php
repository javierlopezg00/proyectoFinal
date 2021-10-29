<?php
	include "conectar.php";
    $conn = conectarDB();
	
	
	$dpi= "1";
	$nombre= "Jose";
	$apellido= "Jiménez Blanco";
	$correo= "2";	
    $clave = password_hash("1234", PASSWORD_DEFAULT);
    $fecha_de_nacimiento = "2000/10/05";
    $enfermedad = "Cancer";
    $celular = "5000";
	
	
	
	

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO registrousuarios (dpi, nombre, apellido, correo, clave, fecha_de_nacimiento, enfermedad, celular)
VALUES ('$dpi', '$nombre', '$apellido', '$correo', '$clave', '$fecha_de_nacimiento','$enfermedad', '$celular' )";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
	
//fuente https://www.w3schools.com/php/php_mysql_insert.asp
?>