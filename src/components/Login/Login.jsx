import React, {useState} from 'react'
import { Container, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import NavBarTop from '../NavBar/NavBarTop'
import * as Api from '../Api'
const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleUserName = event => setUserName(event.target.value)
    const handlePassword = event => setPassword(event.target.value)
    const handleSubmit = () => {
        Api.login(userName, password)
    }
    return (
        <Container fluid className="fondo">
            <NavBarTop />
            <Col xs={6} className="seccion-container">
                <h2 className="texto-h2">Iniciar Sesion</h2>
                <Col xl={12} className="text-align-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Usuario</InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="Usuario"
                            aria-label="Usuario"
                            aria-describedby="basic-addon1"
                            onChange={handleUserName}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
                        <FormControl
                            type="password"
                            placeholder="Contraseña"
                            aria-label="Contraseña"
                            aria-describedby="basic-addon1"
                            onChange={handlePassword}
                        />
                    </InputGroup>
                </Col>
                <Button variant='primary' onClick={handleSubmit}>Iniciar Sesion</Button>
            </Col>
        </Container>
    )
}

export default Login
