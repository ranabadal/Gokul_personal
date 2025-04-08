import React from "react";
import TodaysDeal from "./TodaysDeal/todaysDeal";
import UpcomingDeals from "./UpcomingDeals/upcomingDeals";
import ExpiredDeals from "./ExpiredDeals/expiredDeals"; // Adjust the import path as necessary
import AboveHeader from '../../components/above_header/above_header';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';


function TodaysDealUpdated() {
  return (
    <div>
        <AboveHeader />
        <Header />
      <TodaysDeal />
      <UpcomingDeals />
      <ExpiredDeals />
        <Footer />
    </div>
  );
}

export default TodaysDealUpdated;