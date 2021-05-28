import {Form, Col, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
const FormDependencias = () => {
    const [dependencias, setDependencias] = useState([]);
    const [propuestas, setPropuestas] = useState([]);
    let actividadJson = {};
    let nombreActividad;
    let idPropuesta;

    const handleDependencia = (event) => {
        const fetchPropuestas = async () => {
            const result = await axios.get(`http://areco.gob.ar:9528/api/propuesta/find/dependencia/${event.target.value}`);
            setPropuestas(result.data.data);
        };
        fetchPropuestas();
    };
    const handleChangeActividad = (e) => {
        nombreActividad = e.target.value;
        console.log(nombreActividad);
    };
    const handlePropuesta = (e) => {
        idPropuesta = e.target.value;
        console.log(idPropuesta);
    };
    const handleSubmit = () => {
        actividadJson = {
            nombre: nombreActividad,
        };
        axios.post(`http://areco.gob.ar:9528/api/actividad/create-por-propuesta/${idPropuesta}`, actividadJson)
        .then(() => Swal.fire({
            title: `¡Éxito!`,
            text: `Actividad creada satisfactoriamente`,
            icon: `success`,
            confirmButtonText: `Listo`,
            confirmButtonColor: `#198754`
        }))
        .catch(() => Swal.fire({
            title: `Error`,
            text: `Revise los datos e intente nuevamente.`,
            icon: `error`,
            confirmButtonText: `Listo`,
            confirmButtonColor: `#198754`
        }));
        console.log(actividadJson);
        
    };
    useEffect(() => {
        const fetchDependencias = async () => {
            const result = await axios.get("http://areco.gob.ar:9528/api/dependencia/all");
            setDependencias(result.data.data);
        };
        fetchDependencias();
    }, []);
    return (
        <Form>
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
            <Form.Group className="mt-3">
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
                <Form.Control type="text" placeholder="Ingrese nombre de la actividad" onChange={handleChangeActividad}></Form.Control>
            </Form.Group>
            <Col className="mt-3 mb-2">
                <Button variant="success" onClick={handleSubmit}>
                    Guardar
                </Button>
            </Col>
        </Form>
    );
};

export default FormDependencias;
