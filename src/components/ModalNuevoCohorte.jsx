import {Form, Button, Modal} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {URL_BASE, API_GET_SEDES, API_GET_DEPENDENCIAS} from './Api.js'
import Swal from 'sweetalert2'

export default () => {

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

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleNombre = (event) => setNombre(event.target.value);
    
    const handleSelectSede = (event) => setSelectedSede(event.target.value);
    const handleSelectDependencia = async (event) => {
        try{
            const res = await axios.get(`${URL_BASE}/propuesta/find/dependencia/${event.target.value}`)
            setPropuestas(res.data.data);
        }
        catch(err) {
            console.error(err)
        }
    }

    const handleSelectPropuesta = async (event) => {
        try{
            const res = await axios.get(`${URL_BASE}/actividad/find/propuesta/${event.target.value}`)
            setActividades(res.data.data);
        }
        catch(err) {
            console.error(err);
        }
    }
    const handleSelectActividad = (event) => setSelectedActividad(event.target.value);
    const handleSelectedFechaInicio = (event) => {
        setSelectedFechaInicio(event.target.value); 
    }
    const handleSelectedFechaFin = (event) => setSelectedFechaFin(event.target.value); 
    const handleSubmit = async () => {
        console.log(`Sede: ${selectedSede}, Actividad: ${selectedActividad}, Nombre: ${nombre}, FechaInicio: ${selectedFechaInicio}, FechaFin: ${selectedFechaFin}`)
        try{
            await axios.post(`${URL_BASE}/cohorte/create/${selectedActividad}/${selectedSede}`, {nombreCohorte: nombre, fechaInicio: selectedFechaInicio, fechaFin: selectedFechaFin})
            Swal.fire('Cohorte Creado!', '', 'success')
        }
        catch(err) {
            console.error(err);
            Swal.fire('El cohorte no se pudo crear. Intente nuevamente', '', 'error')
        }
        finally {
            setShow(false)
        }
    }
    useEffect(() => {
        const fetchSedes = async () => {
            try{
                const res = await axios.get(API_GET_SEDES);
                setSedes(res.data.data)
            }
            catch(err) {
                console.error(err)
            }
        }
        const fetchDependencias = async () => {
            try{
                const res= await axios.get(API_GET_DEPENDENCIAS);
                setDependencias(res.data.data)
            }
            catch(err) {
                console.error(err)
            }
        }
        fetchSedes();
        fetchDependencias();
    }, [])

    return (
        <>
          <Button className="mb-3" variant="primary" onClick={handleShow}>
              Nuevo Cohorte
          </Button>
          <Modal show={show} onHide={handleClose}>
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

