import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {

  }, [])

  return (
    <div className="home-container">
      <section className="hero-section">
        <MainSlider />
      </section>
      
      <section className="categories-section section">
        <div className="section-title">
          <h2 className="text-gradient">Shop by Category</h2>
          <p className="text-muted">Find what you're looking for</p>
        </div>
        <CategoriesSlider />
      </section>
      
      <section className="products-section section">
        <div className="section-title">
          <h2 className="text-gradient">Featured Products</h2>
          <p className="text-muted">Handpicked products just for you</p>
        </div>
        <RecentProducts />
      </section>
    </div>
  )
}
