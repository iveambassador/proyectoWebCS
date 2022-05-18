import React from 'react'
import '../Styles/Postulante.css'
import { Button } from 'react-bootstrap'
export default function Postulante({nombre, ci, telefono, partido, cargo}) {
  return (
    
    <div className='contenedor-informacion px-4 py-3'>
      
        <p><strong>Nombre del postulante:</strong> {nombre}</p>
        <p><strong>Nro CI:</strong> {ci}</p>
        <p><strong>Nro. Telefono:</strong> {telefono}</p>
        <p><strong>Partido politico:</strong>  {partido}</p>
        <p><strong>Cargo:</strong> {cargo}</p>
        <p>ver documetos</p>
        <div className='Postulante-Botones'>
          <Button variant="primary">Aceptado</Button>
          <Button variant="danger">Rechazado</Button>
        </div>
      
    </div>

  )
}
