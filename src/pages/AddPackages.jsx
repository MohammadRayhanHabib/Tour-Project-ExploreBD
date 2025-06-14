import { useState } from "react";

import axios from "axios"
import { useAuth } from "../context/AuthContext";
const AddPackages = () => {
    const { user } = useAuth(); // Must include displayName, email, photoURL
    const [formData, setFormData] = useState({
        tour_name: "",
        image: "",
        duration: "",
        departure_location: "",
        destination: "",
        price: "",
        departure_date: "",
        package_details: "",
        contactNo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPackage = {
            ...formData,
            price: parseFloat(formData.price),
            guide_name: user?.displayName || "Unknown",
            guide_email: user?.email || "N/A",
            guide_photo: user?.photoURL || "",
        };

        // TODO: Replace with your fetch/axios POST request
        axios.post('http://localhost:3000/tour-packages', newPackage)
            .then(res => {
                console.log(res.data);

            })
        console.log("Submitted Package:", newPackage);
        // Show toast on success (e.g., react-hot-toast or SweetAlert2)
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Add Tour Package</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="tour_name" placeholder="Tour Name" required onChange={handleChange} className="input input-bordered w-full" />
                <input type="text" name="image" placeholder="Image URL" required onChange={handleChange} className="input input-bordered w-full" />
                <input type="text" name="duration" placeholder="Duration (e.g., 3 Days 2 Nights)" required onChange={handleChange} className="input input-bordered w-full" />
                <input type="text" name="departure_location" placeholder="Departure Location" required onChange={handleChange} className="input input-bordered w-full" />
                <input type="text" name="destination" placeholder="Destination" required onChange={handleChange} className="input input-bordered w-full" />
                <input type="number" name="price" placeholder="Price" required onChange={handleChange} className="input input-bordered w-full" />
                <input type="date" name="departure_date" required onChange={handleChange} className="input input-bordered w-full" />
                <input type="text" name="contactNo" placeholder="Contact No." required onChange={handleChange} className="input input-bordered w-full" />
                <textarea name="package_details" placeholder="Package Details" required rows="3" onChange={handleChange} className="textarea textarea-bordered w-full col-span-1 md:col-span-2" />

                {/* Guide Info (Read-only) */}
                <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered bg-gray-100 w-full" />
                <input type="email" value={user?.email || ""} readOnly className="input input-bordered bg-gray-100 w-full" />
                <div className="flex items-center space-x-4 mt-2 col-span-1 md:col-span-2">
                    <span className="font-medium">Guide Photo:</span>
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Guide" className="w-12 h-12 rounded-full border" />
                    ) : (
                        <span>No photo</span>
                    )}
                </div>

                <button type="submit" className="btn btn-primary col-span-1 md:col-span-2 mt-4">Submit Package</button>
            </form>
        </div>
    );
};

export default AddPackages;

