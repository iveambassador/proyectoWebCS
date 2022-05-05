
import React, {useEffect} from 'react';
import { collection, getDocs } from "firebase/firestore";
import firestore from './confs/firebaseConf';
import { async } from '@firebase/util';

const App= () =>{
  useEffect(() => {

    const obtenerDatos = async() =>{
      const datos = await getDocs(collection(firestore, 'UrnaVoto'));
      console.log(datos.docs[0].data());
      console.log(datos.docs[1].data());
    }   

    obtenerDatos();
  },[]);

  return(
    <h1>Urna de Votos</h1>
  );
}

export default App;