import {Container, Col}  from 'react-bootstrap';
import NavBarTop from '../NavBar/NavBarTop';
import TablaCohortes2 from './TablaCohortes2'
const AdministrarCohortes = () => {

    return (
        <Container fluid className="fondo">
            <NavBarTop/>
            <Col className="seccion-container">
                <h2 className="texto-h2">Listado de Cohortes</h2>
                <TablaCohortes2/>
            </Col>
        </Container>
    )
}

export default AdministrarCohortes;
