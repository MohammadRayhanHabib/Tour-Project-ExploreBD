import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";


import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home"
import Login from "../pages/Login";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'login',
                Component: Login
            }
        ]
    },
]);