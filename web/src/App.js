import React, { useState, createContext } from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login';
import Registration from './components/Registration';
import { UserProvider } from './providers/user_context';
import FeedPage from './feedPage/FeedPage';
import posts from "./postItem/allPosts.json"
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

