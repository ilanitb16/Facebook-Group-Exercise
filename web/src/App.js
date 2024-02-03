import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';

const App = () => {
  return (
    <div className="App">
      <Registration/>{}
    </div>
  );
};

// import React from 'react';
// import Home from './components/Home';
// import Registration from './components/Registration';

// function App() {
//   return (
//     <Router>
      
//         <Route exact path="/" component={Login} />
//         <Route path="/home" component={Home} />
//         <Route path="/register" component={Registration} /> {/* Add this route */}
      
//     </Router>

// <Login /> {/* Render the Login component */}
//   );
// }



export default App;

