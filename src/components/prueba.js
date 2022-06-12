

import React from 'react'

const persona = [{
    nombre:"Rodrigo",
    apellido:"Ledezma"
},
{
    nombre:"Roger",
    apellido:"Lopez"
}]

const names = persona.map(elemento=>{
    return elemento.nombre
})
const lastnames = persona.map(elemento=>{
    return elemento.apellido
})

const person =[{name:names},{lastname:lastnames}]


console.log(person)
const prueba = () => {
  return (
    <div>prueba</div>
  )
}
export default prueba
