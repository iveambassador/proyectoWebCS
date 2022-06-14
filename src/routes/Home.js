import React from "react";
import Pie from "../components/charts/pie";
import Bar from "../components/charts/bar";
import Tabla from "../components/charts/tabla";

import { useState,useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from "../confs/firebaseConf";

const Home = () => {
  const [users, setUsers]=useState([])
  const usersCollectionRef = collection(firestore,"PartidosAceptados")
  useEffect(()=> {
  //Leer     
  const getUsers = async () =>{
      const data = await getDocs(usersCollectionRef)
      //console.log(data)
      setUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
  }
  getUsers()
  },[])

  
  // obtener datos de firestore
  const resultados =users.map((persona)=>{
    const info =  {id:persona.id, name:persona.NombreCandidato, partido:persona.Sigla, votos:persona.Cant, color:persona.Color}
    return info  
  })
  console.log(users)

  //obtener partidos de resultados []
  const partidos= resultados.map((p)=>{
    return  p.partido
  })

  //obtener votos de resultados []
  const conteo = resultados.map((p)=>{
    return p.votos
  })
  //obtener color de firestore
  const colores  = users.map((p)=>{
    return p.Color
  })

  //tabla de resultados 
  const list = resultados 
  
  //generar un color aleatorio
  var randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
  //console.log(randomColor)

  //graficas de resultsados 
  const data = {
    labels: partidos,
    datasets: [
      {
        label: 'Votos',
        data: conteo,
        backgroundColor: colores,        
        borderWidth: 1,
      },
    ]
  }
  const esta=()=>{
    if (users.length===0) {
      return false
    } else {
      return true
    }
  }

    return (
      <div>
        {esta() ? (
          <>
            <Tabla listas ={list} />
            <Pie datos={data}/>
            <Bar datos={data}/>
            
          </>
        ):(
          <>
            <div className="Container">
              <h1>Bienvenido a iVote</h1>
              <h1>No esta disponible en resultados</h1>
              <h1>¿Porque no intentas más tarde?</h1>
            </div>
          </>
        )}
        
      </div>
    );
}

export default Home