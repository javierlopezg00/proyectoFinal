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

	$dpi = $dataObject-> dpi;
    $nombre = $dataObject-> nombre;
	$apellido =	$dataObject-> apellido;
    $correo =	$dataObject-> correo;
    $clave =	$dataObject-> clave;
    $celular =	$dataObject-> celular;
    $fecha_de_nacimiento =	$dataObject-> fecha_de_nacimiento;
    $enfermedad = $dataObject -> enfermedad;
    $tipoUsuario = "UsuarioLogeado";
    $primerDosis = date('Y-m-d+7');

    $fechaActual = date('Y-m-d');
    $primerDosis = date('Y-m-d',strtotime($fechaActual."+ 7 day"));
    //$segundaDosis = date('Y-m-d',strtotime($fechaActual."+ 3 month"));

    //$sql = $mysqli->prepare("CALL insertar(?,?,?,?,?,?,?,?,?)");
    //$sql->bind_param("issssssis", $dpi, $nombre,$apellido,$correo,$clave, $celular, $fecha_de_nacimiento, $enfermedad, $tipoUsuario);

    //$sql = "INSERT INTO usuarios (dpi, nombre, apellido, correo, clave, fecha_de_nacimiento, enfermedad, celular)
    //VALUES ('$dpi', '$nombre', '$apellido', '$correo', '$clave', '$fecha_de_nacimiento','$enfermedad', '$celular');";
    
    $sql = "call fechaUsuario('$dpi','$nombre','$apellido','$correo', '$clave', '$fecha_de_nacimiento', '$enfermedad', '$celular', '$tipoUsuario')";


    $result = mysqli_query($mysqli,$sql);

    if ($method == 'POST') {
        echo json_encode($result);
      } else {
        echo mysqli_affected_rows($con);
      }
    
    $mysqli->close();
?>