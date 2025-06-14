import { LogOut, UserPen, PackagePlus, PackageSearch, BookImage, Info, Package, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const ProfileDropdown = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout !"
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire({
                    title: "Logged Out!",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL || `https://i.pinimg.com/736x/74/41/d1/7441d10874bdd20be48a921100b878e8.jpg`} alt="User Avatar" />
                </div>
            </div>

            <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
            >
                {/* Mobile-only links */}
                <div className="block lg:hidden">
                    <li>
                        <Link to="/">
                            <Home className="w-4 h-4" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/all-packages">
                            <Package className="w-4 h-4" />
                            All Packages
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us">
                            <Info className="w-4 h-4" />
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-bookings">
                            <BookImage className="w-4 h-4" />
                            My Bookings
                        </Link>
                    </li>
                </div>

                {/* Always visible links */}
                <li>
                    <Link to="/add-packages">
                        <PackagePlus className="w-4 h-4" />
                        Add Package
                    </Link>
                </li>
                <li>
                    <Link to="/manage-my-packages">
                        <PackageSearch className="w-4 h-4" />
                        Manage My Packages
                    </Link>
                </li>
                <li>
                    <Link to="/profile-update">
                        <UserPen className="w-4 h-4" />
                        Profile
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropdown;

