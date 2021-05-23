import React from "react";
import {Container} from "react-bootstrap";
import NavBarTop from "./NavBarTop";
import "./AdminHome.css";
const AdminHome = () => {
    return (
        <Container fluid className="fondo">
            <NavBarTop />
        </Container>
    );
};
export default AdminHome;
