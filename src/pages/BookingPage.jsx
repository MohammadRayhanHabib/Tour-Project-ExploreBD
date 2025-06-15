import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';

const BookingPage = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const [tour, setTour] = useState([])
    const [notes, setNotes] = useState("")
    const navigate = useNavigate('')
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/tour-packages/${id}`);
                setTour(res.data);
            } catch (error) {
                console.error("Failed to fetch tour:", error);
            }
        };
        fetchTour();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault()

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
            const res = await axios.post("http://localhost:3000/bookings", bookingData);
            if (res.data.insertedId) {
                Swal.fire("Success", "Booking Submitted!", "success");
                setNotes("");
                navigate(`/package-details/${tour._id}`)
            }
        } catch (error) {
            console.error("Booking failed:", error);
            Swal.fire("Error", "Could not submit booking", "error");
        }

    }
    return (
        <div>
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Book Now: {tour.tour_name}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" value={tour.tour_name} readOnly className="input input-bordered w-full bg-gray-100" />
                    <input type="text" value={`${tour.price} BDT`} readOnly className="input input-bordered w-full bg-gray-100" />
                    <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-gray-100" />
                    <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-gray-100" />
                    <input type="text" value={new Date().toLocaleDateString()} readOnly className="input input-bordered w-full bg-gray-100" />

                    <textarea
                        placeholder="Special Note (Optional)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    ></textarea>

                    <button type="submit" className="btn btn-primary w-full">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
