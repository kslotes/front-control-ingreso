<<<<<<< HEAD
import {Switch, Route} from 'react-router-dom'

import DatosPersonales from './components/DatosPersonales';
import Ddjj from './components/Ddjj';
import SolicitudQr from './components/SolicitudQR';
import DownloadQR from './components/DownloadQR';
import './App.css';

function App() {
	return (
		
                  <Switch>
                        <Route exact path="/" component={DatosPersonales}/>
                        <Route exact path="/ddjj" component={Ddjj}/>
                        <Route exact path="/solicitud" component={SolicitudQr}/>
                        <Route exact path="/qr" component={DownloadQR}/>
                  </Switch>
            
	);
=======
import 'bootstrap/dist/css/bootstrap.min.css';
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
>>>>>>> 50820cfa06fd3373b51e652ce8dbbae55fedbbc9
}

export default App;
