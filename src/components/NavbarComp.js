import React, { useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import logo from '../blockchain-logo-svg-vector.svg'
import {getRolUser } from '../utils/getRolUser'


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
  const {user,signOutUser} = useContext(UserContext)
  const handleClickLogout = async()=>{
      try {
          await signOutUser();
      } catch (error) {
          console.log(error.code);
      }
  }

  const userRol = getRolUser(user) 

    return (
      <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
              <Container fluid>
                  <Navbar.Brand> </Navbar.Brand>
                  <Navbar.Brand as={Link} to={"/"}> <img src={logo}></img> iVote</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">

{user ? (
  <>
                  <Nav
                      className="me-auto my-2 my-lg-0"
                      style={{ maxHeight: '100px', paddingLeft:'5rem' }}
                      navbarScroll
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
                    <NavDropdown title="b474d48cdfc4974d86ef4d24904cdd91..." id='basic-nav-dropdown'>
                      <NavDropdown.Item onClick={handleClickLogout}>Cerrar Sesión</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
</>
) : (

  <>
                  <Nav
                      className="me-auto my-2 my-lg-0"
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

/**
 * 
 * 
 * 
                      <Nav.Link as={Link} to={"/urna"}>Urna Electoral</Nav.Link>
                      <Nav.Link as={Link} to={"/EmitirVoto"}>Emitir Voto</Nav.Link>
                      <Nav.Link as={Link} to={"/PagePostulante"}>Postulantes</Nav.Link>
                      <Nav.Link as={Link} to={"/Convocatoria"}>Nueva Convovatoria</Nav.Link>
                      -- <Nav.Link as={Link} to={"/CrearPostulacion"}>Habilitar Postulantes</Nav.Link> --
                      <Nav.Link as={Link} to={"/Postularme"}>Postularme</Nav.Link> */
