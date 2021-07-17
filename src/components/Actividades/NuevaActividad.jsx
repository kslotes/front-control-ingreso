import {Modal, Button, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import * as Api from '../Api.js'
import axios from 'axios'
import Swal from 'sweetalert2'
export default (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const placeholder = "Seleccione una"

    const [dependencias, setDependencias] = useState([]);
    const [propuestas, setPropuestas] = useState([]);

    const [nombreActividad, setNombreActividad] = useState();
    const [idPropuesta, setIdPropuesta] = useState();

    const handleSubmit = async () => {
        Api.crearActividad(idPropuesta, nombreActividad)
    }

    const handleSelectDependencia = (event) => {
        Api.getPropuestasByDependencia(event.target.value)
            .then(res => setPropuestas(res))
    }

    const handleSelectPropuesta = event => setIdPropuesta(event.target.value);
    const handleActividad = event => setNombreActividad(event.target.value);

    useEffect(() => {
        Api.getDependencias()
            .then(res => {
                setDependencias(res);
            })
    }, [])

    useEffect(() => {
        setShow(props.showModal);
    }, [props.showModal]);
    return (
        <>
          <Modal show={show} onHide={props.handleHide}>
            <Modal.Header >
              <Modal.Title>Crear nueva actividad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group controlId="formDependenciaActividad" className="mt-2">
                        <Form.Label>Dependencia </Form.Label>
                        <Form.Control onChange={handleSelectDependencia} defaultValue={placeholder} as="select" placeholder="Seleccione Dependencia">
                            <option disabled value={placeholder}>{placeholder}</option>
                            {dependencias.map(dependencia => <option key={dependencia.idDependencia} value={dependencia.idDependencia}>{dependencia.nombre}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPropuestaDependencia"className="mt-2">
                        <Form.Label>Propuesta </Form.Label>
                        <Form.Control onChange={handleSelectPropuesta} defaultValue={placeholder} as="select">
                            <option disabled value={placeholder}>{placeholder}</option>
                            {propuestas.map(propuesta => <option key={propuesta.idPropuesta} value={propuesta.idPropuesta}>{propuesta.nombre}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formActividadPropuesta"className="mt-2">
                        <Form.Label>Actividad </Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nombre de la actividad" required autoComplete="off"onChange={handleActividad}/>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                  Cerrar
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                  Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
        </>
);
}


