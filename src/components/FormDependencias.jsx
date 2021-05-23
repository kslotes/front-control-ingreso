import {Form} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
const FormDependencias = () => {
    const [dependencias, setDependencias] = useState([]);
    const [propuestas, setPropuestas] = useState([]);

    const handleDependencia = (event) => {
        const fetchPropuestas = async () => {
            const result = await axios.get(`http://areco.gob.ar:9528/api/propuesta/find/dependencia/${event.target.value}`);
            setPropuestas(result.data.data);
        };
        fetchPropuestas();
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
            <Form.Group>
                <Form.Label>Propuesta</Form.Label>
                <Form.Control as="select">
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
            <Form.Group>
                <Form.Label>Actividad</Form.Label>
                <Form.Control type="text" placeholder="Ingrese nombre de la actividad"></Form.Control>
            </Form.Group>
            
        </Form>
    );
};

export default FormDependencias;
