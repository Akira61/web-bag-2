import React,{useState, useRef, useEffect} from "react";
import { Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Order from "./routes/order";
import Contact from "./routes/contact";
import Login from "./routes/login";
import Memberships from "./routes/memberships";
import Index from "./components/index";
//styles


function App() {
  return (
    <>
      <><Navbar /></>
      <br/> <br/> <br />
      <Index />

      <Routes>
        <Route path="/order" element={<Order />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memberships" element={<Memberships />} />
      </Routes>
    </>
  );
}

export default App;
