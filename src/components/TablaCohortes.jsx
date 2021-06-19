import {Table, Button, Form, Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'
import './TablaCohortes.css'
import {useState} from 'react';
import axios from 'axios'
import {URL_BASE} from './Api.js'

export default ({cohortes}) => {
    const [show, setShow] = useState(false);
    const [idCohorte, setIdCohorte] = useState();
    const [nombreCohorte, setNombreCohorte] = useState("Nombre descriptivo");
    const [fechaInicioCohorte, setFechaInicioCohorte] = useState();
    const [fechaFinCohorte, setFechaFinCohorte] = useState();

    const handleClose = () => setShow(false)
    const handleSubmitModificar = async () => {
        try{
            await axios.put(`${URL_BASE}/cohorte/update/${idCohorte}`, {fechaInicio: fechaInicioCohorte, fechaFin: fechaFinCohorte})
            Swal.fire('Cohorte modificado', '', 'success')
        }
        catch(err) {
            Swal.fire('No se modificó el cohorte', '', 'error')
            console.error(err);
        }
        finally{
            setShow(false);
        }
    }


    const handleNombreCohorte = event => setNombreCohorte(event.target.value);
    const handleFechaInicioCohorte = event => setFechaInicioCohorte(event.target.value);
    const handleFechaFinCohorte = event => setFechaFinCohorte(event.target.value);

    const handleModificar = (cohorte) => {
        setShow(true);
        setNombreCohorte(cohorte.nombreCohorte);
        setIdCohorte(cohorte.idCohorte);
        setFechaInicioCohorte(cohorte.fechaInicio);
        setFechaFinCohorte(cohorte.fechaFin);
    }
    const handleBorrar = (idCohorte) => {
        Swal.fire({
            title: `¿Estás seguro?`,
            text: `Esta acción no puede deshacerse.`,
            icon: 'warning',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonText: 'Si',
        }).then((res) => {
            if(res.isConfirmed) {
                axios.delete(`${URL_BASE}/cohorte/delete/${idCohorte}`)
                    .then(() => Swal.fire('Cohorte eliminado', '', 'success'))
                    .catch((err) => {
                        Swal.fire('No se eliminó el cohorte', '', 'error')
                        console.error(err)
                    });
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
                        <Form.Control type="text" placeholder="ID Cohorte" value={idCohorte} />
                    </Form.Group>
                    <Form.Group controlId="formNombreCohorte" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={nombreCohorte} placeholder="Ingrese nuevo nombre" onChange={handleNombreCohorte} autoComplete="off" />
                    </Form.Group>
                    <Form.Group controlId="form" className="mt-2">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control type="date" value={fechaInicioCohorte} onChange={handleFechaInicioCohorte}/>
                    </Form.Group>
                    <Form.Group controlId="form" className="mt-2">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control type="date"value={fechaFinCohorte} onChange={handleFechaFinCohorte}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Cerrar
                  </Button>
                  <Button variant="primary" onClick={handleSubmitModificar}>
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
