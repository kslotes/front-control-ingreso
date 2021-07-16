import {Form, Button, Modal} from 'react-bootstrap'
import {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default ({showModal, horario}) => {
    const [show, setShow] = useState(showModal);

    const handleDependencia = () => {}
    const handlePropuesta = () => {}
    const handleActividad = () => {}
    const handleCohorte = () => {}
    const handleDia = () => {}
    const handleHoraInicio = () => {}
    const handleHoraFin = () => {}
    const handleModalidad = () => {}

    const handleClose = event => setShow(false);
    const handleSubmit = () => {}
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Modificar Horario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formCohorteHorario" className="mt-2">
                        <Form.Label>Cohorte</Form.Label>
                        <Form.Control type="number" onChange={handleCohorte} value={"4"} autoComplete="off" placeholder="Ingrese cohorte"/>
                    </Form.Group>
                    <Form.Group controlId="formDiaHorario" className="mt-2">
                        <Form.Label>Dia</Form.Label>
                        <Form.Control as="select" onChange={handleDia} autoComplete="off" defaultValue="Seleccione un dia" placeholder="">
                            <option disabled>Seleccione un dia</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formHoraInicio" className="mt-2">
                        <Form.Label>Hora Inicio</Form.Label>
                        <Form.Control type="time" onChange={handleHoraInicio} autoComplete="off" placeholder=""/>
                    </Form.Group>
                    <Form.Group controlId="formHoraFin" className="mt-2">
                        <Form.Label>Hora Fin</Form.Label>
                        <Form.Control type="time" onChange={handleHoraFin} autoComplete="off" placeholder=""/>
                    </Form.Group>
                    <Form.Group controlId="formModalidad" className="mt-2">
                        <Form.Label>Modalidad</Form.Label>
                        <Form.Control as="select" onChange={handleModalidad} defaultValue="Seleccione una" autoComplete="off" placeholder="">
                            <option disabled>Seleccione una</option>
                        </Form.Control>
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
