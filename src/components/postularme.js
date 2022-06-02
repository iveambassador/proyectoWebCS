import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
import {collection, getDocs, getFirestore, updateDoc, doc} from "firebase/firestore";
import '../Styles/Login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Postularme() {
  const [postularEstado, setPostularEstado] = useState(false);
  const [nombrePartido, setNombrePartido] = useState("");
  const [siglaPartido, setSigla] = useState("");
  const navegar = useNavigate();

  const Postular = async (e) => {
    e.preventDefault();
    let user = getAuth(app).currentUser.uid;
    // let name = document.getElementById('name').value
    // let email = document.getElementById('email').value
    console.log(nombrePartido);
    console.log(siglaPartido);
    console.log(user)
    // const response = await getDocs(collection(firestore,'UsuarioComun'))
    //       response.forEach( document => {
    //       console.log("estas son las res")
    //       console.log(document.data().Apellido)
    //     })
    // const test = doc(firestore, "UsuarioComun", user);

    const test = doc(firestore, "UsuarioComun", user);
    console.log(test);
    
    navegar("/");
    await updateDoc(test, {
        PostularEstado : true,
        PostularNombrePartido : nombrePartido,
        PostularSigla : siglaPartido,
    });
    console.log("Datos actulizados")
  };

  
    return (
      <div className="Container">
        <div>
        <Card
        border="dark"
        style={{ width: "100%", height: "auto", maxWidth: "400px" }}
      >
        <Card.Header style={{ backgroundColor: "#012345" }}>
          <h3 className="text-center mb-2" style={{ color: "white" }}>
            Formulario de postulación
          </h3>
        </Card.Header>
        <Card.Body style={{ backgroundColor: "#5668d1" }}>
          <Form onSubmit={Postular}>
          {/* <h1 className="contLoginTittle">Formulario de postulación</h1> */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre del partido político:</Form.Label>
            <Form.Control type="input" placeholder="Nombre del partido político" onChange={(e) => setNombrePartido(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Sigla del partido político:</Form.Label>
            <Form.Control type="input" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Certificado de antecedentes penales:</Form.Label>
            <Form.Control type="file" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Declaración jurada: </Form.Label>
            <Form.Control type="file" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Fotografía:</Form.Label>
            <Form.Control type="file" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
          </Form.Group>
          {/* <Button  variant="primary" type="submit" onClick={this.getBooks.bind()}></Button> */}
          <Form.Group className="text-center mt-3">
            <Button  className="w-50" variant="dark" type="submit">
              Enviar
            </Button>
          </Form.Group>
          
          </Form>
          </Card.Body>
      </Card>
        </div>
      </div>
    );
  
};
