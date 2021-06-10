import {Container, Row, Col} from "react-bootstrap";
import FormDependencias from "./FormDependencias";
import NavBarTop from "./NavBarTop";

const NuevaActividad = () => {
    return (
        <Container fluid className="fondo">
            <NavBarTop />
            <Col xs={12} sm={12} lg={5} className="seccion-container">
                <h2 className="texto-h2">Nueva Actividad</h2>
                <FormDependencias />
            </Col>
        </Container>
    );
};

export default NuevaActividad;
