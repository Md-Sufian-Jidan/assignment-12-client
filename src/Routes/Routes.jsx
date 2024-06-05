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
import UserStatistics from "../Pages/Dashboard/User/UserStatistics";
import MyAppointments from "../Pages/Dashboard/User/MyAppointments";
import MyTestResult from "../Pages/Dashboard/User/MyTestResult";
import AddBanner from "../Pages/Dashboard/Admin/AddBanner";
import AllBanner from "../Pages/Dashboard/Admin/AllBanner";
import Reservations from "../Pages/Dashboard/Admin/Reservations";
import PrivateRoute from './PrivateRoute'
import AdminProtect from "./AdminProtect";

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
                path: '/all-tests',
                element: <AllTests />
            },
            {
                path: '/test/details/:id',
                element: <SingleTest />,
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
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'add-test',
                element: <PrivateRoute><AdminProtect><AddTest /></AdminProtect></PrivateRoute>
            },
            {
                path: 'all-tests',
                element: <PrivateRoute><AdminProtect><AllTestRoute /></AdminProtect></PrivateRoute>
            },
            {
                path: '/dashboard/update-test/:id',
                element: <PrivateRoute><AdminProtect><UpdateTest /></AdminProtect></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/single-test/${params.id}`)
            },
            {
                path: '/dashboard/statistic',
                element: <PrivateRoute><AdminProtect><Statistic /></AdminProtect></PrivateRoute>
            },
            {
                path: 'all-users',
                element: <PrivateRoute><AdminProtect><AllUsers /></AdminProtect></PrivateRoute>
            },
            {
                path: 'add-banner',
                element: <PrivateRoute><AdminProtect><AddBanner /></AdminProtect></PrivateRoute>
            },
            {
                path: 'all-banner',
                element: <PrivateRoute><AdminProtect><AllBanner /></AdminProtect></PrivateRoute>
            },
            {
                path: 'reservations',
                element: <PrivateRoute><AdminProtect><Reservations /></AdminProtect></PrivateRoute>
            },
            // normal user route
            {
                path: 'user-statistics',
                element: <PrivateRoute><UserStatistics /></PrivateRoute>
            },
            {
                path: '/dashboard/my-appointments',
                element: <MyAppointments />
            },
            {
                path: '/dashboard/my-test-result',
                element: <PrivateRoute><MyTestResult /></PrivateRoute>
            },
            // every body access
            {
                path: '/dashboard/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },

        ]
    }
]) 