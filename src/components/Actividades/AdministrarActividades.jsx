import {Container, Col} from 'react-bootstrap'
import NavBarTop from '../NavBar/NavBarTop';
import {useState, useEffect} from 'react';
import {API_GET_ACTIVIDADES} from '../Api.js'
import axios from 'axios'
import NuevaActividad from './NuevaActividad'
import TablaActividades2 from './TablaActividades2'
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
                <NuevaActividad />
                {/* <TablaActividades actividades={actividades}/> */}
                <TablaActividades2/>
            </Col>
        </Container>
    )
}

export default AdministrarActividades;
