<?php
header('Access-Control-Allow-Origin: *');

$host = "localhost";
$user = "root";
$password = "";
$dbname = "registro-covid";
$emp_no = '';

$con = mysqli_connect($host, $user, $password,$dbname);

mysqli_options($con, MYSQLI_OPT_LOCAL_INFILE, true);

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
switch ($method) {
	case 'GET':
  	$sql = "select id_vacuna, nombre from vacunas";
  	break;

	case 'POST':

	$total_row = count(file($_FILES['csv']['tmp_name']));
	//$file_location = $_FILES['csv']['tmp_name'];
	$file_location = str_replace("\\", "/", $_FILES['csv']['tmp_name']);
	$nombre = $_POST['file'];
	$file = $_FILES['csv'];

	
	$sql = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE usuarios FIELDS TERMINATED BY "," 
    LINES TERMINATED BY "\n" 
    IGNORE 1 LINES 
    (@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9,@column10) 
    SET 
    dpi = @column1, 
    nombre = @column2, 
    apellido = @column3,  
    correo = @column4, 
    clave = @column5, 
    fecha_de_nacimiento = STR_TO_DATE(@column6, "%d/%m/%Y"), 
    enfermedad = @column7, 
    celular = @column8, 
    tipoUsuario = @column9,
    grupoPrioritario = @column10  
    ';
	 

    $sql1 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE usuariosvalidadosvacuna FIELDS TERMINATED BY "," 
    LINES TERMINATED BY "\n" 
    IGNORE 1 LINES 
    (@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9,@column10) 
    SET 
    dpi = @column1, 
    enfermedad = @column7, 
    grupoPrioritario = @column10,  
    fecha_de_nacimiento = STR_TO_DATE(@column6, "%d/%m/%Y"),  
    validado = "no"
    ';
	
    $sql2 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE centrovacunacione FIELDS TERMINATED BY "," 
    LINES TERMINATED BY "\n" 
    IGNORE 1 LINES 
    (@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9,@column10) 
    SET 
    dpi = @column1, 
    centroVacunacionE = "null"
    ';
    $sql3 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE fechavacunacion FIELDS TERMINATED BY "," 
    LINES TERMINATED BY "\n" 
    IGNORE 1 LINES 
    (@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9,@column10) 
    SET 
    dpi = @column1, 
    primerDosis = STR_TO_DATE(0000/00/00, "%Y/%m/%d"),
    segundaDosis = STR_TO_DATE(0000/00/00, "%Y/%m/%d")
    ';
    $sql4 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE usuariovacunado FIELDS TERMINATED BY "," 
    LINES TERMINATED BY "\n" 
    IGNORE 1 LINES 
    (@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9,@column10) 
    SET 
    dpi = @column1, 
    primerDosisPuesta = "no",
    segundaDosisPuesta = "no"
    ';
    $sql5 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE vacunacolocada FIELDS TERMINATED BY "," 
    LINES TERMINATED BY "\n" 
    IGNORE 1 LINES 
    (@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9,@column10) 
    SET 
    dpi = @column1, 
    vacuna = "null"
    ';
    $sql6 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE token FIELDS TERMINATED BY "," 
    LINES TERMINATED BY "\n" 
    IGNORE 1 LINES 
    (@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9,@column10) 
    SET 
    dpi = @column1, 
    token = CONCAT(1,@column1,(RAND() *(999999-10000)+10000))
    ';
}

// run SQL statement
//echo $sql;
$result = mysqli_query($con, $sql);
$result1 = mysqli_query($con, $sql1);
$result2 = mysqli_query($con, $sql2);
$result3 = mysqli_query($con, $sql3);
$result4 = mysqli_query($con, $sql4);
$result5 = mysqli_query($con, $sql5);
$result6 = mysqli_query($con, $sql6);



// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
	$usarray = array();
    	while($row =mysqli_fetch_assoc($result))
    	{
        	$usarray[] = $row;
    	}
    echo json_encode($usarray);
  } else {
	echo json_encode($file_location);
  }

$con->close();


?>