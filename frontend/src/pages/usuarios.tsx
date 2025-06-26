import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import UserInterface from "./interfaces/UserInterface";
import {
  FaUserEdit,
  FaUserMinus,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const API_URL = "http://localhost:3002/api";

const Usuarios = () => {
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
  const [update, setUpdate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInterface>({
    id: 0,
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getUsers();
  }, [update]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users`);
      const users = await res.json();
      setAllUsers(users);
    } catch {
      setMessage({ type: "error", text: "Erro ao carregar usuários" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrentUser({ id: 0, name: "", email: "", password: "" });
    setShowCreateModal(true);
  };

  const handleEdit = (user: UserInterface) => {
    setCurrentUser({ ...user, password: "" });
    setShowEditModal(true);
  };

  const handleDelete = (user: UserInterface) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleSaveCreate = async () => {
    if (!currentUser.name || !currentUser.email || !currentUser.password) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios" });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });
      if (res.status === 201) {
        setMessage({ type: "success", text: "Usuário criado com sucesso!" });
        setShowCreateModal(false);
        setUpdate(!update);
      } else {
        setMessage({ type: "error", text: "Erro ao criar usuário" });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao criar usuário" });
    }
  };

  const handleSaveEdit = async () => {
    if (!currentUser.name || !currentUser.email) {
      setMessage({ type: "error", text: "Nome e email são obrigatórios" });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/user/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });
      if (res.status === 200) {
        setMessage({
          type: "success",
          text: "Usuário atualizado com sucesso!",
        });
        setShowEditModal(false);
        setUpdate(!update);
      } else {
        setMessage({ type: "error", text: "Erro ao atualizar usuário" });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao atualizar usuário" });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/user/${currentUser.id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setMessage({ type: "success", text: "Usuário excluído com sucesso!" });
        setShowDeleteModal(false);
        setUpdate(!update);
      } else {
        setMessage({ type: "error", text: "Erro ao excluir usuário" });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao excluir usuário" });
    }
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowCreateModal(false);
    setShowDeleteModal(false);
    setMessage(null);
  };

  return (
    <div className="usuarios-page">
      <Container className="p-5 mt-5">
        <div className="page-header mb-4">
          <h1 className="page-title">👥 Gerenciar Usuários</h1>
          <p className="page-subtitle">Gerencie os jogadores do sistema</p>
        </div>

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

        <div className="actions-bar mb-4">
          <Button
            variant="primary"
            onClick={handleCreate}
            className="btn-modern"
          >
            <FaUserPlus className="me-2" />
            Novo Usuário
          </Button>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Carregando usuários...</p>
            </div>
          ) : allUsers.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">Nenhum usuário encontrado</p>
            </div>
          ) : (
            <Table
              responsive
              className="table-modern"
              style={{
                background: "#181c2a !important",
                color: "#fff !important",
              }}
            >
              <thead>
                <tr>
                  <th style={{ background: "#28304a", color: "#fff" }}>Nome</th>
                  <th style={{ background: "#28304a", color: "#fff" }}>
                    Email
                  </th>
                  <th style={{ background: "#28304a", color: "#fff" }}>
                    Senha
                  </th>
                  <th
                    className="text-center"
                    style={{ background: "#28304a", color: "#fff" }}
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user: UserInterface) => (
                  <tr key={user.id} style={{ background: "#181c2a" }}>
                    <td
                      className="fw-medium"
                      style={{ color: "#fff", background: "#181c2a" }}
                    >
                      {user.name}
                    </td>
                    <td style={{ color: "#fff", background: "#181c2a" }}>
                      {user.email}
                    </td>
                    <td style={{ color: "#fff", background: "#181c2a" }}>
                      <span className="password-mask">••••••••</span>
                    </td>
                    <td
                      className="text-center"
                      style={{ color: "#fff", background: "#181c2a" }}
                    >
                      <div className="action-buttons">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(user)}
                          className="btn-action me-2"
                          title="Editar usuário"
                        >
                          <FaUserEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(user)}
                          className="btn-action"
                          title="Excluir usuário"
                        >
                          <FaUserMinus />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        {/* Modal de Criação */}
        <Modal
          show={showCreateModal}
          onHide={closeModals}
          className="modal-modern"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>➕ Novo Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome completo"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite o email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <div className="password-input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite a senha"
                    value={currentUser.password}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        password: e.target.value,
                      })
                    }
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModals}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveCreate}>
              Criar Usuário
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de Edição */}
        <Modal
          show={showEditModal}
          onHide={closeModals}
          className="modal-modern"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>✏️ Editar Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome completo"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite o email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nova Senha (opcional)</Form.Label>
                <div className="password-input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Deixe em branco para manter a senha atual"
                    value={currentUser.password}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        password: e.target.value,
                      })
                    }
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModals}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de Confirmação de Exclusão */}
        <Modal
          show={showDeleteModal}
          onHide={closeModals}
          className="modal-modern"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>⚠️ Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Tem certeza que deseja excluir o usuário{" "}
              <strong>{currentUser.name}</strong>?
            </p>
            <p className="text-muted">Esta ação não pode ser desfeita.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModals}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Excluir Usuário
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Usuarios;
