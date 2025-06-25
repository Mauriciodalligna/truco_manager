import { Container } from "react-bootstrap"
import Contador from "./components/Contador"

export default function Placar() {
    return (
        <Container className="mt-5 p-5">
            <div className="placarContainer">
                <Contador nome="Nos"></Contador>
                <Contador nome="Eles"></Contador>
            </div>
        </Container>
    )
}