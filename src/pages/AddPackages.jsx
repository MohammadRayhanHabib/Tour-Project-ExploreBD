import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const AddPackages = () => {
    const { user } = useAuth();

    const initialFormData = {
        tour_name: "",
        image: "",
        duration: "",
        departure_location: "",
        destination: "",
        price: "",
        departure_date: "",
        package_details: "",
        guide_contact_no: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [activeTab, setActiveTab] = useState("form");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPackage = {
            ...formData,
            price: parseFloat(formData.price),
            guide_contact_no: parseInt(formData.guide_contact_no),
            guide_name: user?.displayName || "Unknown",
            guide_email: user?.email || "N/A",
            guide_photo: user?.photoURL || "",
        };

        try {
            const res = await axios.post("http://localhost:3000/tour-packages", newPackage);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Package Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFormData(initialFormData);
            }
        } catch (error) {
            console.error("Error adding package:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://i.pinimg.com/736x/2c/8e/39/2c8e3992dd190f14e5fb5d52bbe11a1a.jpg')` }}>
            <div className="bg-black/80 backdrop-blur-xs rounded-xl shadow-2xl max-w-6xl w-full">

                {/* Dropdown Tabs */}
                <div className="flex justify-center gap-6 pt-6">
                    <button onClick={() => setActiveTab("guide")} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "guide" ? "bg-white text-black" : "bg-black text-white border border-white"}`}>Guide Info</button>
                    <button onClick={() => setActiveTab("form")} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "form" ? "bg-white text-black" : "bg-black text-white border border-white"}`}>Tour Form</button>
                </div>

                <div className="p-10">
                    {activeTab === "guide" && (
                        <div className="text-white text-center space-y-6">
                            <div>
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Guide" className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-xl" />
                                ) : (
                                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 flex items-center justify-center text-gray-600">No Photo</div>
                                )}
                            </div>
                            <h2 className="text-xl font-bold">{user?.displayName || "Unknown Guide"}</h2>
                            <p className="text-sm font-medium">Email: {user?.email || "Not Provided"}</p>
                        </div>
                    )}

                    {activeTab === "form" && (
                        <>
                            <h2 className="text-3xl font-bold text-center text-white mb-8">Add Tour Package</h2>
                            {/* <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-10 p-2 rounded-xl text-black w-full">
                                <input type="text" name="tour_name" placeholder="Tour Name" required onChange={handleChange} value={formData.tour_name} className="input input-bordered bg-white/80" />
                                <input type="text" name="image" placeholder="Image URL" required onChange={handleChange} value={formData.image} className="input input-bordered bg-white/80" />
                                <input type="text" name="duration" placeholder="Duration (e.g., 3 Days 2 Nights)" required onChange={handleChange} value={formData.duration} className="input input-bordered bg-white/80" />
                                <input type="text" name="departure_location" placeholder="Departure Location" required onChange={handleChange} value={formData.departure_location} className="input input-bordered bg-white/80" />
                                <input type="text" name="destination" placeholder="Destination" required onChange={handleChange} value={formData.destination} className="input input-bordered bg-white/80" />
                                <input type="number" name="price" placeholder="Price" required onChange={handleChange} value={formData.price} className="input input-bordered bg-white/80" />
                                <input type="date" name="departure_date" required onChange={handleChange} value={formData.departure_date} className="input input-bordered bg-white/80" />
                                <input type="text" name="guide_contact_no" placeholder="Contact No." required onChange={handleChange} value={formData.guide_contact_no} className="input input-bordered bg-white/80 " />
                                <textarea name="package_details" placeholder="Package Details" required onChange={handleChange} value={formData.package_details} className="textarea textarea-bordered w-full   md:col-span-2 bg-white/80 " />
                                <button type="submit" className="btn btn-white text-black md:col-span-2 w-full">Submit Package</button>
                            </form> */}

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-10 p-2 rounded-xl text-black w-full"
                            >
                                <input type="text" name="tour_name" placeholder="Tour Name" required onChange={handleChange} value={formData.tour_name} className="input input-bordered bg-white/80 w-full" />
                                <input type="text" name="image" placeholder="Image URL" required onChange={handleChange} value={formData.image} className="input input-bordered bg-white/80 w-full" />
                                <input type="text" name="duration" placeholder="Duration (e.g., 3 Days 2 Nights)" required onChange={handleChange} value={formData.duration} className="input input-bordered bg-white/80 w-full" />
                                <input type="text" name="departure_location" placeholder="Departure Location" required onChange={handleChange} value={formData.departure_location} className="input input-bordered bg-white/80 w-full" />
                                <input type="text" name="destination" placeholder="Destination" required onChange={handleChange} value={formData.destination} className="input input-bordered bg-white/80 w-full" />
                                <input type="number" name="price" placeholder="Price" required onChange={handleChange} value={formData.price} className="input input-bordered bg-white/80 w-full" />
                                <input type="date" name="departure_date" required onChange={handleChange} value={formData.departure_date} className="input input-bordered bg-white/80 w-full" />
                                <input type="text" name="guide_contact_no" placeholder="Contact No." required onChange={handleChange} value={formData.guide_contact_no} className="input input-bordered bg-white/80 w-full" />

                                {/* Textarea takes full width */}
                                <textarea name="package_details" placeholder="Package Details" required onChange={handleChange} value={formData.package_details} className="textarea textarea-bordered bg-white/80 w-full md:col-span-2" />

                                {/* Submit button takes full width too */}
                                <button type="submit" className="btn btn-white text-black w-full md:col-span-2">
                                    Submit Package
                                </button>
                            </form>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPackages;

