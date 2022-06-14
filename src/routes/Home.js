import React from "react";
import Pie from "../components/charts/pie";
import Bar from "../components/charts/bar";
import Tabla from "../components/charts/tabla";

import { useState,useEffect } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from "../confs/firebaseConf";

const Home = () => {
  const [isStart, setStart] =  useState(true)
  const [users, setUsers]=useState([])
  const [nombre, setNombreEleccion] =  useState('');
  const [descripcion, setDescripcion] =  useState('');
  const usersCollectionRef = collection(firestore,"PartidosAceptados")
  useEffect(()=> {
  //Leer     
  const getUsers = async () =>{
      const data = await getDocs(usersCollectionRef)
      //console.log(data)
      setUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id})))

      const q = query(collection(firestore, "AdministrarFechas"), where("Activo", "==", true));
      const lafecha = await getDocs(q);
      lafecha.forEach((doc) => {
        let id = doc.id
        let tituloEleccion = doc.data().DescripcionEleccion
        let nombreEleccion = doc.data().NombreEleccion
        setNombreEleccion(nombreEleccion);
        setDescripcion(tituloEleccion);
      })
      setStart(false)
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
  if (isStart) {return <h4 className="p-1">Cargando...</h4>}else{
    return (
      <div>
        {esta() ? (
          <>
            <h2 className="text-center mb-4 mt-2">{nombre}</h2>
            <Tabla listas ={list} />
            <Pie datos={data}/>
            <Bar datos={data}/>
            
          </>
        ):(
          <>
            <div className="Container">
              <h2>Bienvenido a iVote</h2>
              <h2>Los resultados de la votación aún no se encuentran disponibles.</h2>
              <h2>¿Por qué no intentas más tarde?</h2>
            </div>
          </>
        )}
        
      </div>
    );
  }
}

export default Home