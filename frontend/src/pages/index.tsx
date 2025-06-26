import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";
import Link from "next/link";
import { User, Match, DashboardStats, ActiveGame } from "../types";
import { API_BASE_URL } from "../constants";
import {
  formatDate,
  getPlayerNames,
  getDuplaNames,
  getMatchStatus,
} from "../utils";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import MatchService from "../services/MatchService";
import ScoreService from "../services/ScoreService";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalMatches: 0,
    activeMatches: 0,
    completedMatches: 0,
  });
  const [activeGame, setActiveGame] = useState<ActiveGame | null>(null);
  const [activeMatches, setActiveMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Carregar estatísticas e dados
      const [matches, activeScore, activeMatchesData] = await Promise.all([
        MatchService.getAllMatches(),
        ScoreService.getActiveScore(),
        MatchService.getActiveMatches(),
      ]);

      const matchesArray = Array.isArray(matches) ? matches : [];
      const activeMatchesArray = Array.isArray(activeMatchesData)
        ? activeMatchesData
        : [];
      const activeMatches = matchesArray.filter(
        (match) => !match.winnerName
      ).length;
      const completedMatches = matchesArray.filter(
        (match) => match.winnerName
      ).length;

      setStats({
        totalUsers: 0, // Será carregado separadamente
        totalMatches: matchesArray.length,
        activeMatches,
        completedMatches,
      });

      setActiveGame(activeScore);
      setActiveMatches(activeMatchesArray);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <Container>
            <h1 className="page-title">🏠 Dashboard</h1>
            <p className="page-subtitle">Bem-vindo ao Truco Manager</p>
          </Container>
        </div>
        <Container>
          <div className="text-center py-5">
            <div className="loading-spinner mx-auto mb-3"></div>
            <p>Carregando dashboard...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Container>
          <h1 className="page-title">🏠 Dashboard</h1>
          <p className="page-subtitle">Bem-vindo ao Truco Manager</p>
        </Container>
      </div>

      <Container>
        {/* Estatísticas Gerais */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="card-modern stats-card text-center">
              <Card.Body>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  👥
                </div>
                <Card.Title className="text-primary">
                  {stats.totalUsers}
                </Card.Title>
                <Card.Text>Jogadores</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-modern stats-card text-center">
              <Card.Body>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  🎮
                </div>
                <Card.Title className="text-primary">
                  {stats.totalMatches}
                </Card.Title>
                <Card.Text>Total de Partidas</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-modern stats-card text-center">
              <Card.Body>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  ⚡
                </div>
                <Card.Title className="text-primary">
                  {stats.activeMatches}
                </Card.Title>
                <Card.Text>Partidas Ativas</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-modern stats-card text-center">
              <Card.Body>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  🏆
                </div>
                <Card.Title className="text-primary">
                  {stats.completedMatches}
                </Card.Title>
                <Card.Text>Partidas Finalizadas</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Jogo Ativo */}
        {activeGame && (
          <Card className="card-modern mb-4">
            <Card.Header className="card-header-modern">
              <h3 className="mb-0" style={{ color: "#fff" }}>
                🎮 Partida em Andamento
              </h3>
            </Card.Header>
            <Card.Body style={{ color: "#fff" }}>
              <Row>
                <Col md={8}>
                  <h5 style={{ color: "#fff" }}>👥 Jogadores</h5>
                  <p style={{ color: "#fff" }}>
                    {getPlayerNames(activeGame.match?.users)}
                  </p>
                  <h5 style={{ color: "#fff" }}>📊 Placar</h5>
                  <div className="d-flex gap-4 align-items-center">
                    <div className="text-center">
                      <Badge
                        className="badge-modern"
                        style={{ fontSize: "1.5rem", padding: "0.5rem 1rem" }}
                      >
                        Nós: {activeGame.team1Score}
                      </Badge>
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      VS
                    </div>
                    <div className="text-center">
                      <Badge
                        className="badge-modern"
                        style={{ fontSize: "1.5rem", padding: "0.5rem 1rem" }}
                      >
                        Eles: {activeGame.team2Score}
                      </Badge>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="text-end">
                  <Link href="/placar" passHref>
                    <Button variant="primary" size="lg" className="btn-modern">
                      🎯 Continuar Jogo
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Partidas em Andamento */}
        {activeMatches.length > 0 && (
          <Card className="card-modern mb-4">
            <Card.Header className="card-header-modern">
              <h3 className="mb-0" style={{ color: "#fff" }}>
                ⚡ Partidas em Andamento
              </h3>
            </Card.Header>
            <Card.Body style={{ color: "#fff" }}>
              <Row>
                {activeMatches.map((match) => (
                  <Col md={6} key={match.id} className="mb-3">
                    <div
                      className="card-modern p-3"
                      style={{
                        background: "#23263a",
                        border: "1px solid #28304a",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 style={{ color: "#fff", margin: 0 }}>
                          Partida #{match.id}
                        </h6>
                        <Badge bg="warning" className="badge-modern">
                          Em Andamento
                        </Badge>
                      </div>
                      <p
                        style={{
                          color: "#b0b3c6",
                          fontSize: "0.9rem",
                          marginBottom: "1rem",
                        }}
                      >
                        👥 {getPlayerNames(match.users)}
                      </p>
                      <div className="mb-2">
                        {(() => {
                          const duplaNames = getDuplaNames(match.users);
                          return (
                            <div className="d-flex justify-content-between align-items-center">
                              <span
                                style={{ color: "#7faaff", fontSize: "0.8rem" }}
                              >
                                🏆 {duplaNames.dupla1}
                              </span>
                              <span
                                style={{ color: "#b0b3c6", fontSize: "0.8rem" }}
                              >
                                VS
                              </span>
                              <span
                                style={{ color: "#7faaff", fontSize: "0.8rem" }}
                              >
                                🏆 {duplaNames.dupla2}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <small style={{ color: "#b0b3c6" }}>
                          {formatDate(match.date)}
                        </small>
                        <Link href="/placar" passHref>
                          <Button
                            variant="outline-white"
                            size="sm"
                            className="btn-modern"
                          >
                            🎯 Continuar
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Ações Rápidas */}
        <Row>
          <Col md={6}>
            <Card className="card-modern mb-4">
              <Card.Header className="card-header-modern">
                <h4 className="mb-0" style={{ color: "#fff" }}>
                  ⚡ Ações Rápidas
                </h4>
              </Card.Header>
              <Card.Body style={{ color: "#fff" }}>
                <div className="d-grid gap-2">
                  <Link href="/usuarios" passHref>
                    <Button variant="outline-white" className="btn-modern">
                      👥 Gerenciar Jogadores
                    </Button>
                  </Link>
                  <Link href="/partidas" passHref>
                    <Button variant="outline-white" className="btn-modern">
                      🎮 Criar Nova Partida
                    </Button>
                  </Link>
                  {!activeGame && (
                    <Link href="/placar" passHref>
                      <Button variant="outline-warning" className="btn-modern">
                        📊 Iniciar Placar
                      </Button>
                    </Link>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="card-modern mb-4">
              <Card.Header className="card-header-modern">
                <h4 className="mb-0">📚 Como Usar o Truco Manager</h4>
              </Card.Header>
              <Card.Body>
                <div className="tutorial-steps">
                  <div className="tutorial-step mb-3">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h6 className="text-primary mb-1">
                        👥 Cadastrar Jogadores
                      </h6>
                      <p className="text-secondary mb-0">
                        Primeiro, cadastre todos os jogadores que participarão
                        das partidas.
                      </p>
                    </div>
                  </div>

                  <div className="tutorial-step mb-3">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h6 className="text-primary mb-1">🎮 Criar Partida</h6>
                      <p className="text-secondary mb-0">
                        Selecione 4 jogadores para formar 2 duplas
                        automaticamente.
                      </p>
                    </div>
                  </div>

                  <div className="tutorial-step mb-3">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h6 className="text-primary mb-1">📊 Iniciar Placar</h6>
                      <p className="text-secondary mb-0">
                        Vá para o placar e selecione a partida para começar a
                        jogar.
                      </p>
                    </div>
                  </div>

                  <div className="tutorial-step mb-3">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h6 className="text-primary mb-1">🎯 Controlar Pontos</h6>
                      <p className="text-secondary mb-0">
                        Use os botões + e - para controlar os pontos de cada
                        dupla.
                      </p>
                    </div>
                  </div>

                  <div className="tutorial-step">
                    <div className="step-number">5</div>
                    <div className="step-content">
                      <h6 className="text-primary mb-1">Finalizar Partida</h6>
                      <p className="text-secondary mb-0">
                        O sistema detecta automaticamente o vencedor quando
                        alguém atinge 12 pontos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="text-primary mb-2">💡 Dicas Importantes:</h6>
                  <ul className="text-secondary mb-0">
                    <li>Uma partida pode ter apenas 4 jogadores</li>
                    <li>O vencedor é quem atinge 12 pontos primeiro</li>
                    <li>Você pode pausar e retomar partidas</li>
                    <li>Todas as partidas ficam salvas no histórico</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
