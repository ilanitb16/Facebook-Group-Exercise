import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login';
import Feed from './components/FeedPage';
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

export default App;

