import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const logar = async (e) => {
    e.preventDefault()
    
    console.log(email)
    console.log(password)

    axios.post('http://localhost:3002/api/login', {
        'email': email,
        'password': password
    }).then((response) => {
        if(response.status === 200) {
          localStorage.setItem("isLogged", "true")
          router.push('/')
        }
        console.log(response)
    }).catch((error) => {
        console.log("Errrrrrrroooooooooo " + error)
    })

  }

  return (
    <div className="p-5 mt-5 align-items-center justify-content-center">
      <Form onSubmit={logar}>
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
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
