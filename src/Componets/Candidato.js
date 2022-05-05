import React from 'react'
import { Card, Button, Form, FormCheck } from 'react-bootstrap'
import logo192 from '../Images/logo512.png'
import logo from '../logo.svg'
import '../Styles/Candidato.css'
// import logo from '../../public/logo192.png'
export default function Candidato() {
  return (
    <Card className='Cont-Card'>
        <Card.Title>Nombre Del Partido Politico</Card.Title>
        <Card.Img variant="top" src={logo} alt='nada por aqui!'/>
        <Card.Body>
          <Card.Title>Nombre: Juanito Perez</Card.Title>
          <Card.Text>
            Cargo: Secretario de Deportes
          </Card.Text>
          <Form.Group >
            <Form.Check className='Checkbox'/>
          </Form.Group>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
        
    </Card>
  )
}
