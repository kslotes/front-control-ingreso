import {Modal, Button, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {API_GET_DEPENDENCIAS, URL_BASE} from './Api.js'
import axios from 'axios'
import Swal from 'sweetalert2'
export default () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const placeholder = "Seleccione una"

    const [dependencias, setDependencias] = useState([]);
    const [propuestas, setPropuestas] = useState([]);

    const [Actividad, setActividad] = useState();
    const [idPropuesta, setIdPropuesta] = useState();

    const handleSubmit = async () => {
        try{
            await axios.post(`${URL_BASE}/actividad/create-por-propuesta/${idPropuesta}`, {nombre: Actividad})
            Swal.fire('Actividad Creada!', '', 'success')
        }
        catch(err) {
            console.error(err);
            Swal.fire('La actividad no se pudo crear. Intente nuevamente', '', 'error')
        }
        finally {
            setShow(false)
        }
    }

    const handleSelectDependencia = (event) => {
        const fetchPropuestas = async () => {
            const result = await axios.get(`${URL_BASE}/propuesta/find/dependencia/${event.target.value}`)
            setPropuestas(result.data.data)
        }
        fetchPropuestas();
    }

    const handleSelectPropuesta = event => setIdPropuesta(event.target.value);
    const handleActividad = event => setActividad(event.target.value);

    useEffect(() => {
        axios.get(API_GET_DEPENDENCIAS)
            .then(res => {
                setDependencias(res.data.data);
            })
    }, [])
    return (
        <>
          <Button className="mb-3" variant="primary" onClick={handleShow}>
              Nueva Actividad
          </Button>

          <Modal show={show} onHide={handleClose}>
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
                        <Form.Control type="text" placeholder="Ingrese nombre" required autoComplete="off"onChange={handleActividad}/>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
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


