import React from 'react';
import Banner from "../components/Banner"
import FeaturedPackages from '../components/FeaturedPackages';
import StatsSection from '../components/StatsSection';
import WhyTravelWithUs from '../components/WhyTravelWithUs';
import RecentProducts from '../components/RecentProducts';
import SalesOffers from '../components/SalesOffers';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedPackages></FeaturedPackages>
            <RecentProducts></RecentProducts>
            <SalesOffers></SalesOffers>
            <WhyTravelWithUs></WhyTravelWithUs>
            <StatsSection></StatsSection>
        </div>
    );
};

export default Home;