import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminHome from './components/AdminHome';
import AdminSeguimientos from './components/AdminSeguimientos';
import AdministrarActividades from './components/AdministrarActividades';
import AdministrarCohortes from './components/AdministrarCohortes';
import AdministrarAulas from './components/AdministrarAulas'
import AsignarAulas from './components/AsignarAulas' 
import AdministrarHorarios from './components/AdministrarHorarios';

function App() {
      return (
            <BrowserRouter>
                  <Switch>
                        <Route exact path="/AdministrarActividades" component={AdministrarActividades} />
                        <Route exact path="/AdministrarAulas" component={AdministrarAulas} />
                        <Route exact path="/AsignarAulas" component={AsignarAulas} />
                        <Route exact path="/AdministrarCohortes" component={AdministrarCohortes} />
                        <Route exact path="/AdminSeguimientos" component={AdminSeguimientos} />
                        <Route exact path="/AdministrarHorarios" component={AdministrarHorarios} />
                        <Route exact path="/Admin" component={AdminHome} />
                        <Route path="/" component={AdminHome} />
                  </Switch>
            </BrowserRouter>
      );
}

export default App;
