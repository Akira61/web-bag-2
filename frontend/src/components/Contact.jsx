import React,{ useState, useEffect, useRef } from 'react'
import axios from "axios"
import "../style/Contact.css"
import contactImg from "../images/contact.png"
export default function Contact() {
    const clear = useRef()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // useEffect(() => {
    //     axios.post("/contact", 
    //         {name:name , email:email, message:message}
    //     )
    // },[]);
    async function sendForm(){
        try {
            await fetch("http://localhost:9898/contact", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({name:name , email:email, message:message})
            });

            name("")
            message("")
            email("");
        } catch (err) {
            console.log(err)
        }
    }


  return (
    <div>
      <div className="main-form-wrapper-contact">
        <div className="contact-h1">
            <h1> تواصل </h1>
        </div>
        <div className="contact-image">
            <img src={contactImg} alt="" />
        </div>
        <form onSubmit={sendForm}>
            <div className="contact-name">
                <input ref={clear} required type="text"  id="contact-name" placeholder='الاسم' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="contact-email">
                <input  required type="email" name="" id="contact-email" placeholder='البريد الالكتروني' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="contact-message">
                <textarea  required name="" id="contact-message" cols="30"  rows="3" placeholder='الرسالة' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <br />
            <div className="contact-submit">
                <button type="submit">ارسال</button>
            </div>
        </form>
      </div>

    </div>
  )
}
