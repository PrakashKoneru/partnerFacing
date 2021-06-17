import moment from 'moment';
import Header from './components/Header';
import Home from './pages/home'
import Loans from './pages/loans'
import Application from './pages/application'
import LoanGroups from './pages/loanGroups'
import acceptedData from './acceptedData';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './styles/globals.css';

function App() {
  if(!localStorage.getItem('acceptedData')) {
    const updatedData = acceptedData.map((loan) => {
      var oneDate = moment(loan.issue_d, 'MM/DD/YYYY');
      var monthName = oneDate.format('MMMM');
      loan.issue_m = monthName;
      return loan
    })
    localStorage.setItem('acceptedData', JSON.stringify(updatedData));
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return ( <Redirect to="/primary" /> )
          }}
        />
        <Route exact path="/primary" component={Home} />
        <Route path="/loans/:index" component={Loans} />
        <Route path="/borrowers" component={Application} />
        <Route path="/secondary" component={LoanGroups} />
      </Switch>
    </Router>
  );
}

export default App;
