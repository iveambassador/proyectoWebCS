import React from 'react'

export default function Hora({NombreCampo, setValue}) {
  return (
    <div className="form-group mx-sm-4 mt-4 mx-4" >
        <h5 className='text-start'>{NombreCampo}</h5>
        <input required type="time" name="fecha" id="fecha" className="form-control" style={{width: ' 100px'}} onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}
