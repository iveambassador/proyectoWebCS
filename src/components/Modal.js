import { async } from '@firebase/util';
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import block from './blockchain/block';
import { firestore } from "../confs/firebaseConf";
import { collection, getDocs, addDoc, setDoc, doc, Timestamp, updateDoc, getDoc } from "firebase/firestore";
import { getAuth} from 'firebase/auth'
import { app } from "../confs/firebaseConf";
const Blockchain = require('./blockchain/blockchain');
const SHA256 = require('crypto-js/sha256');


export default function Modales(props) {
  async function HMACSHA256() {
    let listita = [];
    const allUsers = await getDocs(collection(firestore, "BlockChain"));
      allUsers.forEach((doc) => {
        listita.push(doc.id)
      });

    let hashGenerado = (SHA256(JSON.stringify()).toString()).slice(0,-32);
  
    while(listita.includes(hashGenerado)){
      hashGenerado = (SHA256(hashGenerado).toString()).slice(0,-32);
    }
    return hashGenerado;
  }

  const getCurrentDate = () => {
    var today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    
    
    if(day < 10){
      day = '0'+day;
    }
    if(month < 10){
      month = '0'+month;
    }
    if(hours < 10){
      hours = '0'+hours;
    }
    if(minutes < 10){
      minutes = '0'+minutes;
    }
    const voteDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;

    return voteDate;
  }

    async function CambiarModal(){
      let user = getAuth(app).currentUser.uid;
      const test = doc(firestore, "UsuarioComun", user);
      const DatosUser = await getDoc(test);
      const hashG = await HMACSHA256()
      let data = 2;
      let fecha = new Date()

      let elHashPrevio = DatosUser.data().HashPostular;
      if(elHashPrevio == ''){
        elHashPrevio = DatosUser.data().HashSemilla;
        data = 1;
      }
      let bady = parseInt(Math.random() * (10000000));
      await setDoc(doc(firestore, "BlockChain", hashG), {
        Hash : hashG,
        HashPrevio : elHashPrevio,
        Data : data,
        Fecha : fecha,
        Body : bady,
        Transaccion : 'Voto',
      });
      console.log(`Hash : ${hashG}`)
      console.log(`HashPrevio : ${elHashPrevio}`)
      console.log(` Fecha : ${fecha}`)
      console.log(`Body : ${bady}`)
      console.log(`Transaccion : Voto`)

      await updateDoc(test, {
        HashVoto : hashG,
      });

      const voteDate = getCurrentDate();
      props.onHide()
      props.test()
      props.setMensaje(`${hashG}`)
      props.funcionClasificar(hashG, voteDate)
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ¡Espera!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>¿Estás seguro de que deseas continuar?</h4>
          <p>
            Una vez realizado el voto no puedes cambiarlo. ¿Estás seguro de esta acción?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={CambiarModal}>Aceptar</Button>
          <Button onClick={props.onHide}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    );
  }