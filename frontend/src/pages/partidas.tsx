import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { User, Match, ApiMatch, MatchFormData } from '../types';
import { API_BASE_URL } from '../constants';
import { formatDate, getPlayerNames, getDuplaNames } from '../utils';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MatchService from '../services/MatchService';

interface Dupla {
  jogador1: User;
  jogador2: User;
}

export default function Partidas() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [matchToDelete, setMatchToDelete] = useState<Match | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [dupla1, setDupla1] = useState<Dupla | null>(null);
  const [dupla2, setDupla2] = useState<Dupla | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadUsers = async () => {
    try {
      // Buscar usuários da API
      const response = await fetch("http://localhost:3002/api/users");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      setAvailableUsers(Array.isArray(users) ? users : []);
    } catch {
      console.error("Erro ao carregar usuários");
      // Fallback com dados mockados
      const mockUsers: User[] = [
        { id: 1, name: "João Silva", email: "joao@email.com" },
        { id: 2, name: "Maria Santos", email: "maria@email.com" },
        { id: 3, name: "Pedro Costa", email: "pedro@email.com" },
        { id: 4, name: "Ana Oliveira", email: "ana@email.com" },
      ];
      setAvailableUsers(mockUsers);
    }
  };

  useEffect(() => {
    loadMatches();
    loadUsers();
  }, []);

  // Recarregar partidas quando voltar para a página
  useEffect(() => {
    const handleFocus = () => {
      loadMatches();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const loadMatches = async () => {
    try {
      const data = await MatchService.getAllMatches();
      // Garantir que data seja sempre um array
      setMatches(Array.isArray(data) ? data : []);
    } catch {
      console.error("Erro ao carregar partidas");
      setMatches([]); // Garantir que seja array vazio em caso de erro
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateInput?: string | Date) => {
    if (!dateInput) return "Data não informada";

    try {
      const date =
        typeof dateInput === "string" ? new Date(dateInput) : dateInput;

      // Verificar se a data é válida
      if (isNaN(date.getTime())) {
        return "Data inválida";
      }

      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  const formatDateTime = (dateInput?: string | Date) => {
    if (!dateInput) return "N/A";
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleString("pt-BR");
  };

  const formatDateForInput = (dateInput?: string | Date) => {
    if (!dateInput) return "";
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toISOString().slice(0, 16);
  };

  const getPlayerNames = (users?: User[]) => {
    if (!users || users.length === 0) return "Nenhum jogador";

    const names = users
      .map((user) => {
        if (user.name && user.name.trim() !== "") {
          return user.name;
        }
        if (user.email && user.email.trim() !== "") {
          return user.email;
        }
        return `Jogador ${user.id}`;
      })
      .filter((name) => name && name.trim() !== "");

    return names.length > 0 ? names.join(", ") : "Nenhum jogador";
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
    setDupla1(null);
    setDupla2(null);
    setMessage(null);
  };

  const handleCreateMatch = async () => {
    if (!dupla1 || !dupla2) {
      setMessage({
        type: "error",
        text: "Selecione 4 jogadores para formar 2 duplas",
      });
      return;
    }

    try {
      const newMatch: ApiMatch = {
        date: new Date(),
        users: [
          dupla1.jogador1.id,
          dupla1.jogador2.id,
          dupla2.jogador1.id,
          dupla2.jogador2.id,
        ],
        winnerName: undefined,
      };

      const createdMatch = await MatchService.createMatch(newMatch);
      if (createdMatch) {
        // Adicionar a nova partida à lista local
        const matchWithUsers: Match = {
          ...createdMatch,
          users: [
            dupla1.jogador1,
            dupla1.jogador2,
            dupla2.jogador1,
            dupla2.jogador2,
          ],
        };

        setMatches([...matches, matchWithUsers]);
        setMessage({ type: "success", text: "Partida criada com sucesso!" });
        setShowCreateModal(false);

        // Limpar seleções
        setSelectedUserIds([]);
        setDupla1(null);
        setDupla2(null);
      }
    } catch (error) {
      console.error("Erro ao criar partida:", error);
      setMessage({
        type: "error",
        text: "Erro ao criar partida. Tente novamente.",
      });
    }
  };

  const handleUserSelection = (user: User) => {
    // Se o jogador já está selecionado, remove
    if (selectedUserIds.includes(user.id || 0)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== user.id));
      // Remove das duplas
      if (
        dupla1 &&
        (dupla1.jogador1.id === user.id || dupla1.jogador2.id === user.id)
      ) {
        setDupla1(null);
      }
      if (
        dupla2 &&
        (dupla2.jogador1.id === user.id || dupla2.jogador2.id === user.id)
      ) {
        setDupla2(null);
      }
      return;
    }

    // Adiciona o jogador
    const newSelectedIds = [...selectedUserIds, user.id || 0];
    setSelectedUserIds(newSelectedIds);

    // Organiza em duplas automaticamente
    if (newSelectedIds.length === 1) {
      setDupla1({ jogador1: user, jogador2: user }); // Placeholder
    } else if (newSelectedIds.length === 2) {
      const jogador1 = availableUsers.find((u) => u.id === newSelectedIds[0]);
      const jogador2 = availableUsers.find((u) => u.id === newSelectedIds[1]);
      if (jogador1 && jogador2) {
        setDupla1({ jogador1, jogador2 });
      }
    } else if (newSelectedIds.length === 3) {
      const jogador1 = availableUsers.find((u) => u.id === newSelectedIds[0]);
      const jogador2 = availableUsers.find((u) => u.id === newSelectedIds[1]);
      const jogador3 = availableUsers.find((u) => u.id === newSelectedIds[2]);
      if (jogador1 && jogador2 && jogador3) {
        setDupla1({ jogador1, jogador2 });
        setDupla2({ jogador1: jogador3, jogador2: jogador3 }); // Placeholder
      }
    } else if (newSelectedIds.length === 4) {
      const jogador1 = availableUsers.find((u) => u.id === newSelectedIds[0]);
      const jogador2 = availableUsers.find((u) => u.id === newSelectedIds[1]);
      const jogador3 = availableUsers.find((u) => u.id === newSelectedIds[2]);
      const jogador4 = availableUsers.find((u) => u.id === newSelectedIds[3]);
      if (jogador1 && jogador2 && jogador3 && jogador4) {
        setDupla1({ jogador1, jogador2 });
        setDupla2({ jogador1: jogador3, jogador2: jogador4 });
      }
    }
  };

  const handleViewClick = (match: Match) => {
    setSelectedMatch(match);
    setShowViewModal(true);
  };

  const handleEditClick = (match: Match) => {
    setEditingMatch({ ...match });
    setSelectedUserIds(match.users?.map((user) => user.id || 0) || []);
    setShowEditModal(true);
  };

  const handleDeleteClick = (match: Match) => {
    setMatchToDelete(match);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!matchToDelete?.id) return;

    try {
      const success = await MatchService.deleteMatch(matchToDelete.id);
      if (success) {
        setMatches(matches.filter((match) => match.id !== matchToDelete.id));
        setShowDeleteModal(false);
        setMatchToDelete(null);
        setMessage({ type: "success", text: "Partida excluída com sucesso!" });
      } else {
        setMessage({
          type: "error",
          text: "Erro ao excluir partida. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao excluir partida:", error);
      setMessage({
        type: "error",
        text: "Erro ao excluir partida. Tente novamente.",
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingMatch?.id) return;

    try {
      const apiMatch: ApiMatch = {
        ...editingMatch,
        date:
          typeof editingMatch.date === "string"
            ? new Date(editingMatch.date)
            : editingMatch.date,
        users: selectedUserIds, // Enviar apenas os IDs
      };

      await MatchService.updateMatch(editingMatch.id, apiMatch);

      // Atualizar o estado local com os objetos de usuários
      const selectedUsers = availableUsers.filter((user) =>
        selectedUserIds.includes(user.id || 0)
      );

      const updatedMatch: Match = {
        ...editingMatch,
        users: selectedUsers,
      };

      setMatches(
        matches.map((match) =>
          match.id === editingMatch.id ? updatedMatch : match
        )
      );

      setShowEditModal(false);
      setEditingMatch(null);
      setSelectedUserIds([]);
    } catch {
      console.error("Erro ao atualizar partida");
      alert("Erro ao atualizar partida. Tente novamente.");
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setShowCreateModal(false);
    setMatchToDelete(null);
    setSelectedMatch(null);
    setEditingMatch(null);
    setSelectedUserIds([]);
    setDupla1(null);
    setDupla2(null);
    setMessage(null);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <Container>
            <h1 className="page-title">🎮 Partidas</h1>
            <p className="page-subtitle">Gerenciando suas partidas de truco</p>
          </Container>
        </div>
        <Container>
          <div className="text-center py-5">
            <div className="loading-spinner mx-auto mb-3"></div>
            <p>Carregando partidas...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Container>
          <h1 className="page-title">🎮 Partidas</h1>
          <p className="page-subtitle">Gerenciando suas partidas de truco</p>
        </Container>
      </div>

      <Container>
        <div className="card-modern mb-4">
          <div className="card-header-modern">
            <div className="d-flex justify-content-between align-items-center">
              <h2
                className="mb-0"
                style={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                Lista de Partidas
              </h2>
              <Button
                className="btn-modern btn-primary-modern"
                size="sm"
                onClick={handleCreateClick}
              >
                ➕ Nova Partida
              </Button>
            </div>
          </div>

          <div className="card-body-modern">
            {matches.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎯</div>
                <h3
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                  }}
                >
                  Nenhuma partida encontrada
                </h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                  Comece criando sua primeira partida de truco
                </p>
                <Button
                  className="btn-modern btn-primary-modern"
                  onClick={handleCreateClick}
                >
                  ➕ Criar primeira partida
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table
                  className="table-modern"
                  style={{
                    background: "#181c2a !important",
                    color: "#fff !important",
                  }}
                >
        <thead>
          <tr>
                      <th style={{ background: "#28304a", color: "#fff" }}>
                        #
                      </th>
                      <th style={{ background: "#28304a", color: "#fff" }}>
                        Data
                      </th>
                      <th style={{ background: "#28304a", color: "#fff" }}>
                        Jogadores
                      </th>
                      <th style={{ background: "#28304a", color: "#fff" }}>
                        Vencedor
                      </th>
                      <th style={{ background: "#28304a", color: "#fff" }}>
                        Status
                      </th>
                      <th style={{ background: "#28304a", color: "#fff" }}>
                        Ações
                      </th>
          </tr>
        </thead>
        <tbody>
                    {matches.map((match, index) => (
                      <tr
                        key={match.id || index}
                        style={{ background: "#181c2a" }}
                      >
                        <td style={{ color: "#fff", background: "#181c2a" }}>
                          <Badge
                            className="badge-modern"
                            style={{ background: "var(--primary-color)" }}
                          >
                            {match.id || index + 1}
                          </Badge>
                        </td>
                        <td
                          className="fw-medium"
                          style={{ color: "#fff", background: "#181c2a" }}
                        >
                          {formatDate(match.date)}
                        </td>
                        <td
                          className="fw-medium"
                          style={{ color: "#fff", background: "#181c2a" }}
                        >
                          {getPlayerNames(match.users)}
                        </td>
                        <td style={{ color: "#fff", background: "#181c2a" }}>
                          {match.winnerName ? (
                            <Badge
                              className="badge-modern"
                              style={{ background: "var(--success-color)" }}
                            >
                              {match.winnerName}
                            </Badge>
                          ) : (
                            <Badge
                              className="badge-modern"
                              style={{ background: "var(--text-muted)" }}
                            >
                              Em andamento
                            </Badge>
                          )}
                        </td>
                        <td style={{ color: "#fff", background: "#181c2a" }}>
                          {match.winnerName ? (
                            <Badge
                              className="badge-modern"
                              style={{ background: "var(--success-color)" }}
                            >
                              Finalizada
                            </Badge>
                          ) : (
                            <Badge
                              className="badge-modern"
                              style={{ background: "var(--warning-color)" }}
                            >
                              Ativa
                            </Badge>
                          )}
                        </td>
                        <td style={{ color: "#fff", background: "#181c2a" }}>
                          <div className="d-flex gap-2">
                            <Button
                              className="btn-modern btn-primary-modern"
                              size="sm"
                              onClick={() => handleViewClick(match)}
                            >
                              👁️ Ver
                            </Button>
                            <Button
                              className="btn-modern btn-secondary-modern"
                              size="sm"
                              onClick={() => handleEditClick(match)}
                            >
                              ✏️ Editar
                            </Button>
                            <Button
                              className="btn-modern btn-danger-modern"
                              size="sm"
                              onClick={() => handleDeleteClick(match)}
                            >
                              🗑️ Excluir
                            </Button>
                          </div>
                        </td>
          </tr>
                    ))}
        </tbody>
      </Table>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Modal de Criação de Partida */}
      <Modal
        show={showCreateModal}
        onHide={handleCloseModal}
        size="lg"
        className="modal-modern"
      >
        <Modal.Header closeButton>
          <Modal.Title>➕ Nova Partida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && (
            <Alert
              variant={message.type === "success" ? "success" : "danger"}
              onClose={() => setMessage(null)}
              dismissible
              className="mb-3"
            >
              {message.text}
            </Alert>
          )}

          <Form className="form-modern">
            <Form.Group className="mb-4">
              <Form.Label>👥 Selecione 4 Jogadores</Form.Label>
              <div className="card-modern p-3">
                <Row>
                  {availableUsers.map((user) => (
                    <Col md={6} key={user.id}>
                      <Form.Check
                        type="checkbox"
                        id={`user-${user.id}`}
                        label={user.name || user.email}
                        checked={selectedUserIds.includes(user.id || 0)}
                        onChange={() => handleUserSelection(user)}
                        className="mb-2"
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Form.Group>

            {/* Visualização das Duplas */}
            {(dupla1 || dupla2) && (
              <div className="mb-4">
                <h5>🏆 Organização das Duplas</h5>
                <Row>
                  <Col md={6}>
                    <div className="card-modern p-3">
                      <h6>Dupla 1</h6>
                      {dupla1 ? (
                        <div>
                          <div>
                            👤 {dupla1.jogador1.name || dupla1.jogador1.email}
                          </div>
                          <div>
                            👤 {dupla1.jogador2.name || dupla1.jogador2.email}
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted">Selecione 2 jogadores</div>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="card-modern p-3">
                      <h6>Dupla 2</h6>
                      {dupla2 ? (
                        <div>
                          <div>
                            👤 {dupla2.jogador1.name || dupla2.jogador1.email}
                          </div>
                          <div>
                            👤 {dupla2.jogador2.name || dupla2.jogador2.email}
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted">Selecione 2 jogadores</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateMatch}
            disabled={!dupla1 || !dupla2}
          >
            Criar Partida
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Edição da Partida */}
      <Modal
        show={showEditModal}
        onHide={handleCloseModal}
        size="lg"
        className="modal-modern"
      >
        <Modal.Header closeButton>
          <Modal.Title>✏️ Editar Partida #{editingMatch?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingMatch && (
            <Form className="form-modern">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>📅 Data e Hora</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      className="form-control-modern"
                      value={formatDateForInput(editingMatch.date)}
                      onChange={(e) =>
                        setEditingMatch({
                          ...editingMatch,
                          date: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>🏆 Vencedor</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control-modern"
                      placeholder="Nome do vencedor (opcional)"
                      value={editingMatch.winnerName || ""}
                      onChange={(e) =>
                        setEditingMatch({
                          ...editingMatch,
                          winnerName: e.target.value || undefined,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>👥 Jogadores (Selecione 4 jogadores)</Form.Label>
                <div className="card-modern p-3">
                  {availableUsers.map((user) => (
                    <Form.Check
                      key={user.id}
                      type="checkbox"
                      id={`edit-user-${user.id}`}
                      label={user.name || user.email}
                      checked={selectedUserIds.includes(user.id || 0)}
                      onChange={() => handleUserSelection(user)}
                      className="mb-2"
                    />
                  ))}
                </div>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Visualização */}
      <Modal
        show={showViewModal}
        onHide={handleCloseModal}
        size="lg"
        className="modal-modern"
      >
        <Modal.Header closeButton>
          <Modal.Title>👁️ Detalhes da Partida #{selectedMatch?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMatch && (
            <div>
              <Row>
                <Col md={6}>
                  <h6>📅 Data e Hora</h6>
                  <p>{formatDateTime(selectedMatch.date)}</p>
                </Col>
                <Col md={6}>
                  <h6>🏆 Vencedor</h6>
                  <p>{selectedMatch.winnerName || "Em andamento"}</p>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h6>👥 Jogadores</h6>
                  <p>{getPlayerNames(selectedMatch.users)}</p>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseModal}
        className="modal-modern"
      >
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir a partida #{matchToDelete?.id}?</p>
          <p className="text-muted">Esta ação não pode ser desfeita.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Excluir Partida
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
