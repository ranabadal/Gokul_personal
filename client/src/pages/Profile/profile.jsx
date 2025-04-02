import React from 'react'
import styles from './profile.module.css';
import AboveHeader from '../../components/above_header/above_header';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import TopSection from './TopSection/topSection';

const profile = () => {
  return (
    <div>
      <AboveHeader/>
        <Header/>
        <TopSection/>
        <Footer/>
    </div>
  )
}

export default profile;
