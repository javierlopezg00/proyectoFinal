import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function CentrosVacunacion() {
    

  const baseUrl="http://localhost:80/ws-login/editCentrosVacunacion.php";
  const [data, setData]=useState([]);



  //Controlar cuando se abre y se cierran las ventas
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);


  const [vacunaSeleccionada, setvacunaSeleccionada]=useState({
    numero: '',
    nombre: '',
    departamento: '',
    direccion: ''
  });


//Capturar informacion de los imputs
  const handleChange=e=>{
    const {name, value}=e.target;
    setvacunaSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(vacunaSeleccionada);
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
    f.append("numero", vacunaSeleccionada.numero);
    f.append("nombre", vacunaSeleccionada.nombre);
    f.append("departamento", vacunaSeleccionada.departamento);
    f.append("direccion", vacunaSeleccionada.direccion);
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
    f.append("numero", vacunaSeleccionada.numero);
    f.append("nombre", vacunaSeleccionada.nombre);
    f.append("departamento", vacunaSeleccionada.departamento);
    f.append("direccion", vacunaSeleccionada.direccion);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {numero: vacunaSeleccionada.numero}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(centrosV=>{
        if(centrosV.numero===vacunaSeleccionada.numero){
          centrosV.nombre=vacunaSeleccionada.nombre;
          centrosV.departamento=vacunaSeleccionada.departamento;
          centrosV.direccion=vacunaSeleccionada.direccion;
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
    await axios.post(baseUrl, f, {params: {numero: vacunaSeleccionada.numero}})
    .then(response=>{
      setData(data.filter(centrosV=>centrosV.numero!==vacunaSeleccionada.numero));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccioanrVacuna=(centrosV, caso)=>{
    setvacunaSeleccionada(centrosV);

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
        <h1>Centros de Vacunacion</h1>
      <Button color="secondary" onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
        <th>Identificacion:</th>
          <th>Nombre del centro:</th>
          <th>Departamento:</th>
          <th>Dirrecion:</th>
          <th>Acciones:</th>

        </tr>
      </thead>
      <tbody>
        {data.map(centrosV=>(
          <tr key={centrosV.numero}>
            <td>{centrosV.numero}</td>
            <td>{centrosV.nombre}</td>
            <td>{centrosV.departamento}</td>
            <td>{centrosV.direccion}</td>
          <td>
          <Button color="secondary"  onClick={()=>seleccioanrVacuna(centrosV, "Editar")}>Editar</Button> {"  "}
          <Button color="secondary" onClick={()=>seleccioanrVacuna(centrosV, "Eliminar")}>Eliminar</Button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Nueva Centro de vacunacion</ModalHeader>
      <ModalBody>
        <div className="form-group">
       
        <label>Identificacion: </label>
        <br />
        <input type="text" className="form-control" name="numero" onChange={handleChange}/>
        <br />
            
          <label>Nombre del centro: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          <br />
          <label>Departamento: </label>
          <br />
          <input type="text" className="form-control" name="departamento" onChange={handleChange}/>
          <br />
          <label>Dirrecion: </label>
          <br />
          <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={()=>peticionPost()}>Insertar</Button>{"   "}
        <Button color="secondary" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar centro de Vacunacion</ModalHeader>
      <ModalBody>
        <div className="form-group"> 
        <label>Nombre del centro: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={vacunaSeleccionada && vacunaSeleccionada.nombre}/>
          <br />
          <label>Departamento: </label>
          <br />
          <input type="text" className="form-control" name="departamento" onChange={handleChange} value={vacunaSeleccionada && vacunaSeleccionada.departamento}/>
          <br />
          <label>Dirrecion </label>
          <br />
          <input type="text" className="form-control" name="direccion" onChange={handleChange} value={vacunaSeleccionada && vacunaSeleccionada.direccion}/>
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
        ¿Estás seguro que deseas eliminar la centroV {vacunaSeleccionada && vacunaSeleccionada.nombre}?
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
    </ThemeProvider>
  );
}
