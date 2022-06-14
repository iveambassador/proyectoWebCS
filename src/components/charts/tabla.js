import React from 'react'
import { Table } from 'react-bootstrap'

const colNames=['Id','Candidato', 'Partido','Votos']

const tabla = ({listas}) => {
return (
    <div>
        <h3 className="text-center">Tabla de resultados: </h3>
        {listas.length>0 && (
            <Table striped bordered hover responsive style={{ maxWidth:'400px' ,marginLeft:'auto', marginRight:'auto'}}>
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
