
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Container from '@mui/material/Container';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';



export default function ModuloReportes3() {
  const URL_BASE=  "http://localhost/ws-login/moduloControl3.php";
  const [users, setUsers] = React.useState(['']);

  const crearArchivo = (event) => {
    event.preventDefault();

    axios.get(URL_BASE).then(response => {
        setUsers((response.data));
    });
    console.log("das");
    console.log(users);
  };

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
                    <h2>Usuarios que ya ingresaron al portal</h2>
                   
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
                        filename="IngresoAlPortal"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>


                    {users != '' &&    
                    <div id ="desaparecer">
                    <table id="table-to-xls">
                    <tr>
                    <th>dpi</th>
                    <th>nombre</th>
                    <th>Tipo de Usuario</th>
                    </tr>
                    {users.map((n) => (
                        <tr key={n.dpi}>
                        {
                          n.map((v) => (
                            <td>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </table>
                    </div>
                          }
                    </div> 
                    
  
                    
                    
                </Box>
                </Container>
            </Box>
        </div>




    );
}