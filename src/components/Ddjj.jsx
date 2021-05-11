import React, {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import "./Formulario.css";


const Ddjj = () => {
    
    const [preguntas, setPreguntas] = useState([]);
    const [value, setValue] = useState([]);
    const [factorDeRiesgo, setFactorDeRiesgo] = useState([]);


    const handleChangeFactor=(event)=>{
        const name = event.target.name
        const valor = event.target.value
        setValue((value) => [...value, {[name]: valor}]);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(value)
    }
    const handleChange = (event) => {
        const name = event.target.name
        const valor = event.target.value
        setValue((value) => [...value, {[name]: valor}]);
        // axios.put(`http://areco.gob.ar:9528/api/respuesta/{idPregunta}`, value);
    };
    useEffect(() => {
        axios.get(`http://areco.gob.ar:9528/api/pregunta/all`).then((res) => {
            setPreguntas(res.data.data);
        });
        axios.get(`http://areco.gob.ar:9528/api/factorderiesgo/all`).then((res) => {
            setFactorDeRiesgo(res.data.data);
        });
    }, []);
    
    // console.log(`Respuestas: {\n\t nameCheck: ${value.name}\n\t idPregunta:${value.idPregunta},\n\t afirmativo: ${value.afirmativo}\n\t}`);
    console.log(value)
    console.log(factorDeRiesgo)
    return (
        <>
        <Form className="seccion-container mb-3" onSubmit={handleSubmit}>
            <h2>Declaración Jurada</h2>
            {preguntas.map((pregunta, i) => {
                return (
                    <div>
                        <Form.Label className="label-preguntas mt-3">{pregunta.descripcion}</Form.Label>
                        <Form.Check
                            xs={6}
                            name={"pregunta"+i}
                            label="Si"
                            key={i}
                            type="radio"
                            value={1}
                            onChange={handleChange}
                        />
                        <Form.Check
                            xs={6}
                            name={"pregunta"+i}
                            label="No"
                            key={i + 10}
                            type="radio"
                            value={0}
                            onChange={handleChange}
                    
                        />
                    </div>
                );
            })}
            <Button variant="primary" type="submit">Confirmar</Button>
            {/*TODO: Agregar Todo lo que sea factor de riesgo (select con opciones multiples) Cada vez que una persona realiza la DDJJ, hay que serializarla Value tiene que ser un array. Tamaño = cant
            preguntas
                    Manejar cuando intercambian de opcion en cada pregunta
                    Antes de hacer el PUT aplicar .filter() al array que usamos*/}
        </Form>
        
        <Form className="seccion-container mb-3" onSubmit={handleSubmit}>
        <h2>Si tu situacion de salud contempla alguna de las siguientes opciones,seleccione algunas de las siguientes opciones </h2>
            {factorDeRiesgo.map((data,i)=>{
                return(
                    <>
                    <Form.Label className="label-preguntas mt-3">{factorDeRiesgo.nombre}</Form.Label>
                        <Form.Check
                            xs={6}
                            name={"factor"+i}
                            label="Si"
                            key={i}
                            type="radio"
                          
                            onChange={handleChangeFactor}
                        />
                    </>
                )
            })}
        </Form>
       </>
    );
};

export default Ddjj;
