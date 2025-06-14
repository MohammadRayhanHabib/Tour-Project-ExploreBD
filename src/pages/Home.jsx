import React from 'react';
import Banner from "../components/Banner"
import FeaturedPackages from '../components/FeaturedPackages';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedPackages></FeaturedPackages>
        </div>
    );
};

export default Home;