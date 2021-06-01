import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminHome from './components/AdminHome';
import AdminSeguimientos from './components/AdminSeguimientos';
import AdminDependencias from './components/AdminDependencias';
import AdminActividades from './components/AdminActividades';
import './App.css';
import AdminAulasYHorarios from './components/AdminAulasYHorarios';

function App() {
      return (
            <BrowserRouter>
                  <Switch>
                        <Route exact path="/AdminAulasYHorarios" component={AdminAulasYHorarios} />
                        <Route exact path="/AdminDependencias" component={AdminDependencias} />
                        <Route exact path="/AdminSeguimientos" component={AdminSeguimientos} />
                        <Route exact path="/AdminActividades" component={AdminActividades} />
                        <Route exact path="/Admin" component={AdminHome} />
                        <Route path="/" component={AdminHome} />
                  </Switch>
            </BrowserRouter>
      );
}

export default App;
