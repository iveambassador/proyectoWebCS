import { render } from '@testing-library/react';
import React, { Component } from 'react'
//import { async } from '@firebase/util';
//import { doc } from 'firebase/firestore';
import {getUrna} from '../confs/firebaseConf';
import '../Styles/urna.css';

export default class urna extends Component {
  componentDidMount() {
    insertData()
  }

  render() {
    return (
      <div id="urnaa">
        <div className='title-urna'>Urna Electoral</div>
        <div className='table-container'>
          <div className='table-responsive'>
            <table className='table-urna'>
                <thead className='table-header'>
                    <tr>
                    <th>Hash del voto</th>
                    <th>Elector</th>
                    <th>Voto</th>
                    <th>Fecha</th>
                    </tr>
                </thead>
                <tbody id="dataTablee">
                </tbody>
            </table>
        </div>
        </div>
      </div>
    )
  }
}

  /*
  var urnabutton = document.getElementById('navurna')
  urnabutton.addEventListener("click", async () => {
  })*/

  async function insertData() {
    console.log('xd')
    console.log('Se ejecuta insertData()')
    const querySnapshot = await getUrna()

    let shtml = ''
    const dataTable = document.getElementById('dataTablee')

    querySnapshot.forEach(doc => {
        var firedate = doc.data().Fecha
        var reactdate = firedate.toDate()
        var thedate = reactdate.toLocaleString();

        shtml += `
            <tr>
            <td>${doc.data().HashVoto}</td>
            <td>${doc.data().Elector}</td>
            <td>${doc.data().Voto}</td>
            <td>${thedate}</td>
            </tr>
        `
    })

    dataTable.innerHTML = shtml
  }