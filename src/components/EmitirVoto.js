import React from 'react'
import Candidato from './Candidato'
import '../Styles/EmitirVoto.css'
import { Button } from 'react-bootstrap'
import NoDisponible from './NoDisponible'
import Modal from './Modal'
import ModalConfiramcion from './ModalConfirmacion'
import { firestore } from "../confs/firebaseConf";
import { app } from "../confs/firebaseConf";
import {collection,query, where, getDocs, getFirestore, updateDoc, doc, deleteDoc, setDoc, getDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth} from 'firebase/auth'

export default function EmitirVoto(props) {
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [mensaje, setMensaje] = useState("hola papu como estas !! ?")
  

  const [lista, setList] = useState([]);
  const [bandera, setBandera] = useState(0);
  const [checkedState, setCheckedState] = useState([]);
    
  const [valido, setValido] = useState(true);
  // let condicion = true;
  // if(condicion){

  const handlePadre = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    //console.log(checkedState);
  }

  const guardarVoto = (hashGenerado,voteDate) =>{
    var votoElegido;
    var primeraOcurrencia = checkedState.indexOf(true);
    if(primeraOcurrencia == -1){
      //es voto en blanco
      votoElegido = 'Blanco';
    }else{
      var ultimaOcurrencia = checkedState.lastIndexOf(true);
      if(primeraOcurrencia != ultimaOcurrencia){
        //Es voto nulo
        votoElegido = 'Nulo';
      }else{
        //votoElegido = 'Valido';
        const foundCandidato = lista.find(element => element.ix === primeraOcurrencia);
        const foundName = foundCandidato.sigla;
        const foundId = foundCandidato.idCandidato;
        votoElegido = foundName;
        guardarEnPartidos(foundId);
        //console.log(foundName);
      }
    }
    console.log(votoElegido);
    guardarEnUsuario(votoElegido,hashGenerado,voteDate);
  }

  const guardarEnUsuario = async (voteValue, voteHash,voteDate) =>{
    let idUsuario = getAuth(app).currentUser.uid;
    const theUser = doc(firestore, "UsuarioComun", idUsuario);

    if(voteValue === "Nulo"){
      await updateDoc(theUser, {
        VotoEstado : true,
        VotoNulo : 1,
        VotoHash : voteHash,
        VotoFecha: voteDate
      });
    }else{
      if(voteValue === "Blanco"){
        await updateDoc(theUser, {
          VotoEstado : true,
          VotoBlanco : 1,
          VotoHash : voteHash,
          VotoFecha: voteDate
        });
      }else{
        await updateDoc(theUser, {
          VotoEstado : true,
          VotoPartidoSigla : voteValue,
          VotoHash : voteHash,
          VotoFecha: voteDate
        });
      }
    }
    console.log("Datos actualizados en la coleccion Usuario Comun");

  }

  const guardarEnPartidos = async (idPartido) =>{
    console.log(idPartido);
    const thePartido = doc(firestore, "PartidosAceptados", idPartido);
    const docSnap = await getDoc(thePartido);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    let actualCuenta = docSnap.data().Cant;
    let newCuenta = actualCuenta+1;
    await updateDoc(thePartido, {
      Cant : newCuenta
    });
    console.log("Cantidad de votos ",newCuenta);
  }

  useEffect(() => {
    const test = async ()=>{
      try {
      //const thequery = query(collection(firestore, "UsuarioComun"), where("PostularEstado", "==", true));
      //const postulantesAceptados = await getDocs(thequery);
      const postulantesAceptados = await getDocs(collection(firestore, "PartidosAceptados"));
      console.log(postulantesAceptados.size);
      const listaTemp = [];
      var i = 0;
      postulantesAceptados.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        let idCandidato = doc.id
        let nombreCandi = doc.data().NombreCandidato
        //let apellido = doc.data().Apellido
        //let nombreCandi = nombre + " " + apellido
        let nombrePartid = doc.data().NombrePartido
        let sigla = doc.data().Sigla
        let cargo = doc.data().Cargo
        let ix = i
        let dato = {idCandidato,nombrePartid,sigla,cargo,nombreCandi,ix}
        listaTemp.push(dato);
        i = i + 1;
        //checkedState.push(false);
      })
      //checkedState = new Array(i+1).fill(false);
      for (var j = 0; j < i; j++) {
        checkedState.push(false);
      }
      console.log("Lista Temporal",listaTemp);
      //console.log(i);
      setList(listaTemp);
      } catch (error) {
        console.log(error)
      }
    }
    test(); 
    console.log("estos son los datos")
    console.log(lista)
   }, [bandera]);

   useEffect(() => {
    console.log(checkedState);
    },[checkedState]);
  
   useEffect(() => {
   const cumple = async ()=>{
    const listaFechas = [];
    try {
    const q = query(collection(firestore, "AdministrarFechas"), where("Activo", "==", true));
    const usuariosComun = await getDocs(q);
    usuariosComun.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
      let id = doc.id
      let NombreEleccion = doc.data().NombreEleccion
      let DescripcionEleccion= doc.data().DescripcionEleccion
      let FechaIniEleccion = doc.data().FechaIniEleccion
      let FechaFinEleccion = doc.data().FechaFinEleccion
      let HoraIniEleccion = doc.data().HoraIniEleccion
      let HoraFinEleccion = doc.data().HoraFinEleccion
      let FechaIniPostulacion = doc.data().FechaIniPostulacion
      let FechaFinPostulacion = doc.data().FechaFinPostulacion
      let Activo = doc.data().Activo
      let dato = { id, NombreEleccion, DescripcionEleccion, FechaIniEleccion, FechaFinEleccion, HoraIniEleccion, HoraFinEleccion, FechaIniPostulacion, FechaFinPostulacion, Activo }
      listaFechas.push(dato);
    })
    } catch (error) {
      console.log(error)
    }
    console.log("estas soon las fechas")
    console.log(listaFechas)
    console.log(listaFechas[0].FechaIniPostulacion.toString())
    let hoy = new Date()
    let dia = parseInt(hoy.getDate())
    let mes = parseInt(( hoy.getMonth() + 1 ))
    let año = parseInt(hoy.getFullYear())
    let hora = parseInt(hoy.getHours())
    let minutos = parseInt(hoy.getMinutes())
    let fechaVoto = listaFechas[0].FechaIniEleccion.toString().split('-')
    let inicio = listaFechas[0].HoraIniEleccion.toString().split(':')
    let fin = listaFechas[0].HoraFinEleccion.toString().split(':')
    //console.log("este es el split: ")
    //console.log(fechaVoto)
    //console.log(inicio)
    //console.log(fin)
    //console.log(dia)
    //console.log(mes)
    //console.log(año)
    //console.log(hora)
    //console.log(minutos)
    let idUsuario = getAuth(app).currentUser.uid;
    const usuarioActual = doc(firestore, "UsuarioComun", idUsuario);
    const DatosUser = await getDoc(usuarioActual);
    if((año===parseInt(fechaVoto[0]) && mes===parseInt(fechaVoto[1]) && dia===parseInt(fechaVoto[2])) && hora >= parseInt(inicio[0]) && minutos >= parseInt(inicio[1]) && hora <= parseInt(fin[0]) && minutos <= parseInt(fin[1]) && DatosUser.data().VotoEstado===false){
      setValido(true)
    }else{
      setValido(false)
    }
  }
  cumple();
}, []);

  if (valido){
    return (
      <div className='Container'>
        
        <h1>¡Comienza con  I Vote!</h1>
        <div className='Cont-Titulo'>
          <div className='tester'>
          <h5>Marca al candidato de tu preferencia.</h5>
          <h5>Puedes votar en blanco si esa es tu elección.</h5>
          <h5>Si marcas más de una casilla se contara como voto "nulo".</h5>
          </div>
          <div className='testers'></div>
          <div className='testers'></div>
        </div>
        <div className='Cont-Candidatos'>
        { lista.map(tupla => (
          <Candidato 
          key = {tupla.idCandidato}
          Partido={tupla.nombrePartid}
          NombreAp={tupla.nombreCandi}
          Cargo={tupla.cargo}
          index={tupla.ix}
          handlePadree={handlePadre}
          />  
          )) }      
        </div>
        <Button variant="primary" size='lg' className='mb-4' onClick={() => setModalShow(true)}>¡Guardar Voto!</Button>

        <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        test = {() => setShow(true)}
        setMensaje = {setMensaje}
        funcionClasificar = {guardarVoto}
        />

        <ModalConfiramcion 
        show={show}
        onHide={() => setShow(false)}
        mensaje = {mensaje}/>
      </div>
    )
  }else{
    return (
      <div className='Container'>
          <NoDisponible mensaje="Hola! por el momento no se encuentra disponible una votacion ¿porque no intentas mas tarde?"/>
      </div>
    
    ) 
  }
};
