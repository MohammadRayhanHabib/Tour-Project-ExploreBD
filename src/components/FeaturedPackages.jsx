
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router"; // ✅ use react-router-dom
import { MousePointerClick, MoveRight } from "lucide-react"
const FeaturedPackages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios("https://assignment11-teal.vercel.app/tour-packages")
            .then((res) => setPackages(res.data.slice(0, 6)))
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    return (
        <div className="my-12 px-4 max-w-[1280px] mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Packages</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {packages.map((pkg) => (
                    <div
                        key={pkg._id}
                        className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10 transition-transform duration-300 hover:scale-[1.02]"
                    >
                        {/* Background image */}
                        <img
                            src={pkg.image}
                            alt={pkg.tour_name}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-10" />

                        {/* Card Content */}
                        <div className="relative z-20 p-6 flex flex-col justify-end h-[420px] text-white">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-1">{pkg.tour_name}</h3>

                                {/* Guide info */}
                                <div className="flex items-center gap-2 text-sm mb-2">
                                    <img
                                        src={pkg.guide_photo}
                                        alt={pkg.guide_name}
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                    <span>{pkg.guide_name}</span>
                                </div>

                                {/* Duration & Departure Date */}
                                <p className="text-sm font-bold">🕓 Duration : {pkg.duration}</p>
                                <p className="text-sm font-bold">📅 Departure Date : {pkg.departure_date}</p>
                            </div>

                            {/* Price */}
                            <p className="text-lg font-bold mb-3">৳{pkg.price} Tk.</p>

                            {/* Reserve / View Details Button */}
                            <Link
                                to={`/package-details/${pkg._id}`}
                                className=" text-white 
                                border font-semibold text-center rounded-full py-2 px-5 hover:bg-black/50 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show All Button */}
            <div className="text-center mt-10">
                {/* <Link

                    className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-black transition"
                >
                    Show All
                </Link> */}
                <Link to="/all-packages" class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-neutral rounded-full shadow-md group">
                    <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-neutral group-hover:translate-x-0 ease">
                        <MoveRight className="text-cyan-500" />
                    </span>
                    <span class="absolute flex items-center justify-center w-full h-full text-neutral transition-all duration-300 transform group-hover:translate-x-full ease">Show All <MousePointerClick className="ml-4" /></span>
                    <span class="relative invisible">Button Text</span>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedPackages;

