import axios from 'axios';
import React,{useState} from 'react'
import "../style/Contact.css"
export default function Order() {

const [membership, setMemebership] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");

const [resMessage, setResMessage] = useState("");


//sending order info to the backend
async function SendOrder(e){
  e.preventDefault();
  const response = await axios.post("http://127.0.0.1:9898/new-order", {name, email, phone, membership});
  const data = await response.data
  console.log("%".repeat(40),data);
  setResMessage(response.data);
}


  return (
    <div>
      <div className="main-form-wrapper-contact">
        <h3>{resMessage}</h3>
        
        <form onSubmit={SendOrder}>
          <select  required value={membership} onChange={e => setMemebership(e.target.value)}>
            <option value="" disabled selected hidden> أختر نوع الباقة </option>
            <option>بيسك</option>
            <option>موصى به</option>
            <option>برو</option>
          </select>
          <div className="contact-name">

          <input type="text" name="" id="" placeholder='الاسم' onChange={(e) => setName(e.target.value)}/>
          <input type="tel" name="" id="" placeholder='رقم الهاتف' onChange={(e) => setPhone(e.target.value)}/>
          <input type="email" name="" id="" placeholder='البريد الالكتروني' onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="contact-submit">
          <button type="submit">طلب</button>

          </div>
        </form>
      </div>
    </div>
  )
}
