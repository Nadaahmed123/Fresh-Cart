import React, { useContext } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.module.css';
import { counterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';

export default function NavbarComponent() {
let navigate=useNavigate();

 let {userLogin,setUserLogin}= useContext(UserContext);
 function logout(){
  localStorage.removeItem('userToken');
  setUserLogin(null);
   navigate('/login');
 }
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img src={logo} alt="fresh cart logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center">

        {
          userLogin !==null ?
          <>
            
            <NavLink to="/" className="nav-link px-3" >
              Home
            </NavLink>
            <NavLink to="/products" className="nav-link px-3" >
              Products
            </NavLink>
            <NavLink to="/categories" className="nav-link px-3" >
              Categories
            </NavLink>
            <NavLink to="/brands" className="nav-link px-3" >
              Brands
            </NavLink>
            <NavLink to="/about" className="nav-link px-3" >
              About
            </NavLink>
            
            <NavLink to="/cart" className="nav-link px-3" >
              <i className="bi bi-cart"></i> Cart
            </NavLink>
         
       
          </>:null
        }
        {
          userLogin===null?
          <>
           <NavLink to="/login" className="nav-link px-3">
              <i className="bi bi-box-arrow-in-right"></i> Login
            </NavLink>
            <NavLink to="/register" className="nav-link px-3" >
              <i className="bi bi-person-plus"></i> Register
            </NavLink>
          </>: 
     <span onClick={logout} className="nav-link px-3" style={{ cursor: 'pointer' }}>
     <i className="bi bi-box-arrow-right"></i> Logout
   </span>
        }
          
            </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
