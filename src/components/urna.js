import React, { Component } from 'react'
//import { async } from '@firebase/util';
//import { doc } from 'firebase/firestore';
import {getUrna} from '../confs/firebaseConf';
import '../Styles/urna.css';

var es_months = new Map();
es_months.set(0, "Enero");
es_months.set(1, "Febrero");
es_months.set(2, "Marzo");
es_months.set(3, "Abril");
es_months.set(4, "Mayo");
es_months.set(5, "Junio");
es_months.set(6, "Julio");
es_months.set(7, "Agosto");
es_months.set(8, "Septiembre");
es_months.set(9, "Octubre");
es_months.set(10, "Noviembre");
es_months.set(11, "Diciembre");

export default class urna extends Component {
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
            <script>console.log('Me lloro')</script>
        </div>
        </div>
      </div>
    )
  }
}

var urnabutton = document.getElementById('navurna')
urnabutton.addEventListener("click", async () => {
    
  console.log('Vamo a rezar')
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
})
