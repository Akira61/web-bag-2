import React,{useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios'
export default function VerifyEmail() {
  const [resMessage, setResMessage] = useState("");
    useEffect(() => {
        ;(async () => {
            const response =await axios.get(`http://localhost:9898/verificationEmail/${'shit'}`)
            console.log("{}".repeat(20), response.data);
            //setResMessage(response.data);
        })()
       
    },[])
  return (
    <div>
        <h3></h3>
    </div>
  )
}
