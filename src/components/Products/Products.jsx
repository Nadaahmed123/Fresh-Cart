import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import style from './Products.module.css'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import axios from 'axios';
import { useProducts } from '../../Hooks/useProducts';
export default function Products(props) {
  const [counter,setCounter] =useState(0);
  let {data ,isError,error,isLoading,isFetching}=useProducts();
  useEffect(()=>{

  },[]);

    if(isLoading){ 
      return  (
      <div className="py-3 w-100 d-flex justify-content-center">
      <ClimbingBoxLoader color='green'/>
      </div>
      )
    }
    if(isError){ 
      return  (
      <div className="py-3 w-100 d-flex justify-content-center">
      <h1>{error}</h1>
      </div>
      )
    }
    // const [recentProducts, setRecentProducts] = useState([]);
  
    // function getRecentProducts() {
    //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    //     .then(({ data }) => {
    //       setRecentProducts(data.data);
    //     })
    //     .catch((error) => {
    //       console.error("Failed to fetch products:", error);
    //     });
    // }
  
    // useEffect(() => {
    //   getRecentProducts();
    // }, []);
  
    return (
      <div className="row">
        {data?.data.data.map((product) => (
          <div key={product.id} className="col-md-2 px-2 mb-4">
            <div className={`border p-2 rounded position-relative ${style.product}`}>
              <Link to={`/productdetails/${product.id}/${product.category.name}`} className="text-decoration-none text-dark">
                <img
                  className="w-100 mb-2"
                  src={product.imageCover || 'https://via.placeholder.com/150'}
                  alt={product.title}
                />
                <span className="d-block text-success mb-1">
                  {product.category?.name}
                </span>
                <h6>{product.title?.split(' ').slice(0, 2).join(' ')}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-warning ms-1"></i>
                  </span>
                </div>
              </Link>
              <button className={`btn btn-success mt-2 ${style.btnAdd}`}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  