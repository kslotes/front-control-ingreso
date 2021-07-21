import React, {useState, useEffect} from "react";
import {Modal, Form, Button} from "react-bootstrap";
import * as Api from "../Api.js";

const ModificarCohorte = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [cohorte] = useState(props.cohorte);
    const [sedes, setSedes] = useState([]);
    const [nuevoNombre, setNuevoNombre] = useState()
    const [nuevaFechaInicio, setNuevaFechaInicio] = useState()
    const [nuevaFechaFin, setNuevaFechaFin] = useState()

    const handleNuevoNombre = (event) => setNuevoNombre(event.target.value);
    const handleNuevaFechaInicio = (event) => setNuevaFechaInicio(event.target.value);
    const handleNuevaFechaFin = (event) => setNuevaFechaFin(event.target.value);

    const handleSubmit = () => {};
    useEffect(() => {
        setShowModal(props.showModal);
    }, [props.showModal]);
    useEffect(() => {
        Api.getSedes().then((res) => {
            setSedes(res)
        })
    }, [])
    return (
        <div>
            <Modal show={showModal} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Modificar Cohorte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formNombreCohorte" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" defaultValue={cohorte.nombreCohorte} onChange={handleNuevoNombre} autoComplete="off" />
                    </Form.Group>
                    <Form.Group controlId="form" className="mt-2">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control type="date" defaultValue={cohorte.fechaInicio} onChange={handleNuevaFechaInicio} />
                    </Form.Group>
                    <Form.Group controlId="form" className="mt-2">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control type="date" defaultValue={cohorte.fechaFin} onChange={handleNuevaFechaFin} />
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
        </div>
    );
};

export default ModificarCohorte;
