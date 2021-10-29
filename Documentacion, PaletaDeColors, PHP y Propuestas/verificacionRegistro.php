<?php

include 'getPost.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['dpi'])){
        $query="SELECT * FROM usuarios INNER JOIN fechavacunacion ON usuarios.dpi = fechavacunacion.dpi 
        INNER JOIN usuariovacunado ON fechavacunacion.dpi = usuariovacunado.dpi
        inner join vacunacolocada on fechavacunacion.dpi = vacunacolocada.dpi;";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="SELECT * FROM usuarios INNER JOIN fechavacunacion ON usuarios.dpi = fechavacunacion.dpi 
        INNER JOIN usuariovacunado ON fechavacunacion.dpi = usuariovacunado.dpi
        inner join vacunacolocada on fechavacunacion.dpi = vacunacolocada.dpi;";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHHOD']=='POST'){
    
    $dpi=$_POST['dpi'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $correo=$_POST['correo'];
    $clave=$_POST['clave'];
    $fecha_de_nacimiento=$_POST['fecha_de_nacimiento'];
    $enfermedad=$_POST['enfermedad'];
    $celular=$_POST['celular'];
    $tipoUsuario = $_POST['tipoUsuario'];

    $query="insert into usuarios(dpi, nombre, apellido, correo, clave, fecha_de_nacimiento,enfermedad,celular,tipoUsuario) values ('$dpi', '$nombre', '$apellido', '$correo', '$clave', '$fecha_de_nacimiento','$enfermedad','$celular','$tipoUsuario')";
    $resultado=metodoPost($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $dpi=$_GET['dpi'];
    $segundaDosis=$_POST['segundaDosis'];
    $vacuna=$_POST['vacuna'];
    $primerDosisPuesta=$_POST['primerDosisPuesta'];
    $segundaDosisPuesta=$_POST['segundaDosisPuesta'];
    $query="call registroVacuna($dpi,'$segundaDosis','$vacuna', '$primerDosisPuesta','$segundaDosisPuesta')";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
    
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $dpi=$_GET['dpi'];
    $query="call borrarUsuario('$sql')";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>
