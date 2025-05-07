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
    <>
      <Navbar />
      <div className="container pt-5 ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
