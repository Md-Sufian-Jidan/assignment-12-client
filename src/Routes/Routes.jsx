import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Components/Error/ErrorPage";
import Home from "../Pages/Home/Home/Home";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/',
                element: <Home />
            }
        ]
    }
]) 