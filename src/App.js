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


import Home from './components/home'
import Urna from './components/urna'
import Postularme from './components/postularme'
//import Register from './components/register'
//import Login from './components/login'
//import logo from '../blockchain-logo-svg-vector.svg'
import EmitirVoto from './components/EmitirVoto'
import PagePostulante from './components/PagePostulante';
import Convocatoria from './components/Convovatoria';
import CrearPostulacion from './components/CrearPostulacion';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <NavbarComp/>
        <Routes>
          <Route path='/user' element={ <RequireAuth><User/></RequireAuth>} />
          <Route path="/" element={<Home/>}/>
          <Route path="/urna" element={<Urna/>}/>
          <Route path="/EmitirVoto" element={<RequireAuth> <EmitirVoto posi={true}/></RequireAuth>}/>
          <Route path="/login" element={<Login/>}/>                    
          <Route path="/register" element={<Register/>}/>
          <Route path="/PagePostulante" element={<RequireAuth><PagePostulante/></RequireAuth>}/>
          <Route path="/Convocatoria" element={<RequireAuth><Convocatoria/></RequireAuth>}/>
          <Route path="/CrearPostulacion" element={<RequireAuth><CrearPostulacion/></RequireAuth>}/>
          <Route path="/Postularme" element={<RequireAuth><Postularme/></RequireAuth>}/>
                </Routes>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;