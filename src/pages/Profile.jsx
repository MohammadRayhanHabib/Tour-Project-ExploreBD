import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile(name, photoURL);
            Swal.fire("Profile Updated", "", "success");
        } catch (error) {
            Swal.fire("", " ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = () => {
        navigate('/forgot-password');
    };




    return (
        <>
            <Helmet>
                <title>Profile | Dashboard</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="relative w-full max-w-[400px] bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header with Photo */}
                    <div className="bg-rose-700 h-32 flex items-center justify-center">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'Profile'}
                                className="w-24 h-24 rounded-full border-4 border-white -mt-8"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-300 text-4xl flex items-center justify-center -mt-12">
                                {user?.displayName?.[0] || user?.email?.[0] || '?'}
                            </div>
                        )}
                    </div>

                    {/* Wavy Separator */}
                    <div className="w-full h-4 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500" style={{ clipPath: 'ellipse(50% 100% at 50% 0%)' }}></div>

                    {/* Content Section */}
                    <div className="p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{user?.displayName || 'User'}</h2>
                        <div className="flex justify-center space-x-4 mb-4">
                            <span className="text-gray-600">🌐</span>
                            <span className="text-gray-600">📧</span>
                            <span className="text-gray-600">🐦</span>
                            <span className="text-gray-600">💼</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                                <input
                                    type="url"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder="Enter photo URL"
                                />

                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    'Update Profile'
                                )}
                            </button>
                        </form>

                        <div className="mt-4 space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium">Email:</span> {user?.email || 'N/A'}</p>
                            <p><span className="font-medium">Last Sign In:</span>{' '}
                                {user?.metadata?.lastSignInTime
                                    ? new Date(user.metadata.lastSignInTime).toLocaleString()
                                    : 'N/A'}
                            </p>
                        </div>

                        <button
                            onClick={handleResetPassword}
                            className="mt-4 w-full py-2 bg-transparent border border-green-500 text-green-600 font-medium rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;