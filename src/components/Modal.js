import React from 'react'
import { Modal, Button } from 'react-bootstrap'

//import Blockchain from './blockchain/blockchain';
//import block from './blockchain/block';

const SHA256 = require('crypto-js/sha256')
const Blockchain = require('./blockchain/blockchain');
const Block = require('./blockchain/block');

export default function Modales(props) {
  async function generar (){
    let hashGenerado = SHA256(JSON.stringify()).toString()
    console.log(hashGenerado)
    hashGenerado = Math.random()
    return hashGenerado;
  }
  const getCurrentDate = () => {
    var today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    
    
    if(day < 10){
      day = '0'+day;
    }
    if(month < 10){
      month = '0'+month;
    }
    const voteDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
    console.log(voteDate);
    return voteDate;
  }

    function CambiarModal(){
      const voteDate = getCurrentDate();
      props.onHide()
      props.test()
      const hashG = generar()
      props.setMensaje(`${hashG}`)
      props.funcionClasificar(hashG, voteDate)
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Espera!!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>¿Estas seguro de que deseas continuar?</h4>
          <p>
            una vez realizado el voto no puedes volver a emitir tu voto..! estas seguro de esta accion?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={CambiarModal}>Aceptar</Button>
          <Button onClick={props.onHide}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    );
  }