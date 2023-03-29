import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer"
import "./style.scss";
import { Children } from "react";


const Layout = () =>{
  return (
    <>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </>
  );
   
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>

      },
      {
        path:"/post/:id",
        element:<Single/>
        

      },
      {
        path:"/Write",
        element:<Write/>

      },
      


    ],
    
  },
  {
    path:"/Login",
    element:<Login/>

  },
  {
    path:"/Register",
    element:<Register/>

  },
 


 
  

]);



function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
