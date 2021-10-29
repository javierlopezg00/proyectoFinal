
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import Container from '@mui/material/Container';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';



export default function ModuloReportes() {

    const token = React.useRef('');



    const URL_BASE = "http://localhost/ws-login/token.php";

    const [users, setUsers] = React.useState(['']);
    console.log(users);
    const crearArchivo = (event) => {
        event.preventDefault();
        const fechasss = {
            token: token.current.value,
        };
            axios.post(URL_BASE, JSON.stringify(fechasss)).then(response => {
                setUsers((response.data));
            });
            console.log(fechasss);
            console.log(users);
    };

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
          
        }
      });

    const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Datos Personales</Text>
              <Text>{users.map((n)=>(
                <Text>DPI: {n[0]}</Text>
              ))}</Text>
              <Text>{users.map((n)=>(
                <Text>Nombre: {n[1]}</Text>
              ))}</Text>
              <Text>{users.map((n)=>(
                <Text>Apellido: {n[2]}</Text>
              ))}</Text>
              <Text>{users.map((n)=>(
                <Text>Primer Fecha Vacunacion: {n[3]}</Text>
              ))}</Text>
              <Text>{users.map((n)=>(
                <Text>Segunda Fecha Vacunacion: {n[4]}</Text>
              ))}</Text>
              <Text>{users.map((n)=>(
                <Text>Vacuna: {n[5]}</Text>
              ))}</Text>
              <Text>{users.map((n)=>(
                <Text>Centro Vacunacion: {n[6]}</Text>
              ))}</Text>
              <Text>{users.map((n)=>(
                <Text>Token: {n[7]}</Text>
              ))}</Text>
            </View>
            
          </Page>
        </Document>
      );
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
          <h1>Proceso de Vacunacion</h1>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="fecha1"
                        type="text"
                        label="Escriba su Token"
                        inputRef={token}
                    />
                    <Button
                        onClick={crearArchivo}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Generar PDF


                    </Button>


                </Box>
{users != '' &&  
                <PDFDownloadLink document={<MyDocument/>}fileName="datosVacunacion.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Datos vacunacion')}
         </PDFDownloadLink>
}
                </Container>
            </Box>
        </div>




    );
}