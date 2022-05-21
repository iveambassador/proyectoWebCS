import React from 'react'
import { Modal, Button } from 'react-bootstrap'
const SHA256 = require('crypto-js/sha256')

export default function Modales(props) {
  function generar (){
    let hashGenerado = SHA256(JSON.stringify()).toString()
    console.log(hashGenerado)
    // hashGenerado = Math.random()
    return hashGenerado
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