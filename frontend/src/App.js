import React,{useState, useRef, useEffect,} from "react";
import { Route,Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Order from "./routes/Order";
// import Contact from "./routes/contact";
import Mem from "./components/FourthSlide";
import Login from "./routes/login";
import Memberships from "./routes/memberships";
import Index from "./components/index";
import Contact from "./components/Contact";
import VerifyEmail from "./routes/VerifyEmail";
//styles


function App() {
  const [token, setToken] = useState("");
  function getToken(T){
    setToken(T);
    console.log("$".repeat(30), T);

  }
  return (
    <>
      <><Navbar /></>
      <br/> <br/> 

      <Routes>
        <Route path="/" element={<Index />} />
        <Route SETtoken={getToken}  path="/order" element={<Order />}/>
        <Route path="/verification-email/:id" element={<VerifyEmail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memberships" element={<Mem />} />
      </Routes>
      
    </>
  );
}

export default App;
