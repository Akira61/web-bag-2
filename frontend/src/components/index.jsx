import React from 'react'
import FirstSlide from './FirstSlide'
import SecondSlide from './SecondSlide'
import TheridSlide from './ThirdSlide'
import FourthSlide from './FourthSlide'
import Footer from './Footer'
import Contact from "./Contact"
import '../style/index.css'
import '../style/Home.css'
export default function index() {
  return (
    <div className='slides-wrapper'>
      <div className="first-slide"><FirstSlide /></div>
      <div className="second-slide"><SecondSlide /></div>
      <div className="theird-slide"><TheridSlide /></div>
      <div className="fourth-slide"><FourthSlide /></div>
      <br /><br />
      <Contact />
      <div className="Footer"><Footer /></div>
    </div>
  )
}
