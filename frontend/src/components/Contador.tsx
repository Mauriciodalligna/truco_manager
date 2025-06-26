import { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row, Badge } from "react-bootstrap";

interface ContadorProps {
  nome: string;
  contador?: number;
  onUpdate?: (score: number) => void;
}

const Contador = ({ nome, contador = 0, onUpdate }: ContadorProps) => {
  const [localContador, setLocalContador] = useState(contador);

  useEffect(() => {
    setLocalContador(contador);
  }, [contador]);

  const incrementar = () => {
    const newScore = localContador < 24 ? localContador + 1 : localContador;
    setLocalContador(newScore);
    onUpdate?.(newScore);
  };

  const decrementar = () => {
    const newScore = localContador > 0 ? localContador - 1 : localContador;
    setLocalContador(newScore);
    onUpdate?.(newScore);
  };

  return (
    <div className="text-center">
      <h3
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "var(--text-primary)",
          marginBottom: "1.5rem",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {nome}
      </h3>

      <div className="imagem-container mb-4">
        <Image
          src={`/placar/${localContador}.jpg`}
          style={{
            borderRadius: "var(--border-radius-lg)",
            boxShadow: "var(--shadow-lg)",
          }}
        />
      </div>

      <div className="d-flex gap-3 justify-content-center">
        <Button
          className="btn-modern btn-danger-modern"
          onClick={decrementar}
          disabled={localContador === 0}
          style={{ minWidth: "120px" }}
        >
          ➖ Decrementar
        </Button>
        <Button
          className="btn-modern btn-success-modern"
          onClick={incrementar}
          disabled={localContador === 24}
          style={{ minWidth: "120px" }}
        >
          ➕ Incrementar
        </Button>
      </div>

      <div className="mt-3">
        <Badge
          className="badge-modern"
          style={{
            background: "var(--primary-color)",
            fontSize: "1.1rem",
            padding: "0.5rem 1rem",
          }}
        >
          Pontos: {localContador}
        </Badge>
      </div>
    </div>
  );
};

export default Contador;
