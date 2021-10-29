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


	$centroE = $dataObject->centroE;


	$sql = "select u.dpi,u.nombre, c.centroVacunacionE, uc.primerDosisPuesta, uc.segundaDosisPuesta FROM usuarios u
    inner join centrovacunacione c on u.dpi = c.dpi
    inner join usuariosvalidadosvacuna uv on c.dpi = uv.dpi 
    inner join usuariovacunado uc on c.dpi = uc.dpi
    where uv.validado='si' AND c.centroVacunacionE ='$centroE' AND uc.primerDosisPuesta = 'si' OR uc.segundaDosisPuesta = 'si' ;";

	$consulta = $mysqli->query($sql);


	if ($consulta == TRUE) {
		echo json_encode($consulta->fetch_all());
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}

$mysqli->close();


?>