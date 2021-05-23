import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import "./TablaSeguimientos.css";
import {Button, Form, Row, Col} from "react-bootstrap";
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
        hidden: true,
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
const handleSeguimiento = () => {
      
};
const expandRow = {
    className: "expand",
    renderer: (row) => (
        <div>
              <p><strong>Buscar contactos estrechos:</strong></p>
            <Form>
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <Form.Text>Fecha de Inicio</Form.Text>
                        <Form.Control type="date" />
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Form.Text>Fecha de Fin</Form.Text>
                        <Form.Control type="date" />
                    </Col>
                </Row>
            </Form>
            <Button className="mt-3" variant="info" onClick={handleSeguimiento}>
                Realizar Seguimiento
            </Button>
        </div>
    ),
};
const TablaSeguimientos = ({data}) => {
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
