import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
import {collection, getDocs, getFirestore, updateDoc, doc, query, where, getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../Styles/Login.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoDisponible from './NoDisponible'
import Spinner from 'react-bootstrap/Spinner';

//let urlDescarga;
export default function Postularme() {
  //const [postularEstado, setPostularEstado] = useState(false);
  const [valido, setValido] = useState(true);
  const [nombrePartido, setNombrePartido] = useState("");
  const [siglaPartido, setSigla] = useState("");
  const [foto, setFoto] = useState("");
  const [documento, setDoc] = useState("");
  const [isLoading, setLoading] =  useState(false)

  const navegar = useNavigate();
  // let estesidara = "";
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
    setDoc(cambiado);
   };
  const Postular = async (e) => {
    e.preventDefault();
    let user = getAuth(app).currentUser.uid;
    const test = doc(firestore, "UsuarioComun", user);
    console.log("este es el test osea el usuario")
    console.log(test);
    
    navegar("/");
    //console.log(estesidara)
    await updateDoc(test, {
        PuedePostular : false,
        PostularEstado : true,
        PostularNombrePartido : nombrePartido,
        PostularSigla : siglaPartido,
        UrlFotografia : foto,
        UrlDocumneto : documento,
    });
    console.log("Datos actualizados")
  };

  async function fileHandler(e){ 
    //reconocer el archivo
    const archivoLocal = e.target.files[0];
    //cargarel archivo en el storage de firebase
    const archivoRef = ref(storage, `/imagenes/${archivoLocal.name}`);
    //subir el archivo
    await uploadBytes(archivoRef, archivoLocal);
    //obtener la url del archivo
    urlDescarga = await getDownloadURL(archivoRef);
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
     setLoading(false)
   }
   setLoading(false)
   cumple();
 }, []);

 //if (isLoading) return <h5>Cargando...</h5>
  
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
              <Form.Control type="input" placeholder="Nombre del partido político" onChange={(e) => setNombrePartido(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Sigla del partido político:</h5></Form.Label>
              <Form.Control type="input" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Certificados Correspondientes:</h5></Form.Label>
              <Form.Control type="file" onChange={cargarDoc}/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Declaración jurada:</h5></Form.Label>
              <Form.Control type="file" placeholder="Sigla del partido político" onChange={(e) => setSigla(e.target.value)}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h5>Fotografía:</h5></Form.Label>
              <Form.Control type="file" onChange={cargarFoto}/>
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
  
};