import React from 'react'
import Candidato from './Candidato'
import '../Styles/EmitirVoto.css'
import { Button, Spinner } from 'react-bootstrap'
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
  const [mensaje, setMensaje] = useState("Hash Generado");

  //const [hash, setHash] = useState("");
  //const [hashGenerado, setHashGenerado] = useState("");

  const [lista, setList] = useState([]);
  const [bandera, setBandera] = useState(0);
  const [checkedState, setCheckedState] = useState([]);
    
  const [valido, setValido] = useState(true);
  const [isStart, setStart] =  useState(true);
  const [nombre, setNombreEleccion] =  useState('');
  const [descripcion, setDescripcion] =  useState('');

  const handlePadre = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }

  const guardarVoto = (hashGenerado,voteDate) =>{
    var votoElegido;
    var primeraOcurrencia = checkedState.indexOf(true);
    if(primeraOcurrencia == -1){
      //Es voto en blanco
      guardarBlanco();
      votoElegido = 'Blanco';
    }else{
      var ultimaOcurrencia = checkedState.lastIndexOf(true);
      if(primeraOcurrencia != ultimaOcurrencia){
        //Es voto nulo
        guardarNulo();
        votoElegido = 'Nulo';
      }else{

        const foundCandidato = lista.find(element => element.ix === primeraOcurrencia);
        const foundName = foundCandidato.sigla;
        const foundId = foundCandidato.idCandidato;
        votoElegido = foundName;
        guardarEnPartidos(foundId);

      }
    }
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
        VotoFecha: voteDate,
        Transaccion : 'Emitir Voto',
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

  }

  const guardarEnPartidos = async (idPartido) =>{
    const thePartido = doc(firestore, "PartidosAceptados", idPartido);
    const docSnap = await getDoc(thePartido);
    let actualCuenta = docSnap.data().Cant;
    let newCuenta = actualCuenta+1;
    await updateDoc(thePartido, {
      Cant : newCuenta
    });
  };
  const guardarBlanco = async () =>{
    const thePartido = doc(firestore, "PartidosAceptados", "zzzVotoBlanco");
    const docSnap = await getDoc(thePartido);
    let actualCuenta = docSnap.data().Cant;
    let newCuenta = actualCuenta+1;
    await updateDoc(thePartido, {
      Cant : newCuenta
    });
  };
  const guardarNulo = async () =>{
    const thePartido = doc(firestore, "PartidosAceptados", "zzzVotoNulo");
    const docSnap = await getDoc(thePartido);
    let actualCuenta = docSnap.data().Cant;
    let newCuenta = actualCuenta+1;
    await updateDoc(thePartido, {
      Cant : newCuenta
    });
  };

  useEffect(() => {
    const test = async ()=>{
      try {
      
      const postulantesAceptados = await getDocs(collection(firestore, "PartidosAceptados"));
      const listaTemp = [];
      var i = 0;
      postulantesAceptados.forEach((doc) => {

        if(doc.data().Sigla != 'Blanco' && doc.data().Sigla != 'Nulo'){
          let idCandidato = doc.id
          let nombreCandi = doc.data().NombreCandidato
          let nombrePartid = doc.data().NombrePartido
          let sigla = doc.data().Sigla
          let cargo = doc.data().Cargo
          let Foto = doc.data().Foto
          let ix = i
          let dato = {idCandidato,nombrePartid,sigla,cargo,nombreCandi,ix,Foto}
          listaTemp.push(dato);
          i = i + 1;
        }

      })

      for (var j = 0; j < i; j++) {
        checkedState.push(false);
      }

      setList(listaTemp);
      } catch (error) {
        console.log(error)
      }
    }
    test(); 

   }, [bandera]);

   useEffect(() => {

    },[checkedState]);
  
   useEffect(() => {
   const cumple = async ()=>{
    const listaFechas = [];
    try {
    const q = query(collection(firestore, "AdministrarFechas"), where("Activo", "==", true));
    const usuariosComun = await getDocs(q);
    usuariosComun.forEach((doc) => {

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
 
    let hoy = new Date()

    let dia = parseInt(hoy.getDate())
    let mes = parseInt(( hoy.getMonth() + 1 ))
    let año = parseInt(hoy.getFullYear())
    let hora = hoy.getHours()
    let minutos = hoy.getMinutes()
    if(minutos<10){minutos='0'+minutos}
    let horaCompleta = parseInt(hora +''+ minutos)
    let fechaVoto = listaFechas[0].FechaIniEleccion.toString().split('-')
    let inicio = listaFechas[0].HoraIniEleccion.toString().split(':')
    let fin = listaFechas[0].HoraFinEleccion.toString().split(':')

    let contador = 0
    const coleccionPA = await getDocs(collection(firestore, "PartidosAceptados"));
    coleccionPA.forEach((doc) => {
      contador = contador +1;
    });
    let idUsuario = getAuth(app).currentUser.uid;
    const usuarioActual = doc(firestore, "UsuarioComun", idUsuario);
    const DatosUser = await getDoc(usuarioActual);
    if((año===parseInt(fechaVoto[0]) && mes===parseInt(fechaVoto[1]) && dia===parseInt(fechaVoto[2])) && horaCompleta >= parseInt(inicio[0]+inicio[1]) && horaCompleta <= parseInt(fin[0]+fin[1]) && DatosUser.data().VotoEstado===false && contador > 0){
      setValido(true)
    }else{
      setValido(false)
    }
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
  cumple();
}, []);
if (isStart) {return (
  <div className="Container">
    <Spinner animation="border" roles="status">
      <span className="visually-hidden">Cargando...</span>
    </Spinner>
    <h4 className="p-1">Cargando...</h4>
  </div>
);}else{
  if (valido && lista.length > 0){
    return (
      <div className='Container'>
        
        <h1>Emitir Voto</h1>
        <h5 className='mt-2'>{descripcion}</h5>
        <div className='Cont-Titulo'>
          <div className='tester'>
          <h6>Marca al candidato de tu preferencia.</h6>
          <h6>Puedes votar en blanco si esa es tu elección.</h6>
          <h6>Si marcas más de una casilla se contara como voto "nulo".</h6>
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
          Cargo={tupla.sigla}
          index={tupla.ix}
          foto={tupla.Foto}
          handlePadree={handlePadre}
          />  
          )) }
        </div>
        <Button variant="primary" size='lg' className='mb-4' onClick={() => setModalShow(true)}>Guardar Voto</Button>

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
          <NoDisponible mensaje="La jornada electoral no se encuentra disponible. Verifica el horario de votación y recuerda que no puedes votar por segunda vez."/>
      </div>
    
    ) 
  }
}
};
