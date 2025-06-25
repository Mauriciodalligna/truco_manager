import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserInterface from "./interfaces/UserInterface";
import UserService from "./services/UserService";
import { useRouter } from "next/router";

const Usuario = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const adicionar = async () => {
    const usuario: UserInterface = {
        name: name,
        email: email,
        password: password
    }

    const response = await UserService.createUser(usuario);
    if(response === 201) {
      router.push('/')
    }
    console.log(response);

  };

  return (
    <div className="p-5 mt-5 align-items-center justify-content-center">
      <Form onSubmit={adicionar}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </div>
  );
};

export default Usuario;
