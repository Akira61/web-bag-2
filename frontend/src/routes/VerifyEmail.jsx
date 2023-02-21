import React,{useEffect, useState} from 'react'
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from 'axios'
export default function VerifyEmail() {

  // if the response was created succssfully this message will change by success message from the backend 
  const [resMessage, setResMessage] = useState("تم الغاء التحقق لي تجاوز الوقت المطلوب،الرجاء اعادة محاولة الطلب من جديد");
  
  
   const token = useParams().id;
  
    useEffect( () => {
        console.log('5'.repeat(30),token)
          axios.get(`http://localhost:9898/verificationEmail/${token}`)
          .then(response => {
            console.log("{}".repeat(20), response.data);
            setResMessage(response.data)
          },[])
     

    })
  return (
    <div>
      <br />
        <h3>{resMessage}</h3>
    </div>
  )
}
