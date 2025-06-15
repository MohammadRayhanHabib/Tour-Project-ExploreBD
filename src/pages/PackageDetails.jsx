import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router';
import { motion } from "framer-motion";
import {
    ShoppingCart, Calendar, MapPin, Plane, CalendarDays, ShieldUser, Headset, Send, HeartCrack
} from "lucide-react";
import Loading from '../components/Loading';
// import BookingModal from '../components/BookingModal';

const PackageDetails = () => {
    const { id } = useParams();

    const [tour, setTour] = useState(null);
    // console.log(tour);

    useEffect(() => {
        axios(`http://localhost:3000/tour-packages/${id}`)
            .then(res => setTour(res.data))
            .catch(err => console.error("Failed to fetch tour package:", err));
    }, [id]);

    if (!tour) return <Loading />;

    const formattedDate = new Date(tour.departure_date).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
    });

    const formattedPrice = new Intl.NumberFormat("en-BD", {
        style: "currency", currency: "BDT", minimumFractionDigits: 0
    }).format(tour.price);

    return (
        <div className="font-sans bg-base-100 text-base-content min-h-screen">
            <main className="max-w-7xl mx-auto ">

                {/* 🔥 Hero Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative h-96 md:h-[500px] rounded-b-3xl bg-cover bg-center flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundImage: `url(${tour.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 rounded-b-3xl"></div>
                    <div className="relative text-center text-white p-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-md">
                            {tour.tour_name}
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-gray-200">
                            A trip to remember in <span className="text-white">{tour.destination}</span>
                        </p>
                    </div>
                </motion.div>

                {/* 💠 Main Content Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8 transform -translate-y-24"
                >
                    {/* 📄 Left Column */}
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className=" lg:col-span-2 bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-2xl shadow-xl  "
                    >
                        <h2 className="text-3xl font-bold mb-6 text-white border-b-2 border-neutral pb-3">
                            Package Details
                        </h2>
                        <p className="text-white leading-relaxed mb-8">{tour.package_details}</p>

                        <div className="space-y-4 ">
                            <Detail icon={<Calendar className="w-5 h-5 text-white" />} label="Duration" value={tour.duration} />
                            <Detail icon={<MapPin className="w-5 h-5" />} label="Destination" value={tour.destination} />
                            <Detail icon={<Plane className="w-5 h-5" />} label="Departure" value={tour.departure_location} />
                            <Detail icon={<CalendarDays className="w-5 h-5" />} label="Departure Date" value={formattedDate} />
                            {/* <Detail icon={<Navigation className="w-5 h-5" />} label="Bookings" value={tour.bookingCount} /> */}


                            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e1e2f] to-[#111117] border border-[#2a2a3b] shadow-md p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-800/30">
                                {/* Glow border hover effect */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-600/30 transition duration-300 pointer-events-none"></div>

                                {/* Icon container with subtle glowing effect */}
                                <div className="p-3 rounded-xl bg-purple-700/10 text-purple-400 border border-purple-500/20 shadow-inner shadow-purple-800/20 group-hover:shadow-purple-600/30 transition-all">
                                    <HeartCrack className="w-6 h-6" />
                                </div>

                                {/* Text content */}
                                <div>
                                    <div className="text-sm text-gray-400  tracking-wider font-semibold">Bookings</div>
                                    <div className="text-3xl font-bold text-white">{tour.bookingCount || 0}</div>
                                </div>
                            </div>



                        </div>
                    </motion.div>

                    {/* 🧾 Right Column */}
                    <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        {/* 💸 Price Box */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-2xl shadow-lg text-center"
                        >
                            <p className="text-lg opacity-90">Starting From</p>
                            <p className="text-4xl font-bold my-2 ">{formattedPrice} </p>
                            <p className="text-sm opacity-70 mb-6">per person</p>

                            <Link
                                to={`/booking-page/${tour._id}`}>
                                <motion.button

                                    className="btn border-0 rounded-2xl bg-gray-950 btn-accent btn-block btn-lg text-white flex items-center justify-center gap-2 relative overflow-hidden"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px #000000", "0 0 20px #ffff", "0 0 0px #f472b6"] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut",
                                    }}
                                    whileHover={{
                                        scale: 1.07,
                                        backgroundColor: "#000000",
                                        transition: { duration: 0.3 },
                                    }}
                                >




                                    Book Now


                                </motion.button>
                            </Link>

                        </motion.div>

                        {/* 👨‍🏫 Guide Info */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="card  shadow-xl  border-gray-100 bg-gradient-to-br from-primary to-secondary"
                        >
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-white mb-2"><ShieldUser />Your Guide</h2>

                                {/* Avatar with glow + fly-in */}
                                <motion.div
                                    initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                                    className="avatar my-4 "
                                >
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg shadow-purple-400 dark:shadow-purple-800">
                                        <motion.img
                                            src={tour.guide_photo}
                                            alt={`Photo of ${tour.guide_name}`}
                                            whileHover={{ rotate: 2, scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                    </div>
                                </motion.div>

                                <motion.h3
                                    className="text-xl font-semibold text-white"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {tour.guide_name}
                                </motion.h3>
                                <p className="text-white flex gap-1"><Send />{tour.guide_email}</p>
                                <p className="text-white flex gap-1"><Headset />{tour.guide_contact_no}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </main>
        </div >
    );
};

const Detail = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3 text-base text-white">
        <div className="text-white">{icon}</div>
        <p><strong>{label}:</strong> {value}</p>
    </div>
);

export default PackageDetails;

