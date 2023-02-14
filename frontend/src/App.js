import Navbar from "./Navbar/Navbar";
import Order from "./routes/order";
import React,{useState, useRef, useEffect} from "react";
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Navbar />
      <Routes>
        <Route path="/order" element={<Order />}/>
        
      </Routes>
    </div>
  );
}

export default App;
