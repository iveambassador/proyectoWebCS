import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import NavbarComp from './components/NavbarComp';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home'
import Login from './routes/Login'
import Navbar from './components/Navbar';
import UserProvider from './context/UserProvider';
import RequireAuth from './components/RequireAuth';
import Register from './routes/Register';


//import Home from './components/home'
//import Urna from './components/urna'
//import Register from './components/register'
//import Login from './components/login'
//import logo from '../blockchain-logo-svg-vector.svg'
//import EmitirVoto from './components/EmitirVoto'
//import PagePostulante from './components/PagePostulante';
//import Convocatoria from './components/Convovatoria';
//import CrearPostulacion from './components/CrearPostulacion';

function App() {
  
  return (
    <BrowserRouter>
      <UserProvider>
      <Navbar/>
        <h1>App</h1>
        <Routes>
          <Route path='/' element={
            <RequireAuth>
              <Home/>
            </RequireAuth>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;