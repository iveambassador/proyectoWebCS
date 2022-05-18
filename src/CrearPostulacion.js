import React from 'react'
import Campos from './components/Campos'
export default function CrearPostulacion() {
  return (
    <div className="contLogin" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
    <div className="col-lg-4 col-md-6 col-sm-8 col-11 formulario my-5">
      <form className='contLoginTittle'>
        
        <div className="form-group text-center py-3">
          <h2>Convocatoria a elecciones</h2>
        </div>
        <div className='contLoginBody pt-1'>
          <Campos NombreCampo="Nombre del partido politico: " Holder='ingrese su nombre'/>
          <Campos NombreCampo="Sigla del partido politico" Holder='ingrese su apellido'/>
         
          <div className="form-group mx-sm-4 mt-4 mx-4" >
                <h5 className='text-start'>Certificado de antecedentes penales</h5>
                <input class="form-control" type="file" id="formFileMultiple" multiple/>
             </div>
             <div className="form-group mx-sm-4 mt-4 mx-4" >
                <h5 className='text-start'>Sigla del paretido politico</h5>
                <input class="form-control" type="file" id="formFileMultiple" multiple/>
             </div>
             <div className="form-group mx-sm-4 mt-4 mx-4" >
                <h5 className='text-start'>Fotografia</h5>
                <input class="form-control" type="file" id="formFileMultiple" multiple/>
             </div>
          <div className="form-group mx-sm-4">
            <input type="submit" className="btn btn-dark w-50 mt-5 mb-3" style={{backgroundColor: '#EEF2F6', color:'black',border:'none'}} value="Crear" /> 
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}
