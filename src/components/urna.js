import React, { Component } from 'react'
import { async } from '@firebase/util';
import { doc } from 'firebase/firestore';
import {getUrna} from '../confs/firebaseConf';

window.addEventListener('DOMContentLoaded', async() => {
    
    const querySnapshot = await getUrna()

    let shtml = ''
    const dataTable = document.getElementById('dataTablee')

    querySnapshot.forEach(doc => {
        shtml += `
            <tr>
            <td>${doc.data().HashVoto}</td>
            <td>${doc.data().Elector}</td>
            <td>${doc.data().Voto}</td>
            </tr>
        `
    })

    dataTable.innerHTML = shtml
})

export default class urna extends Component {
  render() {
    return (
      <div>
          <h1>Urna Electoral</h1>
          <div className='table-responsive'>
            <table class="table table-bordered table-hover caption-top">
                <caption>Urna electoral</caption>
                <thead className='table-active'>
                    <tr>
                    <th scope="col">Hash del voto</th>
                    <th scope="col">Elector</th>
                    <th scope="col">Voto</th>
                    <th scope="col">Hash del partido</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    </tr>
                </thead>
                <tbody id="dataTablee">
                </tbody>
            </table>
        </div>
      </div>
      
    )
  }
}
