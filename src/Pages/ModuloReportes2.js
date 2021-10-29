
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Container from '@mui/material/Container';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';



export default function ModuloReportes2() {

    //Obtener centros de vacunacion
  const [datas, setDatas]=useState([]);
  const baseUrlVacunas="http://localhost:80/ws-login/centrosVDinamicos.php";
  const peticionGet2=async()=>{
    await axios.get(baseUrlVacunas)
    .then(response=>{
      setDatas(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    peticionGet2();
  },[])

  //Capturar informacion de los imputs
  var centroV;
  const handleChange=e=>{
    centroV=e.target.value;
    console.log(centroV);
  }


  const URL_BASE=  "http://localhost/ws-login/moduloControl2.php";
  const [users, setUsers] = React.useState(['']);

  const crearArchivo = (event) => {
    event.preventDefault();
    const centroE = {
        centroE: centroV
    };

    axios.post(URL_BASE, JSON.stringify(centroE)).then(response => {
        setUsers((response.data));
    });
    
    console.log(users);
    console.log(centroE);
  }

    return (
        <div>
            <Box component="form" noValidate sx={{ mt: 1 }}>
            <Container component="main" maxWidth="xs">
            <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
                    <h2>Centro de vacunacion</h2>
                    <select 
                    name="centro" 
                    className="form-control" 
                    onChange ={handleChange}> 
                     <option>null</option>
                  {datas.map(centro=>(
                      <option>{centro.nombre}</option>
                  ))}
                </select>
                    <Button
                        onClick={crearArchivo}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Crear archivo
                    </Button>


                    
                    <div>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="table-to-xls"
                        filename="VacunadosPorCentro"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                   
                        <div id="desaparecer">
                      {users != '' &&    
                    <table id="table-to-xls">
                    <th>dpi</th>
                    <th>nombre</th>
                    <th>Centro de Vacunacion</th>
                    <th>Primer Dosis Puesta</th>
                    <th>CSegunda Dosis Puesta</th>
                    {users.map((n) => (
                        <tr>
                        {
                          n.map((v) => (
                            <td>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </table>
                          }
                          </div>
                    </div> 
                </Box>
                </Container>
            </Box>
        </div>




    );
}