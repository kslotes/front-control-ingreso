import {Table, Button, Modal, Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import {URL_BASE} from './Api.js'
import {useState} from 'react'
import axios from 'axios'

export default ({aulas}) => {

    const [show, setShow] = useState(false);
    const [nombreAula, setNombreAula] = useState();
    const [capacidadAula, setCapacidadAula] = useState();


    const [idAula, setIdAula] = useState();
    const [edificioAula, setEdificioAula] = useState();
    
    const handleCapacidadAula = event => setCapacidadAula(event.target.value);
    const handleNombreAula = event => setNombreAula(event.target.value);
    const handleClose = () => setShow(false);
    const handleModificar = (aula) => {
        setShow(true);
        setIdAula(aula.idAula);
        setCapacidadAula(aula.capacidadConAforo);
        setNombreAula(aula.nombre);
        setEdificioAula(aula.edificio);
    }
    const handleBorrar = (idAula) => {
    
        Swal.fire({
            title: `¿Estás seguro?`,
            text: `Esta acción no puede deshacerse.`,
            icon: 'warning',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonText: 'Si',
        }).then((res) => {
            if(res.isConfirmed) {
                axios.delete(`${URL_BASE}/aula/delete/${idAula}`)
                    .then(() => {Swal.fire('Aula eliminada', 'Actualice la pagina para ver los cambios', 'success')})
                    .catch((err) => {
                        Swal.fire('No se eliminó el aula', '', 'error')
                        console.error(err);
                    })
            }
        })
    }
    const handleSubmit = async () => {
        const JSONModifAula = {
            nombre: nombreAula,
            capacidadConAforo: capacidadAula,
            edificio: edificioAula
        }
        try {
            await axios.put(`${URL_BASE}/aula/update/${idAula}`, JSONModifAula);
            Swal.fire('Aula modificada!', '', 'success');
        }
        catch(err){
            console.error(err);
            Swal.fire('No se pudo modificar el aula', '', 'error');
        }
        finally{
            setShow(false);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                  <Modal.Title>Modificar Aula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formNombreAula" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nuevo nombre" value={nombreAula} onChange={handleNombreAula}/>
                    </Form.Group>
                    <Form.Group controlId="formCapacidadAula" className="mt-2">
                        <Form.Label>Capacidad</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese capacidad" value={capacidadAula} onChange={handleCapacidadAula}/>
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
            <Table variant="light" striped bordered responsive>
                 
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Sede</th>
                        <th>Edificio</th>
                        <th>Capacidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {aulas.map((aula) => {
                        return (
                            <tr key={aula.idAula}>
                                <td>{aula.nombre}</td>
                                <td>{aula.nombreSede}</td>
                                <td>{aula.nombreEdificio}</td>
                                <td>{aula.capacidadConAforo} personas</td>
                                <td>
                                    <Button style={{marginRight: "6px"}} onClick={() => {handleModificar(aula)}}>Modificar</Button>
                                    <Button onClick={() => {handleBorrar(aula.idAula)}}>Borrar</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
