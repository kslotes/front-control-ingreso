import axios from 'axios'

export const URL_BASE = `http://areco.gob.ar:9528/api`
export const API_GET_ACTIVIDADES = `${URL_BASE}/actividad/all`
export const API_GET_COHORTES = `${URL_BASE}/cohorte/all`
export const API_GET_DEPENDENCIAS = `${URL_BASE}/dependencia/all`
export const API_GET_SEDES = `${URL_BASE}/sede/all`
export const API_GET_AULAS = `${URL_BASE}/aula/all`
export const API_GET_HORARIOS = `${URL_BASE}/horario/all`
export const API_GET_SESIONES = `${URL_BASE}/sesionpresencial/all`

export const getActividades = async () => {
    return axios.get(API_GET_ACTIVIDADES)
    .then(response => response.data.data)
    .catch(err => console.error(err))
}

export const crearActividad = async (values) => {
    return axios.post(`${URL_BASE}/actividad/create-por-propuesta/${values.idPropuesta}`, { nombre: values.nombreActividad })
    .then(response => response.data.data)
    .catch(err => console.error(err))
}

export const updateActividad = async (idActividad, values) => {
    return axios.put(`${URL_BASE}/actividad/update/${idActividad}`, {nombre: values.nombreActividad})
    .then(response => response.data.data)
    .catch(err => console.error(err))
}

export const borrarActividad = async (idActividad) => {
    return axios.delete(`${URL_BASE}/actividad/delete/${idActividad}`)
    .then(response => response.data.data)
    .catch(err => console.error(err))
}

// dependencias

export const getDependencias = async () => {
    return axios.get(API_GET_DEPENDENCIAS)
    .then(response => response.data.data)
    .catch(err => console.error(err))
}

// Get Actividad for ID From API
export const getActividad = async (idActividad) => {
    return axios.get(`${URL_BASE}/actividad/find/${idActividad}`)
    .then(response => response.data.data)
    .catch(err => console.error(err))
}

// Get Cohorte for ID From API
export const getCohorte = async (idCohorte) => {
    return axios.get(`${URL_BASE}/cohorte/find/${idCohorte}`)
    .then(response => response.data.data)
    .catch(err => console.error(err))
}

