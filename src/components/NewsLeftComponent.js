import '../App.scss';
import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';

export default function NewsLeftComponent(props) {
  return (
    <div id="divNoticias">
    <div id="divfotoNoticias">
    <Card sx={{ maxWidth: 700 }}>
        <CardMedia 
        component="img"
        height="300"
        image={"http://localhost:80/Imagenes/proyecto-final/" + props.imagen}
        alt="vacunacion"
         alt="spiderman"/>
        </Card>
    </div>
        <div id="divTituloParrafo">
        <h1>{props.titulo}</h1>
        <p>{props.descripcion}</p>
        </div>
    </div>
  );
}
//"rfc" to create a export default function