import {Container, Col, Row, Form, Button} from 'react-bootstrap'
import NavBarTop from './NavBarTop';
import {useState, useEffect} from 'react';
import {API_GET_ACTIVIDADES, API_GET_DEPENDENCIAS } from './Api.js'
import axios from 'axios'
import ModalNuevaActividad from './ModalNuevaActividad'
import TablaActividades from './TablaActividades'
import Swal from 'sweetalert2'
const AdministrarActividades = () => {
    const [actividades, setActividades] = useState([])
    const [actividad, setActividad] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get(API_GET_ACTIVIDADES)
            .then(res => {
                setActividades(res.data.data);
            })
    }, [])
    return (
        <Container fluid className="fondo">
            <NavBarTop/>
            <Col className="seccion-container">
                <ModalNuevaActividad show={show}/>
                <h2 className="texto-h2">Listado de Actividades</h2>
                <TablaActividades actividades={actividades}/>
            </Col>
        </Container>
    )
}

export default AdministrarActividades;
