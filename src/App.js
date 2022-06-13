import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './routes/User'
import Login from './routes/Login'
//import Navbar from './components/Navbar';
import UserProvider from './context/UserProvider';
import RequireAuth from './components/RequireAuth';
import Register from './routes/Register';


import Home from './routes/Home'
import Urna from './components/urna'
import Postularme from './components/postularme'
//import Register from './components/register'
//import Login from './components/login'
//import logo from '../blockchain-logo-svg-vector.svg'
import EmitirVoto from './components/EmitirVoto'
import PagePostulante from './components/PagePostulante';
import Convocatoria from './components/Convovatoria';
import CrearPostulacion from './components/CrearPostulacion';
import {PrivateRoutes}  from './routes/PrivateRoutes';



function App() {
  return (
    
    <BrowserRouter>
      <UserProvider>
        <NavbarComp/>
        <Routes>

          {/*rutas publicas */}
          <Route path="/" element={<Home/>}/>
          <Route path="/urna" element={<Urna/>}/>
          <Route path="/login" element={<Login/>}/>                    
          <Route path="/register" element={<Register/>}/>

          {/*rutas admin */}
          <Route element={<PrivateRoutes roles={['admin']}/>}>
          <Route path="/PagePostulante" element={<PagePostulante/>}/>
          <Route path="/Convocatoria" element={<Convocatoria/>}/>
          </Route>

          {/*rutas user authenticated */}
          <Route element={<PrivateRoutes roles={['user']}/>}>

          <Route path="/CrearPostulacion" element={<CrearPostulacion/>}/>
          <Route path="/Postularme" element={<Postularme/>}/>
          <Route path="/EmitirVoto" element={ <EmitirVoto posi={true}/>}/>

          </Route>
          </Routes>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;