import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminHome from './components/AdminHome';
import AdminSeguimientos from './components/AdminSeguimientos';
import AdministrarActividades from './components/AdministrarActividades';
import AdministrarCohortes from './components/AdministrarCohortes';
import './App.css';
import AdminAulasYHorarios from './components/AdminAulasYHorarios';

function App() {
      return (
            <BrowserRouter>
                  <Switch>
                        <Route exact path="/AdminAulasYHorarios" component={AdminAulasYHorarios} />
                        <Route exact path="/AdministrarActividades" component={AdministrarActividades} />
                        <Route exact path="/AdministrarCohortes" component={AdministrarCohortes} />
                        <Route exact path="/AdminSeguimientos" component={AdminSeguimientos} />
                        <Route exact path="/Admin" component={AdminHome} />
                        <Route path="/" component={AdminHome} />
                  </Switch>
            </BrowserRouter>
      );
}

export default App;
