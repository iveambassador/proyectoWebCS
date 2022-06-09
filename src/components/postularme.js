import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
import {collection, getDocs, getFirestore, updateDoc, doc, query, where, getDoc} from "firebase/firestore";
import '../Styles/Login.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoDisponible from './NoDisponible'


export default function Postularme() {
  //const [postularEstado, setPostularEstado] = useState(false);
  const [valido, setValido] = useState(true);
  const [nombrePartido, setNombrePartido] = useState("");
  const [siglaPartido, setSigla] = useState("");
  const navegar = useNavigate();

  const Postular = async (e) => {
    e.preventDefault();
    let user = getAuth(app).currentUser.uid;
    const test = doc(firestore, "UsuarioComun", user);
    console.log("este es el test osea el usuario")
    console.log(test);
    
    navegar("/");
    await updateDoc(test, {
        PuedePostular : false,
        PostularEstado : true,
        PostularNombrePartido : nombrePartido,
        PostularSigla : siglaPartido,
    });
    console.log("Datos actualizados")
  };
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

     let idUsuario = getAuth(app).currentUser.uid;
     const usuarioActual = doc(firestore, "UsuarioComun", idUsuario);
     const DatosUser = await getDoc(usuarioActual);
     let inicio = listaFechas[0].FechaIniPostulacion.toString().split('-')
     let fin = listaFechas[0].FechaFinPostulacion.toString().split('-')
     if((año>=parseInt(inicio[0]) && año<=parseInt(fin[0]) && mes>=parseInt(inicio[1]) && mes<=parseInt(fin[1]) && dia>=parseInt(inicio[2])) && dia<=parseInt(fin[2]) && DatosUser.data().PuedePostular===true){
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
          style={{ width: "100%", height: "auto", maxWidth: "400px" ,borderRadius: '10px'}}
        >
          <Card.Header style={{ backgroundColor: "#012345" ,borderRadius: '10px 10px 0 0'}}>
            <h3 className="text-center mb-2 mt-2" style={{ color: "white" }}>
              Formulario de postulación
            </h3>
          </Card.Header>
          <Card.Body style={{ backgroundColor: "#5668d1" ,borderRadius: '0 0 10px 10px'}}>
            <Form onSubmit={Postular}>
            {/* <h1 className="contLoginTittle">Formulario de postulación</h1> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label><h5>Nombre del partido político:</h5></Form.Label>
              <Form.Control type="input" placeholder="Nombre del partido político" onChange={(e) => setNombrePartido(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Sigla del partido político:</h5></Form.Label>
              <Form.Control type="input" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Certificado de antecedentes penales:</h5></Form.Label>
              <Form.Control type="file" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Declaración jurada:</h5></Form.Label>
              <Form.Control type="file" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Fotografía:</h5></Form.Label>
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
            <NoDisponible mensaje="Usted ya postulo o se encuentra fuera de rango de fechas disponibles para postular."/>
        </div>
      ) 
    }
  
};