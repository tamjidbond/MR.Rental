import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import Home from './Components/Home/Home.jsx'
import Rent from './Components/Rent/Rent.jsx'
import AddListing from './Components/AddListing/AddListing.jsx'
import RootMain from './Components/RootMain/RootMain.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootMain></RootMain>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/rent",
        element: <Rent></Rent>
      },
      {
        path: "/addListing",
        element: <AddListing></AddListing>
      }
    ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element: <Register></Register>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
