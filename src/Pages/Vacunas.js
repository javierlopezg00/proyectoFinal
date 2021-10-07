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

export default function Vacunas() {
    

  const baseUrl="http://localhost:80/ws-login/editVacunas.php";
  const [data, setData]=useState([]);



  //Controlar cuando se abre y se cierran las ventas
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);


  const [vacunaSeleccionada, setvacunaSeleccionada]=useState({
    numero: '',
    nombre: '',
    numeroDosis: '',
    tiempoEntreDosis: ''
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
    f.append("numeroDosis", vacunaSeleccionada.numeroDosis);
    f.append("tiempoEntreDosis", vacunaSeleccionada.tiempoEntreDosis);
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
    f.append("numeroDosis", vacunaSeleccionada.numeroDosis);
    f.append("tiempoEntreDosis", vacunaSeleccionada.tiempoEntreDosis);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {numero: vacunaSeleccionada.numero}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(vacunas=>{
        if(vacunas.numero===vacunaSeleccionada.numero){
          vacunas.nombre=vacunaSeleccionada.nombre;
          vacunas.numeroDosis=vacunaSeleccionada.numeroDosis;
          vacunas.tiempoEntreDosis=vacunaSeleccionada.tiempoEntreDosis;
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
      setData(data.filter(vacunas=>vacunas.numero!==vacunaSeleccionada.numero));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccioanrVacuna=(vacunas, caso)=>{
    setvacunaSeleccionada(vacunas);

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
        <h1>Vacunas</h1>
      <Button color="secondary" onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
        <th>Identificacion:</th>
          <th>Vacuna:</th>
          <th>Numero de Dosis:</th>
          <th>Tiempo entre dosis(dias):</th>
          <th>Acciones:</th>

        </tr>
      </thead>
      <tbody>
        {data.map(vacunas=>(
          <tr key={vacunas.numero}>
            <td>{vacunas.numero}</td>
            <td>{vacunas.nombre}</td>
            <td>{vacunas.numeroDosis}</td>
            <td>{vacunas.tiempoEntreDosis}</td>
          <td>
          <Button color="secondary"  onClick={()=>seleccioanrVacuna(vacunas, "Editar")}>Editar</Button> {"  "}
          <Button color="secondary" onClick={()=>seleccioanrVacuna(vacunas, "Eliminar")}>Eliminar</Button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Nueva Vacuna</ModalHeader>
      <ModalBody>
        <div className="form-group">
       
        <label>Identificacion: </label>
        <br />
        <input type="text" className="form-control" name="numero" onChange={handleChange}/>
        <br />
            
          <label>Vacuna: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          <br />
          <label>Numero de Dosis: </label>
          <br />
          <input type="text" className="form-control" name="numeroDosis" onChange={handleChange}/>
          <br />
          <label>Tiempo entre dosis(dias): </label>
          <br />
          <input type="text" className="form-control" name="tiempoEntreDosis" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={()=>peticionPost()}>Insertar</Button>{"   "}
        <Button color="secondary" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Vacuna</ModalHeader>
      <ModalBody>
        <div className="form-group"> 
        <label>Vacuna: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={vacunaSeleccionada && vacunaSeleccionada.nombre}/>
          <br />
          <label>Numero de dosis: </label>
          <br />
          <input type="text" className="form-control" name="numeroDosis" onChange={handleChange} value={vacunaSeleccionada && vacunaSeleccionada.numeroDosis}/>
          <br />
          <label>Tiempo entre dosis(dias) </label>
          <br />
          <input type="text" className="form-control" name="numeroDosis" onChange={handleChange} value={vacunaSeleccionada && vacunaSeleccionada.numeroDosis}/>
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
        ¿Estás seguro que deseas eliminar la vacuna {vacunaSeleccionada && vacunaSeleccionada.nombre}?
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
