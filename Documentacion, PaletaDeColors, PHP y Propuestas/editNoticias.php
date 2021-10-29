<?php

include 'getPost.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['numero'])){
        $query="select * from noticias where numero=".$_GET['numero'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from noticias";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    
    $numero=$_POST['numero'];
    $titulo=$_POST['titulo'];
    $descripcion=$_POST['descripcion'];
    //Imagen
    $nombre_imagen = $_FILES['imagen']['name']; 
    $tipo_imagen = $_FILES['imagen']['type'];
    if($tipo_imagen == 'image/jpeg' || $tipo_imagen == 'image/jpg' || $tipo_imagen == 'image/png' ){
    //Carpeta destino imagen
    $carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/Imagenes/proyecto-final/';

    //Se mueve la imagen del directorio temporal al directorio esocogido
    move_uploaded_file($_FILES['imagen']['tmp_name'], $carpeta_destino.$nombre_imagen);
    }
    
    $query="INSERT INTO noticias(numero,titulo,descripcion, imagen) VALUES ('$numero', '$titulo','$descripcion', '$nombre_imagen')";
    $resultado=metodoPost($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $numero=$_GET['numero'];
    $titulo=$_POST['titulo'];
    $descripcion=$_POST['descripcion'];
    
    //Imagen
    $nombre_imagen = $_FILES['imagen']['name']; 
    $tipo_imagen = $_FILES['imagen']['type'];
    if($tipo_imagen == 'image/jpeg' || $tipo_imagen == 'image/jpg' || $tipo_imagen == 'image/png' ){
    //Carpeta destino imagen
    $carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/Imagenes/proyecto-final/';

    //Se mueve la imagen del directorio temporal al directorio esocogido
    move_uploaded_file($_FILES['imagen']['tmp_name'], $carpeta_destino.$nombre_imagen);
    }

    $query="UPDATE noticias SET titulo='$titulo',descripcion='$descripcion' WHERE numero = '$numero'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $numero=$_GET['numero'];
    $query="DELETE FROM noticias WHERE numero = '$numero'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>