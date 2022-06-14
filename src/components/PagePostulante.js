import React from 'react'
import '../Styles/Postulante.css'
//import Postulante from './Postulante'
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import {collection,query, where, getDocs, getFirestore, updateDoc, doc, deleteDoc, setDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NoDisponible from './NoDisponible'
//import { reload } from 'firebase/auth';
//import { async } from '@firebase/util';
export default function PagePostulantes() {
  const [list, setList] = useState([]);
  const [bandera, setBandera] = useState(0);
  //componentDidMount() { this.getBooks() }
  //let list = []; 
  //let nada = {nombre : "ninguno",apellido : "nada por aqui"} 
  // list.push(nada)
  // list.push(nada)
  // const test = async (e) => {
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
        let nombreCompleto = nombre +' '+ apellido
        let dato = { id, nombreCompleto, carnet, celular, partido, sigla, fotografia, linkDocumneto }
        listaTemp.push(dato);
      })
      setList(listaTemp);
      } catch (error) {
        console.log(error)
      }
      }
      test(); 
      console.log("estos son los datos")
      console.log(list)
  }, [bandera]);

    console.log(list)
    const navegar = useNavigate();
    const deleteUser = async (id)=>{
      console.log(id)
      const user = doc(firestore, "UsuarioComun", id);
      await updateDoc(user, {
        PostularEstado : false,
        PostularNombrePartido : 'Delete',
        PostularSigla : 'Delete',
      });
      //window.location.reload();
      setBandera(bandera+1)
      console.log(bandera)
    }

   const acepteUser = async (id,nombre,sigla,nombreCandi,fotografia)=>{
     console.log(id)
     let randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
     const user = doc(firestore, "UsuarioComun", id);
     await updateDoc(user, {
       PostularEstado : false,
       PostularNombrePartido : 'Acept',
       PostularSigla : 'Acept',
     });
     await setDoc(doc(firestore, "PartidosAceptados", id), {
      NombrePartido: nombre,
      Sigla : sigla,
      NombreCandidato : nombreCandi,
      Foto : fotografia,
      Cant : 0,
      Color : randomColor,
    });
     //window.location.reload();
     setBandera(bandera+1)
     console.log(bandera)
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
                <Button variant="primary" onClick={()=>acepteUser(tupla.id,tupla.partido,tupla.sigla,tupla.nombreCompleto,tupla.fotografia)}>Aceptado</Button>
                <Button variant="danger" onClick={()=>deleteUser(tupla.id)}>Rechazado</Button>
              </div>
          
            </div>
            // <div>
            // <Postulante 
            //   nombre = {tupla.nombreCompleto}
            //   ci= {tupla.carnet}
            //   telefono= {tupla.celular}
            //   partido= {tupla.partido}
            //   cargo= {tupla.sigla}/>
            //   <div className='Postulante-Botones'>
            //     <Button variant="primary" onClick={()=>acepteUser(tupla.id,tupla.partido,tupla.sigla,tupla.nombreCompleto)}>Aceptado</Button>
            //     <Button variant="danger" onClick={()=>deleteUser(tupla.id)}>Rechazado</Button>
            //   </div>
            // </div>
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
