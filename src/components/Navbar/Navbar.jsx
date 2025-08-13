import React, { useContext } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import './Navbar.module.css';
import { counterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/cart/CartContext';

export default function NavbarComponent() {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { cartItems } = useContext(CartContext);

  function logout() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login');
  }

  return (
    <Navbar 
      bg="white" 
      variant="light" 
      expand="lg" 
      className="fixed-top shadow-sm"
      style={{ 
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid var(--gray-200)'
      }}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img 
            src={logo} 
            alt="FreshCart Logo" 
            className="navbar-logo me-2" 
            style={{ height: '2.5rem' }}
          />
          {/* <span className="text-gradient fw-bold fs-4">FreshCart</span> */}
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {userLogin !== null ? (
              <>
                <NavLink 
                  to="/" 
                  className="nav-link px-3 fw-medium"
                  style={{ 
                    color: 'var(--gray-700)',
                    transition: 'var(--transition)'
                  }}
                >
                  <i className="bi bi-house-door me-1"></i>
                  Home
                </NavLink>
                
                <NavLink 
                  to="/products" 
                  className="nav-link px-3 fw-medium"
                  style={{ 
                    color: 'var(--gray-700)',
                    transition: 'var(--transition)'
                  }}
                >
                  <i className="bi bi-grid me-1"></i>
                  Products
                </NavLink>
                
                <NavLink 
                  to="/cart" 
                  className="nav-link px-3 fw-medium position-relative"
                  style={{ 
                    color: 'var(--gray-700)',
                    transition: 'var(--transition)'
                  }}
                >
                  <i className="bi bi-cart3 me-1"></i>
                  Cart
                  {cartItems && cartItems.length > 0 && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ 
                        fontSize: '0.7rem',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                </NavLink>
                
                <div className="vr mx-2" style={{ height: '1.5rem' }}></div>
                
                <span 
                  onClick={logout} 
                  className="nav-link px-3 fw-medium"
                  style={{ 
                    cursor: 'pointer',
                    color: 'var(--accent-color)',
                    transition: 'var(--transition)'
                  }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </span>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className="nav-link px-3 fw-medium"
                  style={{ 
                    color: 'var(--gray-700)',
                    transition: 'var(--transition)'
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </NavLink>
                
                <NavLink 
                  to="/register" 
                  className="btn btn-primary ms-2"
                  style={{ 
                    borderRadius: 'var(--border-radius-sm)',
                    padding: '0.5rem 1.5rem'
                  }}
                >
                  <i className="bi bi-person-plus me-1"></i>
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
