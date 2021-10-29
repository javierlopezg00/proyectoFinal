
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Container from '@mui/material/Container';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BotonesModuloReporte from '../components/BotonesModuloReporte';



export default function ModuloReportes4() {

  //Capturar informacion de los imputs
  var dosisE;
  const handleChange=e=>{
    dosisE=e.target.value;
    console.log(dosisE);
  }


  const URL_BASE=  "http://localhost/ws-login/moduloControl4.php";
  const [users, setUsers] = React.useState(['']);

  const crearArchivo = (event) => {
    event.preventDefault();
    const dosis = {
        dosis: dosisE
    };

    axios.post(URL_BASE, JSON.stringify(dosis)).then(response => {
        setUsers((response.data));
    });
    
    console.log(users);
    console.log(dosis);
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
                    <h2>Personas que no asistieron</h2>
                    <select 
                    name="centro" 
                    className="form-control" 
                    onChange ={handleChange}> 
                     <option>null</option>
                    <option>Primer Dosis</option>
                    <option>Segunda Dosis</option>
                    <option>Cualquier Dosis</option>
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
                        filename="Inasistencia"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                   
                        <div id="desaparecer">
                    {users != '' &&    
                    <table id="table-to-xls">
                    <th>dpi</th>
                    <th>nombre</th>
                    <th>Apellido</th>
                    <th>Fecha Primer Dosis</th>
                    <th>Fecha Segunda Dosis</th>
                    <th>Numero de usuarios: {users.length}</th>
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
                <br/>
                <BotonesModuloReporte/>
            </Box>
        </div>




    );
}