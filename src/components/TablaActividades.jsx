import {Table, Button} from 'react-bootstrap'
import Swal from 'sweetalert2'

export default ({actividades}) => {
    const handleModificar = async (nombre) => {
        console.log(`${nombre}`)
        console.log(`Click en modificar`);
        const { value: nuevoNombre } = await Swal.fire({
            icon: `info`,
            title: `<strong>Modificar Actividad </strong>`,
            input: 'text',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            inputLabel: `Ingrese nuevo nombre`,
            inputPlaceholder: 'Ingrese nuevo nombre',
            inputValidator: (value) => {
                if(!value){
                    return "Tienes que escribir algo!"
                }
            }
        })
        if(nuevoNombre){
            Swal.fire(`Guardado!`, `El nuevo nombre es: ${nuevoNombre}`, 'success')
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
                    <th>Nombre Actividad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {actividades.map((actividad) => {
                    return (
                        <tr>
                            <td>
                                {actividad.nombre}
                            </td>
                            <td>
                                <Button onClick={() => {handleModificar(actividad.nombre)}}>Modificar</Button>
                                <Button onClick={handleBorrar}>Borrar</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
