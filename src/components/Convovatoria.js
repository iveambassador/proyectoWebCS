import React from 'react'
import Campos from './Campos'
import Fecha from './Fecha'
import Hora from './Hora'
export default function Convovatoria() {
  return (
    <div className="contLogin" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
        <div className="col-lg-4 col-md-6 col-sm-8 col-11 formulario my-5">
          <form className='contLoginTittle'>
            
            <div className="form-group text-center py-3">
              <h2>Convocatoria a elecciones</h2>
            </div>
            <div className='contLoginBody pt-1'>
              <Campos NombreCampo="Nombre de la elección: " Holder='ingrese su nombre'/>
              <Campos NombreCampo="Descripción" Holder='ingrese su apellido'/>
              <Campos NombreCampo="Nombre de la organización" Holder='ingrese su CI'/>
              <Fecha NombreCampo="Fecha: "/>
              <Hora NombreCampo="Hora inicio: "/>
              <Hora NombreCampo="Hora fin: "/>
              <Fecha NombreCampo="Fecha inicio de postulación: "/>
              <Fecha NombreCampo="Fecha final de postulación: "/>
              
              <div className="form-group mx-sm-4">
                <input type="submit" className="btn btn-dark w-50 mt-5 mb-3" style={{backgroundColor: '#EEF2F6', color:'black',border:'none'}} value="Crear" /> 
              </div>
            </div>
          </form>
        </div>
      </div>

  )
}
