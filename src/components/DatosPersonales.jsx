import { Form } from "react-bootstrap"

const DatosPersonales = () => {
      return(
            <Form className="seccion-container mt-5">
                  <h2>Datos Personales</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre y Apellido*</Form.Label>
              <Form.Control type="text" placeholder="Ingrese nombre y apellido" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Form>
      )
}

export default DatosPersonales;