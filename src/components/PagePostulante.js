import React from 'react'
import '../Styles/Postulante.css'
import Postulante from './Postulante'
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import {collection,query, where, getDocs, getFirestore, updateDoc, doc, deleteDoc, setDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { reload } from 'firebase/auth';
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
        let nombreCompleto = nombre +' '+ apellido
        let dato = { id, nombreCompleto, carnet, celular, partido, sigla }
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
        PostularNombrePartido : '',
        PostularSigla : '',
      });
      //window.location.reload();
      setBandera(bandera+1)
      console.log(bandera)
   }

   const acepteUser = async (id,nombre,sigla,nombreCandi)=>{
    console.log(id)
     const user = doc(firestore, "UsuarioComun", id);
     await updateDoc(user, {
       PostularEstado : false,
       PostularNombrePartido : '',
       PostularSigla : '',
     });
     await setDoc(doc(firestore, "PartidosAceptados", id), {
      NombrePartido: nombre,
      Sigla : sigla,
      NombreCandidato : nombreCandi,
      Cant : 10,
    });
     //window.location.reload();
     setBandera(bandera+1)
     console.log(bandera)
  }
  
    
  return (
    <div className="contMain">
      <div className='contPostulante'>
        <h4 className='contenedor-testimonio w-100'>Postulantes: </h4>
        { list.map(tupla => (
          <div>
          <Postulante 
            nombre = {tupla.nombreCompleto}
            ci= {tupla.carnet}
            telefono= {tupla.celular}
            partido= {tupla.partido}
            cargo= {tupla.sigla}/>
            <div className='Postulante-Botones'>
              <Button variant="primary" onClick={()=>acepteUser(tupla.id,tupla.partido,tupla.sigla,tupla.nombreCompleto)}>Aceptado</Button>
              <Button variant="danger" onClick={()=>deleteUser(tupla.id)}>Rechazado</Button>
            </div>
          </div>
        )) }
    
      </div>
    </div>
  )
}
