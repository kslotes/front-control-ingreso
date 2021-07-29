import React, {useState} from 'react'
import { Container, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import NavBarTop from '../NavBar/NavBarTop'
const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(userName, password)
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
                            onChange={(e) => {setUserName(e.target.value)}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
                        <FormControl
                            type="password"
                            placeholder="Contraseña"
                            aria-label="Contraseña"
                            aria-describedby="basic-addon1"
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </InputGroup>
                </Col>
                <Button variant='primary' onClick={handleSubmit}>Iniciar Sesion</Button>
            </Col>
        </Container>
    )
}

export default Login
