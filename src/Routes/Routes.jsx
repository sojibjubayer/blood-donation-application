import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Register from "../Register/Register";
import Login from "../pages/Login/Login";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path:'registration',
          element:<Register></Register>
        },
        {
          path:'login',
          element:<Login></Login>
        }
        
      ]
    }
  ]);