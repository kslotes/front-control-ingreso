export default () => {
    <>
        <Form.Group className="mt-3">
            <Form.Label>Edificio</Form.Label>
            <Form.Control as="select" onChange={handleChangeEdificio}>
                <option selected disabled>
                    Seleccione una
                </option>
                {edificios.map((edificio) => {
                    return (
                        <option value={edificio.idEdificio} key={edificio.idEdificio}>
                            {edificio.nombre}
                        </option>
                    );
                })}
            </Form.Control>
        </Form.Group>
        <Form.Group className="mt-3">
            <Form.Label>Aula</Form.Label>
            <Form.Control as="select" onChange={handleAula}>
                <option selected disabled>
                    Seleccione una
                </option>
                {aulas.map((aula) => {
                    return (
                        <option value={aula.idAula} key={aula.idAula}>
                            {aula.nombre}
                        </option>
                    );
                })}
            </Form.Control>
        </Form.Group>

        {/*  */}

        <InputGroup className="mt-4">
            <InputGroup.Prepend>
                <InputGroup.Text>Propuesta</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" onChange={handlePropuestaHorario}>
                <option selected disabled>
                    Seleccione una
                </option>
                {propuestas.map((propuesta) => {
                    return (
                        <option value={propuesta.idPropuesta} key={propuesta.idPropuesta}>
                            {propuesta.nombre}
                        </option>
                    );
                })}
            </Form.Control>
        </InputGroup>
    </>;
};
