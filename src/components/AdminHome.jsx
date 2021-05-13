import React from 'react';
import NavBar from './NavBar';
import {Container, Col, Row} from 'react-bootstrap';
import { withRouter } from "react-router";

const Dashboard = () => {
  return (
    <Container fluid className="fondo">
	  <Row>
		<Col xs={2} id="sidebar-wrapper">	
		  <NavBar/>
		</Col>
	  </Row>
    </Container>
  )
}
const AdminHome = withRouter(Dashboard);
export default AdminHome;
