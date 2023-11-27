import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Register from "../Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import MyDonationRequest from "../pages/Dashboard/MyDonationRequest/MyDonationRequest";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import EditDonationRequest from "../pages/Dashboard/EditDonationRequest/EditDonationRequest"
import DonationRequestManagement from "../pages/Dashboard/DonationRequestManagement/DonationRequestManagement";
import ContentManagement from "../pages/Dashboard/ContentManagement/ContentManagement";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import DonationRequestDetails from "../pages/DonationRequestDetails/DonationRequestDetails";
import DonationRequest from "../pages/DonationRequest/DonationRequest";



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
          path:'donationRequest',
          element:<DonationRequest></DonationRequest>
        },
        {
          path:'registration',
          element:<Register></Register>
        },
        {
          path:'login',
          element:<Login></Login>
        },
        //DONATION DETAILS PAGE
        {
          path:'donationRequestDetails/:id',
          element:<DonationRequestDetails></DonationRequestDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/donationRequests/${params.id}`)

        },
        
        
      ]
    },

    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        //normal user routes
        {
          path:'userHome',
          element:<UserHome></UserHome>

        },
        {
          path: 'myDonationrequest',
          element: <MyDonationRequest></MyDonationRequest>
        },
        {
          path: 'createDonationRequest',
          element: <CreateDonationRequest></CreateDonationRequest>
        },
        {
          path: 'editInfo/:id',
          element: <EditDonationRequest></EditDonationRequest>,
          loader: ({params}) => fetch(`http://localhost:5000/donationRequests/${params.id}`)
        },
        
        // {
        //   path:'paymentHistory',
        //   element:<PaymentHistory></PaymentHistory>
        // },


        //admin only routes
        {
          path:'adminHome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        // {
        //   path: 'updateItem/:id',
        //   element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        //   loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        // },
        {
          path:'contentManagement',
          element:<AdminRoute><ContentManagement></ContentManagement></AdminRoute>
        },
        {
          path:'donationRequestManagement',
          element:<AdminRoute><DonationRequestManagement></DonationRequestManagement></AdminRoute>
        },
        {
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    }
  ]);