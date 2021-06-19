import {Container, Col} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {URL_BASE, API_GET_SEDES, API_GET_HORARIOS} from './Api.js'
import NavBarTop from './NavBarTop'
import axios from 'axios'
import TablaHorarios from './TablaHorarios'

export default () => {
    const [sedes, setSedes] = useState([]);
    const [horarios, setHorarios] = useState([]);

    useEffect(() => {
        const fetchSedes = async () => {
            try{
                const res = await axios.get(`${API_GET_SEDES}`)
                setSedes(res.data.data);
            }
            catch(err){
                console.error(err);
            }
        }

        const fetchHorarios = async () => {
            try {
                const res = await axios.get(API_GET_HORARIOS);
                setHorarios(res.data.data);
            }
            catch(err){
                console.error(err);
            }
        }
        fetchHorarios();
        fetchSedes();
    }, [])
    return (
        <Container className="fondo" fluid>
            <NavBarTop/>
            <Col className="seccion-container">
                <h2 className="texto-h2">Administrador de Horarios</h2>
                <TablaHorarios horarios={horarios}/> 
            </Col>
        </Container>
    )
}
