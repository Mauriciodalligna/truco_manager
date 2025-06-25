import axios from "axios"
import { useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";

export default function Cachorro() {
    const [img, setImg] = useState('')
    const [update, setUpdate] = useState(false)

    const buscaCachorro = () => {
        axios.get('https://dog.ceo/api/breeds/image/random')
            .then(function (response) {
                if(response.status == 200) {
                    setImg(response.data.message)
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const atualizar = () => {
        setUpdate(!update)
    }

    useEffect(() => {
        buscaCachorro()
        console.log("Ola")
    }, [update])

    return (
        <Container className="mt-5 p-5">
            <Image src={img}></Image>
            <Button onClick={buscaCachorro}>Busca Cachorro</Button>
            <Button onClick={atualizar}>Atualiza Cachorro</Button>
        </Container>
    )

}