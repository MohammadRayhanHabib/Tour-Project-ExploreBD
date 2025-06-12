import React, { useState } from "react";
import { Link, NavLink } from "react-router";

const Navbar = ({ user, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo + Site Name */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="/logo.png" // Put your logo path here
                            alt="Site Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
                            TourExplorer
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/packages"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                            }
                        >
                            All Packages
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                            }
                        >
                            About Us
                        </NavLink>

                        {/* If user logged in show extra links */}
                        {user ? (
                            <>
                                <NavLink
                                    to="/my-bookings"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                                    }
                                >
                                    My Bookings
                                </NavLink>
                                <NavLink
                                    to="/add-package"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                                    }
                                >
                                    Add Package
                                </NavLink>
                                <NavLink
                                    to="/manage-packages"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                                    }
                                >
                                    Manage My Packages
                                </NavLink>
                            </>
                        ) : null}
                    </div>

                    {/* Auth Buttons or Profile */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!user ? (
                            <Link
                                to="/login"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img
                                        src={user.photoURL || "/default-profile.png"}
                                        alt="Profile"
                                        className="w-9 h-9 rounded-full object-cover border-2 border-indigo-600"
                                    />
                                    <svg
                                        className={`w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                onLogout();
                                                setDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-red-600 hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-1">
                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            isActive
                                ? "block text-indigo-600 dark:text-indigo-400 font-semibold"
                                : "block text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/packages"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            isActive
                                ? "block text-indigo-600 dark:text-indigo-400 font-semibold"
                                : "block text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                        }
                    >
                        All Packages
                    </NavLink>
                    <NavLink
                        to="/about"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            isActive
                                ? "block text-indigo-600 dark:text-indigo-400 font-semibold"
                                : "block text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                        }
                    >
                        About Us
                    </NavLink>

                    {user && (
                        <>
                            <NavLink
                                to="/my-bookings"
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-indigo-600 dark:text-indigo-400 font-semibold"
                                        : "block text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                                }
                            >
                                My Bookings
                            </NavLink>
                            <NavLink
                                to="/add-package"
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-indigo-600 dark:text-indigo-400 font-semibold"
                                        : "block text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                                }
                            >
                                Add Package
                            </NavLink>
                            <NavLink
                                to="/manage-packages"
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-indigo-600 dark:text-indigo-400 font-semibold"
                                        : "block text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                                }
                            >
                                Manage My Packages
                            </NavLink>
                            <button
                                onClick={() => {
                                    onLogout();
                                    setMenuOpen(false);
                                }}
                                className="w-full text-left block text-gray-700 dark:text-gray-300 hover:text-red-600 mt-2"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {!user && (
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="block bg-indigo-600 text-white px-4 py-2 rounded-md text-center hover:bg-indigo-700"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
