import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3 className="footer-section-title">About Us</h3>
            <p className="footer-section-content">
              Welcome to TravelMate! We're a bunch of travel enthusiasts who believe that the best adventures are meant to be shared.
            </p>
          </div>
          <div className="col-md-4">
            <h3 className="footer-section-title">Contact</h3>
            <p className="footer-section-content">Email: info@example.com</p>
            <p className="footer-section-content">Phone: +1234567890</p>
          </div>
          <div className="col-md-4">
            <h3 className="footer-section-title">Follow Us</h3>
            <ul className="footer-social-icons">
              <li>
                <a href="#">
                  <FaFacebook className="footer-icon" />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaTwitter className="footer-icon" />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaInstagram className="footer-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





