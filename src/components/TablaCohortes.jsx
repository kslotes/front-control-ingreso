import {Table, Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import './TablaCohortes.css'

export default ({cohortes}) => {

    const handleModificar = async (idCohorte) => {
        console.log(`${idCohorte}`)
        console.log(`Click en modificar`);
        const { value: nuevoIdCohorte } = await Swal.fire({
            icon: `info`,
            title: `<strong>Modificar Cohorte </strong>`,
            input: 'text',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            inputLabel: `Ingrese nuevo id`,
            inputPlaceholder: 'Ingrese nuevo id',
            inputValidator: (value) => {
                if(!value){
                    return "Tienes que escribir algo!"
                }
            }
        })
        if(nuevoIdCohorte){
            Swal.fire(`Guardado!`, `El nuevo nombre es: ${nuevoIdCohorte}`, 'success')
        }
    }
    const handleBorrar = () => {
        Swal.fire({
            title: `¿Estás seguro?`,
            text: `Esta acción no puede deshacerse.`,
            icon: 'warning',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonText: 'Si',
        }).then((res) => {
            if(res.isConfirmed) {
                Swal.fire('Actividad eliminada.', '', 'success')
            }
        })
    }
    return(
        <Table variant="light"striped bordered hover responsive>

            <thead>
                <tr>
                    <th>ID Cohorte</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Acciones</th>

                </tr>
            </thead>

            <tbody>
                {cohortes.map((cohorte) => {
                    return (
                        <tr>
                            <td>
                                {cohorte.idCohorte}
                            </td>
                            <td>
                                {cohorte.fechaInicio}
                            </td>
                            <td>
                                {cohorte.fechaFin}
                            </td>
                            <td>
                                <Button onClick={() => {handleModificar(cohorte.idCohorte)}}>Modificar</Button>
                                <Button onClick={() => {handleBorrar(cohorte.idCohorte)}}>Borrar</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
