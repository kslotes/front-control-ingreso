import React, { useState } from "react";
import {Container} from "react-bootstrap";
import "./Formulario.css";
import Ddjj from './Ddjj'
import DatosPersonales from "./DatosPersonales";

const Formulario = () => {
   
    return (
        <Container className="fondo">
              <DatosPersonales />
              <Ddjj />

        </Container>
    );
};

export default Formulario;
