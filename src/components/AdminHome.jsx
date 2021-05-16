import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import NavBarTop from './NavBarTop';
import './AdminHome.css'
const AdminHome = () => {
  return (
    <Container className="fondo">
		<Row>
		  <Col>
			<NavBarTop/>
		  </Col>
		</Row>
    </Container>
  )
}
export default AdminHome;
