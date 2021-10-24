import React from 'react';
import Box from '@mui/material/Box';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

export default function Profile() {

    const data = JSON.parse(localStorage.getItem('info'));

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
              <Text>Tipo de usuario: {data.tipoUsuario}</Text>
              <Text>Nombre: {data.nombre}</Text>
              <Text>Apellido: {data.apellido}</Text>
              <Text>Celular: {data.celular}</Text>
              <Text>Fecha de nacimiento: {data.fecha_de_nacimiento}</Text>
              <Text>Enfermedad Cronica: {data.enfermedad}</Text>
              <Text>Grupo Prioritario: {data.grupoPrioritario}</Text>
            </View>
            <View style={styles.section}>
            <Text>Datos Vacunacion</Text>
            <Text>Validado para vacunacion: {data.validado}</Text>
            <Text>Fecha Primer Dosis: {data.primerDosis}</Text>
            <Text>Fecha Segunda Dosis: {data.segundaDosis}</Text>
            <Text>Centro De Vacunacion: {data.centroVacunacionE}</Text>
            <Text>Vacuna: {data.vacuna}</Text>
            <Text>Primer Dosis Puesta: {data.primerDosisPuesta}</Text>
            <Text>Segunda Dosis Puesta: {data.segundaDosisPuesta}</Text>
            <Text>Token: {data.token}</Text>
            </View>
          </Page>
        </Document>
      );

    return (
        <div>
        <Box
            sx={{
              marginTop: 8,
              
            }}
          >
        <div id="contenedoresPerfil">
        <br/>
        <h4>{data.saludo}</h4>
        <div id="contenedorPerfil">
            <h1>Datos Personales</h1>
            <h4>Tipo de usuario: </h4> <p>{data.tipoUsuario}</p>
            <h4>Nombre: </h4><p>{data.nombre}</p>
            <h4>Apellido: </h4><p>{data.apellido}</p>
            <h4>Correo: </h4><p>{data.correo}</p>
            <h4>Celular: </h4><p>{data.celular}</p>
            <h4>Fecha de nacimiento: </h4><p>{data.fecha_de_nacimiento}</p>
            <h4>Enfermedad cronica: </h4><p>{data.enfermedad}</p>
            <h4>Grupo Prioritario: </h4><p>{data.grupoPrioritario}</p>
        </div>
        <PDFDownloadLink document={<MyDocument/>}fileName="datosVacunacion.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Datos vacunacion')}
         </PDFDownloadLink>
        <div id="contenedorPerfil">
            <h1>Datos del Vacunacion</h1>
            <h4>Valido para vacunacion: </h4>{data.validado}<p></p>
            <h4>Fecha Primer Dosis: </h4> <p>{data.primerDosis}</p>
            <h4>Fecha Segunda Dosis: </h4><p>{data.segundaDosis}</p>
            <h4>Centro De Vacunacion: </h4><p>{data.centroVacunacionE}</p>
            <h4>Vacuna: </h4><p>{data.vacuna}</p>
            <h4>Primer Dosis: </h4><p>{data.primerDosisPuesta}</p>
            <h4>Segunda Dosis: </h4><p>{data.segundaDosisPuesta}</p>
            <h4>Token: </h4><p>{data.token}</p>
        </div>
        </div>
        </Box>
        
        </div>
    )
}
