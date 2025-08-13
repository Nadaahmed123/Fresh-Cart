import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import style from './Products.module.css'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import axios from 'axios';
import { useProducts } from '../../Hooks/useProducts';
import { useContext } from 'react';
import { CartContext } from '../../Context/cart/CartContext';
import toast from 'react-hot-toast';

export default function Products(props) {
  const [counter, setCounter] = useState(0);
  let { data, isError, error, isLoading, isFetching } = useProducts();
  const { addToCart } = useContext(CartContext);

  async function addProductToCart(productId) {
    if (!localStorage.getItem('userToken')) {
      toast.error('Please login to add items to cart', { duration: 1500, position: 'top-center' });
      return;
    }
    try {
      const response = await addToCart(productId);
      if (response?.data?.status === 'success') {
        toast.success('Product added successfully to cart', { duration: 1500, position: 'top-center' });
      } else {
        toast.error(response?.data?.message || 'Failed to add to cart', { duration: 1500, position: 'top-center' });
      }
    } catch (error) {
      toast.error('An error occurred while adding to cart', { duration: 1500, position: 'top-center' });
      console.error('Error adding to cart:', error);
    }
  }

  useEffect(() => {

  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <ClimbingBoxLoader color='var(--primary-color)' size={20} />
      </div>
    )
  }
  
  if (isError) {
    return (
      <div className="error-container">
        <h1>{error}</h1>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="section-title">
        <h2 className="text-gradient">Our Products</h2>
        <p className="text-muted">Discover amazing products at great prices</p>
      </div>
      
      <div className="product-grid">
        {data?.data.data.map((product) => (
          <div key={product.id} className="product-card fade-in">
            <div className="product-image-container">
              <img
                className="product-image"
                src={product.imageCover || 'https://via.placeholder.com/300x200?text=Product+Image'}
                alt={product.title}
                loading="lazy"
              />
              <div className="product-overlay">
                <button 
                  onClick={() => addProductToCart(product.id)} 
                  className="btn btn-success btn-sm"
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <i className="bi bi-cart-plus me-1"></i>
                  Add to Cart
                </button>
              </div>
            </div>
            
            <div className="product-info">
              <Link 
                to={`/productdetails/${product.id}/${product.category.name}`} 
                className="text-decoration-none"
              >
                <span className="product-category">
                  <i className="bi bi-tag me-1"></i>
                  {product.category?.name}
                </span>
                
                <h6 className="product-title">
                  {product.title?.split(' ').slice(0, 3).join(' ')}
                  {product.title?.split(' ').length > 3 && '...'}
                </h6>
                
                <div className="product-rating">
                  <span className="fw-bold text-warning">
                    {product.ratingsAverage}
                  </span>
                  <i className="fas fa-star text-warning"></i>
                  <span className="text-muted ms-2">
                    ({product.ratingsQuantity || 0} reviews)
                  </span>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="product-price">
                    {product.price} EGP
                  </span>
                  {product.priceAfterDiscount && product.priceAfterDiscount !== product.price && (
                    <span className="text-decoration-line-through text-muted">
                      {product.priceAfterDiscount} EGP
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  