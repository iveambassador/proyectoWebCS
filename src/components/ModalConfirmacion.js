import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default function ModalConfiramcion({ show, onHide, mensaje }) {
   
    return (

        <Modal show={show} onHide={onHide} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Voto guardado correctamente</Modal.Title>
          </Modal.Header>
          <Modal.Body>Este es tu hash generado: {mensaje}</Modal.Body>
          <Modal.Footer>
            <Link to="/" className='btn btn-primary' onClick={onHide}>
              Finalizar
            </Link>
          </Modal.Footer>
        </Modal>

    );
  }
