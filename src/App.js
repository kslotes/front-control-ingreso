import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminHome from './components/AdminHome';
import AdminSeguimientos from './components/AdminSeguimientos';
import ModificarActividad from './components/ModificarActividad';
import ModificarCohorte from './components/ModificarCohorte';
import NuevaActividad from './components/NuevaActividad';
import NuevoCohorte from './components/NuevoCohorte';
import './App.css';
import AdminAulasYHorarios from './components/AdminAulasYHorarios';

function App() {
      return (
            <BrowserRouter>
                  <Switch>
                        <Route exact path="/AdminAulasYHorarios" component={AdminAulasYHorarios} />
                        <Route exact path="/CrearActividad" component={NuevaActividad} />
                        <Route exact path="/ModificarActividad" component={ModificarActividad} />
                        <Route exact path="/AdminSeguimientos" component={AdminSeguimientos} />
                        <Route exact path="/CrearCohorte" component={NuevoCohorte} />
                        <Route exact path="/ModificarCohorte" component={ModificarCohorte} />
                        <Route exact path="/Admin" component={AdminHome} />
                        <Route path="/" component={AdminHome} />
                  </Switch>
            </BrowserRouter>
      );
}

export default App;
