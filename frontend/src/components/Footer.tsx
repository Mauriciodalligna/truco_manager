import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer() {
  return (
    <footer
      className="footer-modern"
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        color: "rgba(255, 255, 255, 0.9)",
        padding: "2rem 0 1rem 0",
        marginTop: "auto",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <div
              className="footer-brand"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: "700",
                fontSize: "1.25rem",
                marginBottom: "0.5rem",
              }}
            >
              🃏 Truco Manager
            </div>
            <p style={{ fontSize: "0.875rem", opacity: 0.8, margin: 0 }}>
              Sistema de gerenciamento de partidas de truco
            </p>
          </Col>

          <Col md={6} className="text-center text-md-end">
            <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
              <p style={{ margin: "0 0 0.5rem 0" }}>
                Desenvolvido como trabalho final
              </p>
              <p style={{ margin: 0 }}>
                Tópicos Especiais em Desenvolvimento de Software
              </p>
              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.75rem" }}>
                © 2024 Universidade de Passo Fundo
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
