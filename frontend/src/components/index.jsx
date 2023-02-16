import React from 'react'
import FirstSlide from './FirstSlide'
import SecondSlide from './SecondSlide'
import '../style/index.css'
import '../style/Home.css'
export default function index() {
  return (
    <div className='slides-wrapper'>
      <div className="first-slide"><FirstSlide /></div>
      <div className="second-slide"><SecondSlide /></div>
    </div>
  )
}
