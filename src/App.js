import Home from './pages/home'
import Loans from './pages/loans'
import Application from './pages/application'
import acceptedData from './acceptedData';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles/globals.css';


function App() {
  if(!localStorage.getItem('acceptedData')) {
    localStorage.setItem('acceptedData', JSON.stringify(acceptedData));
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/loans/:index" component={Loans} />
        <Route path="/application" component={Application} />
      </Switch>
    </Router>
  );
}

export default App;
