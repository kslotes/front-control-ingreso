import {Button, Table} from "react-bootstrap";
import {useState, useEffect} from "react";
import * as Api from "../Api"
export default () => {
    const [sesiones, setSesiones] = useState([]);

    useEffect(() => {
        Api.getSesiones().then(data => {
            setSesiones(data);
        })
    }, []);
    return (
        <Table variant="light" striped bordered responsive>
            <thead>
                <tr>
                    <th>idSesion</th>
                    <th>Fecha</th>

                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sesiones.map((ses) => {
                    return (
                        <tr>
                            <td>{ses.idSesionPresencial}</td>
                            <td>{ses.fecha.slice(0, 10)}</td>

                            <td>
                                <Button style={{marginRight: "6px"}}>Modificar</Button>
                                <Button>Borrar</Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
