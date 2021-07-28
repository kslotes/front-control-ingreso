import React, {useState, useEffect} from "react";
import {Table} from 'react-bootstrap'

// TODO: Cambiar metodo de array por pushear individualmente los horarios
// TODO : y traerlos de la BDD 

const TablaHorarios = ({horarios, showTable}) => {

    return (
        <Table striped bordered className="mt-2" hidden={!showTable}>
            <thead>
                <tr>
                    <th>Dia</th>
                    <th>Modalidad</th>
                    <th>Hora Inicio</th>
                    <th>Hora Fin</th>
                </tr>
            </thead>
            <tbody>
                {horarios.map((horario, i) => {
                    return (
                        <tr key={i}>
                            <td>{horario.dia}</td>
                            <td>{horario.modalidad}</td>
                            <td>{horario.horaInicio}</td>
                            <td>{horario.horaFin}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TablaHorarios;
