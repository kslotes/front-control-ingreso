import {Container, Col} from 'react-bootstrap'
import NavBarTop from '../NavBar/NavBarTop';
import NuevaActividad from './NuevaActividad'
import TablaActividades from './TablaActividades'
import './AdministrarActividades.css'
const AdministrarActividades = () => {

    return (
        <Container fluid className="fondo">
            <NavBarTop/>
            <Col className="seccion-container">
                <h2 className="texto-h2">Listado de Actividades</h2>
                <TablaActividades/>
            </Col>
        </Container>
    )
}

export default AdministrarActividades;
