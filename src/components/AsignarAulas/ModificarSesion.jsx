import React from "react";
import {useState, useEffect} from "react";
import {Modal, Form, Button} from "react-bootstrap";
import * as Api from "../Api.js";


const ModificarSesion = ({showModal, handleClose, sesion}) => {
    
    const [show, setShow] = useState();
    const [fecha, setFecha] = useState();

    const handleFecha = event => setFecha(event.target.value);
    const handleSubmit = () => {
        Api.updateSesion(sesion.idSesionPresencial, fecha)
    }

    useEffect(() => {
        setShow(showModal);
    }, [showModal]);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modificar Clase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formActividad" className="mt-2">
                        <Form.Label>Actividad</Form.Label>
                        <Form.Control type="text" defaultValue={sesion.nombreActividad} readOnly/>
                    </Form.Group>
                    <Form.Group controlId="formFecha" className="mt-2">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" defaultValue={sesion.fecha} onChange={handleFecha} />
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
    );
};

export default ModificarSesion;