import {Container, Col} from 'react-bootstrap'
import NavBarTop from './NavBarTop'
export default () => {

    return (
        <Container fluid className="fondo">
            <NavBarTop/> 
            <Col className="seccion-container">
                <h2 className="h2-texto"></h2>
            </Col>
        </Container>
    )
}
