


import { LogOut, PackagePlus, PackageSearch } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const ProfileDropdown = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         await logout();
    //         navigate('/login');
    //     } catch (error) {
    //         console.error('Logout failed:', error.message);
    //     }
    // };


    const handleLogout = () => {

        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout !"
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                Swal.fire({
                    title: "LogOut!",
                    // text: "Loged Out",
                    icon: "success"
                });
            }
        });

    }
    console.log(user);




    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL || '/default-profile.png'} alt="User Avatar" />
                </div>
            </div>

            <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
            >
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
                    <button onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </li>
                <li>
                    <Link to={'/profile-update'}>Profile</Link>
                </li>

            </ul>
        </div>
    );
};

export default ProfileDropdown;
