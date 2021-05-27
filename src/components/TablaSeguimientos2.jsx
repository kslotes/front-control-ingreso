import {Row, Col, Form, Button, Table} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import "./TablaSeguimientos2.css";
import Swal from "sweetalert2";

const TablaSeguimientos2 = () => {
    const [hiddenFound, setHiddenFound] = useState(true);
    const [hiddenTable, setHiddenTable] = useState(true);
    const [contactosEstrechos, setContactosEstrechos] = useState([]);
    const [persona, setPersona] = useState({});
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();

    const handleInputDni = (event) => {
        console.log(`Soy el Dni Ingresdo: ${event.target.value}`);

        axios.get(`http://areco.gob.ar:9528/api/persona/find/dni/${event.target.value}`).then((result) => {
            if (result.data.data) {
                setPersona(result.data.data);
                console.log(result.data.data);
                console.log(`Encontre a: ${persona}`);
                setHiddenFound(false);

                Swal.fire({
                    title: `Persona localizada`,
                    text: `${result.data.data.nombre}. DNI: ${event.target.value}`,
                    icon: `success`,
                    confirmButtonText: `Continuar`,
                });
            }
            if (!result.data.data) {
                setHiddenFound(true);
                setHiddenTable(true);
            }
        });
    };
    const handleFechaInicioChange = (event) => {
        setFechaInicio(event.target.value);
        console.log(`Soy fecha inicio: ${event.target.value}`);
    };

    const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
        console.log(`Soy fecha fin: ${event.target.value}`);
    };

    const handleSeguimiento = () => {
        axios.get(`http://areco.gob.ar:9528/api/persona/find/persona_sesion/${fechaInicio}/${fechaFin}`).then((res) => {
            setContactosEstrechos(res.data.data);
            console.log(res.data.data);
            if (contactosEstrechos) {
                setHiddenTable(false);
            }
        });
    };
    return (
        <div className="d-flex flex-column align-items-center">
            <Col xs={12} sm={12} lg={3} className="text-center mt-3">
                <Form>
                    <Form.Label>Ingrese DNI:</Form.Label>
                    <input placehoder="Ingrese dni" type="text" class="form-control" pattern="(^[0-9][0-9]?\.{1}\d{3}\.\d{3}$)|([0-9][0-9]?\d{3}\d{3}$)" onChange={handleInputDni}></input>
                </Form>
            </Col>

            <Col hidden={hiddenFound} className="mt-3 text-center">
                <p className="tag-nombre">
                    Nombre: {persona.nombre}, DNI: {persona.dni}
                </p>
                <h2 className="texto-h2 mt-4">Localizar contactos estrechos: </h2>
                <Row xs={1} lg={2}>
                    <Col>
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control type="date" onChange={handleFechaInicioChange} />
                    </Col>
                    <Col>
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control type="date" onChange={handleFechaFinChange} />
                    </Col>
                </Row>
                <Button variant="outline-info" className="mt-3" onClick={handleSeguimiento}>
                    Realizar Seguimiento
                </Button>
            </Col>

            <Col xs={12}>
                <Table className="mt-3" hidden={hiddenTable} responsive striped bordered variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre y Apellido</th>
                            <th>Telefono</th>
                            <th>Correo Electronico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactosEstrechos.map((persona, i) => {
                            return (
                                <tr>
                                    <td>{i}</td>
                                    <td>{persona.nombre}</td>
                                    <td>{persona.telefono}</td>
                                    <td>{persona.correoElectronico}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Col>
        </div>
    );
};

export default TablaSeguimientos2;
