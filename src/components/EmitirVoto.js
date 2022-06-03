import React from 'react'
import Candidato from './Candidato'
import '../Styles/EmitirVoto.css'
import { Button } from 'react-bootstrap'
import NoDisponible from './NoDisponible'
import Modal from './Modal'
import ModalConfiramcion from './ModalConfirmacion'
import { useState } from 'react'

//import Blockchain from './blockchain/blockchain';

export default function EmitirVoto(props) {
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [mensaje, setMensaje] = useState("hola papu como estas !! ?")


  // let condicion = true;
  // if(condicion){
  if (props.posi){
    return (
      <div className='Container'>
        
        <h1>¡Comienza con  I Vote!</h1>
        <div className='Cont-Titulo'>
          <div className='tester'>
          <h5>Marca al candidato de tu preferencia.</h5>
          <h5>Puedes votar en blanco si esa es tu elección.</h5>
          <h5>Si marcas más de una casilla se contara como voto "nulo".</h5>
          </div>
          <div className='testers'></div>
          <div className='testers'></div>
        </div>
        <div className='Cont-Candidatos'>
          <Candidato 
          Partido='Juntos por el 100'
          NombreAp='Juan Perez Sanchez'
          Cargo='Secretario de deportes'/>
          <Candidato Partido='Run Sistemas'
           NombreAp='Eduardo Vale Martinez'
           Cargo='Presidente '/>
          <Candidato 
          Partido='Code Sistemas'
          NombreAp='David Oropeza Cordova'
          Cargo='Secretario de actas'/>
          <Candidato 
          Partido='Los Vengadores de notas'
          NombreAp='Harol Zurita Simon'
          Cargo='Documentador de informes'/>
          <Candidato 
          Partido='No mas salteñas'
          NombreAp='Pepe Pancho Suarez'
          Cargo='Presidente de asociasion'/>
          <Candidato 
           Partido='El mas weno que puedas ver'
           NombreAp='Jhonny Fulano Choque'
           Cargo='Vicepresidente de asociasion'/>
          <Candidato 
          Partido='Se me acabaron los names'
          NombreAp='Erika Jhaelis Soto Diaz'
          Cargo='Testing Qa de notas'/>
          <Candidato 
          Partido='Se me acabaron los names'
          NombreAp='Erika Jhaelis Soto Diaz'
          Cargo='Testing Qa de notas'/>
          <Candidato 
          Partido='No mas Salteñas'
          NombreAp='Pepe Pancho Suarez'
          Cargo='Presidente de asociasion'/>
          
        </div>
        <Button variant="primary" size='lg' className='mb-4' onClick={() => setModalShow(true)}>¡Guardar Voto!</Button>
        

        <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        test = {() => setShow(true)}
        setMensaje = {setMensaje}/>

        <ModalConfiramcion 
        show={show}
        onHide={() => setShow(false)}
        mensaje = {mensaje}/>
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
