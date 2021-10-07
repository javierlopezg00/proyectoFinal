<?php

include 'getPost.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['dpi'])){
        $query="select * from usuarios where dpi=".$_GET['dpi'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from usuarios";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    
    $dpi=$_POST['dpi'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $correo=$_POST['correo'];
    $clave=$_POST['clave'];
    $fecha_de_nacimiento=$_POST['fecha_de_nacimiento'];
    $enfermedad=$_POST['enfermedad'];
    $celular=$_POST['celular'];
    $tipoUsuario = 'UsuarioLogeado';
    

    $fechaActual = date('Y-m-d');
    $primerDosis = date('Y-m-d',strtotime($fechaActual."+ 7 day"));

    $query="call fechaUsuario('$dpi','$nombre','$apellido','$correo', '$clave', '$fecha_de_nacimiento', '$enfermedad', '$celular', '$tipoUsuario','$primerDosis')";
    $resultado=metodoPost($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $dpi=$_GET['dpi'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $correo=$_POST['correo'];
    $clave=$_POST['clave'];
    $fecha_de_nacimiento=$_POST['fecha_de_nacimiento'];
    $enfermedad=$_POST['enfermedad'];
    $celular=$_POST['celular'];
    $tipoUsuario = $_POST['tipoUsuario'];
    $query="UPDATE usuarios SET nombre='$nombre', apellido='$apellido', correo='$correo', clave='$clave', fecha_de_nacimiento='$fecha_de_nacimiento', enfermedad='$enfermedad', celular='$celular', tipoUsuario = '$tipoUsuario' WHERE dpi='$dpi'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $dpi=$_GET['dpi'];
    $query="call borrarUsuario('$dpi')";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>