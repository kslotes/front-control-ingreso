import {Modal, Button, Form} from 'react-bootstrap'
import {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {URL_BASE} from './Api.js'

export default ({show, idActividad}) => {

    const [nuevoNombre, setNuevoNombre] = useState();
    const [showModal, setShowModal] = useState(show);
    const handleClose = () => setShowModal(false);
    const handleSubmit = async () => {
        try{
           await axios.put(`${URL_BASE}/actividad/update/${idActividad}`, {nombre: nuevoNombre})
            Swal.fire('Actividad modicada.', `Nuevo nombre: ${nuevoNombre}`, 'success')
            setShowModal(false);
        }
        catch(err){
            Swal.fire('Error al modificar, intente nuevamente', '', 'error')
            console.error(err)
            setShowModal(false);
        }
    };

    const handleNuevoNombre = event => setNuevoNombre(event.target.value) 
    return (
        
        <Modal>
            <Modal.Header >
              <Modal.Title>Modificar Actividad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group controlId="formDependenciaActividad" className="mt-2">
                        <Form.Label>Nuevo nombre:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nuevo nombre" onChange={handleNuevoNombre}/>
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
    )
}
