import React from "react";
import Pie from "./charts/pie";
import Bar from "./charts/bar";
import Tabla from "./charts/tabla";

import { useState,useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from "../confs/firebaseConf";

const Home = () => {
  const [users, setUsers]=useState([])
  const usersCollectionRef = collection(firestore,"resultados")
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
    const info =  {id:persona.id, name:persona.name, partido:persona.partido, votos:persona.votos} 
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
    return p.color
  })


  //tabla de resultados 
  const list = resultados 
  
  //generar un color aleatorio
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  

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
    return (
      <div>
        <Tabla listas ={list} />
        <Pie datos={data}/>
        <Bar datos={data}/>
        {console.log(list)}
      </div>
    );
}

export default Home