import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import "./TablaSeguimientos.css";
import {Button, Form, Row, Col} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

const indication = "Cargando Datos...";

const columns = [
    {
        dataField: "idPersona",
        text: "ID Persona",
        sort: true,
        hidden: true,
    },
    {
        dataField: "nombre",
        text: "Nombre y Apellido",
        sort: true,
        filter: textFilter({
            placeholder: "Ingrese nombre o apellido",
        }),
    },
    {
        dataField: "dni",
        text: "Documento de Identidad",
        sort: true,
        filter: textFilter({
            placeholder: "Ingrese DNI",
        }),
    },
    {
        dataField: "correoElectronico",
        text: "Correo Electronico",
        sort: true,
        hidden: true,
    },
    {
        dataField: "direccion",
        text: "Direccion",
        hidden: true,
    },
    {
        dataField: "telefono",
        text: "Telefono",
    },
];
var sesionPresencial;
var contactosEstrechos;
var idSeguimiento;
var fechaInicio;
var fechaFin;

const handleSeguimiento = () => {
    const fetchSesionPresencial = async () => {
        const result = await axios.get(`http://areco.gob.ar:9528/api/sesionpresencial/find/persona/${idSeguimiento}`);
        sesionPresencial = result.data.data;
        console.log(result.data.data);
    };
    fetchSesionPresencial();
    const fetchContactosEstrechos = async () => {
        const result = await axios.get(`http://areco.gob.ar:9528/api`);
        contactosEstrechos = result.data.data;
        console.log(contactosEstrechos);
    };
};

const handleFechaInicio = (e) => {
    console.log(e.target.value);
};

const handleFechaFin = (e) => {
    console.log(e.target.value);
};
const expandRow = {
    className: "expand",
    renderer: (row) => (
        <div>
            {(idSeguimiento = row.idPersona)}
            {console.log(`ID Seguimiento: ${idSeguimiento}`)}

            <p>
                <strong>Buscar contactos estrechos:</strong>
            </p>
            <Form>
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <Form.Text>Fecha de Inicio</Form.Text>
                        <Form.Control onChange={handleFechaInicio} type="date" />
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Form.Text>Fecha de Fin</Form.Text>
                        <Form.Control onChange={handleFechaFin} type="date" />
                    </Col>
                </Row>
            </Form>
            <Button className="mt-3" variant="info" onClick={handleSeguimiento}>
                Realizar Seguimiento
            </Button>
            {/* {sesionPresencial.map((sesion, i) => {
                return (
                    <div>
                        <Button>
                            Sesion {sesion.idSesionPresencial}. ${sesion.fecha}
                        </Button>
                    </div>
                );
            })} */}
        </div>
    ),
};

const TablaSeguimientos = ({data}) => {
    //TODO: useState para persona a realizar seguimiento
    // Renderizar Sesiones
    return (
        <BootstrapTable
            keyField="idPersona"
            data={data}
            columns={columns}
            headerClasses="headers"
            rowClasses="rows"
            noDataIndication={indication}
            filter={filterFactory()}
            bootstrap4={true}
            expandRow={expandRow}
        />
    );
};
export default TablaSeguimientos;
