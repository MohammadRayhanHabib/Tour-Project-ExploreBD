import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import {
    Calendar,
    MapPin,
    Navigation,
    CalendarDays
} from "lucide-react";
import Loading from '../components/Loading';

const PackageDetails = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);

    useEffect(() => {
        axios(`http://localhost:3000/tour-packages/${id}`)
            .then(res => setTour(res.data))
            .catch(err => console.error("Failed to fetch tour package:", err));
    }, [id]);

    if (!tour) {
        return (
            <Loading></Loading>
        );
    }

    const formattedDate = new Date(tour.departure_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    const formattedPrice = new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 0
    }).format(tour.price);

    return (
        <div className=" font-sans">
            <main className="max-w-7xl mx-auto">
                {/* Hero Banner */}
                <div
                    className="relative h-96 md:h-[500px] rounded-b-3xl bg-cover bg-center flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundImage: `url(${tour.image})` }}
                >
                    <div className="absolute inset-0 bg-black/50 rounded-b-3xl"></div>
                    <div className="relative text-center text-neutral p-4">
                        <h1 className="text-4xl text-white md:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-md">
                            {tour.tour_name}
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-primary-content/90">
                            A trip to remember in {tour.destination}
                        </p>
                    </div>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8 transform -translate-y-24">
                    {/* Left Content */}
                    <div className="border-gray-50 border   lg:col-span-2 bg-base-100 p-6 md:p-8 rounded-2xl shadow-xl">
                        <h2 className="text-3xl font-bold mb-6 border-b-2 border-primary pb-3">Package Details</h2>
                        <p className="text-base-content/80 leading-relaxed mb-8">{tour.package_details}</p>

                        <div className="space-y-4">
                            <Detail icon={<Calendar className="w-5 h-5" />} label="Duration" value={tour.duration} />
                            <Detail icon={<MapPin className="w-5 h-5" />} label="Destination" value={tour.destination} />
                            <Detail icon={<Navigation className="w-5 h-5" />} label="Departure" value={tour.departure_location} />
                            <Detail icon={<CalendarDays className="w-5 h-5" />} label="Departure Date" value={formattedDate} />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-8   ">
                        <div className=" border-gray-50 border  bg-base-100 p-6 rounded-2xl shadow-2xl text-center ">
                            <p className="text-lg text-base-content/70">Starting From</p>
                            <p className="text-5xl font-bold text-neutral my-2">{formattedPrice}</p>
                            <p className="text-sm text-base-content/60 mb-6">per person</p>
                            <button className="btn bg-black/50 text-neutral btn-block btn-lg">Book Now</button>
                        </div>

                        <div className="card bg-base-100 shadow-xl ">
                            <div className="card-body items-center text-center border-gray-50 border rounded-xl">
                                <h2 className="card-title">Your Guide</h2>
                                <div className="avatar my-4">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={tour.guide_photo} alt={`Photo of ${tour.guide_name}`} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold">{tour.guide_name}</h3>
                                <p className="text-base-content/70">{tour.guide_email}</p>
                                <p className="text-base-content/70">{tour.guide_contact_no}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const Detail = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3 text-base text-base-content/90">
        <div className="text-primary">{icon}</div>
        <p><strong>{label}:</strong> {value}</p>
    </div>
);

export default PackageDetails;
