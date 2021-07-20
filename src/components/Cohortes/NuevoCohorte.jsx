import {Form, Button, Modal, Table} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {URL_BASE, API_GET_SEDES, API_GET_DEPENDENCIAS} from '../Api.js'
import Swal from 'sweetalert2'

export default (props) => {

    const DIAS_SEMANA = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    const MODALIDADES = ["Practico", "Teorico", "Teorico-Practico", "Actividad Extracurricular"]

    let horarios = [];
    const [showTable, setShowTable] = useState(false);
    const [horariosCohorte, setHorariosCohorte] = useState([]);
    const [show, setShow] = useState(false);
    const placeholder = "Seleccione una"
    const [nombre, setNombre] = useState();
    const [sedes, setSedes] = useState([]);
    const [selectedSede, setSelectedSede] = useState();
    const [dependencias, setDependencias] = useState([]);
    const [propuestas, setPropuestas] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [selectedActividad, setSelectedActividad] = useState();
    const [selectedFechaInicio, setSelectedFechaInicio] = useState();
    const [selectedFechaFin, setSelectedFechaFin] = useState();

    const [diaCohorte, setDiaCohorte] = useState();
    const [horaInicioCohorte, setHoraInicioCohorte] = useState();
    const [horaFinCohorte, setHoraFinCohorte] = useState();
    const [modalidad, setModalidad] = useState();
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleNombre = (event) => setNombre(event.target.value);
    
    const handleModalidad = event => setModalidad(event.target.value);
    const handleHoraInicioCohorte = event => setHoraInicioCohorte(event.target.value);
    const handleHoraFinCohorte = event => setHoraFinCohorte(event.target.value);
    const handleDiaCohorte = event => setDiaCohorte(event.target.value);

    const handleAsignar = async () => {
    }
    const handleSelectSede = (event) => setSelectedSede(event.target.value);
    const handleSelectDependencia = async (event) => {
    
    }

    const handleSelectPropuesta = async (event) => {
       
    }
    const handleSelectActividad = (event) => setSelectedActividad(event.target.value);
    const handleSelectedFechaInicio = (event) => {
        setSelectedFechaInicio(event.target.value); 
    }
    const handleSelectedFechaFin = (event) => setSelectedFechaFin(event.target.value); 
    const handleSubmit = async () => {
    }

    useEffect(() => {
        setShow(props.showModal);
    }, [props.showModal]);
    return (
        <>
          <Modal show={show} onHide={props.handleHide}>
            <Modal.Header >
              <Modal.Title>Crear Cohorte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group controlId="formNombreCohorte" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={handleNombre} autoComplete="off" type="text" placeholder="Ingrese nombre" required/>
                    </Form.Group>
                    <Form.Group controlId="formSedeCohorte"className="mt-2">
                        <Form.Label>Sede</Form.Label>
                        <Form.Control onChange={handleSelectSede} defaultValue={placeholder} as="select">
                            <option disabled value={placeholder}>{placeholder}</option>
                            {sedes.map(sede => <option key={sede.idSede} value={sede.idSede}>{sede.nombre}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDependenciaCohorte"className="mt-2">
                        <Form.Label>Dependencia: </Form.Label>
                        <Form.Control as="select" defaultValue={placeholder} onChange={handleSelectDependencia}>
                            <option disabled value={placeholder}>{placeholder}</option>
                            {dependencias.map(dependencia => <option key={dependencia.idDependencia} value={dependencia.idDependencia}>{dependencia.nombre}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPropuestaCohorte"className="mt-2">
                        <Form.Label>Propuesta </Form.Label>
                        <Form.Control as="select" defaultValue={placeholder} onChange={handleSelectPropuesta}>
                            <option disabled value={placeholder}>{placeholder}</option>
                            {propuestas.map(propuesta => <option key={propuesta.idPropuesta} value={propuesta.idPropuesta}>{propuesta.nombre}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formActividadCohorte"className="mt-2">
                        <Form.Label>Actividad </Form.Label>
                        <Form.Control as="select" defaultValue={placeholder} onChange={handleSelectActividad}>
                            <option disabled value={placeholder}>{placeholder}</option>
                            {actividades.map(actividad => <option key={actividad.idActividad} value={actividad.idActividad}>{actividad.nombre}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFechaInicioCohorte"className="mt-2">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control type="date"  onChange={handleSelectedFechaInicio}/>
                    </Form.Group>

                    <Form.Group controlId="formFechaFinCohorte"className="mt-2">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control type="date"  onChange={handleSelectedFechaFin}/>
                    </Form.Group>
                </Modal.Body>
                    <Modal.Header>
                        <Modal.Title>Asignar Dias y Horarios</Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formDiaCohorte" className="mt-2">
                        <Form.Label>Dia</Form.Label>
                        <Form.Control as="select" defaultValue="Seleccione uno" onChange={handleDiaCohorte}>
                            <option disabled>Seleccione uno</option>
                            {DIAS_SEMANA.map((d) => <option key={d} value={d}>{d}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formHoraInicioCohorte" className="mt-2">
                        <Form.Label>Hora Inicio</Form.Label>
                        <Form.Control type="time"value={horaInicioCohorte} onChange={handleHoraInicioCohorte}/>
                    </Form.Group>
                    <Form.Group controlId="formHoraFinCohorte" className="mt-2">
                        <Form.Label>Hora Fin</Form.Label>
                        <Form.Control type="time"value={horaFinCohorte} onChange={handleHoraFinCohorte}/>
                    </Form.Group>
                    <Form.Group controlId="formModalidadCohorte" className="mt-2">
                        <Form.Label>Modalidad</Form.Label>
                        <Form.Control as="select" onChange={handleModalidad} defaultValue="Seleccione una">
                            <option disabled>Seleccione una</option>
                            {MODALIDADES.map((m) => <option key={m} value={m}>{m}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button className="mt-3" variant="primary" onClick={handleAsignar}>Asignar</Button>
                    <Table striped bordered className="mt-2" hidden={!showTable}>
                        <thead>
                            <tr>
                                <th>Dia</th>
                                <th>Modalidad</th>
                                <th>Hora Inicio</th>
                                <th>Hora Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horarios.map((horario) => {
                                return (
                                    <tr>
                                        <td>{horario.diaCohorte}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
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
        </>
    )
}

