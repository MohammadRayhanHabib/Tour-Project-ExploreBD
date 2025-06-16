import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch bookings made by logged-in user
    useEffect(() => {
        if (!user) return;

        const fetchBookings = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/bookings/${user?.email}`);
                setBookings(res.data);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const handleConfirm = async (bookingId) => {
        try {
            await axios.patch(`http://localhost:3000/bookings/${bookingId}`, {
                status: "completed",
            });
            Swal.fire({
                icon: "success",
                title: "Booking Confirmed!",
                toast: true,
                position: "top-end",
                timer: 1500,
                showConfirmButton: false,
            });
            // Update locally after confirmation
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === bookingId ? { ...b, status: "completed" } : b
                )
            );
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to confirm booking",
                text: error.message,
            });
        }
    };

    if (loading) return <p className="text-teal-400 text-center mt-10">Loading your bookings...</p>;

    if (!bookings.length)
        return <p className="text-teal-400 text-center mt-10">No bookings found.</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-teal-900 min-h-screen rounded-lg">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">My Bookings</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-teal-800 rounded-lg overflow-hidden">
                    <thead className="bg-teal-700 text-white">
                        <tr>
                            <th className="text-left py-3 px-6">Tour Name</th>
                            <th className="text-left py-3 px-6">Guide Name + Contact</th>
                            <th className="text-left py-3 px-6">Departure Date</th>
                            <th className="text-left py-3 px-6">Departure Location</th>
                            <th className="text-left py-3 px-6">Destination</th>
                            <th className="text-left py-3 px-6">Special Note</th>
                            <th className="text-center py-3 px-6">Status / Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr
                                key={booking.id}
                                className="border-b border-teal-600 even:bg-teal-900"
                            >
                                <td className="py-3 px-6 text-white">{booking.tour_name}</td>
                                <td className="py-3 px-6 text-white">
                                    {booking.guide_name}
                                    <br />
                                    <a
                                        href={`tel:${booking.guide_contact_no}`}
                                        className="text-teal-300 underline"
                                    >
                                        {booking.guide_contact_no}
                                    </a>
                                </td>
                                <td className="py-3 px-6 text-white">
                                    {new Date(booking.departure_date).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-6 text-white">{booking.departure_location}</td>
                                <td className="py-3 px-6 text-white">{booking.destination}</td>
                                <td className="py-3 px-6 text-white">{booking.special_note || "-"}</td>
                                <td className="py-3 px-6 text-center">
                                    {booking.status === "completed" ? (
                                        <span className="text-green-400 font-semibold">Completed</span>
                                    ) : (
                                        <button
                                            onClick={() => handleConfirm(booking.id)}
                                            className="bg-teal-500 hover:bg-teal-400 text-white py-1 px-4 rounded transition"
                                        >
                                            Confirm
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;
