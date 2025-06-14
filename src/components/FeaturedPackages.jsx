import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedPackages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios("http://localhost:3000/tour-packages")

            .then((res) => setPackages(res.data.slice(0, 6)))
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    return (
        <div className="my-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Packages</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div key={pkg._id} className="card bg-base-100 shadow-xl">
                        <figure><img src={pkg.image} alt={pkg.tour_name} className="h-52 w-full object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{pkg.tour_name}</h2>
                            <div className="flex items-center gap-2">
                                <img src={pkg.guide_photo} className="w-8 h-8 rounded-full" />
                                <span className="text-sm">{pkg.guide_name}</span>
                            </div>
                            <p>🕓 {pkg.duration}</p>
                            <p>📅 {pkg.departure_date}</p>
                            <p>💰 ${pkg.price}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/package/${pkg._id}`} className="btn btn-sm btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <Link to="/all-packages" className="btn btn-outline btn-secondary">Show All</Link>
            </div>
        </div>
    );
};

export default FeaturedPackages;
