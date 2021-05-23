import {Container, Row, Col, Button} from "react-bootstrap";
import {Link} from 'react-router-dom'
import FormDependencias from "./FormDependencias";
import NavBarTop from "./NavBarTop";

const AdminDependencias = () => {
    return (
        <Container fluid className="fondo">
            <NavBarTop />
            <Row sm={1} className="seccion-container mt-4">
                <h2 className="texto-h2">Administrar Dependencias</h2>
                <Col xs={12} sm={12} lg={6}>
                    <FormDependencias />

                </Col>
                <Col className="mt-3 mb-2">
                    <Button type="Submit" variant="success"><Link to='/AdminActividades' style={{textDecoration: 'none', color: 'white'}}>Continuar</Link></Button>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDependencias;
