import React from 'react'
import '../Styles/Postulante.css'
import { Button } from 'react-bootstrap'
export default function Postulante({nombre, ci, telefono, partido, cargo}) {
  return (
    
    <div className='contenedor-informacion px-4 py-3'>
      
        <p><strong>Nombre del postulante:</strong> {nombre}</p>
        <p><strong>Nro. CI:</strong> {ci}</p>
        <p><strong>Nro. Teléfono:</strong> {telefono}</p>
        <p><strong>Partido político: </strong>  {partido}</p>
        <p><strong>Sigla:</strong> {cargo}</p>
        <p>ver documentos</p>
        
      
    </div>

  )
}
