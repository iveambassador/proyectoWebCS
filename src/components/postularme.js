import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
<<<<<<< Updated upstream
import {collection, getDocs, getFirestore, updateDoc, doc, query, where} from "firebase/firestore";
=======
import { getStorage, updateDoc, doc} from "firebase/firestore";
>>>>>>> Stashed changes
import '../Styles/Login.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import NoDisponible from './NoDisponible'
=======
//import firebase from "firebase";



>>>>>>> Stashed changes

export default function Postularme() {
  //const [postularEstado, setPostularEstado] = useState(false);
  const [valido, setValido] = useState(true);
  const [nombrePartido, setNombrePartido] = useState("");
  const [siglaPartido, setSigla] = useState("");
  const navegar = useNavigate();
  const [url, setUrl] = useState(null);
  
  const foto = async (e) => {
    const file = e.target.files[0];
    //const storageRef = firebase.storage().ref(`fotos/${file.name}`);
  }

  const Postular = async (e) => {
    e.preventDefault();
    let user = getAuth(app).currentUser.uid;
<<<<<<< Updated upstream
=======
    // let name = document.getElementById('name').value
    // let email = document.getElementById('email').value
    console.log(nombrePartido);
    console.log(siglaPartido);
    console.log(user);
    // const response = await getDocs(collection(firestore,'UsuarioComun'))
    //       response.forEach( document => {
    //       console.log("estas son las res")
    //       console.log(document.data().Apellido)
    //     })
    // const test = doc(firestore, "UsuarioComun", user);

>>>>>>> Stashed changes
    const test = doc(firestore, "UsuarioComun", user);
    console.log(test);
    

    navegar("/");
    await updateDoc(test, {
        PostularEstado : true,
        PostularNombrePartido : nombrePartido,
        PostularSigla : siglaPartido,
        PostularFoto : url
    });
    console.log("Datos actualizados")
  };
<<<<<<< Updated upstream
  useEffect(() => {
    const cumple = async ()=>{
     const listaFechas = [];
     try {
     const q = query(collection(firestore, "AdministrarFechas"), where("Activo", "==", true));
     const usuariosComun = await getDocs(q);
     usuariosComun.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
       let id = doc.id
       let FechaIniPostulacion = doc.data().FechaIniPostulacion
       let FechaFinPostulacion = doc.data().FechaFinPostulacion
       let Activo = doc.data().Activo
       let dato = { id, FechaIniPostulacion, FechaFinPostulacion, Activo }
       listaFechas.push(dato);
     })
     } catch (error) {
       console.log(error)
     }
     
     let hoy = new Date()
     let dia = parseInt(hoy.getDate())
     let mes = parseInt(( hoy.getMonth() + 1 ))
     let año = parseInt(hoy.getFullYear())
     //let hora = parseInt(hoy.getHours())
     //let minutos = parseInt(hoy.getMinutes())
     console.log(listaFechas[0].FechaIniPostulacion)
     console.log(listaFechas[0].FechaFinPostulacion)

     let inicio = listaFechas[0].FechaIniPostulacion.toString().split('-')
     let fin = listaFechas[0].FechaFinPostulacion.toString().split('-')
     if((año>=parseInt(inicio[0]) && año<=parseInt(fin[0]) && mes>=parseInt(inicio[1]) && mes<=parseInt(fin[1]) && dia>=parseInt(inicio[2])) && dia<=parseInt(fin[2])){
       setValido(true)
     }else{
       setValido(false)
     }
   }
   cumple();
 }, []);
  
    if(valido){
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
    }else{
      return (
        <div className='Container'>
            <NoDisponible mensaje="Usted se encuentra fuera de rango de fechas disponibles para postular."/>
=======
  
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

          

          <Form.Group className="mb-3" controlId="docPenales">
            <Form.Label>Certificado de antecedentes penales:</Form.Label>
            <Form.Control type="file" onChange={(e) => setSigla(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="docJurada">
            <Form.Label>Declaración jurada: </Form.Label>
            <Form.Control type="file" onChange={(e) => setSigla(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="docFotografia">
            <Form.Label>Fotografía:</Form.Label>
            <Form.Control type="file" onChange={this.handleUpload}/>
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
>>>>>>> Stashed changes
        </div>
      ) 
    }
  
};
