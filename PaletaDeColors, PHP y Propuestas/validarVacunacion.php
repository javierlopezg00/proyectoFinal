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


    $enfermedad = $dataObject -> enfermedad;
    $uPrioritario = $dataObject -> uPrioritario;
    $fecha_validacion = $dataObject -> fecha_validacion;

    

    $sql = "call updateVacunaValidacion('$enfermedad', '$uPrioritario', '$fecha_validacion')";


    $result = mysqli_query($mysqli,$sql);

    if ($method == 'POST') {
        echo json_encode($result);
      } else {
        echo mysqli_affected_rows($con);
      }
    
    $mysqli->close();
?>