import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden ">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://i.pinimg.com/736x/ab/4a/83/ab4a83a613bf88acea2b6d9e539abab5.jpg')`,
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 mx-auto">
                <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 rounded-3xl p-6 sm:p-12 shadow-xl">
                    {/* Decorative Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-gray-400/30 to-pink-400/30 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-blue-400/30 to-cyan-400/30 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Content */}
                    <div className=" max-w-3xl ">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Discover Amazing<br />Packages
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-gray-200 dark:text-gray-300 mb-8 font-light leading-relaxed">
                            Unlock premium experiences and discover curated packages designed to elevate your journey.
                            From luxury getaways to adventure expeditions, find the perfect package that matches your dreams.
                        </p>

                        <Link to="/all-packages" className=''>
                            <button className="bg-white text-black px-6 py-3 text-sm font-bold shadow-md  transition duration-200">
                                Explore All Packages
                            </button>

                        </Link>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Banner;

