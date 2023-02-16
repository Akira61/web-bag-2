import React from 'react'
import "../style/ThirdSlide.css"
import whoIsUs from "../images/who-us.png"
export default function theridSlide() {
  return (
    <div className='third-root-wrapper'>
      <div className="third-slide-main-wrapper">

        <div className="third-slide-image">
          <img src={whoIsUs} alt="" />
        </div>
        
        <div className="subject-three">
        <h1> من نحن؟ </h1>
        <p>  
        Web Bag <br />
          هي منصة تجارة إلكترونية سهلة الاستخدام تساعد الشركات الصغيرة على بناء متاجر او مواقع عبر الإنترنت وبيعها عبر الإنترنت 
           </p>
        </div>
      </div>
    </div>
  )
}
