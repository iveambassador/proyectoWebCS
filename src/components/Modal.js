import { async } from '@firebase/util';
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import block from './blockchain/block';

const Blockchain = require('./blockchain/blockchain');
const Block = require('./blockchain/block');
const SHA256 = require('crypto-js/sha256')

export default function Modales(props) {


  async function run() {
    const blockchain = new Blockchain();
    const block1 = new block('Block 1');

    await blockchain.addBlock(block1);

    console.log(blockchain.toString());
    blockchain.print();
  }
  
  function generar (){
    var hash = SHA256(JSON.stringify(props.lista)).toString();

    props.setHash(hash);
    console.log(hash);
    return hash;

    //var hash = SHA256(props.hash).toString();
    //console.log(hash);
    //return hash;

    //let hashGenerado = SHA256(JSON.stringify()).toString()
    //console.log(hashGenerado)
    // hashGenerado = Math.random()
    //return hashGenerado
  }

  function generarHash(){
    var hash = SHA256(JSON.stringify(props.lista)).toString();
    props.setHash(hash);
    console.log(hash);
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
      const hashG = run()
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