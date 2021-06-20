import {Form, Modal, Button} from 'react-bootstrap'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {URL_BASE, API_GET_DEPENDENCIAS} from './Api.js'
import Swal from 'sweetalert2'

export default ({showModal}) => {
    
    const DIAS_SEMANA = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const MODALIDADES = ["Teórico", "Práctico", "Teórico-Práctico", "Actividad Extracurricular"];
    
    const [dependencias,setDependencias] = useState([]);
    const [propuestas, setPropuestas] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [idActividad, setIdActividad] = useState();
    const [cohortes, setCohortes] = useState([]);

    const handleDependencia = async (event) => {
        console.log(event.target.value);
        try{
            const res = await axios.get(`${URL_BASE}/propuesta/find/dependencia/${event.target.value}`)
            setPropuestas(res.data.data)
        }
        catch(err){
            console.error(err)
        }
    }
    const handlePropuesta = async (event) => {
        try {
            const res = await axios.get(`${URL_BASE}/actividad/find/propuesta/${event.target.value}`)
            setActividades(res.data.data)
        }
        catch(err){
            console.error(err)
        }
    }

    const handleActividad = async (event) => {
        try {
            const res = await axios.get(`${URL_BASE}/actividad/cohortes/${event.target.value}`)
            setCohortes(res.data.data);
        }
        catch(err){
            console.error(err)
        }
    }

    const [show, setShow] = useState(showModal);
    const [idCohorte, setIdCohorte] = useState();
    const [diaHorario, setDiaHorario] = useState();
    const [modalidad, setModalidad] = useState();
    const [horaInicio, setHoraInicio] = useState();
    const [horaFin, setHoraFin] = useState();

    const handleHoraInicio = event => setHoraInicio(event.target.value);
    const handleHoraFin = event => setHoraFin(event.target.value);
    const handleModalidad = event => setModalidad(event.target.value);
    const handleDia = event => setDiaHorario(event.target.value);
    const handleCohorte = event => setIdCohorte(event.target.value)
    const handleClose = () => setShow(false);
    const handleSubmit = async () => {
        const JSONHorario = {
            idCohorte: idCohorte,
            dia: diaHorario,
            horaInicio: horaInicio,
            horaFin: horaFin,
            nombre: modalidad
        }
        try {
            await axios.post(``, JSONHorario)
            Swal.fire('Horario creado!', '', 'success')
        }
        catch(err) {
            Swal.fire('No se pudo crear el horario', '', 'error')
            console.error(err);
        }
        finally {
            setShow(false);
        }
    }
    useEffect(() => {
        const fetchDependencias = async () => {
            try{
                const res = await axios.get(`${API_GET_DEPENDENCIAS}`)
                setDependencias(res.data.data);
            }
            catch(err){
                console.error(err);
            }
        }
        fetchDependencias();
    }, [])
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Nuevo Horario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formDependenciasHorario" className="mt-2">
                        <Form.Label>Dependencia</Form.Label>
                        <Form.Control as="select" onChange={handleDependencia} defaultValue="Seleccione una" autoComplete="off" >
                            <option disabled>Seleccione una</option>
                            {dependencias ? dependencias.map((d) => <option key={d.idDependencia} value={d.idDependencia}>{d.nombre}</option>) : <option>Sin dependencias</option>}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPropuestaHorario" className="mt-2">
                        <Form.Label>Propuesta</Form.Label>
                        <Form.Control as="select" onChange={handlePropuesta} defaultValue="Seleccione una" autoComplete="off">
                            <option disabled>Seleccione una</option>
                            {propuestas ? propuestas.map((p) => <option key={p.idPropuesta} value={p.idPropuesta}>{p.nombre}</option>) :<option>Sin propuestas</option>}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formActividadHorario" className="mt-2">
                        <Form.Label>Actividad</Form.Label>
                        <Form.Control as="select" onChange={handleActividad} defaultValue="Seleccione una" autoComplete="off" >
                            <option disabled>Seleccione una</option>
                            {actividades ? actividades.map((a) => <option value={a.idActividad} key={a.idActividad}>{a.nombre}</option>) : "Sin actividades"}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCohorteHorario" className="mt-2">
                        <Form.Label>Cohorte</Form.Label>
                        <Form.Control as="select" onChange={handleCohorte} defaultValue="Seleccione un cohorte" autoComplete="off" placeholder="Ingrese cohorte">
                            <option disabled>Seleccione un cohorte</option>
                            {cohortes ? cohortes.map(c => <option key={c.idCohorte} value={c.idCohorte}>Cohorte: {c.idCohorte}, {c.fechaInicio} | {c.fechaFin}</option>) : "Sin Cohortes"}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDiaHorario" className="mt-2">
                        <Form.Label>Dia</Form.Label>
                        <Form.Control as="select" onChange={handleDia} autoComplete="off" defaultValue="Seleccione un dia" placeholder="">
                            <option disabled>Seleccione una</option>
                            {DIAS_SEMANA.map((dia) => <option key={dia} value={dia}>{dia}</option>)}
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
                            {MODALIDADES.map((mod) => <option key={mod} value={mod}>{mod}</option>)}
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

