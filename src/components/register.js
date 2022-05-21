import React, { Component } from 'react'
import Campos from './Campos'
export default function register(){

    return (

      <div className="contLogin" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
        <div className="col-lg-4 col-md-6 col-sm-8 col-11 formulario my-5">
          <form className='contLoginTittle'>
            
            <div className="form-group text-center py-3">
              <h2>Registrarse</h2>
            </div>
            <div className='contLoginBody pt-1'>
              <Campos NombreCampo="Nombre(s):" Holder='ingrese su nombre'/>
              <Campos NombreCampo="Apellido(s):" Holder='ingrese su apellido'/>
              <Campos NombreCampo="Nro. CI:" Holder='ingrese su CI'/>
              <Campos NombreCampo="Correo electrónico:" Holder='correo'/>
              <Campos NombreCampo="Dirección:" Holder='Dirección'/>
              <Campos NombreCampo="Nro. Celular:" Holder='Celular o teléfono'/>
              <Campos NombreCampo="Contraseña:" Holder='ingrese su contraseña'/>
              <Campos NombreCampo="Confirmar contraseña:" Holder='confirme su contraseña'/>
              <div className="form-group mx-sm-4">
                <input type="submit" className="btn btn-dark w-50 mt-5 mb-3" style={{backgroundColor: '#EEF2F6', color:'black',border:'none'}} value="Ingresar" /> 
              </div>
            </div>
          </form>
        </div>
      </div>

  );

}
