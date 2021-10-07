import React from 'react'

export default function Profile() {

    const data = JSON.parse(localStorage.getItem('info'));

    return (
        <div>
        <div id="contenedoresPerfil">
        <div id="contenedorPerfil">
            <h1>Datos del usuario</h1>
            <h4>Tipo de usuario: </h4> <p>{data.tipoUsuario}</p>
            <h4>Nombre: </h4><p>{data.nombre}</p>
            <h4>Apellido: </h4><p>{data.apellido}</p>
            <h4>Correo: </h4><p>{data.correo}</p>
            <h4>Celular: </h4><p>{data.celular}</p>
            <h4>Fecha de nacimiento: </h4><p>{data.fecha_de_nacimiento}</p>
            <h4>Enfermedad cronica: </h4><p>{data.enfermedad}</p>
        </div>
        <div id="contenedorPerfil">
            <h1>Datos del Vacunacion</h1>
            <h4>Fecha Primer Dosis: </h4> <p>{data.primerDosis}</p>
            <h4>Fecha Segunda Dosis: </h4><p>{data.segundaDosis}</p>
            <h4>Centro De Vacunacion: </h4><p>{data.apellido}</p>
            <h4>Vacuna: </h4><p>{data.vacuna}</p>
        </div>
        </div>
        </div>
    )
}
