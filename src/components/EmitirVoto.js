import React from 'react'
import Candidato from './Candidato'
import '../Styles/EmitirVoto.css'
import { Button } from 'react-bootstrap'
import NoDisponible from './NoDisponible'
import Modal from './Modal'
import ModalConfiramcion from './ModalConfirmacion'
//import { useState } from 'react'

import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import {collection,query, where, getDocs, getFirestore, updateDoc, doc, deleteDoc, setDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function EmitirVoto(props) {
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [mensaje, setMensaje] = useState("hola papu como estas !! ?")

  const [lista, setList] = useState([]);
  const [bandera, setBandera] = useState(0);
  // let condicion = true;
  // if(condicion){
  useEffect(() => {
    const test = async ()=>{
      try {
      const querySnapshot = await getDocs(collection(firestore, "PartidosAceptados"));
      const listaTemp = [];
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        let nombre = doc.data().NombrePartido
        let sigla = doc.data().Sigla
        let nombreCandi = doc.data().NombreCandidato
        let dato = {nombre,sigla,nombreCandi}
        listaTemp.push(dato);
      })
      setList(listaTemp);
      } catch (error) {
        console.log(error)
      }
    }
    test(); 
    console.log("estos son los datos")
    console.log(lista)
   }, [bandera]);
  
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
        { lista.map(tupla => (
          <Candidato 
          Partido={tupla.nombre}
          NombreAp={tupla.nombreCandi}
          Cargo={tupla.sigla}/>  
          )) }      
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
