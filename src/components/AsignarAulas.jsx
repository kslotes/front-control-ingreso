import {Container, Col, Form, Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import NavBarTop from './NavBarTop'
import {URL_BASE, API_GET_ACTIVIDADES} from './Api.js'
import Swal from 'sweetalert2'
import axios from 'axios'

export default () => {

    const [actividades, setActividades] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [edificios, setEdificios] = useState([]);

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const res = await axios.get(`${API_GET_ACTIVIDADES}`);
                setActividades(res.data.data);
            }
            catch(err) {
                console.error(err);
            }
        }
        fetchActividades();
    }, []);

    return (
        <Container fluid className="fondo">
            <NavBarTop/> 
            <Col className="seccion-container">
                <h2 className="texto-h2">Asignar Aula</h2>
                <Col xs={12} lg={6}>
                    <Form.Group controlId="FormSedeAula" className="mt-2"> 
                        <Form.Label>Seleccionar Sede</Form.Label>
                        <Form.Control as="select" defaultValue="Seleccionar una">
                            <option disabled>Seleccionar una</option>
                            {sedes.map((sede) => <option key={sede.idSede} value={sede.idSede}>{sede.nombreSede}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="FormActividadAula" className="mt-2"> 
                        <Form.Label>Seleccionar Actividad</Form.Label>
                        <Form.Control as="select" defaultValue="Seleccionar una">
                            <option disabled>Seleccionar una</option>
                            {actividades.map((act) => <option key={act.idActividad} value={act.idActividad}>{act.nombreActividad}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Col>
        </Container>
    )
}
