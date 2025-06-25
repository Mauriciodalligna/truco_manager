import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
    return(
        <>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary" fixed="bottom">
                <Container>
                    <Navbar.Brand as={Link} passHref href="/">
                        Truco
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}