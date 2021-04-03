import Header from './components/Header';
import Home from './pages/home'
import Loans from './pages/loans'
import Application from './pages/application'
import LoanGroups from './pages/loanGroups'
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
      <Header />
      <Switch>
        <Route exact path="/primary" component={Home} />
        <Route path="/loans/:index" component={Loans} />
        <Route path="/borrowers" component={Application} />
        <Route path="/secondary" component={LoanGroups} />
      </Switch>
    </Router>
  );
}

export default App;
