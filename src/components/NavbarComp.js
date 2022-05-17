import React, { Component } from 'react'
import { Navbar, Nav, Container, NavLink, NavDropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './home'
import Urna from './urna'
import Register from './register'
import Login from './login'
import logo from '../blockchain-logo-svg-vector.svg'
import EmitirVoto from './EmitirVoto'

export default class NavbarComp extends Component {
  render() {
    return (
      <Router>
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
              <Container fluid>
                  <Navbar.Brand> </Navbar.Brand>
                  <Navbar.Brand as={Link} to={"/"}> <img src={logo}></img> I Vote!</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                  <Nav
                      className="me-auto my-2 my-lg-0"
                      style={{ maxHeight: '100px' }}
                      navbarScroll
                  >   
                      <Nav.Link as={Link} to={"/"}></Nav.Link>
                      <Nav.Link as={Link} to={"/"}></Nav.Link>
                      <Nav.Link as={Link} to={"/"}></Nav.Link>
                      
                      <Nav.Link as={Link} to={"/"}>Inicio</Nav.Link>
                      <Nav.Link id = "navurna" as={Link} to={"/urna"}>Urna Electoral</Nav.Link>
                      <Nav.Link as={Link} to={"/EmitirVoto"}>Emitir Voto</Nav.Link>
                  </Nav>
                  <Nav>
                    <NavDropdown title="b474d48cdfc4974d86ef4d24904cdd91..." id='basic-nav-dropdown'>
                      <NavDropdown.Item href='#logout'>Cerrar Sesión</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to={"/login"}>Iniciar Sesión</Nav.Link>
                    <Nav.Link as={Link} to={"/register"}>Registrarse</Nav.Link>
                  </Nav>
                  </Navbar.Collapse>
              </Container>
              </Navbar>
              <div>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/urna" element={<Urna/>}/>
                  <Route path="/EmitirVoto" element={<EmitirVoto posi={true}/>}/>
                  <Route path="/login" element={<Login/>}/>                    
                  <Route path="/register" element={<Register/>}/>
                 
                </Routes>
              </div>
        </div>
      </Router>
    )
  }
}
