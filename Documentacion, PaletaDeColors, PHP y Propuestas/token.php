<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
$method = $_SERVER['REQUEST_METHOD'];
    include "conectar.php";
    $mysqli = conectarDB();
    //sleep(1);	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $mysqli->set_charset('utf8');


	$token = $dataObject->token;



	$sql = "select u.dpi ,u.nombre, u.apellido, f.primerDosis, f.segundaDosis, v.vacuna, cv.centroVacunacionE, token.token from usuarios u
	inner join fechavacunacion f on u.dpi = f.dpi
	inner join vacunacolocada v on f.dpi = v.dpi
	inner join centrovacunacione cv on f.dpi = cv.dpi
	inner join token on cv.dpi = token.dpi
	where token = '$token';";

	$consulta = $mysqli->query($sql);


	if ($consulta == TRUE) {
		echo json_encode($consulta->fetch_all());
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}

$mysqli->close();


?>