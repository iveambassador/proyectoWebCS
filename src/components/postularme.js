import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
import {collection, getDocs, getFirestore, updateDoc, doc} from "firebase/firestore";
import '../Styles/Login.css'
import { useState } from "react";
const [PostularEstado, setPostularEstado] = useState(false);
const [NombrePartido, setPostularNombrePartido] = useState("");
const [Sigla, setPostularSigla] = useState("");
export default class postularme extends Component {
  async getBooks() {
    const user = getAuth(app).currentUser.uid;
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    console.log(name);
    console.log(email);
    console.log(user)
    // const response = await getDocs(collection(firestore,'UsuarioComun'))
    //       response.forEach( document => {
    //       console.log("estas son las res")
    //       console.log(document.data().Apellido)
    //     })
    // const test = doc(firestore, "UsuarioComun", user);

    const test = doc(firestore, "UsuarioComun", user);
    console.log(test);
    
    
    await updateDoc(test, {
      Correo: email,
      Nombre: name,
    });
  }

  render() {
    return (
      <div className="Container">
        <div>
          {/* <Form> */}
          {/* <h1 className="contLoginTittle">Formulario de postulación</h1> */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo</Form.Label>
            <Form.Control id="email" type="email" placeholder="ingrese su correo" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nombre</Form.Label>
            <Form.Control id="name" type="input" placeholder="nuevo nombre" />
          </Form.Group>
          <Button  variant="primary" type="submit" onClick={this.getBooks.bind()}>
            Submit
          </Button>
          {/* </Form> */}
        </div>
      </div>
    );
  }
}
