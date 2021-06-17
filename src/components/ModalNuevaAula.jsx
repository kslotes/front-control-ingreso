import {Modal, Button, Form} from 'react-bootstrap' 
import axios from 'axios'
import {URL_BASE, API_GET_SEDES} from './Api.js'
import Swal from 'sweetalert2'
import {useState, useEffect} from 'react'

export default () => {
    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState();
    const [capacidad, setCapacidad] = useState();
    const [edificios, setEdificios] = useState([]);
    const [idSede, setIdSede] = useState();
    const [idEdificio, setIdEdificio] = useState();
    const [sedes, setSedes] = useState([]);
    
    const handleSede = async (event) => {
        setIdSede(event.target.value)
        try{
            const res = await axios.get(`${URL_BASE}/edificio/sede/find/${event.target.value}`)
            setEdificios(res.data.data);
        }
        catch(err){
            console.error(err)
        }
    }
        
    const handleEdificio = event => setIdEdificio(event.target.value);
    const handleCapacidad = (event) => setCapacidad(event.target.value);
    const handleNombre = (event) => setNombre(event.target.value);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSubmit = () => {}
    
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
        fetchSedes();
    }, [])

    return (
        <>
          <Button className="mb-3" variant="primary" onClick={handleShow}>
              Nueva Aula
          </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                     <Modal.Title>Nueva Aula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formAulaNombre" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" onChange={handleNombre} placeholder="Ingrese nombre"/>
                    </Form.Group>
                    <Form.Group controlId="formAulaCapacidad" className="mt-2">
                        <Form.Label>Capacidad</Form.Label>
                        <Form.Control type="text" onChange={handleCapacidad} placeholder="Ingrese capacidad del aula"/>
                    </Form.Group>
                    <Form.Group controlId="formSedeAula" className="mt-2">
                        <Form.Label>Sede</Form.Label>
                        <Form.Control as="select" onChange={handleSede} defaultValue={"Seleccione una"}>
                            <option selected disabled>Seleccione una</option>
                            {sedes.map(sede => <option key={sede.idSede} value={sede.idSede}>{sede.nombre}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEdificioAula" className="mt-2">
                        <Form.Label>Edificio</Form.Label>
                        <Form.Control as="select" onChange={handleEdificio} defaultValue={"Seleccione uno"}>
                            <option selected disabled>Seleccione uno</option>
                            {edificios.map(edificio => <option key={edificio.idEdificio} value={edificio.idEdificio}>{edificio.nombre}</option>)}
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
