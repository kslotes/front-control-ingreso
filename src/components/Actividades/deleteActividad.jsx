import React from 'react'
import Swal from 'sweetalert2'
import * as Api from '../Api'

export default ({idActividad}) => {
    return Swal.fire({
        title: '¿Borrar actividad?',
                text: 'Esta eliminará todas las cursadas, horarios y sesiones asignadas a la misma.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, cancelar',
        closeOnConfirm: false,
        closeOnCancel: false
    }).then(() => {
        Api.deleteActividad(idActividad)
    })
}
