<?php

include 'getPost.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['numero'])){
        $query="select * from centrosdevacunacion where numero=".$_GET['numero'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from centrosdevacunacion";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    
    $numero=$_POST['numero'];
    $nombre=$_POST['nombre'];
    $departamento=$_POST['departamento'];
    $direccion=$_POST['direccion'];

    

    $fechaActual = date('Y-m-d');
    $primerDosis = date('Y-m-d',strtotime($fechaActual."+ 7 day"));

    $query="insert into centrosdevacunacion(numero, nombre, departamento, direccion) values('$numero','$nombre','$departamento','$direccion')";
    $resultado=metodoPost($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $numero=$_GET['numero'];
    $nombre=$_POST['nombre'];
    $departamento=$_POST['departamento'];
    $direccion=$_POST['direccion'];
    
    $query="UPDATE centrosdevacunacion SET nombre='$nombre', departamento='$departamento', direccion='$direccion' WHERE numero = '$numero'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $numero=$_GET['numero'];
    $query="delete from centrosdevacunacion where numero = '$numero' ";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>