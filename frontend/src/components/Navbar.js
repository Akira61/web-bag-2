import React, {useState, useRef} from 'react'
import {FaBars, FaTimes} from "react-icons/fa";
import { Link } from 'react-router-dom'
import '../style/Navbar.css';
  
export default function Navbar() {
  const openMenu = useRef();
  function showMenu(){
    openMenu.current.classList.toggle("openMenu");
  }
 
  return (
    <>

      <header>

        <div className="logo">Web bag</div>
        
          <nav ref={openMenu}>
            

            <Link onClick={showMenu}  className='nav-item' to="/">الرئيسية</Link>
            <Link onClick={showMenu} className='nav-item' to="/memberships"> الباقات </Link>
            <Link onClick={showMenu} className='nav-item' to="/contact"> تواصل </Link>
            <Link onClick={showMenu} className='nav-item' to="/login"> تسجيل دخول </Link>
            <Link onClick={showMenu} className='nav-item' to="/order"> انشاء موقعك </Link>

            <div className="close-menu nav-item" onClick={showMenu}> <FaTimes /></div>
            <br /><br />
            
          </nav>
        
        <div className='menu' onClick={showMenu}><FaBars /></div>
        
      </header>
    </>
  )
}

