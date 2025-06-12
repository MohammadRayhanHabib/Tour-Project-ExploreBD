import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";


import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home"
import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutUs from "../pages/AboutUs";
import AllPackages from "../pages/AllPackages";
import AddPackages from "../pages/AddPackages";
import ManageMyPackages from "../pages/ManageMyPackages";
import PrivateRoute from "../context/PrivateRoute";
import Profile from "../pages/Profile";
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
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'about-us',
                Component: AboutUs
            },
            {
                path: 'all-packages',
                Component: AllPackages
            },
            {
                path: 'add-packages',

                element: <PrivateRoute>
                    <AddPackages></AddPackages>
                </PrivateRoute>
            },
            {
                path: 'manage-my-packages',
                element: <PrivateRoute>
                    <ManageMyPackages></ManageMyPackages>
                </PrivateRoute>
            },
            {
                path: 'profile-update',

                element: <Profile></Profile>

            }
        ]
    },
]);