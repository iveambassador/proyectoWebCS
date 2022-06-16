import React from 'react'
import '../Styles/Postulante.css'
//import Postulante from './Postulante'
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import {collection,query, where, getDocs, getFirestore, updateDoc, doc, deleteDoc, setDoc, getDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NoDisponible from './NoDisponible'
const SHA256 = require('crypto-js/sha256');

export default function PagePostulantes() {
  const [list, setList] = useState([]);
  const [bandera, setBandera] = useState(0);

   useEffect(() => {
    const test = async ()=>{
      try {
      const q = query(collection(firestore, "UsuarioComun"), where("PostularEstado", "==", true));
      const usuariosComun = await getDocs(q);
      const listaTemp = [];
      usuariosComun.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        let id = doc.id
        let nombre = doc.data().Nombre
        let apellido = doc.data().Apellido
        let carnet = doc.data().CI
        let celular = doc.data().Celular
        let partido = doc.data().PostularNombrePartido
        let sigla = doc.data().PostularSigla
        let fotografia = doc.data().UrlFotografia
        let linkDocumneto = doc.data().UrlDocumneto
        let Hash = doc.data().HashSemilla
        let nombreCompleto = nombre +' '+ apellido
        let dato = { id, nombreCompleto, carnet, celular, partido, sigla, fotografia, linkDocumneto, Hash }
        listaTemp.push(dato);
      })
      setList(listaTemp);
      } catch (error) {
        console.log(error)
      }
      }
      test(); 
  
  }, [bandera]);
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
    const navegar = useNavigate();
    const deleteUser = async (id)=>{

      const userDelete = doc(firestore, "UsuarioComun", id);
      const DatosUser = await getDoc(userDelete);
      const hashDelete = await HMACSHA256()
      let data = 2;
      let fecha = new Date()

      let elHashPrevio = DatosUser.data().HashPostular;
     
      let bady = parseInt(Math.random() * (10000000));
      await setDoc(doc(firestore, "BlockChain", hashDelete), {
        Hash : hashDelete,
        HashPrevio : elHashPrevio,
        Data : data,
        Fecha : fecha,
        Body : bady,
        Transaccion : 'Rechazado',
      });
      const user = doc(firestore, "UsuarioComun", id);
      await updateDoc(user, {
        PostularEstado : false,
        PostularNombrePartido : 'Delete',
        PostularSigla : 'Delete',
        HashResponse : hashDelete,
      });
      //window.location.reload();
      setBandera(bandera+1)

    }

   const acepteUser = async (id,nombre,sigla,nombreCandi,fotografia,hash)=>{
     
      const userAcepted = doc(firestore, "UsuarioComun", id);
      const DatosUser = await getDoc(userAcepted);
      const hashGenerado = await HMACSHA256();
      let data = 2;
      let fecha = new Date();
      
      let elHashPrevio = DatosUser.data().HashPostular;

      
      let bady = parseInt(Math.random() * (10000000));
      await setDoc(doc(firestore, "BlockChain", hashGenerado), {
        Hash : hashGenerado,
        HashPrevio : elHashPrevio,
        Data : data,
        Fecha : fecha,
        Body : bady,
        Transaccion : 'Aceptado',
      });
      // console.log(`Hash : ${hashGenerado}`)
      // console.log(`HashPrevio : ${elHashPrevio}`)
      // console.log(` Fecha : ${fecha}`)
      // console.log(`Body : ${bady}`)
      // console.log(`Transaccion : Voto`)

     let randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
     const user = doc(firestore, "UsuarioComun", id);
     await updateDoc(user, {
       PostularEstado : false,
       PostularNombrePartido : 'Acept',
       PostularSigla : 'Acept',
       HashResponse : hashGenerado,
     });
     await setDoc(doc(firestore, "PartidosAceptados", id), {
      NombrePartido: nombre,
      Sigla : sigla,
      NombreCandidato : nombreCandi,
      Foto : fotografia,
      Cant : 0,
      Color : randomColor,
      HashSemilla : hash,
    });
     //window.location.reload();
     setBandera(bandera+1)

  }
  
    
  if(list.length > 0){
    return (
      <div className="contMain">
        <div className='contPostulante'>
          <h4 className='contenedor-testimonio w-100 ms-2'>Postulantes: </h4>
          { list.map(tupla => (
            <div className='contenedor-informacion px-4 py-3'>
      
              <p><strong>Nombre del postulante:</strong> {tupla.nombreCompleto}</p>
              <p><strong>Nro. CI:</strong> {tupla.carnet}</p>
              <p><strong>Nro. Teléfono:</strong> {tupla.celular}</p>
              <p><strong>Partido político: </strong> {tupla.partido}</p>
              <p><strong>Sigla:</strong> {tupla.sigla}</p>
              <a href={tupla.linkDocumneto} target="_blank" className='mb-4'>Ver documentos</a>
              <div className='Postulante-Botones'>
                <Button variant="primary" onClick={()=>acepteUser(tupla.id,tupla.partido,tupla.sigla,tupla.nombreCompleto,tupla.fotografia,tupla.Hash)}>Aceptado</Button>
                <Button variant="danger" onClick={()=>deleteUser(tupla.id)}>Rechazado</Button>
              </div>
          
            </div>
          )) }
      
        </div>
      </div>
    )
  }else{
    return (
      <div className='Container'>
          <NoDisponible mensaje="¡Vaya! Aún nadie ha postulado"/>
      </div>
    ) 
  }
}
