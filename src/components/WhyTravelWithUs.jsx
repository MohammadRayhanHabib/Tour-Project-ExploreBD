import { Handshake, Compass, ShieldCheck, Users, MapPinned, Rocket } from "lucide-react";

const WhyTravelWithUs = () => {
    return (
        <section className="w-full px-6 py-20 ">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-neutral">
                    Why Travel <span className="text-teal-400">With Us?</span>
                </h2>
                <p className="text-neutral/70 text-lg mb-14 max-w-2xl mx-auto">
                    We craft unforgettable adventures, with local insight, premium safety, and deep personalization. Here's why our travelers keep coming back.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Card 1 */}
                    <div className="bg-[#1a2639] border border-teal-500/20 rounded-2xl p-8  
                    
                    transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                    ">
                        <Compass className="w-12 h-12 text-teal-400 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-teal-400">Locally Curated Tours</h3>
                        <p className="text-white text-sm">Every destination is personally vetted by locals for authenticity, flavor, and excitement.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#1a2639] border border-violet-500/20 rounded-2xl p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                    ">


                        <MapPinned className="w-12 h-12 text-violet-400 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-violet-400">Hidden Gems Unlocked</h3>
                        <p className=" text-sm text-white">We take you beyond the tourist traps to jaw-dropping, hidden, heartwarming places.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#1a2639] border border-rose-500/20 rounded-2xl p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <Users className="w-12 h-12 text-rose-400 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-rose-400">Community Driven</h3>
                        <p className="text-white text-sm">Over 15,000+ happy explorers and a vibrant community of passionate guides and storytellers.</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-[#1a2639] border border-yellow-400/20 rounded-2xl p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <ShieldCheck className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-yellow-400">Travel With Trust</h3>
                        <p className="text-white text-sm">Your safety, data, and memories are protected with industry-leading standards.</p>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-[#1a2639] border border-sky-500/20 rounded-2xl p-8transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <Handshake className="w-12 h-12 text-sky-400 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-sky-400">Transparent Pricing</h3>
                        <p className="text-white text-sm">No hidden fees. No gotchas. Just honest prices and great experiences.</p>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-[#1a2639] border border-fuchsia-400/20 rounded-2xl p-8
                    transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <Rocket className="w-12 h-12 text-fuchsia-400 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-fuchsia-400">Fast, Fun & Flexible</h3>
                        <p className="text-white text-sm">Instant booking. Flexible options. Pure thrill, zero hassle. Just how you like it.</p>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default WhyTravelWithUs;

