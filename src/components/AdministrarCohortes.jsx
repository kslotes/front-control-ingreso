import {Container, Col, Row, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios'
import {API_GET_COHORTES} from './Api.js';
import NavBarTop from './NavBarTop';
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
                <Table variant="light"striped bordered hover responsive>

                    <thead>
                        <tr>
                            <th>ID Cohorte</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Acciones</th>

                        </tr>
                    </thead>

                    <tbody>
                        {cohortes.map((cohorte) => {
                            return (
                                <tr>
                                    <td>
                                        {cohorte.idCohorte}
                                    </td>
                                    <td>
                                        {cohorte.fechaInicio}
                                    </td>
                                    <td>
                                        {cohorte.fechaFin}
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

export default AdministrarCohortes;
