import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Formulario from './components/Formulario'
import './App.css';

function App() {
	return (
		<BrowserRouter>
                  <Switch>
                        <Route path="/" component={Formulario}/>
                  </Switch>
            </BrowserRouter>
	);
}

export default App;
