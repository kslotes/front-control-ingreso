import NavBarTop from "./NavBarTop";
import {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import TablaSeguimientos from "./TablaSeguimientos";
import "./AdminSeguimientos.css";
import axios from "axios";


const AdminSeguimientos = () => {
      const [personas, setPersonas] = useState([])

      useEffect(() => {
            const fetchPersonas = async () => {
                  const result = await axios.get("http://areco.gob.ar:9528/api/persona/all");
                  setPersonas(result.data.data)
            }
            fetchPersonas();
      }, []);
    return (
        <Container fluid className="fondo">
            <NavBarTop />

            <Row className="seccion-container mt-4">
                  <Col>
                        <h2 className="texto-h2">Seguimientos de Personas</h2>
                  </Col>
                <TablaSeguimientos data={personas}/>
            </Row>
        </Container>
    );
};

export default AdminSeguimientos;
