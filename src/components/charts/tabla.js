import React from 'react'
import { Table } from 'react-bootstrap'

const colNames=['Id','Candidato', 'Partido','Votos']

const tabla = ({listas}) => {
return (
    <div style={{width: '100%', height: 'auto', margin:'auto', maxWidth:'400px'}}>
        <h3>Tabla de resultados: </h3>
        {listas.length>0 && (
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
                    {Object.values(listas).map((obj, index)=>(
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

export default tabla
