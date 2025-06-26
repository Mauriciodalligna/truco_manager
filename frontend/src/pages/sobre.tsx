import { Container, Row, Col, Badge } from "react-bootstrap";

export default function Sobre() {
  return (
    <div className="page-container">
      <div className="page-header">
        <Container>
          <h1 className="page-title">🏫 Sobre o Projeto</h1>
          <p className="page-subtitle">
            Trabalho final da disciplina de Tópicos Especiais em Desenvolvimento
            de Software
          </p>
        </Container>
      </div>

      <Container>
        <Row className="g-4">
          <Col lg={8}>
            <div className="card-modern">
              <div className="card-header-modern">
                <h2
                  style={{ fontSize: "1.75rem", fontWeight: "600", margin: 0 }}
                >
                  🃏 Truco Manager
                </h2>
              </div>
              <div className="card-body-modern">
                <p
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                    color: "var(--text-secondary)",
                  }}
                >
                  Desenvolvemos um sistema web completo para gerenciar
                  campeonatos de truco, permitindo o controle de jogadores,
                  partidas, placares e histórico de competições.
                </p>

                <div className="mt-4">
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    🎯 Funcionalidades Principais
                  </h3>
                  <Row>
                    <Col md={6}>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        <li className="mb-2">
                          <span
                            style={{
                              color: "var(--primary-color)",
                              marginRight: "0.5rem",
                            }}
                          >
                            ✓
                          </span>
                          Gerenciamento de usuários
                        </li>
                        <li className="mb-2">
                          <span
                            style={{
                              color: "var(--primary-color)",
                              marginRight: "0.5rem",
                            }}
                          >
                            ✓
                          </span>
                          Criação e controle de partidas
                        </li>
                        <li className="mb-2">
                          <span
                            style={{
                              color: "var(--primary-color)",
                              marginRight: "0.5rem",
                            }}
                          >
                            ✓
                          </span>
                          Placar em tempo real
                        </li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        <li className="mb-2">
                          <span
                            style={{
                              color: "var(--primary-color)",
                              marginRight: "0.5rem",
                            }}
                          >
                            ✓
                          </span>
                          Sistema de autenticação
                        </li>
                        <li className="mb-2">
                          <span
                            style={{
                              color: "var(--primary-color)",
                              marginRight: "0.5rem",
                            }}
                          >
                            ✓
                          </span>
                          Histórico de partidas
                        </li>
                        <li className="mb-2">
                          <span
                            style={{
                              color: "var(--primary-color)",
                              marginRight: "0.5rem",
                            }}
                          >
                            ✓
                          </span>
                          Interface responsiva
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="card-modern mb-4">
              <div className="card-header-modern">
                <h3
                  style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}
                >
                  🏫 Universidade de Passo Fundo
                </h3>
              </div>
              <div className="card-body-modern">
                <p
                  style={{
                    marginBottom: "1rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <strong>Curso:</strong> Análise e Desenvolvimento de Sistemas
                </p>
                <p
                  style={{
                    marginBottom: "1rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <strong>Disciplina:</strong> Tópicos Especiais em
                  Desenvolvimento de Software
                </p>
                <p style={{ color: "var(--text-secondary)" }}>
                  <strong>Ano:</strong> 2024
                </p>
              </div>
            </div>

            <div className="card-modern">
              <div className="card-header-modern">
                <h3
                  style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}
                >
                  🛠️ Tecnologias Utilizadas
                </h3>
              </div>
              <div className="card-body-modern">
                <div className="mb-3">
                  <strong style={{ color: "var(--text-primary)" }}>
                    Frontend:
                  </strong>
                  <div className="mt-2">
                    <Badge
                      className="badge-modern me-2 mb-2"
                      style={{ background: "var(--primary-color)" }}
                    >
                      React
                    </Badge>
                    <Badge
                      className="badge-modern me-2 mb-2"
                      style={{ background: "var(--primary-color)" }}
                    >
                      Next.js
                    </Badge>
                    <Badge
                      className="badge-modern me-2 mb-2"
                      style={{ background: "var(--primary-color)" }}
                    >
                      TypeScript
                    </Badge>
                    <Badge
                      className="badge-modern me-2 mb-2"
                      style={{ background: "var(--primary-color)" }}
                    >
                      Bootstrap
                    </Badge>
                  </div>
                </div>

                <div>
                  <strong style={{ color: "var(--text-primary)" }}>
                    Backend:
                  </strong>
                  <div className="mt-2">
                    <Badge
                      className="badge-modern me-2 mb-2"
                      style={{ background: "var(--success-color)" }}
                    >
                      Node.js
                    </Badge>
                    <Badge
                      className="badge-modern me-2 mb-2"
                      style={{ background: "var(--success-color)" }}
                    >
                      Express
                    </Badge>
                    <Badge
                      className="badge-modern me-2 mb-2"
                      style={{ background: "var(--success-color)" }}
                    >
                      TypeORM
                    </Badge>
                    <Badge
                      className="badge-modern me-2 mb-2"
                      style={{ background: "var(--success-color)" }}
                    >
                      PostgreSQL
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <div className="card-modern">
              <div className="card-header-modern">
                <h3
                  style={{ fontSize: "1.5rem", fontWeight: "600", margin: 0 }}
                >
                  👨‍💻 Desenvolvedor
                </h3>
              </div>
              <div className="card-body-modern">
                <div className="text-center">
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                    👨‍🎓
                  </div>
                  <h4
                    style={{
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Mauricio Durante Dall Igna
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "1rem",
                    }}
                  >
                    Graduando em Análise e Desenvolvimento de Sistemas
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Este projeto foi desenvolvido com dedicação e entusiasmo
                    para demonstrar as habilidades adquiridas durante o curso.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
