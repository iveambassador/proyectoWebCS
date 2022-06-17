import React, { Component } from "react";
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
import {collection, getDocs, getFirestore, updateDoc, doc, query, where, getDoc, setDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../Styles/Login.css'
import { useState, useEffect } from "react";
import NoDisponible from './NoDisponible'
import { Container, Table, Spinner } from "react-bootstrap";


export default function Actividades() {
    const [isStart, setStart] =  useState(true);
    const [lista, setList] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

useEffect(() => {
    const test = async ()=>{
      try {  
        let idUsuario = getAuth(app).currentUser.uid;
        const usuarioActual = doc(firestore, "UsuarioComun", idUsuario);
        const DatosUser = await getDoc(usuarioActual);
        let hSemilla = (DatosUser.data().HashSemilla).toString();
        let hPostular = DatosUser.data().HashPostular;
        let hResponse = DatosUser.data().HashResponse;
        let hVoto = DatosUser.data().HashVoto;
      
        const listaTemp = [];
        const thashS = doc(firestore, "BlockChain", hSemilla);
        const DatosSem = await getDoc(thashS);
        let Hash = DatosSem.data().HashSemilla
        let HashPrevio = DatosSem.data().HashPrevio+'init'
        let Transaccion = DatosSem.data().Transaccion
        let Fecha = (DatosSem.data().Fecha.toDate()).toString().substring(4,21)
        let dato = {Hash,HashPrevio,Transaccion,Fecha}
        listaTemp.push(dato);

        if(hPostular){
            const thashP = doc(firestore, "BlockChain", hPostular);
            const DatosPos = await getDoc(thashP);
            let Hash = DatosPos.data().Hash
            let HashPrevio = DatosPos.data().HashPrevio
            let Transaccion = DatosPos.data().Transaccion
            let Fecha = (DatosPos.data().Fecha.toDate()).toString().substring(4,21)
            let dato = {Hash,HashPrevio,Transaccion,Fecha}
            listaTemp.push(dato);
        }
        if(hResponse){
          const thashP = doc(firestore, "BlockChain", hResponse);
          const DatosVot = await getDoc(thashP);
          let Hash = DatosVot.data().Hash
          let HashPrevio = DatosVot.data().HashPrevio
          let Transaccion = DatosVot.data().Transaccion
          let Fecha = (DatosVot.data().Fecha.toDate()).toString().substring(4,21)
          let dato = {Hash,HashPrevio,Transaccion,Fecha}
          listaTemp.push(dato);
      }
        if(hVoto){
            const thashV = doc(firestore, "BlockChain", hVoto);
            const DatosVot = await getDoc(thashV);
            let Hash = DatosVot.data().Hash
            let HashPrevio = DatosVot.data().HashPrevio
            let Transaccion = DatosVot.data().Transaccion
            let Fecha = (DatosVot.data().Fecha.toDate()).toString().substring(4,21)
            let dato = {Hash,HashPrevio,Transaccion,Fecha}
            listaTemp.push(dato);
        }

      setList(listaTemp);
      } catch (error) {
        console.log(error)
      }
      setStart(false)
    }
    test(); 
   }, []);
    

 if (isStart) {return (
  <div className="Container">
    <Spinner animation="border" roles="status">
      <span className="visually-hidden">Cargando...</span>
    </Spinner>
    <h4 className="p-1">Cargando...</h4>
  </div>
);}else{
  
   
      return (
        
          <div>
            <h3 className="text-center" style={{fontWeight:'bold'}}>Actividades: </h3>
          <Table striped bordered hover responsive style={{ maxWidth:'1000px' ,marginLeft:'auto', marginRight:'auto', border:'2px solid #757a96'}} >
    <thead>
      <tr >
        <th class="text-center mb-4 mt-2">Hash</th>
        <th class="text-center mb-4 mt-2">HashPrevio</th>
        <th class="text-center mb-4 mt-2">Transaccion</th>
        <th class="text-center mb-4 mt-2">Fecha</th>
      </tr>
    </thead>
    <tbody>
    { lista.map(tupla => (
      <tr>
        <td class="text-center mb-4 mt-2">{tupla.Hash}</td>
        <td class="text-center mb-4 mt-2">{tupla.HashPrevio}</td>
        <td class="text-center mb-4 mt-2">{tupla.Transaccion}</td>
        <td class="text-center mb-4 mt-2">{tupla.Fecha}</td>
      </tr>
       )) }  
    </tbody>
</Table>

</div>
      );
  
      return (
        <div className='Container'>
            <NoDisponible mensaje="Usted ya postulo o se encuentra fuera de rango de fechas disponibles para postular."/>
        </div>
      ) 
  
 }
};