import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import PrivateRoute from './components/PrivateRoute'; // Custom route for protecting dashboard

const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>Expense Tracker</h1>
        <Switch>
          {/* Public Routes */}
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          
          {/* Private Route: Only accessible if logged in */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          
          {/* Default Route: Redirect to dashboard if already logged in */}
          <Route path="/" render={() => <h2>Welcome to the Expense Tracker App</h2>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
