import React from 'react'
//import membershipImg from "../images/membership1.png"
import Footer from './Footer'
import "../style/FourthSlide.css"
export default function FourthSlide() {
  return (
    <div>
      <div className="fourth-slide-main-wrapper">
        <div className="fourth-subject">
            <h1> الباقات </h1>
            <h5> السعر يعتمد على حجم المشروع و يتم تحديدة في الاجتماع</h5>
            <div id='membership' className="memberships-card">

                <div className="first-card-wrapper">
                    <div className="first-card-membership">
                    <h3> برو </h3>
                        <ul>
                            <li> انشىء الموقع </li>
                            <li> تولي امرى استضافة الموقع </li>
                            <li> اسم مجاني للموقع يحدده العميل </li>
                        </ul>
                        <div className="selecet-membership"><button type="submit"> اختيار </button></div>
                    </div>
                </div>

                <div className="recomandded-card-wrapper">
                    <div className="recomandded-card-membership">
                        <h3> موصى به </h3>

                        <ul><li> يتتم تحديد الباقة المناسبة للعميل اثناء الاجتماع </li></ul>
                        <div className="selecet-membership"><button type="submit"> اختيار </button></div>
                    </div>
                </div>
                <div className="second-card-wrapper">
                    <div className="second-card-membership">
                        <h3> بيسك </h3>
                        
                        <ul>
                            <li> انشاء الموقع فقط</li>
                            <li> توجيه ماذا تفعل بعد الانتهاء من الموقع </li>
                        </ul>
                        <div className="selecet-membership"><button type="submit"> اختيار </button></div>
                    </div>

                </div>
            </div>
        </div>

        
      </div>
      
    </div>
  )
}
