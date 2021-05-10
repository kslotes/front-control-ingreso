import React, {useState, useEffect} from "react";
import {Form} from "react-bootstrap";
import axios from "axios";

const apiPreguntas = axios.create({
    baseURL: `http://areco.gob.ar:9528/api/pregunta/all`,
});

const Ddjj = () => {
    const [value, setValue] = useState();

    const handleClick = (id, valor) => {
        console.log('ID:', id);
        setValue({ 
            idPregunta: id,
            afirmativo: valor
        });
    };

    const [preguntas, setPreguntas] = useState([]);
    useEffect(() => {
        apiPreguntas.get("/").then((res) => {
            setPreguntas(res.data.data);
        });
    }, []);
    console.log(preguntas);
    console.log('VALUE: ', value)
    return preguntas.map((pregunta, i) => {
        return (
            <div>
                <Form.Label>{pregunta.descripcion}</Form.Label>
                <Form.Check
                    name={i}
                    label="Si"
                    key={i}
                    type="radio"
                    value={1}
                    onClick={() => {
                        handleClick(pregunta.idPregunta, 1);
                    }}
                />
                <Form.Check
                    name={i}
                    label="No"
                    key={i + 10}
                    type="radio"
                    value={0}
                    onClick={() => {
                        handleClick(pregunta.idPregunta, 0);
                    }}
                />
            </div>
        );
    });
};

export default Ddjj;
