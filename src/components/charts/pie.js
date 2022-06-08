import React, { Component } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const pie = ({datos}) => {
  
  return (
    <div style={{width: '100%', height: 'auto', margin:'auto', maxWidth:'400px'}}>
      <Pie data={datos} />
    </div>
  )
}

export default pie
