import React from 'react'
import { Link } from 'react-router-dom'
import "../style/Footer.css"
export default function Footer() {
  return (
    <div>
      <div className="footer-main-wrapper">
            <div className="copyright-footer">
                <span>Copyright © 2023 Web Bag™ LLC</span>
            </div>
            <div className="links-footer">
                <a href="#" className='footer-link parent-links'> الصفحات </a>
                <div className="children-links">
                    <a href="/" className='footer-link'> الرئيسية </a>
                    <a href="/memberships" className='footer-link'> الباقات </a>
                    <a href="/contact" className='footer-link'> تواصل </a>
                    <a href="/login" className='footer-link'> تسجيل دخول </a>
                    <a href="/order" className='footer-link'> انشىء موقعك </a>
                </div>
            </div>
            
            <div className="links-footer">
                <a href="#" className='footer-link parent-links'> الباقات </a>
                <div className="children-links">
                    <a href="/order" className='footer-link'> بيسك </a>
                    <a href="/order" className='footer-link'> موصى به </a>
                    <a href="/order" className='footer-link'> برو </a>
                </div>
            </div>
      </div>
    </div>
  )
}
