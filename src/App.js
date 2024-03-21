import logo from './logo.svg';
import './App.css';
import Login from "./pages/login/login";
import Main from "./pages/main/main";
import Atelier from './pages/atelier/atelier';
import NotFound from "./pages/notFound/notFound";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import React from "react";

function App() {
  const router = createBrowserRouter([{
        path: '/',
        element: <Main/>,
      },
        {
          path: '/login',
          element: <Login/>,
        },
        {
          path: '/atelier',
          element: <Atelier/>
        },
        {
          path: '*',
          element: <NotFound/>,
        }]
  )


    return (<>

            <RouterProvider router={router}/>
        </>
    );


}

export default App;
