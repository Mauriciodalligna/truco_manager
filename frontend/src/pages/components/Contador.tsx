import { useState } from "react"
import { Button, Col, Container, Image, Row } from "react-bootstrap"

const Contador = (props) => {
    const [contador, setContador] = useState(0)
    const [jogador] = useState(props.nome)

    const incrementar = () => {
        setContador(prev => ( prev < 24 ? prev + 1 : prev ) )
    }

    const decrementar = () => {
        setContador(prev => ( prev > 0 ? prev - 1 : prev ) )
    }

    return (
        <div className="placarContainer">
            <Row>{jogador}</Row>
            <Row>
               <Col className="imagem-container">
                    <Image src={`/placar/${contador}.jpg`}></Image>
               </Col>
               <Col className="d-flex align-items-center justify-content-between">
                    <Button onClick={incrementar}>Incrementar</Button>
                    <Button onClick={decrementar}>Decrementar</Button>
               </Col>
            </Row>
        </div>
    )
}

export default Contador