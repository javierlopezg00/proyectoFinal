import '../App.scss';
import * as React from 'react';



export default function HomePageComponent(props) {
  return (
    <div id="divHomePage">
    <div id="divParrafoNews">
    <p>{props.contenido}</p>
    </div>
    <div id="divfotoNoticias">
    <img src={props.imagen} id="fotoNoticias" alt="COVID INFO"/>
</div>
</div>
)
}
