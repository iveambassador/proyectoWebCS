import React from 'react'
import '../Styles/Postulante.css'
import Postulante from './Postulante'
export default function PagePostulantes() {
  return (
    
    <div className="contMain">
      <div className='contPostulante'>
        <h4 className='contenedor-testimonio w-100'>Postulantes: </h4>
        <Postulante 
          nombre='juanito peres test'
          ci='154236780'
          telefono='7156480'
          partido='Justo por el 100'
          cargo='secretario de deposrtes'
        />
        <Postulante />
        <Postulante />
      </div>
    </div>
  )
}
