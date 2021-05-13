import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Formulario from './components/Formulario'
import AdminHome from './components/AdminHome'
import './App.css';

function App() {
	return (
		<BrowserRouter>
                  <Switch>
			<Route exact path="/Admin" component={AdminHome}/>
                        <Route path="/" component={Formulario}/>
                  </Switch>
            </BrowserRouter>
	);
}

export default App;
