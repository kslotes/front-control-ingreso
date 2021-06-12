import {Container, Col}  from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios'
import {API_GET_COHORTES} from './Api.js';
import NavBarTop from './NavBarTop';
import TablaCohortes from './TablaCohortes'
const AdministrarCohortes = () => {
    const [cohortes, setCohortes] = useState([])

    useEffect(() => {
        axios.get(API_GET_COHORTES)
            .then(res => {
                console.log(`Cohortes:${res.data.data}`);
                setCohortes(res.data.data);
                console.log(res.data.data);
                console.log(Object.keys(res.data.data[0]))
            })
    }, [])
    return (
        <Container fluid className="fondo">
            <NavBarTop/>
            <Col className="seccion-container">
                <h2 className="texto-h2">Listado de Cohortes</h2>
                <TablaCohortes cohortes={cohortes}/>
            </Col>
        </Container>
    )
}

export default AdministrarCohortes;
