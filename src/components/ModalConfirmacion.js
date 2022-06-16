import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default function ModalConfiramcion({ show, onHide, mensaje }) {
   
    return (

        <Modal show={show} onHide={false} backdrop="static" size="lg">
          <Modal.Header>
            <Modal.Title className='w-100 text-center'>Voto registrado exitosamente</Modal.Title>
          </Modal.Header>
          <Modal.Body className='w-100 text-center' style={{fontSize: '1.1rem'}}>Este es tu hash generado: {mensaje}</Modal.Body>
          <Modal.Footer>
            <Link to="/" className='btn btn-primary' onClick={onHide}>
              Finalizar
            </Link>
          </Modal.Footer>
        </Modal>

    );
  }
