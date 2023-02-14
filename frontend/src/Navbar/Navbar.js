import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <>
      <header>
        
            <div class="logo">Web bag</div>
            <nav>
                <Link to="/">الرئيسية</Link>
                <Link to="/memberships">الباقات</Link>
                <Link to="/contact">تواصل</Link>
                <Link to="/login">تسجيل دخول</Link>
                <Link to="/order">انشاء موقعك</Link>
                <br /><br />
                
            </nav>
        </header>
    </>
  )
}
