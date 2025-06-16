import CountUp from "react-countup";
import { Eye } from "lucide-react";
const Stats = () => {
    return (
        <section className="w-full px-4 py-12 ">
            <div className="max-w-[1280px] mx-auto rounded-3xl shadow-2xl p-8  border border-neutral-100">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral mb-12">
                    Tour Platform Stats
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
                    {/* Total Downloads */}
                    <div className="flex flex-col items-center bg-[#0f172a] rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                        <div className="text-teal-400 mb-2">

                            <Eye className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-semibold mb-1">Total Visitor</h3>
                        <p className="text-3xl font-bold text-teal-300">
                            <CountUp end={31000} duration={20} separator="," />
                        </p>
                        <span className="text-sm mt-2 text-gray-400">Since Launch</span>
                    </div>

                    {/* New Users */}
                    <div className="flex flex-col items-center bg-[#0f172a] rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                        <div className="text-purple-400 mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-10 h-10"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-1">New Users</h3>
                        <p className="text-3xl font-bold text-purple-300">
                            <CountUp end={4200} duration={20} separator="," />
                        </p>
                        <span className="text-sm mt-2 text-gray-400">+22% Growth</span>
                    </div>

                    {/* Bookings */}
                    <div className="flex flex-col items-center bg-[#0f172a] rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                        <div className="text-pink-400 mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-10 h-10"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-1">Total Bookings</h3>
                        <p className="text-3xl font-bold text-pink-300">
                            <CountUp end={1200} duration={20} separator="," />
                        </p>
                        <span className="text-sm mt-2 text-gray-400">↘︎ 14% Last Month</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;

