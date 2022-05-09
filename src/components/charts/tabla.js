import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
const list = [
    { id: 1, name:"John", partido:"PSG",votos: 102 },
    { id: 2, name:"Jane", partido:"RM",votos: 23},
    { id: 3, name:"Fabricio", partido:"WTF",votos: 50},
]
const colNames=['Id','Candidato', 'Partido','Votos']

export default class tabla extends Component {
render() {
    return (
    <div style={{width: '100%', height: 'auto', margin:'auto', maxWidth:'400px'}}>
        {list.length>0 && (
            <Table striped bordered hover>
                <thead >
                    <tr>
                        {colNames.map((headerItem,index)=>(
                            <th key={index}>
                                {headerItem.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.values(list).map((obj, index)=>(
                        <tr key={index}>
                            {Object.values(obj).map((value,index2)=>(
                                <td key={index2}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </div>
    )
}
}
