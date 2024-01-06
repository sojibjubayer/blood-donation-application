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
import ContentManagement from "../pages/Dashboard/ContentManagement/ContentManagement";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import DonationRequestDetails from "../pages/DonationRequestDetails/DonationRequestDetails";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import UpdateProfile from "../pages/Dashboard/MyProfile/UpdateProfile/UpdateProfile";
import AllDonationRequest from "../pages/Dashboard/AllDonationRequest/AllDonationRequest";
import AddBlog from "../pages/Dashboard/AddBlog/AddBlog";
import Blogs from "../pages/Blogs/Blogs";
import SearchPage from "../pages/SearchPage/SearchPage";
import NotFound from "../pages/NotFound/NotFound";
import Payment from "../Payment/Payment";




export const router=createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<NotFound></NotFound>,
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
          path:'blogs',
          element:<Blogs></Blogs>
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
          element:<PrivateRoute><DonationRequestDetails></DonationRequestDetails></PrivateRoute>,
          loader: ({params}) => fetch(`https://bda-server.vercel.app/donationRequests/${params.id}`)

        },
        {
          path: 'searchDonors',
          element: <SearchPage></SearchPage>,
          
        },
        {
          path: 'fundings',
          element: <Payment></Payment>,
          
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
          element:<PrivateRoute><UserHome></UserHome></PrivateRoute>

        },
        {
          path: 'myDonationrequest',
          element: <PrivateRoute><MyDonationRequest></MyDonationRequest></PrivateRoute>
        },
        {
          path: 'createDonationRequest',
          element: <PrivateRoute><CreateDonationRequest></CreateDonationRequest></PrivateRoute>
        },
        {
          path: 'editInfo/:id',
          element: <PrivateRoute><EditDonationRequest></EditDonationRequest></PrivateRoute>,
          loader: ({params}) => fetch(`https://bda-server.vercel.app/donationRequests/${params.id}`)
        },
        {
          path:'profile',
          element:<PrivateRoute><MyProfile></MyProfile></PrivateRoute>
        },
        {
          path: 'updateProfile/:id',
          element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>,
          loader: ({params}) => fetch(`https://bda-server.vercel.app/allUsers/${params.id}`)
        },
      
        
        
        // {
        //   path:'paymentHistory',
        //   element:<PaymentHistory></PaymentHistory>
        // },


        //admin only routes
        {
          path:'/dashboard',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        // {
        //   path: 'updateItem/:id',
        //   element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        //   loader: ({params}) => fetch(`https://bda-server.vercel.app/menu/${params.id}`)
        // },
        {
          path:'contentManagement',
          element:<AdminRoute><ContentManagement></ContentManagement></AdminRoute>
        },
        {
          path:'content-management/add-blog',
          element:<AdminRoute><AddBlog></AddBlog></AdminRoute>
        },

        {
          path:'allDonationRequest',
          element:<AdminRoute><AllDonationRequest></AllDonationRequest></AdminRoute>
        },
        {
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    }
  ]);