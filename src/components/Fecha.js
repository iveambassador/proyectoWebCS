import React from 'react'

export default function Fecha({NombreCampo}) {
  return (
    <div className="form-group mx-sm-4 mt-4 mx-4" >
        <h5 className='text-start'>{NombreCampo}</h5>
        <input type="date" name="fecha" id="fecha" className="form-control" style={{width: '150px'}}/>
    </div>
  )
}
