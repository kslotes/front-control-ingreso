import {Navbar, Nav, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import "./NavBarTop.css";
const NavBarTop = () => {
    return (
        <Row>
            <Navbar expand="md" variant="">
                <Col xs={2} className="text-center ">
                    <Link id="nav-logo" to="/Admin">
                        UnSAdA
                    </Link>
                </Col>
                <Col >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <NavbarCollapse>
                        <Nav>
                            <Nav.Item>
                                <Link className="nav-link" to="/AdministrarActividades">
                                    Administrar Actividades
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/AdministrarCohortes">
                                    Administrar Cohortes
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/AdministrarAulas">
                                    Administrar Aulas
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/AsignarAulas">
                                    Asignar Aulas
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/AdminSeguimientos">
                                    Seguimientos
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </NavbarCollapse>
                </Col>
            </Navbar>
        </Row>
    );
};

export default NavBarTop;
