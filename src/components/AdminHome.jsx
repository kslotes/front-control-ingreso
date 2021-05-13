import React from 'react';
import NavBar from './NavBar';
import {Container, Col} from 'react-bootstrap';
const AdminHome = () => {
  return (
    <Container fluid>
		<Col className="p-0 col-sidebar" md={2}>	
		  <NavBar/>
		</Col>
    </Container>
  )
}

export default AdminHome;
