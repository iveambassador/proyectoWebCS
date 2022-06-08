import React, { Component } from "react";
import Pie from "./charts/pie";
import Bar from "./charts/bar";
import Tabla from "./charts/tabla";
export const list = [
  { id: 1, name:"John", partido:"PSG",votos: 102 },
  { id: 2, name:"Jane", partido:"RM",votos: 23},
  { id: 3, name:"Fabricio", partido:"WTF",votos: 50},
]

const data = {
  labels: ['John', 'Jane', 'Fabricio','Blanco','Nulo'],
  datasets: [
    {
      label: '# of Votes',
      data: [102, 23, 50, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
}

const home = () => {
    return (
      <div>
        <Tabla listas ={list} />
        <Pie datos={data}/>
        <Bar datos={data}/>
        {console.log(list)}
      </div>
    );
}

export default home