import {Container, Col} from 'react-bootstrap'
import NavBarTop from '../NavBar/NavBarTop'
import TablaAulas2 from './TablaAulas2'


export default () => {

    return (
        <Container fluid className="fondo">
            <NavBarTop/>
            <Col className="seccion-container">
                <h2 className="texto-h2">Listado de Aulas</h2>
                <TablaAulas2/>
            </Col>
        </Container>
    )
}
