import NavBarTop from "../NavBar/NavBarTop";
import {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import TablaSeguimientos2 from "./TablaSeguimientos2";
import * as Api from "../Api"
import axios from "axios";


const AdminSeguimientos = () => {
      const [personas, setPersonas] = useState([])

      useEffect(() => {
            Api.getPersonas().then(res => {
                  setPersonas(res)
            })
      }, []);
    return (
        <Container fluid className="fondo">
            <NavBarTop />

            <Row className="seccion-container mt-4">
                  <Col>
                        <h2 className="texto-h2">Seguimientos de Personas</h2>
                  </Col>
                <TablaSeguimientos2 />
            </Row>
        </Container>
    );
};

export default AdminSeguimientos;
