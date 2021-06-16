import {Table, Button, Form, Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'
import './TablaCohortes.css'
import {useState} from 'react';

export default ({cohortes}) => {
    const [show, setShow] = useState(false);
    const [idCohorte, setIdCohorte] = useState();
    const [nombreCohorte, setNombreCohorte] = useState("Nombre descriptivo");
    const [fechaInicioCohorte, setFechaInicioCohorte] = useState();
    const [fechaFinCohorte, setFechaFinCohorte] = useState();
    const handleClose = () => setShow(false)
    const handleSubmit = () => {}
    const handleNuevoCohorte = event => setIdCohorte(event.target.value) 
    const handleModificar = (cohorte) => {
        setShow(true);
        setIdCohorte(cohorte.idCohorte);
        setFechaInicioCohorte(cohorte.fechaInicio);
        setFechaFinCohorte(cohorte.fechaFin);
    }
    const handleBorrar = () => {
        Swal.fire({
            title: `¿Estás seguro?`,
            text: `Esta acción no puede deshacerse.`,
            icon: 'warning',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonText: 'Si',
        }).then((res) => {
            if(res.isConfirmed) {
                Swal.fire('Actividad eliminada.', '', 'success')
            }
        })
    }
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                  <Modal.Title>Modificar Cohorte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formIdCohorte" className="mt-2">
                        <Form.Label>ID Cohorte</Form.Label>
                        <Form.Control type="text" placeholder="ID Cohorte" value={idCohorte} onChange={handleNuevoCohorte}/>
                    </Form.Group>
                    <Form.Group controlId="formNombreCohorte" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={nombreCohorte} placeholder="Ingrese nuevo nombre" />
                    </Form.Group>
                    <Form.Group controlId="form" className="mt-2">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control type="date" value={fechaInicioCohorte}/>
                    </Form.Group>
                    <Form.Group controlId="form" className="mt-2">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control type="date"value={fechaFinCohorte}/>
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
        <Table variant="light"striped bordered hover responsive>

            <thead>
                <tr>
                    <th>ID Cohorte</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Acciones</th>

                </tr>
            </thead>

            <tbody>
                {cohortes.map((cohorte) => {
                    return (
                        <tr>
                            <td>
                                {cohorte.idCohorte}
                            </td>
                            <td>
                                {cohorte.fechaInicio}
                            </td>
                            <td>
                                {cohorte.fechaFin}
                            </td>
                            <td>
                                <Button onClick={() => {handleModificar(cohorte)}}>Modificar</Button>
                                <Button onClick={() => {handleBorrar(cohorte.idCohorte)}}>Borrar</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </>
    )
}
