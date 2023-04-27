import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand as={NavLink} to="/">Ativ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              className={(navData) => navData.isActive ? 'Active' : ''} // navData vem do react-router-6
              as={NavLink} 
              to="/cliente/lista">
              Clientes
            </Nav.Link>
            <Nav.Link 
              className={(navData) => navData.isActive ? 'Active' : ''} // navData vem do react-router-6
              as={NavLink} 
              to="/atividade/lista">
              Atividades
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown align='end' title="Usuário" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Perfil
                </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Configurações
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Something
                </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
