import React, { useState, createContext } from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { UserProvider } from './providers/user_context';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import FeedPage from './components/FeedPage/FeedPage';
import posts from "./components/postItem/AllPosts.json";

import "./styles/app.css";

export const ThemeContext = createContext(null);

const App = () => {
  const [postList, setPostList] = useState(posts);
  const[theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <FeedPage postList={postList} setPostList={setPostList} toggleTheme={toggleTheme} />,
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
    

  <ThemeContext.Provider value={{theme, setTheme}}>
    <div className="container-fluid" id={theme}>
      <div className="row">
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </div>
    </div>
    </ThemeContext.Provider>
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

