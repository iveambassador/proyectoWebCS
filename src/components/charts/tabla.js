import React from 'react'
import { Table } from 'react-bootstrap'

const colNames=['Hash','Candidato', 'Partido','Votos']

const tabla = ({listas}) => {
return (
    <div>
        <h3 className="text-center">Tabla de resultados: </h3>
        {listas.length>0 && (
            <Table striped bordered hover responsive style={{ maxWidth:'700px' ,marginLeft:'auto', marginRight:'auto', border:'2px solid #757a96'}}>
                <thead style={{border:'2px solid #757a96'}}>
                    <tr>
                        {colNames.map((headerItem,index)=>(
                            <th key={index} class="text-center mb-4 mt-2">
                                {headerItem.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.values(listas).map((obj, index)=>(
                        <tr key={index} class="text-center mb-4 mt-2">
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
