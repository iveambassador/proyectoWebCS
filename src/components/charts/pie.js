import React, { Component } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
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
  };

export default class pie extends Component {
  render() {
    return (
      <div style={{width: '100%', height: 'auto', margin:'auto', maxWidth:'400px'}}>
        <Pie data={data} />
      </div>
    )
  }
}
