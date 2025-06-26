import axios from "axios";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { Button, Form, Alert } from "react-bootstrap";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post<LoginResponse>('http://localhost:3002/api/login', {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("userToken", response.data.token);
        router.push('/');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 mt-5 align-items-center justify-content-center">
      <div className="card-modern p-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">🔐 Login</h2>
        
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
              placeholder="Digite seu email"
            value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
          <Form.Control
              type="password"
              placeholder="Digite sua senha"
            value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
        </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
        </Button>
      </Form>
      </div>
    </div>
  );
};

export default Login;
