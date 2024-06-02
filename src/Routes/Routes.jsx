import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Components/Error/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Shared/Login/Login";
import SignUp from "../Pages/Shared/SignUp/SignUp";
import Dashboard from "../Layouts/Dashboard";
import AddTest from "../Pages/Dashboard/Admin/AddTest";
import AllTestRoute from "../Pages/Dashboard/Admin/AllTestRoute";
import UpdateTest from "../Components/Dashboard/Form/UpdateTest";
import Statistic from "../Pages/Dashboard/Admin/Statistic";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import Profile from "../Components/Dashboard/Profile/Profile";
import AllTests from "../Pages/Home/AllTests/AllTests";
import SingleTest from "../Pages/Home/AllTests/SingleTest";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path:'/all-tests',
                element: <AllTests />
            },
            {
                path:'/test/details/:id',
                element: <SingleTest />,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/details/${params.id}`)
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: 'add-test',
                element: <PrivateRoute><AddTest /></PrivateRoute>
            },
            {
                path: 'all-tests',
                element: <PrivateRoute><AllTestRoute /></PrivateRoute>
            },
            {
                path: '/dashboard/update-test/:id',
                element: <PrivateRoute><UpdateTest /></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/single-test/${params.id}`)
            },
            {
                path: 'statistic',
                element: <PrivateRoute><Statistic /></PrivateRoute>
            },
            {
                path: 'all-users',
                element: <PrivateRoute><AllUsers /></PrivateRoute>
            },
            // every body access
            {
                path: '/dashboard/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
        ]
    }
]) 