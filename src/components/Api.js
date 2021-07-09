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
    .catch(err => console.log(err))
}

export const crearActividad = async (idPropuesta, nombreActividad) => {
    return axios.post(`${URL_BASE}/actividad/create-por-propuesta/${idPropuesta}`, { nombre: nombreActividad })
    .then(response => response.data.data)
    .catch(err => console.log(err))
}

export const updateActividad = async (idActividad, values) => {
    return axios.put(`${URL_BASE}/actividad/update/${idActividad}`, {nombre: values.nombreActividad})
    .then(response => response.data.data)
    .catch(err => console.log(err))
}