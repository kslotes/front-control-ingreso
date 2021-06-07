import NavBarTop from "./NavBarTop.jsx";
import {Form, Col, Row, Container, Button} from "react-bootstrap";
import "./AdminActividades.css";
import {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const NuevoCohorte = () => {

const DIAS_SEMANA = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    const [sedes, setSedes] = useState([]);

    const [diaSemana, setDiaSemana] = useState();
    const [actividadesSegunPropuesta, setActividadesSegunPropuesta] = useState([]);
    const [edificiosSegunHorario, setEdificiosSegunHorario] = useState([]);
    const [edificios, setEdificios] = useState([]);
    const [propuestas, setPropuestas] = useState([]);
    const [sede, setSede] = useState([]);
    const [cohorteSegunHorario, setCohorteSegunHorario] = useState();
    const [dependencias, setDependencias] = useState([]);
    const [sedesSegunHorario, setSedesSegunHorario] = useState([]);
    const [fechaInicio, setFechaInicio] = useState([]);
    const [fechaFin, setFechaFin] = useState([]);
    const [actividad, setActividad] = useState([]);
    const [actividadSegunHorario, setActividadSegunHorario] = useState("");


    let cohorteJSON = {};

    const handleCreacionCohorte = () => {
        cohorteJSON = {
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
        };

        axios.get(`http://areco.gob.ar:9528/api/edificio/sede/find/${sede}`).then((res) => {
            setEdificiosSegunHorario(res.data.data);
        });
        axios
            .post(`http://areco.gob.ar:9528/api/cohorte/create/${actividad}/${sede}`, cohorteJSON)
            .then((res) => {
                setCohorteSegunHorario(res.data);
                localStorage.setItem("idCohorte", res.data)
                console.log(actividadSegunHorario);
                localStorage.setItem("actividadStorage", actividadSegunHorario);
                Swal.fire({
                    title: `¡Éxito!`,
                    text: `Cohorte creado satisfactoriamente.`,
                    icon: `success`,
                    confirmButtonText: `Listo`,
                }).then(() => {
                     window.location = '/AdminAulasYHorarios'
                });
            })
            .catch(() =>
                Swal.fire({
                    title: `No se pudo crear el cohorte`,
                    text: `Verifique los datos e intente nuevamente`,
                    icon: `error`,
                    confirmButtonText: `Aceptar`,
                })
            );


    };

    const handleDiaChange = (event) => {
        console.log(`Soy el dia: ${event.target.value}`);
        setDiaSemana(event.target.value);
    };
    const handleActividad = (event) => {
        setActividad(event.target.value);
        console.log(`Soy la actividad: ${event.target.value}`);
        axios.get(`http://areco.gob.ar:9528/api/actividad/find/${event.target.value}`).then((res) => {
            setActividadSegunHorario(res.data.data);
            localStorage.setItem("idActividad", res.data.data.idActividad);
            localStorage.setItem("nombreActividad", res.data.data.nombre);
            console.log(res.data.data, "Soy la actividad");
        });
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
    const handleDependencia = (event) => {
        const fetchPropuestas = async () => {
            const result = await axios.get("http://areco.gob.ar:9528/api/propuesta/all");
            setPropuestas(result.data.data);
        };
        fetchPropuestas();
    };
    const handleSede = (event) => {
        const fetchEdificio = async () => {
            const result = await axios.get(`http://areco.gob.ar:9528/api/edificio/sede/find/${event.target.value}`);
            setEdificios(result.data.data);
        };
        fetchEdificio();
        setSede(event.target.value);
        localStorage.setItem("Sede", event.target.value)
    };

    useEffect(() => {
        const fetchSede = async () => {
            const result = await axios.get("http://areco.gob.ar:9528/api/sede/all");
            setSedes(result.data.data);
            setSedesSegunHorario(result.data.data);
        };
        fetchSede();
        const fetchDependencias = async () => {
            const result = await axios.get("http://areco.gob.ar:9528/api/dependencia/all");
            setDependencias(result.data.data);
        };
        fetchDependencias();
    }, []);

    return (
        <Container fluid className="fondo">
            <NavBarTop />
            <Form>

                        {/* SECCION DE SELECCION DE COHORTE */}

                        <Col xs={12} sm={12} lg={5} className="seccion-container">
                            <h2 className="texto-h2">Nuevo Cohorte</h2>
                            <Form.Group>
                                <Form.Label>Dependencia</Form.Label>
                                <Form.Control as="select" onChange={handleDependencia}>
                                    <option selected disabled>
                                        Seleccione una
                                    </option>
                                    {dependencias.map((dependencia) => {
                                        return (
                                            <option value={dependencia.idDependencia} key={dependencia.idDependencia}>
                                                {dependencia.nombre}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
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
                            <Row lg={2}>
                                <Col lg={6}>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Fecha Inicio</Form.Label>
                                        <Form.Control type="date" onChange={handleFechaInicio} />
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Fecha Fin</Form.Label>
                                        <Form.Control type="date" onChange={handleFechaFin} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mt-3">
                                <Form.Label>Dia: </Form.Label>
                            <Form.Control as="select" onChange={handleDiaChange}>
                                <option selected disabled>
                                    Seleccione dia
                                </option>
                                {DIAS_SEMANA.map((dia) => {
                                    return (
                                        <option value={dia} key={dia}>
                                            {dia}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                            <Button id="btn-crear-cohorte" className="mt-3 mb-2" variant="success" onClick={handleCreacionCohorte}>
                                Crear Cohorte
                            </Button>
                        </Form.Group>
                        </Col>
                        {/* SECCION DE SELECCION DE DIAS Y HORARIOS */}


            </Form>
        </Container>
    );
};

export default NuevoCohorte;
