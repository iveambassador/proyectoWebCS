import React from 'react'
import Candidato from '../Componets/Candidato'
import '../Styles/EmitirVoto.css'
export default function EmitirVoto() {
  return (
    <div className='Container'>
      <h1>Votar</h1>
      <div className='Cont-Titulo'>
        <p>Marca al candidato de tu preferencia</p>
        <p>Puedes votar en blaco si esa es tu elecion</p>
        <p>Si marcas mas de una casilla se contara como voto nulo</p>
      </div>
      <div className='Cont-Candidatos'>
        <Candidato />
        <Candidato />
        <Candidato />
        <Candidato />
        <Candidato />
        <Candidato />
        <Candidato />
        <Candidato />
      </div>
    </div>
  )
}
