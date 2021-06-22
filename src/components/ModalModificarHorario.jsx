import {Form, Button, Modal} from 'react-bootstrap'
import {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default ({showModal, horario}) => {
    const [show, setShow] = useState(showModal);

    const handleClose = event => setShow(false);
    const handleSubmit = () => {}
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                     <Modal.Title>Modificar Horario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formHorarioID" className="mt-2">
                        <Form.Label>ID Horario</Form.Label>
                        <Form.Control type="text" value={horario.idHorario}/>
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
    )
}
