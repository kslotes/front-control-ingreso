import React, {useState, useEffect}from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import * as Api from '../Api'

const ModificarAula = ({show, handleClose, aula}) => {

    // * Parametros *
    const [, setShow] = useState();
    const [nuevoNombre, setNuevoNombre] = useState(aula.nombre);
    const [nuevaCapacidad, setNuevaCapacidad] = useState(aula.capacidadConAforo)

    // * Eventos *
    const handleNuevoNombre = (event) => setNuevoNombre(event.target.value)
    const handleNuevaCapacidad = (event) => setNuevaCapacidad(event.target.value)

    const handleSubmit = () => {
        Api.updateAula(aula.idAula, nuevoNombre, nuevaCapacidad);
        console.log(`Nuevo nombre: ${nuevoNombre}\n Nueva Capacidad: ${nuevaCapacidad}`)
    }

    // * useEffects *

    useEffect(() => {
        setShow(show)
    }, [show])
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                  <Modal.Title>Modificar Aula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formNombre" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" defaultValue={aula.nombre} onChange={handleNuevoNombre}/>
                    </Form.Group>
                    <Form.Group controlId="formEdificio" className="mt-2">
                        <Form.Label>Edificio</Form.Label>
                        <Form.Control type="text" defaultValue={aula.nombreEdificio} readOnly/>
                    </Form.Group>
                    <Form.Group controlId="formSede" className="mt-2">
                        <Form.Label>Sede</Form.Label>
                        <Form.Control type="text" defaultValue={aula.nombreSede} readOnly/>
                    </Form.Group>
                    <Form.Group controlId="formCapacidad" className="mt-2">
                        <Form.Label>Capacidad</Form.Label>
                        <Form.Control type="number" defaultValue={aula.capacidadConAforo} onChange={handleNuevaCapacidad}/>
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
        </div>
    )
}

export default ModificarAula
