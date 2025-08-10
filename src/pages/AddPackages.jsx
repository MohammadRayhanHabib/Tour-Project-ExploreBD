import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { UserCircle } from "lucide-react";

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
        bookingCount: 0,
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
            bookingCount: parseInt(formData.bookingCount),
            guide_contact_no: parseInt(formData.guide_contact_no),
            guide_name: user?.displayName || "Unknown",
            guide_email: user?.email || "N/A",
            guide_photo: user?.photoURL || "",
        };

        try {
            const res = await axios.post("https://assignment11-teal.vercel.app/tour-packages", newPackage);
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
        <div className="min-h-screen flex items-center justify-center  p-6">
            <div className="bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1e] to-[#0f0f0f]  rounded-3xl  shadow-2xl max-w-6xl w-full overflow-hidden">

                {/* Tabs */}
                <div className="flex justify-center gap-4 pt-6">
                    <button
                        onClick={() => setActiveTab("guide")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "guide"
                            ? "bg-purple-600 text-white shadow-lg"
                            : "text-purple-400 border border-purple-700 hover:bg-purple-700/20"
                            }`}
                    >
                        Guide Info
                    </button>
                    <button
                        onClick={() => setActiveTab("form")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "form"
                            ? "bg-purple-600 text-white shadow-lg"
                            : "text-purple-400 border border-purple-700 hover:bg-purple-700/20"
                            }`}
                    >
                        Tour Form
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 ">
                    {activeTab === "guide" && (
                        <div className="text-center text-white space-y-6 animate-fade-in">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Guide"
                                    className="w-28 h-28 mx-auto rounded-full border-4 border-purple-500 shadow-xl"
                                />
                            ) : (
                                <div className="w-28 h-28 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
                                    <UserCircle className="w-12 h-12 text-white" />
                                </div>
                            )}
                            <h2 className="text-2xl font-bold">{user?.displayName || "Unknown Guide"}</h2>
                            <p className="text-sm">Email: <span className="text-purple-400">{user?.email || "Not Provided"}</span></p>
                        </div>
                    )}

                    {activeTab === "form" && (
                        <>
                            <h2 className="text-3xl text-center font-bold text-white mb-8">
                                Add Tour Package
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {[
                                    { name: "tour_name", placeholder: "Tour Name" },
                                    { name: "image", placeholder: "Image URL" },
                                    { name: "duration", placeholder: "Duration (e.g., 3 Days 2 Nights)" },
                                    { name: "departure_location", placeholder: "Departure Location" },
                                    { name: "destination", placeholder: "Destination" },
                                    { name: "price", placeholder: "Price", type: "number" },
                                    { name: "departure_date", type: "date" },
                                    { name: "guide_contact_no", placeholder: "Contact No." },
                                ].map(({ name, placeholder, type = "text" }) => (
                                    <input
                                        key={name}
                                        name={name}
                                        type={type}
                                        placeholder={placeholder || ""}
                                        required
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="input input-bordered w-full bg-[#2a2a2e] border border-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ))}

                                <textarea
                                    name="package_details"
                                    placeholder="Package Details"
                                    required
                                    value={formData.package_details}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered md:col-span-2 w-full bg-[#2a2a2e] border border-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    rows={4}
                                />

                                <button
                                    type="submit"
                                    className="md:col-span-2 bg-purple-700 hover:bg-purple-600 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105"
                                >
                                    🚀 Submit Package
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



