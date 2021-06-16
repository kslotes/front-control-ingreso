import {Container, Col} from 'react-bootstrap'
import NavBarTop from './NavBarTop';
import {useState, useEffect} from 'react';
import {API_GET_ACTIVIDADES} from './Api.js'
import axios from 'axios'
import ModalNuevaActividad from './ModalNuevaActividad'
import TablaActividades from './TablaActividades'
import './AdministrarActividades.css'
const AdministrarActividades = () => {
    const [actividades, setActividades] = useState([])

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
                <h2 className="texto-h2">Listado de Actividades</h2>
                <ModalNuevaActividad />
                <TablaActividades actividades={actividades}/>
            </Col>
        </Container>
    )
}

export default AdministrarActividades;
