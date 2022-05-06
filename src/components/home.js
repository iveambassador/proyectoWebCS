import React, { Component } from 'react'
import Pie from './charts/pie'
import Bar from './charts/bar'


export default class home extends Component {

  render() {
    return (
        <div>
            <Pie/>
            <Bar/>
        </div>
    )
  }
}
