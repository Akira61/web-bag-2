import axios from 'axios';
import React,{useState, useTransition} from 'react'

export default function Order() {

const [membership, setMemebership] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");

const [resMessage, setResMessage] = useState("");


async function sendOrder(e){
  console.log("(".repeat(30),membership)
  e.preventDefault();
  const response = await axios.post("http://127.0.0.1:9898/new-order", {name, email, phone, membership});
  const data = response.data
  console.log("%".repeat(40),response.data);
  
  await setResMessage(response.data);
  
}

  return (
    <div>
      <div className="order-wrapper">
        <h3>{resMessage}</h3>
        
        <form onSubmit={sendOrder}>
          <select  required value={membership} onChange={e => setMemebership(e.target.value)}>
            <option value="" disabled selected hidden> أختر نوع الباقة </option>
            <option>بيسك</option>
            <option>موصى به</option>
            <option>برو</option>
          </select>
          <input type="text" name="" id="" placeholder='الاسم' onChange={(e) => setName(e.target.value)}/>
          <input type="tel" name="" id="" placeholder='رقم الهاتف' onChange={(e) => setPhone(e.target.value)}/>
          <input type="email" name="" id="" placeholder='البريد الالكتروني' onChange={(e) => setEmail(e.target.value)}/>
          <button type="submit">طلب</button>
        </form>
      </div>
    </div>
  )
}
