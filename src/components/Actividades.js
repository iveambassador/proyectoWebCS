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
import { Table } from "react-bootstrap";
const SHA256 = require('crypto-js/sha256');
//let urlDescarga;
export default function Actividades() {
  //const [postularEstado, setPostularEstado] = useState(false);
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
    console.log("este es el test osea el usuario")
    console.log(test);
    let elHash = await HMACSHA256();
    let fecha = new Date()
    navegar("/");
    let idUsuario = getAuth(app).currentUser.uid;
    const usuarioActual = doc(firestore, "UsuarioComun", idUsuario);
    const DatosUser = await getDoc(usuarioActual);
    let elHashPrevio = DatosUser.data().HashSemilla;

    await setDoc(doc(firestore, "BlockChain", elHash), {
      Hash : elHash,
      HashPrevio : elHashPrevio,
      Data : 1,
      Fecha : fecha,
      Body : parseInt(Math.random() * (10000000)),
      Transaccion : 'Postular como candidato',
    });
    //console.log(estesidara)
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
     setStart(false)
   }
   cumple();
   
 }, []);

 if (isStart) {return <h4 className="p-1">Cargando...</h4>}else{
  
    if(valido){
      return (
          <Table striped bordered hover>
    <thead>
      <tr>
        <th>Hash</th>
        <th>Has</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
    </tbody>
</Table>
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