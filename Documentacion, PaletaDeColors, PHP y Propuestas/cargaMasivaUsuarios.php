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
	 
	
}

// run SQL statement
//echo $sql;
$result = mysqli_query($con, $sql);


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