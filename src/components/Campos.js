import React from 'react'

export default function ({NombreCampo, Holder, setValue}) {
  return (
    <div className="form-group mx-sm-4 mt-4 mx-4">
      <h5 className='text-start'>{NombreCampo}</h5>
      <input type="text" name="Nombre" id="Nombre" className="form-control" placeholder={Holder} onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}