import axios from 'axios'
import Swal from 'sweetalert2'

export const URL_BASE = `http://areco.gob.ar:9528/api`
export const API_GET_ACTIVIDADES = `${URL_BASE}/actividad/all`
export const API_GET_COHORTES = `${URL_BASE}/cohorte/all`
export const API_GET_DEPENDENCIAS = `${URL_BASE}/dependencia/all`
export const API_GET_SEDES = `${URL_BASE}/sede/all`
export const API_GET_AULAS = `${URL_BASE}/aula/all`
export const API_GET_HORARIOS = `${URL_BASE}/horario/all`
export const API_GET_SESIONES = `${URL_BASE}/sesionpresencial/all`


// * ACTIVIDADES *

// Get ALL actividades
export const getActividades = async () => {
    return axios.get(API_GET_ACTIVIDADES)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener actividades', err, 'error'));
}

export const addActividad = async (idPropuesta, nombreActividad) => {
    return axios.post(`${URL_BASE}/actividad/create-por-propuesta/${idPropuesta}`, { nombre: nombreActividad })
        .then(response => {
            Swal.fire('Actividad creada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const updateActividad = async (idActividad, nombreActividad) => {
    return axios.put(`${URL_BASE}/actividad/update/${idActividad}`, { nombre: nombreActividad })
        .then(response => {
            Swal.fire('Actividad actualizada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const deleteActividad = async (idActividad) => {
    return axios.delete(`${URL_BASE}/actividad/delete/${idActividad}`)
        .then(response => {
            Swal.fire('Actividad eliminada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error', err, 'error'));
}
// Get Actividad for ID From API
export const getActividadById = async (idActividad) => {
    return axios.get(`${URL_BASE}/actividad/find/${idActividad}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener actividad', err, 'error'));
}

export const getActividadesByPropuesta = async (idPropuesta) => {
    return axios.get(`${URL_BASE}/actividad/find/propuesta/${idPropuesta}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener actividad', err, 'error'));
}
// * AULAS *
export const addAula = async (nombre, capacidadConAforo, idEdificio) => {
    return axios.post(`${URL_BASE}/aula/create`, {
        nombre: nombre,
        capacidadConAforo: capacidadConAforo,
        edificio: {
            idEdificio: idEdificio
        }
    }).then(response => {
        Swal.fire('Aula creada', '', 'success').then(() => { window.location.reload() });
        return response.data.data;
    })
        .catch(err => Swal.fire('Error', err, 'error'));
}
export const getAulas = async () => {
    return axios.get(API_GET_AULAS)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al cargar aulas', err, 'error'));
}

export const updateAula = async (idAula, nuevoNombre, nuevaCapacidad) => {
    return axios.put(`${URL_BASE}/aula/update/${idAula}`, {
        nombre: nuevoNombre,
        capacidadConAforo: nuevaCapacidad
    })
        .then(response => {
            Swal.fire('Aula actualizada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const deleteAula = async (idAula) => {
    return axios.delete(`${URL_BASE}/aula/delete/${idAula}`)
        .then(response => {
            Swal.fire('Aula eliminada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error', err, 'error'));
}

// * DEPENDENCIAS *

export const getDependencias = async () => {
    return axios.get(API_GET_DEPENDENCIAS)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

// * COHORTES *

// Get All Cohortes from API
export const getCohortes = async () => {
    return axios.get(API_GET_COHORTES)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

// Get Cohorte for ID From API
export const getCohorteById = async (idCohorte) => {
    return axios.get(`${URL_BASE}/cohorte/find/${idCohorte}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const deleteCohorte = async (idCohorte) => {
    return axios.delete(`${URL_BASE}/cohorte/delete/${idCohorte}`)
        .then(response => {
            Swal.fire('Cohorte eliminado', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error', err, 'error'));
}
export const addCohorte = async (idActividad, idSede, nombreCohorte, fechaInicio, fechaFin) => {
    return axios.post(`${URL_BASE}/cohorte/create/${idActividad}/${idSede}`,
        {
            nombreCohorte: nombreCohorte,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        })
        .then(response => {
            Swal.fire('Cohorte creado!', 'Recargue la pagina para ver los cambios', 'success');
            return response.data
        })
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const updateCohorte = async (idCohorte, nombreCohorte, fechaInicio, fechaFin) => {
    return axios.put(`${URL_BASE}/cohorte/update/${idCohorte}`, {
        nombreCohorte: nombreCohorte,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
    })
        .then(response => {
            Swal.fire('Cohorte actualizado', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
}

// * EDIFICIOS *
export const getEdificiosBySede = async (idSede) => {
    return axios.get(`${URL_BASE}/edificio/sede/find/${idSede}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener edificios', err, 'error'));
}

// * HORARIOS *

export const getHorariosByCohorte = async (idCohorte) => {
    return axios.get(`${URL_BASE}/horario/find/${idCohorte}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener horarios', err, 'error'));
}

export const addHorarioByCohorte = async (idActividad, idCohorte, dia, modalidad, horaInicio, horaFin) => {
    return axios.post(`${URL_BASE}/horario/create-sesiones-vacias/${idActividad}/${idCohorte}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al crear horario', err, 'error'));

}
// * PERSONAS *
export const getPersonas = async () => {
    return axios.get(`${URL_BASE}/persona/all`)
    .then(response => response.data.data)
    .catch(err => Swal.fire('Error al obtener personas', err, 'error'));
}
// * PROPUESTAS *

export const getPropuestasByDependencia = async (idDependencia) => {
    return axios.get(`${URL_BASE}/propuesta/find/dependencia/${idDependencia}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

// * SEDES *
export const getSedes = async () => {
    return axios.get(API_GET_SEDES)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

//* SESIONES *
export const getSesiones = async () => {
    return axios.get(API_GET_SESIONES)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const deleteSesion = async (idSesion) => {
    return axios.delete(`${URL_BASE}/sesionpresencial/delete/${idSesion}`)
        .then((response) => {
            Swal.fire('Sesion eliminada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error', err, 'error'));
}
