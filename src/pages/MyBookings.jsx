import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import {
    CheckCircle,
    Phone,
    MapPin,
    Calendar,
    User,
    Plane,
} from "lucide-react";

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(bookings.);

    useEffect(() => {
        if (!user) return;

        const fetchBookings = async () => {
            try {
                const res = await axios.get(`https://assignment11-teal.vercel.app/bookings/${user?.email}`);
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
            await axios.patch(`https://assignment11-teal.vercel.app/bookings/${bookingId}`, {
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


    // if (loading)
    //     return <p className="text-teal-400 text-center mt-10">Loading your bookings...</p>;

    if (bookings.length === 0) {


        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-neutral"></div>
            </div>
            // <div className="flex justify-center items-center min-h-screen bg-base-200">
            //     <span className="loading loading-spinner text-primary"></span>
            // </div>

        )

    };



    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-neutral mb-6 text-center">📋 My Bookings</h2>
            <ul className="list bg-base-200 rounded-box shadow-md divide-y divide-base-300">
                {bookings.map((booking) => (
                    <li
                        key={booking._id}
                        className="list-row py-4 px-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6"
                    >
                        <div className="flex-shrink-0 bg-base-100 p-3 rounded-lg">
                            <Plane className="text-teal-400 size-6" />
                        </div>

                        <div className="flex-1 space-y-2">
                            <div>
                                <div className="font-semibold text-lg text-black">{booking.tour_name}</div>
                                <div className="text-xs uppercase text-gray-600 tracking-wide">
                                    Destination: {booking.destination}
                                </div>
                            </div>

                            <p className="text-sm text-black flex items-center gap-2">
                                <User className="size-4 text-gray-500" />
                                Guide Name : {booking.guide_name}
                            </p>



                            {booking.notes && (
                                <p className="text-sm ">
                                    📝 <span className="italic text-black">{booking.notes}</span>
                                </p>
                            )}

                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <Calendar className="size-4" />
                                Departure Date :
                                {new Date(booking.departure_date).toLocaleDateString()}
                                <span className="mx-1">|</span>
                                <MapPin className="size-4" />
                                Departure location : {booking.departure_location}
                            </p>

                            {/* {booking.special_note && (
                                <p className="text-xs italic text-yellow-500">📌 Note: {booking.notes}</p>
                            )} */}

                            <div className="mt-2">
                                {booking.status === "completed" ? (
                                    <span className="text-green-500 flex items-center gap-2 font-semibold">
                                        <CheckCircle className="size-4" />
                                        Completed
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handleConfirm(booking._id)}
                                        className="btn btn-sm bg-cyan-500 hover:bg-gray-400 text-white"
                                    >
                                        Pending - Click to Confirm
                                    </button>

                                )}
                                <p>{booking._id}</p>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyBookings;
