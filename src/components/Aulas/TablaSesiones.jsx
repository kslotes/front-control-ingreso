import {Button, Table} from "react-bootstrap";
import {useState, useEffect} from "react";
import {API_GET_SESIONES} from '../Api.js'
import axios from "axios";
export default () => {
    const [sesiones, setSesiones] = useState([]);

    useEffect(() => {
        const fetchSesiones = async () => {
            try {
                const res = await axios.get(`${API_GET_SESIONES}`);
                setSesiones(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSesiones();
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
