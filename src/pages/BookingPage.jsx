import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
    CalendarDays,
    User,
    Mail,
    FileText,
    MapPin,
    StickyNote,
    DollarSign,
} from "lucide-react";

const BookingPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [tour, setTour] = useState({});
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`https://assignment11-teal.vercel.app/tour-packages/${id}`);
                setTour(res.data);
            } catch (error) {
                console.error("Failed to fetch tour:", error);
            }
        };
        fetchTour();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            tour_id: id,
            tour_name: tour.tour_name,
            guide_name: tour.guide_name,
            guide_email: tour.guide_email,
            buyer_name: user?.displayName,
            buyer_email: user?.email,
            booking_date: new Date(),
            departure_date: tour.departure_date,
            departure_location: tour.departure_location,
            destination: tour.destination,
            notes,
            status: "pending",
        };

        try {
            const res = await axios.post("https://assignment11-teal.vercel.app/bookings", bookingData);
            if (res.data.insertedId) {
                Swal.fire("Success", "Booking Submitted!", "success");
                setNotes("");
                navigate(`/package-details/${tour._id}`);
            }
        } catch (error) {
            console.error("Booking failed:", error);
            Swal.fire("Error", "Could not submit booking", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
            {/* Optional animated floating shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="w-20 h-20 bg-purple-600 rounded-full opacity-20 animate-pulse absolute top-10 left-10 blur-3xl"></div>
                <div className="w-32 h-32 bg-teal-400 rounded-full opacity-10 animate-ping absolute bottom-20 right-20 blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-2xl mx-auto bg-black/70 backdrop-blur-md border border-gray-700 shadow-2xl rounded-3xl p-10"
            >
                <h2 className="text-3xl font-bold text-center mb-8 text-white">
                    Book Now: <span className="text-teal-400">{tour.tour_name}</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5 text-white">
                    {/* Tour Name */}
                    <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl">
                        <FileText className="text-teal-400" />
                        <input
                            type="text"
                            value={tour.tour_name || ""}
                            readOnly
                            className="bg-transparent w-full outline-none text-white"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl">
                        <DollarSign className="text-teal-400" />
                        <input
                            type="text"
                            value={`${tour.price || 0} BDT`}
                            readOnly
                            className="bg-transparent w-full outline-none text-white"
                        />
                    </div>

                    {/* Buyer Name */}
                    <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl">
                        <User className="text-teal-400" />
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="bg-transparent w-full outline-none text-white"
                        />
                    </div>

                    {/* Buyer Email */}
                    <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl">
                        <Mail className="text-teal-400" />
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="bg-transparent w-full outline-none text-white"
                        />
                    </div>

                    {/* Booking Date */}
                    <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl">
                        <CalendarDays className="text-teal-400" />
                        <input
                            type="text"
                            value={new Date().toLocaleDateString()}
                            readOnly
                            className="bg-transparent w-full outline-none text-white"
                        />
                    </div>

                    {/* Notes */}
                    <div className="flex items-start gap-3 bg-gray-800 px-4 py-3 rounded-xl">
                        <StickyNote className="text-teal-400 mt-1" />
                        <textarea
                            placeholder="Special Note (Optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-transparent w-full outline-none text-white resize-none"
                            rows={3}
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-xl font-semibold shadow-md transition-all duration-300"
                    >
                        Confirm Booking
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default BookingPage;

