import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
//Temas personalizado
const theme = createTheme({
  palette: {
    secondary:{
      main:"#525558",
      light: "#75c7ff",
      dark:"#759eff",
      contrastText: "#ffa43a"
    }
  },
  
});

function App() {



  const baseUrl="http://localhost:80/ws-login/verificacionRegistro.php";
  const [data, setData]=useState([]);
  const [busqueda, setBusqueda]= useState("");



  //Controlar cuando se abre y se cierran las ventas
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);


  const [usuarioSeleccionado, setusuarioSeleccionado]=useState({
    dpi:'',
    vacuna: '',
    segundaDosis: '',
    primerDosisPuesta: '',
    segundaDosisPuesta: ''
  });

//Capturar Informacion al registrar la vacuna
  const handleChange2=e=>{
    const {name, value}=e.target;
    setusuarioSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(usuarioSeleccionado);
  }

//Capturar informacion de los imputs BUSQUEDA
const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}
//FILTRAR BUSQUEDA
const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    if(elemento.dpi.includes(terminoBusqueda)
    ){
      return elemento;
    }
  });
  setData(resultadosBusqueda);
}



  //Metodo para abrir y cerrar ventantas
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
      setTablaUsuarios(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }



  const peticionPut=async()=>{
    var f = new FormData();
    f.append("vacuna", usuarioSeleccionado.vacuna);
    f.append("segundaDosis", usuarioSeleccionado.segundaDosis);
    f.append("primerDosisPuesta", usuarioSeleccionado.primerDosisPuesta);
    f.append("segundaDosisPuesta", usuarioSeleccionado.segundaDosisPuesta);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {dpi: usuarioSeleccionado.dpi}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(usuarios=>{
        if(usuarios.dpi===usuarioSeleccionado.dpi){
          usuarios.vacuna=usuarioSeleccionado.vacuna;
          usuarios.segundaDosis=usuarioSeleccionado.segundaDosis;
          usuarios.primerDosisPuesta=usuarioSeleccionado.primerDosisPuesta;
          usuarios.segundaDosisPuesta=usuarioSeleccionado.segundaDosisPuesta;
        }
      });
      setData(dataNueva);
      console.log("efectuad");
      abrirCerrarModalEditar();

    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {dpi: usuarioSeleccionado.dpi}})
    .then(response=>{
      setData(data.filter(usuarios=>usuarios.dpi!==usuarioSeleccionado.dpi));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarUsuario=(usuarios, caso)=>{
    setusuarioSeleccionado(usuarios);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <ThemeProvider theme={theme}>
    <div style={{textAlign: 'center'}}>
<br />
<Container component="main" maxWidth="xs">
    <Box >
    <Typography component="h1" variant="h3">
            Registro de vacunas
          </Typography>
          <Typography component="h1" variant="h5">
            Ingrese el dpi del usuario
          </Typography>
    <TextField
      margin="normal"
      required
      fullWidth
      label="DPI"
      value={busqueda}
      onChange ={handleChange}
    />
    </Box>
</Container>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>DPI</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Vacuna</th>
          <th>Fecha Dosis 1</th>
          <th>Fecha Dosis 2</th>
          <th>Dosis 1 Colocada</th>
          <th>Dosis 2 Colocada</th>
          <th>Registrar Dosis</th>

        </tr>
      </thead>
      <tbody>
        {data.map(usuarios=>(
          <tr key={usuarios.dpi}>
            <td>{usuarios.dpi}</td>
            <td>{usuarios.nombre}</td>
            <td>{usuarios.apellido}</td>
            <td>{usuarios.vacuna}</td>
            <td>{usuarios.primerDosis}</td>
            <td>{usuarios.segundaDosis}</td>
            <td>{usuarios.primerDosisPuesta}</td>
            <td>{usuarios.segundaDosisPuesta}</td>
          <td>
          <Button color="secondary"  onClick={()=>seleccionarUsuario(usuarios, "Editar")}>Registrar Dosis</Button> {"  "}
          </td>
          </tr>
        ))}


      </tbody> 

    </table>

    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar usuarios</ModalHeader>
      <ModalBody>
        <div className="form-group">

        <label>Vacuna: </label>
        <br />
          <select name="vacuna" onChange={handleChange2} value={usuarioSeleccionado && usuarioSeleccionado.vacuna}>

          <option>null</option>

          <option>Sputnik</option>

          <option>Moderna</option>

          <option>Astrazeneca</option>

          </select>
          <br />
          <br />
          <label>Fecha Dosis 2: </label>
          <br />
          <input type="date"  className="form-control" name="segundaDosis" onChange={handleChange2} value={usuarioSeleccionado && usuarioSeleccionado.segundaDosis}/>
          <br />
          
          <label>Dosis 1 colocada: </label><br/>
          <select name="primerDosisPuesta" onChange={handleChange2} value={usuarioSeleccionado && usuarioSeleccionado.primerDosisPuesta}>
          <option>No</option>
          <option>Si</option>
          </select>
          <br/>
          <br/>
          <label>Dosis 2 colocada: </label><br/>
          <select name="segundaDosisPuesta" onChange={handleChange2} value={usuarioSeleccionado && usuarioSeleccionado.segundaDosisPuesta}>
          <option>No</option>
          <option>Si</option>
          </select>

        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary"className="btn btn-primary" onClick={()=>peticionPut()}>Registrar Vacuna</Button>{"   "}
        <Button color="secondary"className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>

  

    </div>
    </ThemeProvider>
  );
}

export default App;