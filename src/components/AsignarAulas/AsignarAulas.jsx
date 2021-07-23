import {Container, Col, Button} from "react-bootstrap";
import NavBarTop from "../NavBar/NavBarTop";
import ModalAsignarAula from "./ModalAsignarAula";
import {useState} from "react";
import TablaSesiones from "./TablaSesiones";
export default () => {
    const [show, setShow] = useState(false);

    return (
        <Container fluid className="fondo">
            <NavBarTop />
            <Col className="seccion-container">
                <h2 className="texto-h2">Próximas clases</h2>
                <ModalAsignarAula/>
                <TablaSesiones/>
            </Col>
        </Container>
    );
};
