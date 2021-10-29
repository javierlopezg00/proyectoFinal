import React from 'react'
import Button from '@mui/material/Button';

export default function BotonesModuloReporte() {
    return (
        <div>
        <Button href="/ModuloReportes" variant="outlined">Usuario x Fecha</Button>
        <Button href="/ModuloReportes2" variant="outlined">Usuario x centro</Button>
        <Button href="/ModuloReportes3" variant="outlined">Usuario logueados</Button>
        <Button href="/ModuloReportes4" variant="outlined">Inasistencia</Button>
        </div>
    )
}
