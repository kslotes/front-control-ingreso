import {Container, Col, Row, Form, Table} from 'react-bootstrap'
import NavBarTop from './NavBarTop';
import {useState, useEffect} from 'react';
import { URL_BASE, API_GET_ACTIVIDADES } from './Api.js'
import axios from 'axios'
const AdministrarActividades = () => {
    const [actividades, setActividades] = useState([])

    useEffect(() => {
        axios.get(API_GET_ACTIVIDADES)
            .then(res => {
                console.log(`Actividades:${res.data.data}`);
                setActividades(res.data.data);
                console.log(res.data.data);
                console.log(Object.keys(res.data.data[0]))
            })
    }, [])
    return (
        <Container fluid className="fondo">
            <NavBarTop/>
            <Col className="seccion-container">
                <h2 className="texto-h2">Listado de Actividades</h2>
                <Table variant="light"striped bordered hover responsive>

                    <thead>
                        <tr>
                            <th>Nombre Actividad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {actividades.map((actividad) => {
                            return (
                                <tr>
                                    <td>
                                        {actividad.nombre}
                                    </td>
                                    <td>
                                        Modificar / Borrar
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Col>
        </Container>
    )
}

export default AdministrarActividades;
