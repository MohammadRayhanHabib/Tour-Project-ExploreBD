import { Gift } from "lucide-react";
import { useEffect, useState } from "react";

const SalesOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://assignment11-teal.vercel.app/offers`)
            .then((res) => res.json())
            .then((data) => {
                setOffers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading)
        return <p className="text-center text-white mt-10">Loading offers...</p>;

    return (
        <section className="w-full px-6 py-20 ">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-neutral">
                    Sales & <span className="text-yellow-400">Offers</span>
                </h2>
                <p className="text-neutral/70 text-lg mb-14 max-w-2xl mx-auto">
                    Don’t miss out on our best deals. Grab your favorites while they last!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {offers.map(({ _id, title, description }) => (
                        <div
                            key={_id}
                            className="bg-[#1a2639] border border-yellow-400/20 rounded-2xl p-8   transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <Gift className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                                {title}
                            </h3>
                            <p className="text-white text-sm">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SalesOffers;
