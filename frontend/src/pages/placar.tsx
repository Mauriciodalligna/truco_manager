import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import { User, Score, ActiveGame } from "../types";
import { API_BASE_URL } from "../constants";
import { getDuplaNames } from "../utils";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScoreService from "../services/ScoreService";
import MatchService from "../services/MatchService";
import Contador from "../components/Contador";

interface Match {
  id?: number;
  date?: string | Date;
  users?: User[];
  winnerName?: string;
}

export default function Placar() {
  const [activeScore, setActiveScore] = useState<Score | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    loadActiveScore();
    loadMatches();
  }, []);

  const loadActiveScore = async () => {
    try {
      const score = await ScoreService.getActiveScore();
      setActiveScore(score);
    } catch (error) {
      console.error("Erro ao carregar placar ativo:", error);
    }
  };

  const loadMatches = async () => {
    try {
      const matchesData = await MatchService.getAllMatches();
      setMatches(Array.isArray(matchesData) ? matchesData : []);
    } catch (error) {
      console.error("Erro ao carregar partidas:", error);
    }
  };

  const handleStartNewGame = () => {
    setShowMatchModal(true);
  };

  const handleSelectMatch = async (match: Match) => {
    try {
      // Verificar se já existe placar para esta partida
      let score = await ScoreService.getScoreByMatch(match.id!);

      if (!score) {
        // Criar novo placar
        score = await ScoreService.createScore({ matchId: match.id! });
      }

      setActiveScore(score);
      setSelectedMatch(match);
      setShowMatchModal(false);
      setMessage({ type: "success", text: "Partida iniciada! Placar ativo." });
    } catch (error) {
      console.error("Erro ao iniciar partida:", error);
      setMessage({
        type: "error",
        text: "Erro ao iniciar partida. Tente novamente.",
      });
    }
  };

  const handleUpdateScore = async (team1Score: number, team2Score: number) => {
    if (!activeScore?.id) return;

    try {
      const updatedScore = await ScoreService.updateScore(activeScore.id, {
        team1Score,
        team2Score,
      });

      setActiveScore(updatedScore);

      // Se o jogo terminou
      if (!updatedScore.isActive && updatedScore.winner && selectedMatch) {
        const duplaNames = getDuplaNames(selectedMatch.users);
        const winnerName =
          updatedScore.winner === "Dupla 1"
            ? duplaNames.dupla1
            : duplaNames.dupla2;

        setMessage({
          type: "success",
          text: `🎉 ${winnerName} venceu a partida!`,
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar placar:", error);
      setMessage({ type: "error", text: "Erro ao atualizar placar." });
    }
  };

  const handleFinishGame = async () => {
    if (!activeScore?.id || !selectedMatch) return;

    try {
      const duplaNames = getDuplaNames(selectedMatch.users);
      const winner =
        activeScore.team1Score > activeScore.team2Score
          ? duplaNames.dupla1
          : duplaNames.dupla2;

      await ScoreService.finishScore(activeScore.id, winner);

      setActiveScore(null);
      setSelectedMatch(null);
      setMessage({ type: "success", text: `🎉 ${winner} venceu a partida!` });
    } catch (error) {
      console.error("Erro ao finalizar partida:", error);
      setMessage({ type: "error", text: "Erro ao finalizar partida." });
    }
  };

  const getPlayerNames = (users?: User[]) => {
    if (!users || users.length === 0) return "Jogadores não definidos";
    return users.map((user) => user.name || user.email).join(", ");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Container>
          <h1 className="page-title">📊 Placar</h1>
          <p className="page-subtitle">Acompanhe os pontos em tempo real</p>
        </Container>
      </div>

      <Container>
        {message && (
          <Alert
            variant={message.type === "success" ? "success" : "danger"}
            onClose={() => setMessage(null)}
            dismissible
            className="mb-4"
          >
            {message.text}
          </Alert>
        )}

        {!activeScore ? (
          <div className="card-modern">
            <div className="card-header-modern">
              <h2 className="mb-0">🎮 Nenhuma Partida Ativa</h2>
            </div>
            <div className="card-body-modern text-center py-5">
              <div style={{ fontSize: "4rem", marginBottom: "2rem" }}>🎯</div>
              <p className="mb-4">Selecione uma partida para começar a jogar</p>
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartNewGame}
                className="btn-modern"
              >
                🚀 Iniciar Nova Partida
              </Button>
            </div>
          </div>
        ) : (
          <div className="card-modern">
            <div className="card-header-modern">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">🎮 Partida em Andamento</h2>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleFinishGame}
                  className="btn-modern"
                >
                  🏁 Finalizar Partida
                </Button>
              </div>
            </div>
            <div className="card-body-modern">
              {selectedMatch && (
                <div className="mb-4 p-3 bg-light rounded">
                  <h6>👥 Jogadores: {getPlayerNames(selectedMatch.users)}</h6>
                  <small className="text-muted">
                    Partida #{selectedMatch.id} -{" "}
                    {new Date(selectedMatch.date!).toLocaleString()}
                  </small>
                </div>
              )}

              <div className="placarContainer">
                {selectedMatch && (
                  <>
                    <Contador
                      nome={getDuplaNames(selectedMatch.users).dupla1}
                      contador={activeScore.team1Score}
                      onUpdate={(score) =>
                        handleUpdateScore(score, activeScore.team2Score)
                      }
                    />
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "var(--text-muted)",
                        margin: "2rem 0",
                      }}
                    >
                      VS
                    </div>
                    <Contador
                      nome={getDuplaNames(selectedMatch.users).dupla2}
                      contador={activeScore.team2Score}
                      onUpdate={(score) =>
                        handleUpdateScore(activeScore.team1Score, score)
                      }
                    />
                  </>
                )}
              </div>

              {activeScore.winner && (
                <div className="text-center mt-4">
                  <Alert variant="success">
                    🎉 <strong>{activeScore.winner}</strong> venceu a partida!
                  </Alert>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal de Seleção de Partida */}
        <Modal
          show={showMatchModal}
          onHide={() => setShowMatchModal(false)}
          size="lg"
          className="modal-modern"
        >
          <Modal.Header closeButton>
            <Modal.Title>🎮 Selecionar Partida</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {matches.length === 0 ? (
              <div className="text-center py-4">
                <p>Nenhuma partida disponível.</p>
                <p>Crie uma partida primeiro na página de Partidas.</p>
              </div>
            ) : (
              <div>
                <p className="mb-3">
                  Selecione uma partida para iniciar o placar:
                </p>
                {matches.map((match) => {
                  const duplaNames = getDuplaNames(match.users);
                  return (
                    <div
                      key={match.id}
                      className="card-modern p-3 mb-2 cursor-pointer"
                      onClick={() => handleSelectMatch(match)}
                      style={{ cursor: "pointer" }}
                    >
                      <h6>Partida #{match.id}</h6>
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span className="text-primary">
                            🏆 {duplaNames.dupla1}
                          </span>
                          <span className="text-muted">VS</span>
                          <span className="text-success">
                            🏆 {duplaNames.dupla2}
                          </span>
                        </div>
                      </div>
                      <small className="text-muted">
                        {new Date(match.date!).toLocaleString()}
                      </small>
                    </div>
                  );
                })}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowMatchModal(false)}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
