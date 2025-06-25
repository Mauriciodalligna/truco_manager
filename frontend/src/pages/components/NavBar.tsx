import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
  const router = useRouter()
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand as={Link} passHref href="/">
            Truco
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/" passHref>Home</Nav.Link>
            <Nav.Link as={Link} href="/partidas" passHref>Partidas</Nav.Link>
            <Nav.Link as={Link} href="/placar" passHref>Placar</Nav.Link>
            <Nav.Link as={Link} href="/cachorro" passHref>Cachorro</Nav.Link>
            <Nav.Link as={Link} href="/usuario" passHref>Create User</Nav.Link>
            <Nav.Link as={Link} href="/usuarios" passHref>Listar Users</Nav.Link>
            <Nav.Link as={Link} href="#" onClick={() => {
              localStorage.removeItem("isLogged")
              router.push("/login")
            }} passHref>Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}