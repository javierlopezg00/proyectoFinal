
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import Container from '@mui/material/Container';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';



export default function Reporte1() {

    const fecha1 = React.useRef('');

    const fecha2 = React.useRef('');


    const URL_BASE = "http://localhost/ws-login/moduloControl1.php";

    const [users, setUsers] = React.useState(['']);
    console.log(users);
    const HandleCambiarDisponibilidad = (event) => {
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
                        onClick={HandleCambiarDisponibilidad}
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
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                    
                    {users != '' &&    
                    <div id ="desaparecer">
                    <table id="table-to-xls">
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
            </Box>
        </div>




    );
}