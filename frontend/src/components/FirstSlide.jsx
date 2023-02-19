import React from 'react'
import { Link } from 'react-router-dom'
import openingImg from "../images/web-dev-pes.jpg"
import "../style/FirstSlide.css"
export default function FirstSlide() {
  return (
    <div className='root-wrapper'>
      <div className="image">
        <img src={openingImg} alt="" />
      </div>

      <div className="subject">
        <h1>جميع ما تحتاجها لبناء موقع ناجح</h1>
        
      </div>
    </div>
  )
}
