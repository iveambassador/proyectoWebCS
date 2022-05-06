import React from 'react'
import Candidato from '../Componets/Candidato'
import '../Styles/EmitirVoto.css'
export default function EmitirVoto() {
  return (
    <div className='Container'>
      <h1>Votar</h1>
      
      <div className='Cont-Candidatos'>
      <div className='Cont-Titulo'>
        <p>Marca al candidato de tu preferencia</p>
        <p>Puedes votar en blaco si esa es tu elecion</p>
        <p>Si marcas mas de una casilla se contara como voto nulo</p>
      </div>
        <Candidato 
        Partido='Juntos por el 100'
        NombreAp='Juan Perez Sanchez'
        Cargo='secretario de Deportes'/>
        <Candidato Partido='Run Sistemas'
         NombreAp='Eduardo Vale martinez'
         Cargo='Presidente '/>
        <Candidato 
        Partido='Code Sistemas'
        NombreAp='David Oropeza Cordova'
        Cargo='Secretario de Actas'/>
        <Candidato 
        Partido='Los Vengadores de Notas!'
        NombreAp='Harol Zurita Simon'
        Cargo='Documentador de Informes'/>
        <Candidato 
        Partido='No mas Salteñas'
        NombreAp='Pepe Pancho Suarez'
        Cargo='Presidente de Asociasion'/>
        <Candidato 
         Partido='El mas weno que puedas ver'
         NombreAp='Jhonny Fulano Choque'
         Cargo='Vicepresidente de Asociasion'/>
        <Candidato 
        Partido='Se me acabaron los names'
        NombreAp='Erika Jhaelis Soto Diaz'
        Cargo='Testing Qa de Notas'/>
        
      </div>
    </div>
  )
}
