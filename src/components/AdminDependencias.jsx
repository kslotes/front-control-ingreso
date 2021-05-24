import {Container, Row, Col} from "react-bootstrap";
import FormDependencias from "./FormDependencias";
import NavBarTop from "./NavBarTop";

const AdminDependencias = () => {
    return (
        <Container fluid className="fondo">
            <NavBarTop />
            <Row sm={1} className="seccion-container mt-4">
                <h2 className="texto-h2">Crear Actividad</h2>
                <Col xs={12} sm={12} lg={6}>
                    <FormDependencias />

                </Col>

            </Row>
        </Container>
    );
};

export default AdminDependencias;
