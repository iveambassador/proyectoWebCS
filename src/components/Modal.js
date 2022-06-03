import React from 'react'
import { Modal, Button } from 'react-bootstrap'

//import Blockchain from './blockchain/blockchain';
//import block from './blockchain/block';

//const SHA256 = require('crypto-js/sha256')
const Blockchain = require('./blockchain/blockchain');
const Block = require('./blockchain/block');

export default function Modales(props) {
  async function generar (){
    //let hashGenerado = SHA256(JSON.stringify()).toString()
    //console.log(hashGenerado)
    // hashGenerado = Math.random()
    //return hashGenerado
    if (props.posi){
      let blockchain = new Blockchain();
      let block = new Block('hola soy un block', '0');
      blockchain.addBlock(block);
      console.log(blockchain);
      if (blockchain.isChainValid()){
        console.log('La cadena es valida');
        while (blockchain.chain.length < 10){
          let block = new Block('hola soy un block', blockchain.chain[blockchain.chain.length - 1].hash);
          blockchain.addBlock(block);
        }
        console.log(blockchain);
      }else{
        console.log('La cadena no es valida');
      }
    }
    
    const blockchain = new Blockchain();
    const blockInicio = new Block({data: "No lo sé Rodri, parece falso la SEMILLA"});
    const blockFin = new Block({data: "GENESIS 1:26 o_O"});

    await blockchain.addBlock(blockInicio);
    await blockchain.addBlock(blockFin);

    blockchain.print();
  }

    function CambiarModal(){
      props.onHide()
      props.test()
      props.setMensaje(`${generar()}`)
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