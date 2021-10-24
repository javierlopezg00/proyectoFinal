import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function ModuloReportes() {

  const baseUrl="http://localhost:80/ws-login/editMethod.php";
  const [usuarioSeleccionado, setusuarioSeleccionado]=useState({
    fecha1: '',
    fecha2: ''
  });
  const [data, setData]=useState([]);

  const handleChange=e=>{
    const {name, value}=e.target;
    setusuarioSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(usuarioSeleccionado);
  }

  const peticionPost=async()=>{
    //Se guarda toda la informacion
    var f = new FormData();
    f.append("fecha1", usuarioSeleccionado.fecha1);
    f.append("fecha2", usuarioSeleccionado.fecha2);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
    }).catch(error=>{
      console.log(error);
    })
  }
    return (
        <div>
        <Box
            sx={{
              marginTop: 8,
            }}
          >
           <h1>Personas vacunadas de una fecha hasta otra</h1>
           <TextField type ="date" name="fecha1" onChange={handleChange}/>
           <TextField type ="date" name="fecha2"  onChange={handleChange}/>
           <TextField type ="button" value="Descargar" onClick="peticionPost"/>
           </Box>
        </div>
    )
}
