<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

    include "conectar.php";
    $mysqli = conectarDB();
    session_start();    
    $mysqli->set_charset('utf8');
if ($query = $mysqli->prepare("select * from correo 
                    where (primerDosis = date(date_add(now(),interval 7 day)))
                    or (segundaDosis = date(date_add(now(),interval 7 day)));")) 
{ 
  $query->execute();
  $resultado = $query->get_result();
  for ($i=0 ; $i< $resultado->num_rows ; $i++) {

	$data = $resultado->fetch_assoc();
	$destino = $data['correo'];
	$asunto = "Recordatorio Vacuna";
	$centro = $data['centroVacunacionE'];
	$contenido = "Recordatorio: Su vacunacion es la proxima semana,en el centro de: $centro ";
	$extra = "Sistema covid";

	if (mail($destino, $asunto, $contenido, $extra)) {
		echo "Correo enviado a $destino...";
	} else {
		echo "Problemas con el envio";
	}

 }

}  
$mysqli->close();
?>