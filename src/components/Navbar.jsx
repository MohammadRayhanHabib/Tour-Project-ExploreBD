import { BookImage, House, Package, Info } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../public/airplane.png"
import { useAuth } from "../context/AuthContext";
// import Swal from "sweetalert2";
import ProfileDropdown from "./ProfileDropdown";
const Navbar = () => {
    const { user } = useAuth();




    return (
        <nav className="flex justify-between items-center px-8 py-4 shadow-sm ">
            {/* Left: Logo + Menu */}
            <div className="flex items-center gap-10">
                {/* Logo */}
                <div className="flex items-center text-2xl font-bold text-primary">
                    <div className="w-10 h-10  rounded-full mr-2">
                        <img src={logo} alt="" />
                    </div>
                    <h1 className="font-bold text-black">
                        <Link to={'/'} >
                            ExploreBD
                        </Link>
                    </h1>
                </div>
            </div>
            <div>

                {/* Menu Items */}
                <ul className="hidden md:flex items-center gap-6 text-sm  font-medium">
                    <NavLink to={'/'} className={({ isActive }) =>
                        `group flex items-center px-3 py-2 rounded-lg transition-all duration-300 text-black font-bold ${isActive
                            ? "bg-gray-950 text-white font-bold"
                            : "font-bold hover:bg-red-100 "
                        }`
                    }>


                        <House></House>  Home
                    </NavLink>
                    <NavLink to={'/all-packages'} className={({ isActive }) =>
                        `group flex items-center px-3 py-2 rounded-lg transition-all duration-300 text-black font-bold ${isActive
                            ? "bg-gray-950 text-white font-bold"
                            : "font-bold hover:bg-red-100"
                        }`

                    }>

                        <Package></Package>  All Packages


                    </NavLink>
                    <NavLink to={'/about-us'} className={({ isActive }) =>
                        `group flex items-center px-3 py-2 rounded-lg transition-all duration-300 text-black font-bold ${isActive
                            ? "bg-gray-950 text-white font-bold"
                            : "font-bold hover:bg-red-100"
                        }`
                    }>

                        <Info></Info>About Us
                    </NavLink>
                    {
                        user ? <div>

                            <NavLink to={'/my-bookings'} className={({ isActive }) =>
                                `group flex items-center px-3 py-2 rounded-lg transition-all duration-300 text-black font-bold ${isActive
                                    ? "bg-gray-950 text-white font-bold"
                                    : "font-bold hover:bg-red-100"
                                }`
                            }>
                                <BookImage />  MyBookings
                            </NavLink>
                        </div> : <div></div>
                    }
                </ul>
            </div>
            {/* Right: Buttons */}
            <div className="flex items-center gap-4">
                <div>
                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" className="theme-controller" value="synthwave" />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
                <div>
                    {user ? <ProfileDropdown></ProfileDropdown>
                        :
                        <Link to={'/login'}>
                            <button className="btn btn-neutral btn-outline">Login</button>

                        </Link>

                    }
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
