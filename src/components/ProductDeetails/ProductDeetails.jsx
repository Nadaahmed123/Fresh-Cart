import React, { useState, useEffect } from 'react';
import style from './ProductDeetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { useContext } from 'react';
import { CartContext } from '../../Context/cart/CartContext';
import toast from 'react-hot-toast';

export default function ProductDeetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const { id, category } = useParams();
  const { addToCart } = useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch product", error);
      });
  }

  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        const related = data.data.filter((product) => product.category.name === category);
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.error("Failed to fetch related products", error);
      });
  }

  async function addProductToCart(productId){
    if(!localStorage.getItem('userToken')) {
      toast.error('Please login to add items to cart', { duration: 1500, position: 'top-center' });
      return;
    }
    try {
      const response = await addToCart(productId);
      if(response?.data?.status === 'success') {
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
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

  if (!productDetails) {
    return <div className="text-center py-5">Loading product details...</div>;
  }

  return (
    <>
      <div className="row py-4 align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
            <div>
              <img
                src={productDetails?.imageCover || 'https://via.placeholder.com/150'}
                alt={productDetails?.title}
                className="w-100 rounded shadow-sm"
              />
            </div>
            {productDetails?.images && productDetails.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={productDetails?.title}
                  className="w-100 rounded shadow-sm"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-md-8">
          <h2 className="text-dark">{productDetails?.title}</h2>
          <p className="text-muted">{productDetails?.description}</p>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold h5">{productDetails?.price} EGP</span>
            <span>
              {productDetails?.ratingsAverage}
              <i className="fas fa-star text-warning ms-1"></i>
            </span>
          </div>
          <button onClick={()=>addProductToCart(productDetails.id)} className="btn btn-success">Add to Cart</button>
        </div>
      </div>

      <div className="row py-4">
        <h3>Related Products</h3>
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="col-md-2 px-2 mb-4">
              <div className="product border p-2 rounded">
                <img
                  className="w-100 mb-2"
                  src={product.imageCover || 'https://via.placeholder.com/150'}
                  alt={product.title}
                />
                <h6>{product.title}</h6>
                <div className="d-flex justify-content-between">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-warning ms-1"></i>
                  </span>
                </div>
                <button onClick={()=>addProductToCart(product.id)} className="btn btn-success mt-2">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </>
  );
}
