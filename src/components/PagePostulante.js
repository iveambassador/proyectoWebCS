import React from 'react'
import '../Styles/Postulante.css'
import Postulante from './Postulante'
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import {collection,query, where, getDocs, getFirestore, updateDoc, doc} from "firebase/firestore";
//import { async } from '@firebase/util';
export default function PagePostulantes() {

  //componentDidMount() { this.getBooks() }
  async function test(){
    const q = query(collection(firestore, "UsuarioComun"), where("PostularEstado", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  }
  test();
   console.log("Se imprime!!!")
  return (
    <div className="contMain">
      <div className='contPostulante'>
        <h4 className='contenedor-testimonio w-100'>Postulantes: </h4>
        <Postulante 
          nombre='Juanito Pérez Test'
          ci='154236780'
          telefono='7156480'
          partido='Juntos por el 100'
          cargo='Secretario de deposrtes'
        />
        <Postulante />
        <Postulante />
      </div>
    </div>
  )
}
