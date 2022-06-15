import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
import {collection, getDocs, getFirestore, updateDoc, doc, query, where, getDoc, setDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../Styles/Login.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoDisponible from './NoDisponible'
import Spinner from 'react-bootstrap/Spinner';
const SHA256 = require('crypto-js/sha256');

export default function Postularme() {

  const [valido, setValido] = useState(true);
  const [nombrePartido, setNombrePartido] = useState("");
  const [siglaPartido, setSigla] = useState("");
  const [foto, setFoto] = useState("");
  const [documento, setDocs] = useState("");
  const [isLoading, setLoading] =  useState(false)
  const [isStart, setStart] =  useState(true)
  const navegar = useNavigate();

  async function HMACSHA256() {
    let listita = [];
    const allUsers = await getDocs(collection(firestore, "BlockChain"));
      allUsers.forEach((doc) => {
        listita.push(doc.id)
      });

    let hashGenerado = (SHA256(JSON.stringify()).toString()).slice(0,-32);
  
    while(listita.includes(hashGenerado)){
      hashGenerado = (SHA256(hashGenerado).toString()).slice(0,-32);
    }
    return hashGenerado;
  }

  const cargarFoto = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = await ref(storage, `/imagenes/${file.name}`);
  
    setLoading(true)
    await uploadBytes(storageRef, file).then((snapshot) => {
      setLoading(false)
    });

    const laUrl = await getDownloadURL(storageRef);
    let test = laUrl.toString();
    setFoto(test);
   };

   const cargarDoc = async (event) => {
    event.preventDefault();
    const archivo = event.target.files[0];
    const storage = getStorage();
    const storageRef = await ref(storage, `/docs/${archivo.name}`);
  
    setLoading(true)
    await uploadBytes(storageRef, archivo).then((snapshot) => {
      setLoading(false)
    });

    const urlDelDoc = await getDownloadURL(storageRef);
    let cambiado = urlDelDoc.toString();
    setDocs(cambiado);
   };

  const Postular = async (e) => {
    e.preventDefault();
    let user = getAuth(app).currentUser.uid;
    const test = doc(firestore, "UsuarioComun", user);

    console.log(test);
    let elHash = await HMACSHA256();
    let fecha = new Date()
    navegar("/");
    let idUsuario = getAuth(app).currentUser.uid;
    const usuarioActual = doc(firestore, "UsuarioComun", idUsuario);
    const DatosUser = await getDoc(usuarioActual);
    let elHashPrevio = DatosUser.data().HashSemilla;
    let bady = parseInt(Math.random() * (10000000))
    await setDoc(doc(firestore, "BlockChain", elHash), {
      Hash : elHash,
      HashPrevio : elHashPrevio,
      Data : 1,
      Fecha : fecha,
      Body : bady,
      Transaccion : 'Postular como candidato',
    });
    console.log(`Hash : ${elHash}`)
    console.log(`HashPrevio : ${elHashPrevio}`)
    console.log(` Fecha : ${fecha}`)
    console.log(`Body : ${bady}`)
    console.log(`Transaccion : Postular`)
    await updateDoc(test, {
        PuedePostular : false,
        PostularEstado : true,
        PostularNombrePartido : nombrePartido,
        PostularSigla : siglaPartido,
        UrlFotografia : foto,
        UrlDocumneto : documento,
        HashPostular : elHash,
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
     setStart(false)
   }
   cumple();
   
 }, []);

 if (isStart) {return <h4 className="p-1">Cargando...</h4>}else{
  
    if(valido){
      return (
        <div className="Container">
          <div className="">
          <Card
          // border="dark"
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
              <Form.Control required minLength={10} type="input" placeholder="Nombre del partido político" onChange={(e) => setNombrePartido(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Sigla del partido político:</h5></Form.Label>
              <Form.Control required minLength={2} type="input" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Documentos requeridos:</h5></Form.Label>
              <Form.Control required type="file" onChange={cargarDoc}/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Declaración jurada:</h5></Form.Label>
              <Form.Control type="file" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Fotografía:</h5></Form.Label>
              <Form.Control required type="file" onChange={cargarFoto}/>
            </Form.Group>
            {/* <Button  variant="primary" type="submit" onClick={this.getBooks.bind()}></Button> */}
            <Form.Group className="text-center mt-3">
              <Button  className="w-50 is-loading" variant="dark" type="submit" disabled={isLoading}>
               {
                isLoading ? 
                (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : 'Enviar'
               }
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
 }
};