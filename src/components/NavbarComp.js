import React, { useContext, useState, useEffect } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import logo from '../blockchain-logo-svg-vector.svg'
import {getRolUser } from '../utils/getRolUser'
import { doc, getDoc } from "firebase/firestore";
import { app } from "../confs/firebaseConf";
import { firestore } from "../confs/firebaseConf";
import { getAuth} from 'firebase/auth'
//import { useContext, useEffect, useState } from "react";

const routes = {
  user: [
    {
      name: 'Postularme',
      path: '/Postularme'
    },
    {
      name: 'Emitir Voto',
      path: '/EmitirVoto'
    },
    {
      name: 'Actividades',
      path: '/Actividades'
    },
  ],
  admin: [
    {
      name: 'Postulantes',
      path: '/PagePostulante'
    },
    {
      name: 'Nueva Convocatoria',
      path: '/Convocatoria'
    },
  ]
}
const NavbarComp=()=> {
  const [hashNavbar,setHashNavbar] = useState('');
  const {user,signOutUser} = useContext(UserContext)
  const handleClickLogout = async()=>{
      try {
          await signOutUser();
      } catch (error) {
          console.log(error.code);
      }
  }

    async function getHash(){
      if(user){
        let usuario = getAuth(app).currentUser.uid;
        let consulta = doc(firestore, "UsuarioComun", usuario);
        let datosUser = await getDoc(consulta);
        let HashUser = datosUser.data().HashSemilla;
        let HashGUser = HashUser.toString();
        setHashNavbar(HashGUser);
      }
    }
    getHash();

  

  const userRol = getRolUser(user) 

    return (
      <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
              <Container fluid>
                  
                  <Navbar.Brand as={Link} to={"/"}> <img src={logo}></img> iVote</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">

{user ? (
  <>
                  <Nav
                      className="me-auto "
                  >   
                      <Nav.Link as={Link} to={"/"}>Inicio</Nav.Link>
                      <Nav.Link as={Link} to={"/urna"}>Urna Electoral</Nav.Link>
                      
                      {
                        routes[userRol]?.map(({name, path}) => (
                          <Nav.Link as={Link} to={path}>{name}</Nav.Link>
                        ))
                      }
                  </Nav>
                  <Nav>
                    <NavDropdown title={hashNavbar} id='basic-nav-dropdown'>
                      <NavDropdown.Item onClick={handleClickLogout}>Cerrar Sesión</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
</>
) : (

  <>
                  <Nav
                      className="me-auto"
                      style={{ maxHeight: '100px' }}
                      navbarScroll
                  >   
                      <Nav.Link as={Link} to={"/"}></Nav.Link>
                      <Nav.Link as={Link} to={"/"}></Nav.Link>
                      <Nav.Link as={Link} to={"/"}></Nav.Link>
                      
                      <Nav.Link as={Link} to={"/"}>Inicio</Nav.Link>
                      <Nav.Link as={Link} to={"/urna"}>Urna Electoral</Nav.Link>
                                            
                  </Nav>
                  <Nav>
                    <Nav.Link as={Link} to={"/login"}>Iniciar Sesión</Nav.Link>
                    <Nav.Link as={Link} to={"/register"}>Registrarse</Nav.Link>
                  </Nav>
</>
)}
                  </Navbar.Collapse>
              </Container>
              </Navbar>
        </div>
    )
  }
export default NavbarComp
