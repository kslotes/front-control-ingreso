import NavBarTop from './NavBarTop.jsx'
import FormNuevaActividad from './FormNuevaActividad.jsx'
import {Form, Col, Row, Container} from 'react-bootstrap'
import './AdminCrearActividad.css'
import {useState, useEffect} from 'react'
import axios from 'axios'


const AdminCrearActividad = () => {
	const [sedes, setSedes] = useState([]);
	const [aulas, setAulas] = useState([]);
	const [edificios, setEdificios] = useState([])
	const handleSede = (event) => {
	  const fetchEdificio = async () => {
		const result = await axios.get(`http://areco.gob.ar:9528/api/edificio/sede/find/${event.target.value}`);
		setEdificios(result.data.data);
	  }
	  fetchEdificio();
	}
	const handleChangeEdificio = (event) => {
	  const fetchAula = async () => {
		const result = await axios.get(`http://areco.gob.ar:9528/api/aula/find/edificio/${event.target.value}`)
		setAulas(result.data.data)
	  }
	  fetchAula();
	}
	useEffect(() => {
	  const fetchSede = async () => {
		const result = await axios.get('http://areco.gob.ar:9528/api/sede/all');
		setSedes(result.data.data);

	  };
	  fetchSede();
	},[]);
	
	  return (
		<Container fluid className="fondo" >
		  <NavBarTop/>
			<Form>
			  
			  <Row sm={1} className="seccion-container mt-4">
					<h2 className="texto-h2">Creacion de Actividad</h2>
				<Col xs={12} sm={12} lg={6}>
						<Form.Group >
						  <Form.Label>Sede</Form.Label>
						  <Form.Control as="select" onChange={handleSede} >
							<option selected disabled>Seleccione una</option>
							{sedes.map((sede) => { return (<option value={sede.idSede} key={sede.idSede}>{sede.nombre}</option>)})}
							</Form.Control>
						</Form.Group>

						<Form.Group>
						  <Form.Label>Edificio</Form.Label>
						  <Form.Control as="select" onChange={handleChangeEdificio}>
							<option selected disabled>Seleccione una</option>
							{edificios.map((edificio) => { return (<option value={edificio.idEdificio} key={edificio.idEdificio}>{edificio.nombre}</option>)})}
						  </Form.Control>
						</Form.Group>

						<Form.Group>
						  <Form.Label>Aula</Form.Label>
						  <Form.Control as="select" onChange={handleSede}>
							<option selected disabled>Seleccione una</option>
							{aulas.map((aula) => { return (<option value={aula.idAula} key={aula.idAula}>{aula.nombre}</option>)})}
						  </Form.Control>
						</Form.Group>
					  <FormNuevaActividad/>
				</Col>
			  </Row>
			</Form>
	  </Container>
		)
}

export default AdminCrearActividad;
