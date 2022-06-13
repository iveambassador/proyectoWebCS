import React from 'react'
import { Card, Form, FormCheck } from 'react-bootstrap'
import logo192 from '../Images/logo512.png'
import logo from '../logo.svg'
import { useState } from 'react';
import '../Styles/Candidato.css'
// import logo from '../../public/logo192.png'
export default function Candidato({Partido, NombreAp, Cargo, index,handlePadree,foto}) {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    //console.log(isChecked);
    handlePadree(index);
    };    
  
  return (
    <Card className='Cont-Card'>
        <Card.Title>{Partido}</Card.Title>
        <div style={{height : '14rem',display : 'flex',alignItems : 'center'}}>
        <Card.Img variant="top" src={foto} alt='nada por aqui!'/>
        </div>
        <Card.Body>
          <Card.Title>Nombre: {NombreAp}</Card.Title>
          <Card.Text>
            Sigla: {Cargo}
          </Card.Text>
          <Form.Group className='test'>
            <Form.Check 
            className='Checkbox'
            checked = {isChecked}
            onChange={handleOnChange}
            />
          </Form.Group>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
        
    </Card>
  )
}
