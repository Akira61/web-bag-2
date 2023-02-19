import React,{useState, useRef, useEffect} from "react";
import { Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Order from "./routes/order";
// import Contact from "./routes/contact";
import Mem from "./components/FourthSlide";
import Login from "./routes/login";
import Memberships from "./routes/memberships";
import Index from "./components/index";
import Contact from "./components/Contact";
//styles


function App() {
  return (
    <>
      <><Navbar /></>
      <br/> <br/> 

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/order" element={<Order />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memberships" element={<Mem />} />
      </Routes>
      
    </>
  );
}

export default App;
