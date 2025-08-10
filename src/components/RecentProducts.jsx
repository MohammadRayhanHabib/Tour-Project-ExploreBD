import React, { useEffect, useState } from "react";
import { Package, Gift, MessageCircle } from "lucide-react";

const API_BASE = "https://assignment11-teal.vercel.app"; // Change this if your backend URL is different

// Recent Products Component
const RecentProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/products`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading)
        return <p className="text-center text-white mt-10">Loading products...</p>;

    retur
        < section className = "w-full px-6 py-20 bg-[#0f172a]" >
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-neutral">
                    Recent <span className="text-teal-400">Products</span>
                </h2>
                <p className="text-neutral/70 text-lg mb-14 max-w-2xl mx-auto">
                    Check out the latest additions to our collection. Crafted with quality
                    and care.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map(({ _id, name, description }) => (
                        <div
                            key={_id}
                            className="bg-[#1a2639] border border-teal-500/20 rounded-2xl p-8 hover:shadow-xl transition-all"
                        >
                            <Package className="w-12 h-12 text-teal-400 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2 text-teal-400">{name}</h3>
                            <p className="text-white text-sm">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
    </section >
    );
};

export default RecentProducts;