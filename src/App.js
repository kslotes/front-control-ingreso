import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Formulario from './components/Formulario';
import AdminHome from './components/AdminHome';
import AdminSeguimientos from './components/AdminSeguimientos';
import AdminDependencias from './components/AdminDependencias';
import AdminActividades from './components/AdminActividades';
import './App.css';

function App() {
      return (
            <BrowserRouter>
                  <Switch>
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
