import {Table, Button} from 'react-bootstrap'
import {useState} from 'react'

export default ({horarios}) => {
    
    const [show, setShow] = useState(false);

    const handleModificar = () => {
        setShow(true);
    }

    const handleBorrar = () => {}
    return (
        <>
            <Table key={horarios} variant="light" striped bordered responsive>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Pertenece a cursada:</th>
                        <th>Dia</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        <th>Modalidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {horarios.map((horario) => {
                        return (
                            <tr key={horario.idHorario}>
                                <td>
                                    {horario.idHorario}
                                </td>
                                <td>
                                </td>
                                <td>
                                    {horario.dia}
                                </td>

                                <td>
                                    {horario.horaInicio}
                                </td>
                                <td>
                                    {horario.horaFin}
                                </td>
                                <td>
                                    {horario.nombre}
                                </td>
                                <td>
                                    <Button onClick={() => {handleModificar(horario)}}>Modificar</Button>
                                    <Button onClick={() => {handleBorrar(horario.idHorario)}}>Borrar</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

