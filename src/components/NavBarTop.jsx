import {Navbar, Nav, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import "./NavBarTop.css";
import {FaTasks} from "react-icons/fa";
import {AiOutlineBarChart} from "react-icons/ai";
const NavBarTop = () => {
    return (
        <Row>
            <Navbar className="navbar" expand="md">
                <Col xs={2} className="text-center ">
                    <Link id="nav-logo" to="/Admin">
                        UnSAdA
                    </Link>
                </Col>
                <Col xs={6} className="justify-content-around">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <NavbarCollapse>
                        <Nav onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
                            <Nav.Item>
                                <Link className="nav-link" to="/CrearActividad">
                                    Nueva Actividad
                                </Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Link className="nav-link" to="/ModificarActividad">
                                    Modificar Actividad
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/CrearCohorte">
                                    Nuevo Cohorte
                                </Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Link className="nav-link" to="/ModificarCohorte">
                                    Modificar Cohorte
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/AdminAulasYHorarios">
                                    Asignar Aulas y Horarios
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
