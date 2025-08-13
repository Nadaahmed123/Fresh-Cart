import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout() {
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
   
  }, []);

  return (
    <div className="layout-container">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
