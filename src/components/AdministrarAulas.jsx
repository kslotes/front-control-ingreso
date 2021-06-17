import {Container, Col} from 'react-bootstrap'
import NavBarTop from './NavBarTop'
import TablaAulas from './TablaAulas'
import {useState, useEffect} from 'react'
import {API_GET_AULAS} from './Api.js'
import axios from 'axios'
import ModalNuevaAula from './ModalNuevaAula'

export default () => {
    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        axios.get(API_GET_AULAS)
            .then(res => {
                setAulas(res.data.data);
            })
    }, [])
    return (
        <Container fluid className="fondo">
            <NavBarTop/>
            <Col className="seccion-container">
                <h2 className="texto-h2">Listado de Aulas</h2>
                <ModalNuevaAula/>
                <TablaAulas aulas={aulas}/>
            </Col>
        </Container>
    )
}
