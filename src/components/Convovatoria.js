import React from 'react'
import Campos from './Campos'
import Fecha from './Fecha'
import Hora from './Hora'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { UserContext } from "../context/UserProvider";
//import { Card, Form, Button } from "react-bootstrap";
//import { app } from "../confs/firebaseConf";
import { firestore } from "../confs/firebaseConf";
import { collection, getDocs, addDoc, setDoc, doc, Timestamp, where, query, updateDoc, deleteDoc } from "firebase/firestore";
//import { getAuth} from 'firebase/auth'
export default function Convovatoria() {
  const [nombreEleccion, setNombreEleccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaVotoHabil, setFechaVoto] = useState('');
  const [horaIniVoto, setInivoto] = useState('');
  const [horaFinVoto, setFinVoto] = useState('');
  const [fechaIniPostulacion, setIniPos] = useState('');
  const [fechaFinPostulacion, setFinPos] = useState('');

  /*const navegate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navegate("/");
      //const user = getAuth(app).currentUser.uid;
      async function limpiarFechas(dato){
        const washingtonRef = doc(firestore, "AdministrarFechas", dato);
        await updateDoc(washingtonRef, {
          Activo: false
        });
      }

      async function borrarPartidos(identificador){
        await deleteDoc(doc(firestore, "PartidosAceptados",identificador));
      }

      async function limpiarVotos(idUser){
        const unUsuario = doc(firestore, "UsuarioComun", idUser);
        await updateDoc(unUsuario, {
          VotoEstado: false,
          VotoBlanco : 0,
          VotoNulo : 0,
          PostularEstado : false,
          PuedePostular : true
        });
      }
      const allUsers = await getDocs(collection(firestore, "UsuarioComun"));
      allUsers.forEach((doc) => {
        limpiarVotos(doc.id);
      });

      const querySnapshot = await getDocs(collection(firestore, "PartidosAceptados"));
      querySnapshot.forEach((doc) => {
        borrarPartidos(doc.id);
      });

      let listita = []
      const q = query(collection(firestore, "AdministrarFechas"), where("Activo", "==", true));
      const usuariosComun = await getDocs(q);
      usuariosComun.forEach((doc) => {
        let id = doc.id
        listita.push(id)
        limpiarFechas(id)
      })
      //console.log('la listita es:')
      //console.log(listita);
      
      await addDoc(collection(firestore, "AdministrarFechas"), {
        NombreEleccion : nombreEleccion,
        DescripcionEleccion: descripcion,
        FechaIniEleccion : fechaVotoHabil,
        FechaFinEleccion : fechaVotoHabil,
        HoraIniEleccion : horaIniVoto,
        HoraFinEleccion : horaFinVoto,
        FechaIniPostulacion : fechaIniPostulacion,
        FechaFinPostulacion : fechaFinPostulacion,
        Activo : true
      });
      
      
    } catch (error) {
      console.log(error.code);
      <form className='contLoginTittle'onSubmit={handleSubmit}>
    }
  }*/
  return (
    <div className="contLogin" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
        <div className="col-lg-4 col-md-6 col-sm-8 col-11 formulario my-5">
          <form className='contLoginTittle'>
            
            <div className="form-group text-center py-3">
              <h2>Convocar a elecciones</h2>
            </div>
            <div className='contLoginBody pt-1'>
              <Campos NombreCampo="Nombre de la elección: " Holder='ingrese su nombre' setValue={setNombreEleccion}/>
              <Campos NombreCampo="Descripción:" Holder='ingrese una descripción'setValue={setDescripcion}/>
              {/* <Campos NombreCampo="Nombre de la organización" Holder='ingrese su CI'/> */}
              <Fecha NombreCampo="Fecha de votación: " setValue={setFechaVoto}/>
              <Hora NombreCampo="Hora inicio de votación: " setValue={setInivoto}/>
              <Hora NombreCampo="Hora fin de votación: " setValue={setFinVoto}/>
              <Fecha NombreCampo="Fecha inicial de postulación: " setValue={setIniPos}/>
              <Fecha NombreCampo="Fecha final de postulación: " setValue={setFinPos}/>
              
              <div className="form-group mx-sm-4 text-center">
                {/* <input type="submit" className="btn btn-dark w-50 mt-5 mb-3" style={{backgroundColor: '#EEF2F6', color:'black',border:'none'}} value="Crear" />  */}
                <input type="submit" className="btn btn-dark w-50 mt-5 mb-3" value="Crear" /> 
              </div>
            </div>
          </form>
        </div>
      </div>

  )
}
