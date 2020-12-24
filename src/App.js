import Home from './home'
import Loans from './loans'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './styles/globals.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/loans/:index" component={Loans} />
      </Switch>
    </Router>
  );
}

export default App;
