import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import About from "./About"
import SareeCarousel from '../components/slider'
const Home = () => {
  return (
    <div >
      <SareeCarousel></SareeCarousel>
      <Hero></Hero>
      <LatestCollection></LatestCollection>
      <BestSeller></BestSeller>
      <About></About>
      <OurPolicy></OurPolicy>
      <NewsLetterBox></NewsLetterBox>
    </div>
  )
}

export default Home