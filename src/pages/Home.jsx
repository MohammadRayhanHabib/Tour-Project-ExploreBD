import React from 'react';
import Banner from "../components/Banner"
import FeaturedPackages from '../components/FeaturedPackages';
import StatsSection from '../components/StatsSection';
import WhyTravelWithUs from '../components/WhyTravelWithUs';
import RecentProducts from '../components/RecentProducts';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedPackages></FeaturedPackages>
            <WhyTravelWithUs></WhyTravelWithUs>
            <StatsSection></StatsSection>
            <RecentProducts></RecentProducts>
        </div>
    );
};

export default Home;