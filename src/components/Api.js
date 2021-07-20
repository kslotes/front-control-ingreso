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



// Get ALL actividades
export const getActividades = async () => {
    return axios.get(API_GET_ACTIVIDADES)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const crearActividad = async (idPropuesta, nombreActividad) => {
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

export const borrarActividad = async (idActividad) => {
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
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const getActividadesByPropuesta = async (idPropuesta) => {
    return axios.get(`${URL_BASE}/actividad/find/propuesta/${idPropuesta}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}
// dependencias

export const getDependencias = async () => {
    return axios.get(API_GET_DEPENDENCIAS)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}



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

export const getPropuestasByDependencia = async (idDependencia) => {
    return axios.get(`${URL_BASE}/propuesta/find/dependencia/${idDependencia}`)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

export const getSedes = async () => {
    return axios.get(API_GET_SEDES)
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error', err, 'error'));
}

