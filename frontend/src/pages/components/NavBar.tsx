import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLogged");
      router.push("/login");
    }
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-modern"
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      fixed="top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          passHref
          href="/"
          className="navbar-brand-modern"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "700",
            fontSize: "1.5rem",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          🃏 Truco Manager
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "0.5rem",
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              href="/"
              passHref
              className="nav-link-modern"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "500",
                transition: "all 0.2s ease-in-out",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                margin: "0 0.25rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
              }}
            >
              🏠 Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              href="/partidas"
              passHref
              className="nav-link-modern"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "500",
                transition: "all 0.2s ease-in-out",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                margin: "0 0.25rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
              }}
            >
              🎮 Partidas
            </Nav.Link>

            <Nav.Link
              as={Link}
              href="/placar"
              passHref
              className="nav-link-modern"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "500",
                transition: "all 0.2s ease-in-out",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                margin: "0 0.25rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
              }}
            >
              📊 Placar
            </Nav.Link>

            <Nav.Link
              as={Link}
              href="/usuarios"
              passHref
              className="nav-link-modern"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "500",
                transition: "all 0.2s ease-in-out",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                margin: "0 0.25rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
              }}
            >
              👥 Gerenciar Usuários
            </Nav.Link>

            {isClient && (
              <Nav.Link
                as={Link}
                href="#"
                onClick={handleLogout}
                passHref
                className="nav-link-modern"
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: "500",
                  transition: "all 0.2s ease-in-out",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  margin: "0 0.25rem",
                  background: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.3)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                }}
              >
                🚪 Sair
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
