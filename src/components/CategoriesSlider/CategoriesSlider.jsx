import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import style from './CategoriesSlider.module.css'; 
export default function CategoriesSlider() {
    const [categories, setCategories] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,  
        slidesToScroll: 3,
        autoplay:true
    };

    function getCategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then(({ data }) => {
                setCategories(data.data);  
            })
            .catch((error) => {
                console.error("Failed to fetch categories", error);
            });
    }

    useEffect(() => {
        getCategories(); 
    }, []);

    return (
        <div className={style.sliderContainer}>
          <h2 className='p-4 text-gray'>shop product now</h2>
            <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category.id} className={style.categoryItem}>
                        <img
                            src={category.image || 'https://via.placeholder.com/150'} 
                            alt={category.name}
                            className="w-100" 
                        />
                        <h3>{category.name}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
