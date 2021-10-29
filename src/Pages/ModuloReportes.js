
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import Container from '@mui/material/Container';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BotonesModuloReporte from '../components/BotonesModuloReporte';




export default function ModuloReportes() {

    const fecha1 = React.useRef('');

    const fecha2 = React.useRef('');


    const URL_BASE = "http://localhost/ws-login/moduloControl1.php";

    const [users, setUsers] = React.useState(['']);
    console.log(users);
    const crearArchivo = (event) => {
        event.preventDefault();
        const fechasss = {
            fecha1: fecha1.current.value,
            fecha2: fecha2.current.value
        };
            axios.post(URL_BASE, JSON.stringify(fechasss)).then(response => {
                setUsers((response.data));
            });
            console.log(fechasss);
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
          <h1>Usuarios vacunados Por Fechas</h1>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="fecha1"
                        type="date"
                        defaultValue="0000-00-00"
                        inputRef={fecha1}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="fecha2"
                        type="date"
                        defaultValue="0000-00-00"
                        inputRef={fecha2}
                    />
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
                        filename="UsuariosVacunadosEntreFechas"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                    
                    {users != '' &&    
                    <div id ="desaparecer">
                    <table id="table-to-xls">
                    <th>DPI</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha Primer Vacunacion</th>
                    <th>Fecha Segunda Vacunacion</th>
                    <th>Centro Vacunacion</th>
                    <th>Primer Vacuna Puesta</th>
                    <th>Segunda Vacuna Puesta</th>
                    {users.map((n) => (
                      <tr>
                      {
                        n.map((v) => (
                          <th>{v}</th>
                        ))}
                      </tr>
                    ))}
                    </table>
                    </div>
                        }
                    </div>

                </Box>
                </Container>
                <br/>
                <BotonesModuloReporte/>
                <br/>
            </Box>
        </div>




    );
}