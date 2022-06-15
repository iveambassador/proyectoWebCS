import React, { Component } from "react";
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
import {collection, getDocs, getFirestore, updateDoc, doc, query, where, getDoc, setDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../Styles/Login.css'
import { useState, useEffect } from "react";
import NoDisponible from './NoDisponible'
import { Table } from "react-bootstrap";


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
        let hVoto = DatosUser.data().HashVoto;
      
        const listaTemp = [];
        const thashS = doc(firestore, "BlockChain", hSemilla);
        const DatosSem = await getDoc(thashS);
        let Hash = DatosSem.data().HashSemilla
        let HashPrevio = DatosSem.data().HashPrevio+'init'
        let Transaccion = DatosSem.data().Transaccion
        let Fecha = (DatosSem.data().Fecha).toString()
        let dato = {Hash,HashPrevio,Transaccion,Fecha}
        listaTemp.push(dato);

        if(hPostular){
            const thashP = doc(firestore, "BlockChain", hPostular);
            const DatosPos = await getDoc(thashP);
            let Hash = DatosPos.data().Hash
            let HashPrevio = DatosPos.data().HashPrevio
            let Transaccion = DatosPos.data().Transaccion
            let Fecha = (DatosPos.data().Fecha).toString()
            let dato = {Hash,HashPrevio,Transaccion,Fecha}
            listaTemp.push(dato);
        }
        if(hVoto){
            const thashV = doc(firestore, "BlockChain", hVoto);
            const DatosVot = await getDoc(thashV);
            let Hash = DatosVot.data().Hash
            let HashPrevio = DatosVot.data().HashPrevio
            let Transaccion = DatosVot.data().Transaccion
            let Fecha = (DatosVot.data().Fecha).toString()
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
    

 if (isStart) {return <h4 className="p-1">Cargando...</h4>}else{
  
   
      return (
          <Table striped bordered hover>
    <thead>
      <tr>
        <th>Hash</th>
        <th>HashPrevio</th>
        <th>Transaccion</th>
        <th>Fecha</th>
      </tr>
    </thead>
    <tbody>
    { lista.map(tupla => (
      <tr>
        <td>{tupla.Hash}</td>
        <td>{tupla.HashPrevio}</td>
        <td>{tupla.Transaccion}</td>
        <td>{tupla.Fecha}</td>
      </tr>
       )) }  
    </tbody>
</Table>
      );
  
      return (
        <div className='Container'>
            <NoDisponible mensaje="Usted ya postulo o se encuentra fuera de rango de fechas disponibles para postular."/>
        </div>
      ) 
  
 }
};