import { useEffect, useState } from "react";
import UserService from "./services/UserService";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import UserInterface from "./interfaces/UserInterface";
import { FaUserEdit } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";

const Usuarios = () => {
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInterface>({id: 0, name: "", email: "", password: ""});

  useEffect(() => {
    getUsers();
  }, [update]);

  const getUsers = async () => {
    const users = await UserService.getAllUsers();
    setAllUsers(users);
  };

  const handleEdit = (user: UserInterface) => {
    setCurrentUser(user);
    setShow(true);
  };

  const handleSave = () => {
    UserService.editUser(currentUser);
    getUsers()
    setShow(false);
  }

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container className="p-5 mt-5 align-items-center justify-content-center">
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Password</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user: UserInterface) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>****</td>
                <td>
                  <Button
                    variant="alert"
                    onClick={() => {
                      handleEdit(user);
                    }}
                  >
                    <FaUserEdit />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="alert"
                    onClick={() => {
                      UserService.deleteUser(user.id);
                      setUpdate(!update);
                    }}
                  >
                    <FaUserMinus />
                  </Button>
                </td>
              </tr>
              // npm install react-icons
            );
          })}
        </tbody>
      </Table>
      <Modal 
        show={show} 
        onHide={handleClose}
        bg="dark"
        data-bs-theme="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                value={currentUser.name}
                onChange={(e) => {
                  setCurrentUser({ ...currentUser, name: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={currentUser.email}
                onChange={(e) => {
                    setCurrentUser({ ...currentUser, email: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={currentUser.password}
                onChange={(e) => {
                    setCurrentUser({ ...currentUser, password: e.target.value });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Usuarios;
