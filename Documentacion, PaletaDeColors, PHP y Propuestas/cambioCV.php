<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
$method = $_SERVER['REQUEST_METHOD'];
    include "conectar.php";
    $mysqli = conectarDB();
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $mysqli->set_charset('utf8');


	$dpi = $dataObject->dpi;
    $centroV = $dataObject->centroV;



	$sql = "UPDATE centrovacunacione SET
     centroVacunacionE = '$centroV'
         WHERE dpi = '$dpi'";

	$consulta = $mysqli->query($sql);


	if ($consulta == TRUE) {
		echo json_encode($consulta->fetch_all());
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}

$mysqli->close();


?>