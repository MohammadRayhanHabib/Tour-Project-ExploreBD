import React from 'react';
import Banner from "../components/Banner"
import FeaturedPackages from '../components/FeaturedPackages';
import StatsSection from '../components/StatsSection';
import WhyTravelWithUs from '../components/WhyTravelWithUs';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedPackages></FeaturedPackages>
            <WhyTravelWithUs></WhyTravelWithUs>
            <StatsSection></StatsSection>
        </div>
    );
};

export default Home;