import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import style from './Footer.module.css'

export default function Footer() {
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {

  }, [])

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-section">
            <h5 className="text-gradient mb-3">
              <i className="bi bi-shop me-2"></i>
              FreshCart
            </h5>
            <p className="text-muted mb-3">
              Your trusted destination for quality products and exceptional shopping experiences. 
              We bring you the best deals and latest trends.
            </p>
            <div className="social-links">
              <a href="#" className="me-3" aria-label="Facebook">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="me-3" aria-label="Twitter">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="me-3" aria-label="Instagram">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none">
                  <i className="bi bi-house me-2"></i>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-decoration-none">
                  <i className="bi bi-grid me-2"></i>
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-decoration-none">
                  <i className="bi bi-cart me-2"></i>
                  Cart
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-star me-2"></i>
                  Featured
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-headset me-2"></i>
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-question-circle me-2"></i>
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-truck me-2"></i>
                  Shipping Info
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-arrow-return-left me-2"></i>
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-info-circle me-2"></i>
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-shield-check me-2"></i>
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-file-text me-2"></i>
                  Terms of Service
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none">
                  <i className="bi bi-briefcase me-2"></i>
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h5>Newsletter</h5>
            <p className="text-muted mb-3">
              Subscribe to get special offers and updates
            </p>
            <div className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                />
                <button className="btn btn-primary" type="button">
                  <i className="bi bi-send"></i>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-muted small mb-1">
                <i className="bi bi-telephone me-2"></i>
                +20 123 456 7890
              </p>
              <p className="text-muted small">
                <i className="bi bi-envelope me-2"></i>
                support@freshcart.com
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">
                © 2024 FreshCart. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="payment-methods">
                <span className="me-2">
                  <i className="bi bi-credit-card text-muted"></i>
                </span>
                <span className="me-2">
                  <i className="bi bi-paypal text-muted"></i>
                </span>
                <span className="me-2">
                  <i className="bi bi-wallet2 text-muted"></i>
                </span>
                <span>
                  <i className="bi bi-cash-coin text-muted"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
