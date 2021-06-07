import {Col, Form, InputGroup, Button, Table, Container} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavBarTop from "./NavBarTop";

const DIAS_SEMANA = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const MODALIDADES = ["Teórico", "Práctico", "Teórico-Práctico", "Actividad Extracurricular"];

const AdminAulasYHorarios = () => {
    let arrHorarios = [];
    let horarioJSON = {};


    const [aulasSegunHorario, setAulasSegunHorario] = useState([]);
    const [cohorteSegunHorario, setCohorteSegunHorario] = useState();
    const [actividadSegunHorario, setActividadSegunHorario] = useState("");
    const [nombreActividad, setNombreActividad] = useState()
    const [idActividad, setIdActividad] = useState();
    const [edificiosSegunHorario, setEdificiosSegunHorario] = useState([]);
    const [aulaSegunHorario, setAulaSegunHorario] = useState();
    const [diaSemana, setDiaSemana] = useState();
    const [horaInicio, setHoraInicio] = useState();
    const [horaFin, setHoraFin] = useState();
    const [modalidad, setModalidad] = useState();
    const [hiddenTable, setHiddenTable] = useState(true);

    const handleEdificioHorario = (event) => {
        const fetchAulaSegunHorario = async () => {
            const result = await axios.get(`http://areco.gob.ar:9528/api/aula/find/edificio/${event.target.value}`);
            setAulasSegunHorario(result.data.data);
        };
        fetchAulaSegunHorario();
    };
    const handleAulaHorario = (event) => {
        setAulaSegunHorario(event.target.value);
        console.log(`Soy el aula que le asignan horario: ${event.target.value}`);
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
    const handleChangeModalidad = (event) => {
        console.log(`Soy la modalidad: ${event.target.value}`);
        setModalidad(event.target.value);
    };
    const handleCreacionHorario = () => {
        horarioJSON = {
            dia: diaSemana,
            horaInicio: horaInicio + ":00",
            horaFin: horaFin + ":00",
            nombre: modalidad,
        };
        axios
            .post(`http://areco.gob.ar:9528/api/horario/create-por-cohorte/${idActividad}/${aulaSegunHorario}/${cohorteSegunHorario}`, horarioJSON)
            .then(() => {
                Swal.fire({
                    title: `¡Éxito!`,
                    text: `Horario asignado correctamente.`,
                    icon: `success`,
                    confirmButtonText: `Listo`,
                    confirmButtonColor: `#198754`,
                });
                arrHorarios.push(horarioJSON);
                console.log(arrHorarios);
            //     setHiddenTable(false);
            })
            .catch(() =>
                Swal.fire({
                    title: `No se pudo asignar el horario.`,
                    text: `Verifique los datos e intente nuevamente`,
                    icon: `error`,
                    confirmButtonText: `Aceptar`,
                })
            );
        console.log(`Actividad: ${idActividad}, Aula: ${aulaSegunHorario}, Cohorte: ${cohorteSegunHorario} \nhorarioJSON: `, horarioJSON);
        console.log(`http://areco.gob.ar:9528/api/horario/create-por-cohorte/${actividadSegunHorario.idActividad}/${aulaSegunHorario}/${cohorteSegunHorario}`);
    };
    useEffect(() => {
          setCohorteSegunHorario(localStorage.getItem("idCohorte"));
          setActividadSegunHorario(localStorage.getItem("actividadStorage"));
          setIdActividad(localStorage.getItem("idActividad"))
          setNombreActividad(localStorage.getItem("nombreActividad"))
          console.log(localStorage.getItem("idActividad"), localStorage.getItem("nombreActividad"));
          console.log(localStorage.getItem("idCohorte"))

          let Sede = localStorage.getItem("Sede")
          const fetchEdificio = async () => {
            const result = await axios.get(`http://areco.gob.ar:9528/api/edificio/sede/find/${Sede}`);
            setEdificiosSegunHorario(result.data.data);
        };
        fetchEdificio();
    }, []);
    return (
        <Container fluid className="fondo">
            <NavBarTop />
            <Col xs={12} sm={12} lg={5} className="seccion-container">
                <h2 className="texto-h2">Asignar días y horarios</h2>

                <Form.Group>
                    <InputGroup className="mt-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Cohorte</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
                            <option selected>{cohorteSegunHorario}</option>
                        </Form.Control>
                    </InputGroup>
                </Form.Group>
                <InputGroup className="mt-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Actividad</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select">
                        <option selected>{nombreActividad}</option>
                    </Form.Control>
                </InputGroup>
                <InputGroup className="mt-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Edificio</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select" onChange={handleEdificioHorario}>
                        <option selected disabled>
                            Seleccione edificio
                        </option>
                        {edificiosSegunHorario.map((edificio) => {
                            return (
                                <option value={edificio.idEdificio} key={edificio.idEdificio}>
                                    {edificio.nombre}
                                </option>
                            );
                        })}
                    </Form.Control>
                </InputGroup>
                <InputGroup className="mt-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Aula</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select" onChange={handleAulaHorario}>
                        <option selected disabled>
                            Seleccione aula
                        </option>
                        {aulasSegunHorario.map((aula) => {
                            return (
                                <option value={aula.idAula} key={aula.idAula}>
                                    {aula.nombre}
                                </option>
                            );
                        })}
                    </Form.Control>
                </InputGroup>

                <InputGroup className="mt-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Día:</InputGroup.Text>
                    </InputGroup.Prepend>
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
                </InputGroup>

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
                </Form.Group>
                <Button id="btn-crear-horario" className="mt-3" variant="success" onClick={handleCreacionHorario}>
                    Asignar Horario
                </Button>
                {/* <Table hidden={hiddenTable} striped bordered hover variant="light" className="mt-3">
                    <thead>
                        <tr>
                            <th>Dia</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Modalidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrHorarios.map((horario) => {
                            return (
                                <tr>
                                    <td>{horario.dia}</td>
                                    <td>{horario.horaInicio}</td>
                                    <td>{horario.horaFin}</td>
                                    <td>{horario.nombre}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table> */}
            </Col>
        </Container>
    );
};

export default AdminAulasYHorarios;
