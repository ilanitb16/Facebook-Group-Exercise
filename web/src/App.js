import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login';
import Feed from './components/Feed';
import Registration from './components/Registration';
import { UserProvider } from './providers/user_context';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Feed />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ])

  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
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

