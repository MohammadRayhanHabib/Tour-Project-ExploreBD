import { useState } from 'react';

import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

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

            Swal.fire("Profile Updated", "", "success")
        } catch (error) {

            Swal.fire("", " ", error)
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
                <title>Profile</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-800 to-black relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500 via-indigo-500 to-transparent blur-2xl animate-pulse"></div>

                <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 max-w-md w-full animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-white mb-6">Your Profile</h2>

                        <div className="flex justify-center mb-6">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-primary text-white text-4xl flex items-center justify-center">
                                    {user?.displayName?.[0] || user?.email?.[0]}
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label text-white">Name</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label text-white">Photo URL</label>
                                <input
                                    type="url"
                                    className="input input-bordered w-full"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    'Update Profile'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 space-y-2 text-white text-sm">
                            <p>
                                <span className="font-medium">Email:</span> {user?.email}
                            </p>
                            <p>
                                <span className="font-medium">Last Sign In:</span>{' '}
                                {user?.metadata?.lastSignInTime
                                    ? new Date(user.metadata.lastSignInTime).toLocaleString()
                                    : 'N/A'}
                            </p>
                        </div>

                        <button
                            onClick={handleResetPassword}
                            className="mt-6 btn btn-outline btn-accent hover:bg-green-950 w-full text-white font-bold"
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