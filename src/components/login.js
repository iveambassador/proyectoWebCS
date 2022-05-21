import React, { Component } from 'react'
import '../Styles/Login.css'
export default class login extends Component {
  render() {
    return (


        <div className="contLogin" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
          <div className="col-lg-3 col-md-6 col-sm-8 col-11 formulario">
            <form className='contLoginTittle'>
              
              <div className="form-group text-center py-3">
                <h2>Iniciar sesión</h2>
              </div>
              <div className='contLoginBody pt-1'>
                <div className="form-group mx-sm-4 mt-4">
                  <h5 className='text-start'>Número de CI:</h5>
                  <input type="text" name="usuario" id="usuario" className="form-control" placeholder="Usuario" />
                </div>
                <div className="form-group mx-sm-4 mt-3">
                  <h5 className='text-start'>Contraseña</h5>
                  <input type="password" name="contraseña" id="contraseña" className="form-control" placeholder="Contraseña" />
                </div>
                <div className="form-group mx-sm-4">
                  <input type="submit" className="btn btn-dark w-50 mt-5 mb-3" style={{backgroundColor: '#EEF2F6', color:'black',border:'none'}} value="Ingresar" /> 
                </div>
              </div>
            </form>
          </div>
        </div>

    );
  }
}
