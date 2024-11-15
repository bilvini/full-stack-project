import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: If you have any global styles
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>  {/* Using BrowserRouter to manage routing */}
    <App />  {/* Main App Component that includes routing for different pages */}
  </Router>,
  document.getElementById('root')
);
