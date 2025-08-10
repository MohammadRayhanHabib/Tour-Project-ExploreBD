import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const ReviewsTestimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://assignment11-teal.vercel.app/reviews`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);



    return (
        <section className="w-full px-6 py-20 ">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-neutral">
                    Reviews & <span className="text-rose-400">Testimonials</span>
                </h2>
                <p className="text-neutral/70 text-lg mb-14 max-w-2xl mx-auto">
                    Hear from our happy travelers and customers who love our service.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {reviews.map(({ _id, name, comment }) => (
                        <div
                            key={_id}
                            className="bg-[#1a2639] border border-rose-400/20 rounded-2xl p-8 hover:shadow-xl  transform transition-transform duration-300 hover:scale-105 "
                        >
                            <MessageCircle className="w-12 h-12 text-rose-400 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2 text-rose-400">{name}</h3>
                            <p className="text-white text-sm italic">"{comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
};
export default ReviewsTestimonials;