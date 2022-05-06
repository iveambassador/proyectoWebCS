import React from 'react'
// import { NavLink } from 'react-router-dom' 
// import '../Styles/Navbar.css'
import { Navbar, Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">!Vote</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/EmitirVoto">EmitirVoto</Nav.Link>
            <NavDropdown title="Juanito Perez" id="basic-nav-dropdown">
              <NavDropdown.Item href="#logout">Cerar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
