<?php

include 'getPost.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['numero'])){
        $query="select * from vacunas where numero=".$_GET['numero'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from vacunas";
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
    $numeroDosis=$_POST['numeroDosis'];
    $tiempoEntreDosis=$_POST['tiempoEntreDosis'];

    

    $fechaActual = date('Y-m-d');
    $primerDosis = date('Y-m-d',strtotime($fechaActual."+ 7 day"));

    $query="insert into vacunas(numero, nombre, numeroDosis, tiempoEntreDosis) values('$numero','$nombre','$numeroDosis','$tiempoEntreDosis')";
    $resultado=metodoPost($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $numero=$_GET['numero'];
    $nombre=$_POST['nombre'];
    $numeroDosis=$_POST['numeroDosis'];
    $tiempoEntreDosis=$_POST['tiempoEntreDosis'];
    
    $query="UPDATE vacunas SET nombre='$nombre', numeroDosis='$numeroDosis', tiempoEntreDosis='$tiempoEntreDosis' where numero = '$numero' ";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $numero=$_GET['numero'];
    $query="delete from vacunas where numero = '$numero' ";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>