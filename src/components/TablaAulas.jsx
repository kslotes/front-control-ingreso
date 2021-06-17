import {Table, Button, Modal, Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import {URL_BASE} from './Api.js'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ModalNuevaAula from './ModalNuevaAula'

export default ({aulas}) => {

    const handleModificar = () => {}
    const handleBorrar = () => {}
    return (
            <Table variant="light" striped bordered responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {aulas.map((aula) => {
                        return (
                            <tr>
                                <td>{aula.nombre}</td>
                                <td>{aula.capacidadConAforo} personas</td>
                                <td>
                                    <Button onClick={() => {handleModificar(aula)}}>Modificar</Button>
                                    <Button onClick={() => {handleBorrar(aula.idAula)}}>Borrar</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
    )
}
