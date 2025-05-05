import React from 'react'
import './Footer.css'
import {FaEnvelope } from 'react-icons/fa'

const Footer = ({theme, onHomeClick, onArchiveClick, onAboutClick, onReportClick}) => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:ilmgate.team@gmail.com'
  }

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="email-container" onClick={handleEmailClick}>
            <FaEnvelope className="email-icon" />
            <span>ilmgate.team@gmail.com</span>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="quick-links">
            <li>
              <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onHomeClick();
            }}
              >
            Home
            </a>
          </li>
            <li>
            <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onArchiveClick();
            }}
          >
            Archive
          </a>
            </li>
            <li>
              <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onAboutClick();
            }}
            >
            About</a>
            </li>
            <li>
              <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onReportClick();
            }}
          >
            Report</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Location</h3>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3260.041324791762!2d-0.6271173!3d35.2054396!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7f002384c45a8d%3A0x1a15c71bf2b447cc!2sCPR%20de%20l&#39;informatique!5e0!3m2!1sen!2sdz!4v1745800945487!5m2!1sen!2sdz"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="University Location"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2025 Udl Info. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
