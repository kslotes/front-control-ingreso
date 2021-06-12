import {Modal, Button, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {API_GET_DEPENDENCIAS, URL_BASE} from './Api.js'
import axios from 'axios'
import './ModalNuevaActividad.css'
export default () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [dependencias, setDependencias] = useState([]);
    const [propuestas, setPropuestas] = useState([]);


    const handleSelectDependencia = (event) => {
        axios.get(`${URL_BASE}`)
    }
    useEffect(() => {
        axios.get(API_GET_DEPENDENCIAS)
            .then(res => {
                setDependencias(res.data.data);
            })
    }, [])
    return (
        <>
          <Button variant="primary" onClick={handleShow}>
              Nueva Actividad
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header >
              <Modal.Title>Crear nueva actividad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDependenciaActividad">
                        <Form.Label>Dependencia </Form.Label>
                        <Form.Control onChange={handleSelectDependencia} as="select" placeholder="Seleccione Dependencia">
                            {dependencias.map(dependencia => <option>{dependencia.nombre}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
);
}


