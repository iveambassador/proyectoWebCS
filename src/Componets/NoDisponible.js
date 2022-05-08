import React from 'react'
import '../Styles/NoDisponible.css'
import voto from '../Images/voto2.png'
export default function NoDisponible({mensaje}) {
  return (
    <div className='Cont-NoDisponible'>
        <img src={voto} className='Imagen-NoDisponible'/>
        <div className='Opss'>
            <h4>{mensaje}</h4>
        </div>
    </div>
  )
}
