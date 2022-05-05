import React from 'react'
import { useParams } from 'react-router-dom'
export default function Parametros() {
    const {id} = useParams()
    // const dato = useParams()
  return (

    // <div>este es tu id {dato.id}</div>
    <div>este es tu id {id}</div>
  )
}
