import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
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



  const baseUrl="http://localhost:80/ws-login/editMethod.php";
  const [data, setData]=useState([]);



  //Controlar cuando se abre y se cierran las ventas
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);


  const [usuarioSeleccionado, setusuarioSeleccionado]=useState({
    dpi: '',
    nombre: '',
    apellido: '',
    correo: '', 
    clave: '',
    fecha_de_nacimiento: '',
    enfermedad: '',
    celular: '',
    tipoUsuario: '',
    grupoPrioritario: '',
    centro: ''
  });


//Capturar informacion de los imputs
  const handleChange=e=>{
    const {name, value}=e.target;
    setusuarioSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(usuarioSeleccionado);
  }

  //Metodo para abrir y cerrar ventantas
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

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
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    //Se guarda toda la informacion
    var f = new FormData();
    f.append("dpi", usuarioSeleccionado.dpi);
    f.append("nombre", usuarioSeleccionado.nombre);
    f.append("apellido", usuarioSeleccionado.apellido);
    f.append("correo", usuarioSeleccionado.correo);
    f.append("clave", usuarioSeleccionado.clave);
    f.append("fecha_de_nacimiento", usuarioSeleccionado.fecha_de_nacimiento);
    f.append("enfermedad", usuarioSeleccionado.enfermedad);
    f.append("grupoPrioritario", usuarioSeleccionado.grupoPrioritario);
    f.append("celular", usuarioSeleccionado.celular);
    f.append("centro", usuarioSeleccionado.centro);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("dpi", usuarioSeleccionado.dpi);
    f.append("nombre", usuarioSeleccionado.nombre);
    f.append("apellido", usuarioSeleccionado.apellido);
    f.append("correo", usuarioSeleccionado.correo);
    f.append("clave", usuarioSeleccionado.clave);
    f.append("fecha_de_nacimiento", usuarioSeleccionado.fecha_de_nacimiento);
    f.append("enfermedad", usuarioSeleccionado.enfermedad);
    f.append("grupoPrioritario", usuarioSeleccionado.grupoPrioritario)
    f.append("celular", usuarioSeleccionado.celular);
    f.append("tipoUsuario", usuarioSeleccionado.tipoUsuario);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {dpi: usuarioSeleccionado.dpi}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(usuarios=>{
        if(usuarios.dpi===usuarioSeleccionado.dpi){
          usuarios.nombre=usuarioSeleccionado.nombre;
          usuarios.apellido=usuarioSeleccionado.apellido;
          usuarios.correo=usuarioSeleccionado.correo;
          usuarios.clave=usuarioSeleccionado.clave;
          usuarios.fecha_de_nacimiento=usuarioSeleccionado.fecha_de_nacimiento;
          usuarios.enfermedad=usuarioSeleccionado.enfermedad;
          usuarios.grupoPrioritario=usuarioSeleccionado.grupoPrioritario;
          usuarios.celular=usuarioSeleccionado.celular;
          usuarios.tipoUsuario=usuarioSeleccionado.tipoUsuario;
        }
      });
      setData(dataNueva);
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

  return (
    <ThemeProvider theme={theme}>
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    <div style={{textAlign: 'center'}}>
<br />
      <Button color="secondary" onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>DPI</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Clave</th>
          <th>Fecha de nacimiento</th>
          <th>Enfermedad</th>
          <th>grupoPrioritario</th>
          <th>Celular</th>
          <th>Tipo Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(usuarios=>(
          <tr key={usuarios.dpi}>
            <td>{usuarios.dpi}</td>
            <td>{usuarios.nombre}</td>
            <td>{usuarios.apellido}</td>
            <td>{usuarios.correo}</td>
            <td>{usuarios.clave}</td>
            <td>{usuarios.fecha_de_nacimiento}</td>
            <td>{usuarios.enfermedad}</td>
            <td>{usuarios.grupoPrioritario}</td>
            <td>{usuarios.celular}</td>
            <td>{usuarios.tipoUsuario}</td>
          <td>
          <Button color="secondary"  onClick={()=>seleccionarUsuario(usuarios, "Editar")}>Editar</Button> {"  "}
          <Button color="secondary" onClick={()=>seleccionarUsuario(usuarios, "Eliminar")}>Eliminar</Button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Nuevo Usuario</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>DPI: </label>
          <br />
          <input type="text" className="form-control" name="dpi" onChange={handleChange}/>
          <br />
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          <br />
          <label>Apellido: </label>
          <br />
          <input type="text" className="form-control" name="apellido" onChange={handleChange}/>
          <br />
          <label>Correo: </label>
          <br />
          <input type="text" className="form-control" name="correo" onChange={handleChange}/>
          <br />
          <label>Celular: </label>
          <br />
          <input type="text" className="form-control" name="celular" onChange={handleChange}/>
          <br />
          <label>Clave: </label>
          <br />
          <input type="password" className="form-control" name="clave" onChange={handleChange}/>
          <br />
          <label>Fecha de Nacimiento: </label>
          <br />
          <input type="date" className="form-control" name="fecha_de_nacimiento" onChange={handleChange}/>
          <br />
          <label>Enfermedad: </label>
          <br />
          <select className="form-control" name="enfermedad" onChange={handleChange}>
          <option>null</option>
          <option>no</option>
          <option>si</option>
          </select>
          <br />
          <label>Grupo Prioritario: </label>
          <br />
          <select className="form-control" name="grupoPrioritario" onChange={handleChange}>
          <option>null</option>
          <option>no</option>
          <option>si</option>
          </select>
          <label>Vacuna: </label>
        <br />
          <select name="centro" className="form-control" onChange={handleChange}> 
          <option>null</option>
                  {datas.map(centro=>(
                      <option>{centro.nombre}</option>
                  ))}
                </select>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={()=>peticionPost()}>Insertar</Button>{"   "}
        <Button color="secondary" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar usuarios</ModalHeader>
      <ModalBody>
        <div className="form-group">
       
        
        <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre}/>
          <br />
          <label>Apellido: </label>
          <br />
          <input type="text" className="form-control" name="apellido" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellido}/>
          <br />
          <label>Correo: </label>
          <br />
          <input type="text" className="form-control" name="correo" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.correo}/>
          <br />
          <label>Celular: </label>
          <br />
          <input type="text" className="form-control" name="celular" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.celular}/>
          <br />
          <label>Clave: </label>
          <br />
          <input type="password" className="form-control" name="clave" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.clave}/>
          <br />
          <label>Fecha de Nacimiento: </label>
          <br />
          <input type="date" className="form-control" name="fecha_de_nacimiento" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.fecha_de_nacimiento}/>
          <br />
          <label>Enfermedad: </label>
          <br />
          <select className="form-control" name="enfermedad" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.enfermedad}>
          <option>null</option>
          <option>no</option>
          <option>si</option>
          </select>
          <br />
          <label>Grupo Prioritario: </label>
          <br />
          <select className="form-control" name="grupoPrioritario" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.grupoPrioritario}>
          <option>null</option>
          <option>no</option>
          <option>si</option>
          </select>
         
          <label>Tipo Usuario: </label>
          <br />
          <select name="tipoUsuario" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.tipoUsuario}>

          <option>UsuarioLogeado</option>

          <option>Administrador</option>

          <option>TrabajadorDeSalud</option>

          </select>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary"className="btn btn-primary" onClick={()=>peticionPut()}>Editar</Button>{"   "}
        <Button color="secondary"className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el usuario {usuarioSeleccionado && usuarioSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary"   onClick={()=>peticionDelete()}>
            Sí
          </Button>
          <Button color="secondary"
            
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </Button>
        </ModalFooter>
      </Modal>

    </div>
    </Box>
    </ThemeProvider>
  );
}

export default App;