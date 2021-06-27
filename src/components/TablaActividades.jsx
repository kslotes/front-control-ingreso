import {Table, Button, Modal, Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import {URL_BASE} from './Api.js'
import {useState} from 'react'
import axios from 'axios'
export default ({actividades}) => {

    const [show, setShow] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState();
    const [idActividad, setIdActividad] = useState();
    const [nombreActividad, setNombreActividad] = useState();
    const handleModificar = (actividad) => {
        setShow(true);
        setIdActividad(actividad.idActividad);
        setNombreActividad(actividad.nombreActividad);
    }
    const handleClose = () => setShow(false);
    const handleSubmit = async () => {
        try{
            await axios.put(`${URL_BASE}/actividad/update/${idActividad}`, {nombre: nuevoNombre})
            Swal.fire('Actividad modicada.', `Nuevo nombre: ${nuevoNombre}`, 'success')
            setShow(false);
        }
        catch(err){
            Swal.fire('Error al modificar, intente nuevamente', '', 'error')
            console.error(err)
            setShow(false);
        }
    };
    const handleNuevoNombre = event => setNuevoNombre(event.target.value) 
    const handleBorrar = (idActividad) => {
    
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
                axios.delete(`${URL_BASE}/actividad/delete/${idActividad}`)
            }
        })
    }
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                  <Modal.Title>Modificar Actividad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formDependenciaActividad" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nuevo nombre" defaultValue={nombreActividad} onChange={handleNuevoNombre}/>
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
            <Table key={actividades} variant="light" striped bordered responsive>
                <thead>
                    <tr>
                        <th>Nombre Actividad</th>
                        <th>Propuesta</th>
                        <th>Dependencia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {actividades.map((actividad) => {
                        return (
                            <tr key={actividad.idActividad}>
                                <td>
                                    {actividad.nombreActividad}
                                </td>

                                <td>
                                    {actividad.nombrePropuesta}
                                </td>
                                <td>
                                    {actividad.nombreDependencia}
                                </td>
                                <td>
                                    <Button style={{marginRight: "6px"}} onClick={() => {handleModificar(actividad)}}>Modificar</Button>
                                    <Button onClick={() => {handleBorrar(actividad.idActividad)}}>Borrar</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
