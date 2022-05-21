import React from 'react'
import '../Styles/Postulante.css'
import Postulante from './Postulante'
export default function PagePostulantes() {
  return (
    
    <div className="contMain">
      <div className='contPostulante'>
        <h4 className='contenedor-testimonio w-100'>Postulantes: </h4>
        <Postulante 
          nombre='Juanito Pérez Test'
          ci='154236780'
          telefono='7156480'
          partido='Juntos por el 100'
          cargo='Secretario de deposrtes'
        />
        <Postulante />
        <Postulante />
      </div>
    </div>
  )
}
