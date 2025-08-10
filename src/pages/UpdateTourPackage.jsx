import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { UserCircle, Trash2, Upload } from "lucide-react";
import { useParams, useNavigate } from "react-router";

const UpdateTourPackage = () => {
    const { user } = useAuth();
    const { id } = useParams();


    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const res = await axios.get(`https://assignment11-teal.vercel.app/tour-packages/${id}`);
                setFormData(res.data);
            } catch (err) {
                console.error("Failed to fetch tour data:", err);
            }
        };
        fetchTourData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPackage = {
            ...formData,
            price: parseFloat(formData.price),
            // bookingCount: parseInt(formData.bookingCount),
            bookingCount: Number.isInteger(parseInt(formData.bookingCount))
                ? parseInt(formData.bookingCount)
                : 0,
            guide_contact_no: parseInt(formData.guide_contact_no),
            guide_name: user?.displayName || "Unknown",
            guide_email: user?.email || "N/A",
            guide_photo: user?.photoURL || "",
        };

        try {
            await axios.patch(`https://assignment11-teal.vercel.app/tour-packages/${id}`, updatedPackage);
            Swal.fire({
                icon: "success",
                title: "Package Updated!",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            console.error("Update failed:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message,
            });
        }
    };

    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the package!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://assignment11-teal.vercel.app/tour-packages/${id}`);
                    Swal.fire("Deleted!", "The package has been deleted.", "success");
                    navigate("/manage-my-packages");
                } catch (err) {
                    Swal.fire("Failed!", "Failed to delete package.", "error", err);
                }
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 ">
            <div className="bg-teal-900 rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden">
                <div className="flex justify-center gap-4 pt-6">
                    <button
                        onClick={() => setActiveTab("guide")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "guide"
                            ? "bg-white text-teal-800 shadow-lg"
                            : "text-white border border-white hover:bg-white hover:text-teal-800"
                            }`}
                    >
                        Guide Info
                    </button>
                    <button
                        onClick={() => setActiveTab("form")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "form"
                            ? "bg-white text-teal-800 shadow-lg"
                            : "text-white border border-white hover:bg-white hover:text-teal-800"
                            }`}
                    >
                        Tour Form
                    </button>
                </div>

                <div className="p-8">
                    {activeTab === "guide" && (
                        <div className="text-center text-white space-y-6">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Guide"
                                    className="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-xl"
                                />
                            ) : (
                                <div className="w-28 h-28 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
                                    <UserCircle className="w-12 h-12 text-white" />
                                </div>
                            )}
                            <h2 className="text-2xl font-bold">{user?.displayName || "Unknown Guide"}</h2>
                            <p className="text-sm">
                                Email: <span className="text-teal-300">{user?.email || "Not Provided"}</span>
                            </p>
                        </div>
                    )}

                    {activeTab === "form" && (
                        <>
                            <h2 className="text-3xl text-center font-bold text-white mb-8">Update Tour Package</h2>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: "tour_name", placeholder: "Tour Name" },
                                    { name: "image", placeholder: "Image URL" },
                                    { name: "duration", placeholder: "Duration" },
                                    { name: "departure_location", placeholder: "Departure Location" },
                                    { name: "destination", placeholder: "Destination" },
                                    { name: "price", placeholder: "Price", type: "number" },
                                    { name: "departure_date", type: "date" },
                                    { name: "guide_contact_no", placeholder: "Contact No." }
                                ].map(({ name, placeholder, type = "text" }) => (
                                    <input
                                        key={name}
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        required
                                        value={formData[name] || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full bg-teal-700 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-teal-300"
                                    />
                                ))}

                                <textarea
                                    name="package_details"
                                    placeholder="Package Details"
                                    required
                                    value={formData.package_details || ""}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered md:col-span-2 w-full bg-teal-700 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-teal-300"
                                    rows={4}
                                />

                                <div className="md:col-span-2 flex flex-col md:flex-row justify-between gap-4">
                                    <button
                                        type="submit"
                                        className="bg-white text-teal-800 flex items-center justify-center gap-2 flex-1 font-semibold py-3 rounded-xl shadow-lg hover:bg-teal-200 transition-all duration-300 hover:scale-105"
                                    >
                                        <Upload className="w-5 h-5" />
                                        Update Package
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-500 flex items-center justify-center gap-2 flex-1 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        Delete Package
                                    </button>
                                </div>

                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateTourPackage;
