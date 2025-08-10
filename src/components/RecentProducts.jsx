import React, { useEffect, useState } from "react";
import { Package, Gift, MessageCircle } from "lucide-react";

// The base URL for the API.


// Recent Products Component
const RecentProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added state to handle errors

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://assignment11-teal.vercel.app/products`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products.");
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // The empty dependency array ensures this runs only once on mount.

    // Conditional Rendering based on state
    return (
        <section className="w-full px-6 py-20  text-black">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-extrabold mb-6 tracking-tight">
                    Recent <span className="text-teal-400">Products</span>
                </h2>
                <p className="text-neutral-400 text-lg mb-14 max-w-2xl mx-auto">
                    Check out the latest additions to our collection. Crafted with quality and care.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map(({ _id, name, description }) => (
                        <div
                            key={_id}
                            className="bg-[#1a2639] border border-teal-500/20 rounded-2xl p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <Package className="w-12 h-12 text-teal-400 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2 text-teal-400">{name}</h3>
                            <p className="text-white text-sm">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentProducts;