import {Form, Button, Modal} from "react-bootstrap";
import {useState, useEffect} from "react";

import {URL_BASE, API_GET_ACTIVIDADES, API_GET_SEDES} from "../Api.js";
import Swal from "sweetalert2";
import axios from "axios";

export default () => {
    const [show, setShow] = useState(false);
    const [actividades, setActividades] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [edificios, setEdificios] = useState([]);
    const [aulas, setAulas] = useState([]);

    const [selectedActividad, setSelectedActividad] = useState();
      const [selectedAula, setSelectedAula] = useState();

    const handleClose = () => setShow(false);
    const handleSubmit = async () => {
          console.log(`Voy asignarle la actividad: ${selectedActividad}, al aula ${selectedAula}`)
    }
    const handleActividad = (event) => setSelectedActividad(event.target.value);
    const handleSede = async (event) => {
        try {
            const res = await axios.get(`${URL_BASE}/edificio/sede/find/${event.target.value}`);
            setEdificios(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };
    const handleEdificio = async (event) => {
        try {
            const res = await axios.get(`${URL_BASE}/aula/find/edificio/${event.target.value}`);
            setAulas(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };
    const handleAula = event => setSelectedAula(event.target.value);

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const res = await axios.get(`${API_GET_ACTIVIDADES}`);
                setActividades(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        const fetchSedes = async () => {
            try {
                const res = await axios.get(`${API_GET_SEDES}`);
                setSedes(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchActividades();
        fetchSedes();
    }, []);
    return (
        <>
            <Button className="mb-3" variant="primary" onClick={() => setShow(true)}>
                Asignar Aula
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Asignar Aula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="FormActividadAula" className="mt-3">
                        <Form.Label>Seleccionar Actividad</Form.Label>
                        <Form.Control as="select" defaultValue="Seleccionar una" onChange={handleActividad}>
                            <option disabled>Seleccionar una</option>
                            {actividades.map((act) => (
                                <option key={act.idActividad} value={act.idActividad}>
                                    {act.nombreActividad}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="FormSedeAula" className="mt-3">
                        <Form.Label>Seleccionar Sede</Form.Label>
                        <Form.Control as="select" defaultValue="Seleccionar una" onChange={handleSede}>
                            <option disabled>Seleccionar una</option>
                            {sedes.map((sede) => (
                                <option key={sede.idSede} value={sede.idSede}>
                                    {sede.nombre}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Group controlId="formEdificioAula" className="mt-3">
                            <Form.Label>Seleccionar Edificio</Form.Label>
                            <Form.Control as="select" defaultValue="Seleccionar una" onChange={handleEdificio}>
                                <option disabled>Seleccionar una</option>
                                {edificios.map((edificio) => (
                                    <option key={edificio.idEdificio} value={edificio.idEdificio}>
                                        {edificio.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formAulaAula" className="mt-3">
                            <Form.Label>Seleccionar Aula</Form.Label>
                            <Form.Control as="select" defaultValue="Seleccionar una" onChange={handleAula}>
                                <option disabled>Seleccionar una</option>
                                {aulas.map((aula) => (
                                    <option key={aula.idAula} value={aula.idAula}>
                                        {aula.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Asignar Aula
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
