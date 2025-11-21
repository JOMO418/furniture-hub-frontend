import React from 'react';
import Hero from '../../components/home/Hero/Hero';
import CategoryGrid from '../../components/home/CategoryGrid/CategoryGrid';
import BestSellers from '../../components/home/BestSellers/BestSellers';
import OfferOfTheDay from '../../components/home/OfferOfTheDay/OfferOfTheDay';
import NewArrivals from '../../components/home/NewArrivals/NewArrivals';
import TrustSignals from '../../components/home/TrustSignals/TrustSignals';
import ShopByStyle from '../../components/home/ShopByStyle/ShopByStyle';

const HomePage = () => {
    return (
      <>
        <Hero />
        <CategoryGrid />
        <BestSellers />
        <OfferOfTheDay />
        <NewArrivals />
        <ShopByStyle />
        <TrustSignals />
      </>
    );
  };

export default HomePage;