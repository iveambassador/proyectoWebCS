import React from 'react'
import Candidato from './Candidato'
import '../Styles/EmitirVoto.css'
import { Button } from 'react-bootstrap'
import NoDisponible from './NoDisponible'

export default function EmitirVoto() {
  let condicion = false;
  if (condicion){
    return (
      <div className='Container'>
        
        <h1>Votar</h1>
        <div className='Cont-Titulo'>
          <div className='tester'>
          <h5>Marca al candidato de tu preferencia.</h5>
          <h5>Puedes votar en blaco si esa es tu elecion.</h5>
          <h5>Si marcas mas de una casilla se contara como voto "nulo".</h5>
          </div>
          <div className='testers'></div>
          <div className='testers'></div>
        </div>
        <div className='Cont-Candidatos'>
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
          <Candidato 
          Partido='Se me acabaron los names'
          NombreAp='Erika Jhaelis Soto Diaz'
          Cargo='Testing Qa de Notas'/>
          <Candidato 
          Partido='No mas Salteñas'
          NombreAp='Pepe Pancho Suarez'
          Cargo='Presidente de Asociasion'/>
          
        </div>
        <Button variant="primary" size='lg' className='mb-4'>Guardar Voto!</Button>
      </div>
    )
  }else{
    return (
      <div className='Container'>
          <NoDisponible mensaje="Hola! por el momento no se encuentra disponible una votacion ¿porque no intentas mas tarde?"/>
      </div>
    
    ) 
  }
};
