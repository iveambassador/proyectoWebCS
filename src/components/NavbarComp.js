import React, { useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import logo from '../blockchain-logo-svg-vector.svg'

const NavbarComp=()=> {
  const {user,signOutUser} = useContext(UserContext)
  const handleClickLogout = async()=>{
      try {
          await signOutUser();
      } catch (error) {
          console.log(error.code);
      }
  }
    return (
      <div>
        {user?(
          <>
            <Navbar bg="dark" variant={"dark"} expand="lg">
              <Container fluid>
                  <Navbar.Brand> </Navbar.Brand>
                  <Navbar.Brand as={Link} to={"/"}> <img src={logo}></img> iVote</Navbar.Brand>
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
                      <Nav.Link as={Link} to={"/urna"}>Urna Electoral</Nav.Link>
                      <Nav.Link as={Link} to={"/EmitirVoto"}>Emitir Voto</Nav.Link>
                      <Nav.Link as={Link} to={"/PagePostulante"}>Postulantes</Nav.Link>
                      <Nav.Link as={Link} to={"/Convocatoria"}>Nueva Convovatoria</Nav.Link>
                      {/* <Nav.Link as={Link} to={"/CrearPostulacion"}>Habilitar Postulantes</Nav.Link> */}
                      <Nav.Link as={Link} to={"/Postularme"}>Postularme</Nav.Link>
                  </Nav>
                  <Nav>
                    <NavDropdown title="b474d48cdfc4974d86ef4d24904cdd91..." id='basic-nav-dropdown'>
                      <NavDropdown.Item onClick={handleClickLogout}>Cerrar Sesión</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to={"/user"}>Usuario</Nav.Link>                    
                    
                  </Nav>
                  </Navbar.Collapse>
              </Container>
              </Navbar>
          </>
        ):(
          <>
            <Navbar bg="dark" variant={"dark"} expand="lg">
              <Container fluid>
                  <Navbar.Brand> </Navbar.Brand>
                  <Navbar.Brand as={Link} to={"/"}> <img src={logo}></img> iVote</Navbar.Brand>
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
                      <Nav.Link as={Link} to={"/urna"}>Urna Electoral</Nav.Link>
                      
                  </Nav>
                  <Nav>
                    <Nav.Link as={Link} to={"/login"}>Iniciar Sesión</Nav.Link>
                    <Nav.Link as={Link} to={"/register"}>Registrarse</Nav.Link>
                  </Nav>
                  </Navbar.Collapse>
              </Container>
              </Navbar>
          </>
        )}
            
        </div>
      
    )
  }
export default NavbarComp
