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



  const baseUrl="http://localhost:80/ws-login/editNoticias.php";
  const [data, setData]=useState([]);



  //Controlar cuando se abre y se cierran las ventas
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);


  const [noticiaSeleccionada, setnoticiaSeleccionada]=useState({
    numero: '',
    titulo: '',
    descripcion: ''
  });

  const [usuarioSeleccionado2, setusuarioSeleccionado2]=useState({
    imagen: ''
  });

//Capturar informacion de los imputs
  const handleChange=e=>{
    const {name, value}=e.target;
    setnoticiaSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(noticiaSeleccionada);
  }


  const handleChange2=e=>{
    setusuarioSeleccionado2({
       imagen: e.target.files[0]
    })
    console.log(noticiaSeleccionada);
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
    f.append("numero", noticiaSeleccionada.numero);
    f.append("titulo", noticiaSeleccionada.titulo);
    f.append("descripcion", noticiaSeleccionada.descripcion);
    f.append("imagen", usuarioSeleccionado2.imagen);
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
    f.append("numero", noticiaSeleccionada.numero);
    f.append("titulo", noticiaSeleccionada.titulo);
    f.append("descripcion", noticiaSeleccionada.descripcion);
    f.append("imagen", usuarioSeleccionado2.imagen);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {numero: noticiaSeleccionada.numero}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(noticias=>{
        if(noticias.numero===noticiaSeleccionada.numero){
          noticias.titulo=noticiaSeleccionada.titulo;
          noticias.descripcion=noticiaSeleccionada.descripcion;
          noticias.imagen=usuarioSeleccionado2.imagen;
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
    await axios.post(baseUrl, f, {params: {numero: noticiaSeleccionada.numero}})
    .then(response=>{
      setData(data.filter(noticias=>noticias.numero!==noticiaSeleccionada.numero));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarUsuario=(noticias, caso)=>{
    setnoticiaSeleccionada(noticias);
    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }
  useEffect(()=>{
    peticionGet();
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
          <th>Numero</th>
          <th>Titulo</th>
          <th>Descripcion</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(noticias=>(
          <tr key={noticias.numero}>
            <td>{noticias.numero}</td>
            <td>{noticias.titulo}</td>
            <td>{noticias.descripcion}</td>
            <td>{noticias.imagen}</td>
          <td>
          <Button color="secondary"  onClick={()=>seleccionarUsuario(noticias, "Editar")}>Editar</Button> {"  "}
          <Button color="secondary" onClick={()=>seleccionarUsuario(noticias, "Eliminar")}>Eliminar</Button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Nuevo Usuario</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Numero: </label>
          <br />
          <input type="text" className="form-control" name="numero" onChange={handleChange} />
          <br />
          <label>Titulo: </label>
          <br />
          <input type="text" className="form-control" name="titulo" onChange={handleChange}/>
          <br />
          <label>Descripcion: </label>
          <br />
          <input type="text" className="form-control" name="descripcion" onChange={handleChange}/>
          <br />
          <label>Imagen: </label>
          <br />
          <input type="file" accept='.jpg, .png, .jpeg' className="form-control" name="imagen" onChange={handleChange2}/> 
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={()=>peticionPost()}>Insertar</Button>{"   "}
        <Button color="secondary" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar noticias</ModalHeader>
      <ModalBody>
        <div className="form-group">
       
        
        <label>Titulo: </label>
          <br />
          <input type="text" className="form-control" name="titulo" onChange={handleChange} value={noticiaSeleccionada && noticiaSeleccionada.titulo}/>
          <br />
          <label>Descripcion: </label>
          <br />
          <input type="text" className="form-control" name="descripcion" onChange={handleChange} value={noticiaSeleccionada && noticiaSeleccionada.descripcion}/>
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
        ¿Estás seguro que deseas eliminar el noticias {noticiaSeleccionada && noticiaSeleccionada.titulo}?
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