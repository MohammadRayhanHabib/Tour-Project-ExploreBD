// Updated ManageMyPackages.jsx – without modal, navigates to /update-tour-packages/:id
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const ManageMyPackages = () => {
    const { user } = useAuth();
    const [myPackages, setMyPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            const encodedEmail = encodeURIComponent(user.email);
            axios(`https://assignment11-teal.vercel.app/tour-packages/guide/${encodedEmail}`)
                .then(res => setMyPackages(res.data))
                .catch(err => console.error("Error fetching packages:", err));
        }
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This package will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://assignment11-teal.vercel.app/tour-packages/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The package has been deleted.', 'success');
                        setMyPackages(prev => prev.filter(pkg => pkg._id !== id));
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Failed to delete package.', 'error');
                    });
            }
        });
    };

    if (myPackages.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-neutral"></div>
            </div>
            // <div className="flex justify-center items-center min-h-screen bg-base-200">
            //     <span className="loading loading-spinner text-primary"></span>
            // </div>
        );
    }


    return (
        <div className='max-w-[1280px] mx-auto mt-10 rounded-xl bg-[url("https://images.unsplash.com/photo-1506744038136-46273834b3fb")] bg-cover bg-center bg-no-repeat shadow-2xl'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-black/60 backdrop-blur-md rounded-xl p-6">
                <h2 className='text-4xl font-bold text-center mb-6 text-white'>My Packages</h2>
                <div className="overflow-x-auto rounded-xl">
                    <table className="table">
                        <thead>
                            <tr className='bg-gradient-to-r from-indigo-400 to-purple-500 text-white text-lg'>
                                <th>#</th>
                                <th>Name</th>
                                <th>Duration</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPackages.map((pkg, index) => (
                                <motion.tr
                                    key={pkg._id}
                                    className="hover:bg-purple-300/20 transition-all duration-300 text-white font-semibold"
                                    initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 60 }}
                                >
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img src={pkg.image} alt={pkg.tour_name} className="w-12 h-12 rounded-full shadow-md" />
                                            <div>
                                                <div className="font-bold text-white">{pkg.tour_name}</div>
                                                <div className="text-sm text-gray-300">{pkg.destination}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{pkg.duration}</td>
                                    <td>{pkg.price} BDT</td>
                                    <td className="flex gap-2">
                                        <Link to={`/update-tour-packages/${pkg._id}`}>


                                            <button
                                                className=" tooltip tooltip-secondary tooltip-right btn btn-sm bg-indigo-500 hover:bg-indigo-700 border-0 text-white" data-tip="Update"

                                            >
                                                <Pencil size={16} />
                                            </button>
                                        </Link>
                                        {/* <button
                                            className="btn btn-sm bg-red-600 hover:bg-red-800 border-0 text-white"
                                            onClick={() => handleDelete(pkg._id)}
                                        >
                                            <Trash2 size={16} />
                                        </button> */}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default ManageMyPackages;
