import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import HomePage from "../pages/homepage";
import ErrorPage from "../pages/error";
import NotFound from "../pages/notfoundpage";
import { PrivateRoute } from "../components/privateroute";
export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>,
        errorElement:<ErrorPage/>
    },
    {
        path:"/signup",
        element:<Signup/>,
        errorElement:<ErrorPage/>
    },
    {
        element: <PrivateRoute/>,
        children : [
            {
                element: <PrivateRoute />,
                children :[
                    {
                        path:"/",
                        element:<HomePage/>,
                        errorElement:<ErrorPage/>
                    },
                ]
                }
            ]
    },
    {
        path:"*",
        element:<NotFound/>,
    }
])
