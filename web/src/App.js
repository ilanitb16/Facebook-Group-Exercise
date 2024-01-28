//import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';

const App = () => {
  return (
    <div className="App">
      <Login /> {/* Render the Login component */}
    </div>
  );
};

export default App;

