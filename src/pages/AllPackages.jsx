// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router';
// import { useAuth } from '../context/AuthContext'; // make sure this is correct path
// import { Search } from "lucide-react";

// const AllPackages = () => {
//     const [packages, setPackages] = useState([]);
//     const [search, setSearch] = useState("");
//     const { user } = useAuth(); // user auth context
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchTours = async () => {
//             try {
//                 const res = await axios.get(
//                     search
//                         ? `https://assignment11-teal.vercel.app/tour-packages?search=${search}`
//                         : `https://assignment11-teal.vercel.app/tour-packages`
//                 );
//                 setPackages(res.data);
//             } catch (error) {
//                 console.error("Error fetching tours:", error);
//             }
//         };

//         fetchTours();
//     }, [search]);

//     if (packages.length === 0) {


//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-neutral"></div>
//             </div>
//             // <div className="flex justify-center items-center min-h-screen bg-base-200">
//             //     <span className="loading loading-spinner text-primary"></span>
//             // </div>

//         )

//     };




//     return (
//         <div className="my-12 px-4 max-w-[1280px] mx-auto">
//             {/* Top title and search bar */}
//             <div className='lg:flex justify-between items-center mb-10'>
//                 <h2 className="text-3xl font-bold text-center lg:text-left mb-6 lg:mb-0">
//                     Featured Packages
//                 </h2>

//                 <div className="relative w-full lg:w-80 h-10 flex items-center border-2 border-blue-300  rounded-xl shadow-lg focus-within:ring-2 focus-within:ring-blue-300">
//                     <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
//                     <input
//                         type="text"
//                         className=" w-full pl-12 pr-4 py-1 text-sm font-medium text-neutral bg-transparent placeholder-gray-500 rounded-xl focus:outline-none"
//                         placeholder="Search by tour name..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         aria-label="Search by tour name"
//                     />
//                 </div>
//             </div>

//             {/* Grid of cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                 {packages.map((pkg) => (
//                     <div
//                         key={pkg._id}
//                         className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10 transition-transform duration-300 hover:scale-[1.02]"
//                     >
//                         {/* Image */}
//                         <img
//                             src={pkg.image}
//                             alt={pkg.tour_name}
//                             className="absolute inset-0 w-full h-full object-cover z-0"
//                         />

//                         {/* Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-10" />

//                         {/* Card Content */}
//                         <div className="relative z-20 p-6 flex flex-col justify-end h-[420px] text-white">
//                             <div className="mb-4">
//                                 <h3 className="text-xl font-bold mb-1">{pkg.tour_name}</h3>

//                                 {/* Guide */}
//                                 <div className="flex items-center gap-2 text-sm mb-2">
//                                     <img
//                                         src={pkg.guide_photo}
//                                         alt={pkg.guide_name}
//                                         className="w-7 h-7 rounded-full object-cover"
//                                     />
//                                     <span>{pkg.guide_name}</span>
//                                 </div>

//                                 {/* Duration & Date */}
//                                 <p className="text-sm font-bold">🕓 Duration: {pkg.duration}</p>
//                                 <p className="text-sm font-bold">
//                                     📅 Departure:{" "}
//                                     {new Date(pkg.departure_date).toLocaleDateString("en-GB", {
//                                         day: "numeric",
//                                         month: "short",
//                                         year: "numeric",
//                                     })}
//                                 </p>
//                             </div>

//                             {/* Price */}
//                             <p className="text-lg font-bold mb-3">
//                                 ৳ {new Intl.NumberFormat("en-BD").format(pkg.price)}
//                             </p>

//                             {/* View Details with login check */}
//                             <Link
//                                 to={`/package-details/${pkg._id}`}
//                                 className=" text-white
//                             border font-semibold text-center rounded-full py-2 px-5 hover:bg-black/50 transition"
//                             >
//                                 View Details
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* No result message */}
//             {/* {
//                 packages.length === 0 && (
//                     <p className="text-center mt-10 text-gray-400 text-lg">No packages found.</p>
//                 )
//             } */}
//         </div >
//     );
// };

// export default AllPackages;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; // changed from 'react-router' to 'react-router-dom' if needed
import { useAuth } from '../context/AuthContext';
import { Search } from "lucide-react";

const AllPackages = () => {
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");  // New state for sorting
    const { user } = useAuth();

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const url = new URL('https://assignment11-teal.vercel.app/tour-packages');
                if (search) url.searchParams.append('search', search);
                if (sort) url.searchParams.append('sort', sort);

                const res = await axios.get(url.toString());
                setPackages(res.data);
            } catch (error) {
                console.error("Error fetching tours:", error);
            }
        };

        fetchTours();
    }, [search, sort]);

    if (packages.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-neutral"></div>
            </div>
        )
    };

    return (
        <div className="my-12 px-4 max-w-[1280px] mx-auto">
            {/* Top title, search bar, and sorting */}
            <div className='lg:flex justify-between items-center mb-10'>
                <h2 className="text-3xl font-bold text-center lg:text-left mb-6 lg:mb-0">
                    Featured Packages
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-80 h-10 flex items-center border-2 border-blue-300 rounded-xl shadow-lg focus-within:ring-2 focus-within:ring-blue-300">
                        <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-1 text-sm font-medium text-neutral bg-transparent placeholder-gray-500 rounded-xl focus:outline-none"
                            placeholder="Search by tour name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search by tour name"
                        />
                    </div>

                    {/* Sorting */}
                    <select
                        className="h-10 px-4 rounded-xl border border-blue-300 shadow-lg bg-transparent text-neutral text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        aria-label="Sort by price"
                    >
                        <option value="">Sort by Price</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {packages.map((pkg) => (
                    <div
                        key={pkg._id}
                        className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10 transition-transform duration-300 hover:scale-[1.02]"
                    >
                        {/* Image */}
                        <img
                            src={pkg.image}
                            alt={pkg.tour_name}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-10" />

                        {/* Card Content */}
                        <div className="relative z-20 p-6 flex flex-col justify-end h-[420px] text-white">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-1">{pkg.tour_name}</h3>

                                {/* Guide */}
                                <div className="flex items-center gap-2 text-sm mb-2">
                                    <img
                                        src={pkg.guide_photo}
                                        alt={pkg.guide_name}
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                    <span>{pkg.guide_name}</span>
                                </div>

                                {/* Duration & Date */}
                                <p className="text-sm font-bold">🕓 Duration: {pkg.duration}</p>
                                <p className="text-sm font-bold">
                                    📅 Departure:{" "}
                                    {new Date(pkg.departure_date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            {/* Price */}
                            <p className="text-lg font-bold mb-3">
                                ৳ {new Intl.NumberFormat("en-BD").format(pkg.price)}
                            </p>

                            {/* View Details */}
                            <Link
                                to={`/package-details/${pkg._id}`}
                                className="text-white border font-semibold text-center rounded-full py-2 px-5 hover:bg-black/50 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPackages;
