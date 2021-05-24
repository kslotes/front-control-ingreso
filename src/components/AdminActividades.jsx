import NavBarTop from "./NavBarTop.jsx";
import {Form, Col, Row, Container, Button, InputGroup} from "react-bootstrap";
import "./AdminActividades.css";
import {useState, useEffect} from "react";
import axios from "axios";

const AdminActividades = () => {
    const [sedes, setSedes] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [actividadesSegunPropuesta, setActividadesSegunPropuesta] = useState([]);
    const [edificios, setEdificios] = useState([]);
    const [propuestas, setPropuestas] = useState([]);
    const [sede, setSede] = useState([]);
    const [fechaInicio, setFechaInicio] = useState([]);
    const [fechaFin, setFechaFin] = useState([]);
    const [actividad, setActividad] = useState([]);
    const [diaSemana, setDiaSemana] = useState();
    const [horaInicio, setHoraInicio] = useState();
    const [horaFin, setHoraFin] = useState();
    const [modalidad, setModalidad] = useState();

    const DIAS_SEMANA = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    const MODALIDADES = ["Teórico", "Práctico", "Teórico-Práctico"];

    let cohorteJSON = {};
    let horarioJSON = {};

    const handleChangeModalidad = (event) => {
        console.log(`Soy la modalidad: ${event.target.value}`);
        setModalidad(event.target.value);
    };
    const handleDiaChange = (event) => {
        console.log(`Soy el dia: ${event.target.value}`);
        setDiaSemana(event.target.value);
    };
    const handleHorarioInicio = (event) => {
        console.log(`Soy el horario de inicio: ${event.target.value}`);
        setHoraInicio(event.target.value);
    };
    const handleHorarioFin = (event) => {
        console.log(`Soy el horario de fin: ${event.target.value}`);
        setHoraFin(event.target.value);
    };
    const handleCreacionHorario = () => {
          horarioJSON = {
                dia: diaSemana,
                horaInicio: horaInicio,
                horaFin: horaFin,
                nombre: modalidad
          }
          axios.post(`http://areco.gob.ar:9528/api/horaio/`)
    };

    const handleCreacionCohorte = () => {
        cohorteJSON = {
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
        };
        axios
            .post(`http://areco.gob.ar:9528/api/cohorte/create/${sede}/${actividad}`, cohorteJSON)
            .then(() => alert("Cohorte creado satisfactoriamente."))
            .catch(() => alert("Error al crear cohorte. Verifique los datos e intente nuevamente"));
    };
    const handleActividad = (event) => {
        setActividad(event.target.value);
    };
    const handleFechaInicio = (event) => {
        console.log(`Soy fecha inicio: ${event.target.value}`);
        setFechaInicio(event.target.value);
    };
    const handleFechaFin = (event) => {
        console.log(`Soy fecha fin: ${event.target.value}`);
        setFechaFin(event.target.value);
    };
    const handlePropuesta = (event) => {
        const fetchActividadesSegunPropuesta = async () => {
            const result = await axios.get(`http://areco.gob.ar:9528/api/actividad/find/propuesta/${event.target.value}`);
            setActividadesSegunPropuesta(result.data.data);
        };
        fetchActividadesSegunPropuesta();
    };
    const handleSede = (event) => {
        const fetchEdificio = async () => {
            const result = await axios.get(`http://areco.gob.ar:9528/api/edificio/sede/find/${event.target.value}`);
            setEdificios(result.data.data);
        };
        fetchEdificio();
        setSede(event.target.value);
    };
    const handleChangeEdificio = (event) => {
        const fetchAula = async () => {
            const result = await axios.get(`http://areco.gob.ar:9528/api/aula/find/edificio/${event.target.value}`);
            setAulas(result.data.data);
        };
        fetchAula();
    };
    useEffect(() => {
        const fetchPropuestas = async () => {
            const result = await axios.get("http://areco.gob.ar:9528/api/propuesta/all");
            setPropuestas(result.data.data);
        };
        fetchPropuestas();
        const fetchSede = async () => {
            const result = await axios.get("http://areco.gob.ar:9528/api/sede/all");
            setSedes(result.data.data);
        };
        fetchSede();
    }, []);

    return (
        <Container fluid className="fondo">
            <NavBarTop />
            <Form>
                <Row sm={1} className="seccion-container mt-4">
                    <h2 className="texto-h2">Administrar Actividades</h2>
                    <Row lg={2}>
                        <Col xs={12} sm={12} lg={6}>
                            <Form.Group className="mt-4">
                                <Form.Label>Propuesta</Form.Label>
                                <Form.Control as="select" onChange={handlePropuesta}>
                                    <option selected disabled>
                                        Seleccione una
                                    </option>
                                    {propuestas.map((propuesta) => {
                                        return (
                                            <option value={propuesta.idPropuesta} key={propuesta.idPropuesta}>
                                                {propuesta.nombre}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Actividad</Form.Label>
                                <Form.Control as="select" onChange={handleActividad}>
                                    <option selected disabled>
                                        Seleccione una
                                    </option>
                                    {actividadesSegunPropuesta.map((actividad) => {
                                        return (
                                            <option value={actividad.idActividad} key={actividad.idActividad}>
                                                {actividad.nombre}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Sede</Form.Label>
                                <Form.Control as="select" onChange={handleSede}>
                                    <option selected disabled>
                                        Seleccione una
                                    </option>
                                    {sedes.map((sede) => {
                                        return (
                                            <option value={sede.idSede} key={sede.idSede}>
                                                {sede.nombre}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Edificio</Form.Label>
                                <Form.Control as="select" onChange={handleChangeEdificio}>
                                    <option selected disabled>
                                        Seleccione una
                                    </option>
                                    {edificios.map((edificio) => {
                                        return (
                                            <option value={edificio.idEdificio} key={edificio.idEdificio}>
                                                {edificio.nombre}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Aula</Form.Label>
                                <Form.Control as="select" onChange={handleSede}>
                                    <option selected disabled>
                                        Seleccione una
                                    </option>
                                    {aulas.map((aula) => {
                                        return (
                                            <option value={aula.idAula} key={aula.idAula}>
                                                {aula.nombre}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label>Fecha Inicio</Form.Label>
                                <Form.Control type="date" onChange={handleFechaInicio} />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Fecha Fin</Form.Label>
                                <Form.Control type="date" onChange={handleFechaFin} />
                            </Form.Group>
                            <Button className="mt-3 mb-2" variant="success" onClick={handleCreacionCohorte}>
                                Crear Cohorte
                            </Button>
                        </Col>
                        <Col xs={12} sm={12} lg={6}>
                            <Col xs={12} className="text-center">
                                <h2 className="texto-h2">Seleccionar días y horarios</h2>
                            </Col>
                            <Col xs={12} sm={6} lg={6}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Día:</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control as="select" onChange={handleDiaChange}>
                                        <option selected disabled>
                                            Seleccione un dia
                                        </option>
                                        {DIAS_SEMANA.map((dia) => {
                                            return (
                                                <option value={dia} key={dia}>
                                                    {dia}
                                                </option>
                                            );
                                        })}
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                            <Form.Group>
                                <InputGroup className="mt-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Hora Inicio</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="time" onChange={handleHorarioInicio} />
                                    <InputGroup.Append>
                                        <InputGroup.Text>Hora Fin</InputGroup.Text>
                                    </InputGroup.Append>
                                    <Form.Control type="time" onChange={handleHorarioFin} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Col xs={12} sm={6} lg={6}>
                                    <InputGroup className="mt-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Modalidad</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="select" onChange={handleChangeModalidad}>
                                            <option selected disabled>
                                                Seleccione una
                                            </option>
                                            {MODALIDADES.map((modalidad) => {
                                                return (
                                                    <option value={modalidad} key={modalidad}>
                                                        {modalidad}
                                                    </option>
                                                );
                                            })}
                                        </Form.Control>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Button className="mt-3" variant="success" onClick={handleCreacionHorario}>
                                Agregar Horario
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Container>
    );
};

export default AdminActividades;
