import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

import mainSlider from '../../assets/images/slider-image-3.jpeg';
import mainSlider1 from '../../assets/images/grocery-banner-2.jpeg';
import mainSlider2 from '../../assets/images/grocery-banner.png';

import Slide1 from '../../assets/images/slider-image-1.jpeg';
import Slide2 from '../../assets/images/slider-image-2.jpeg';

import style from './MainSlider.module.css';

export default function MainSlider() {
  const [counter, setCounter] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  useEffect(() => {}, []);

  return (
    <div className="container my-4">
      <div className="row gx-3">
        <div className="col-md-9">
          <Slider {...settings}>
            <div>
              <img
                src={mainSlider}
                alt="Main Slide"
                className="w-100 rounded"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img
                src={mainSlider1}
                alt="Main Slide"
                className="w-100 rounded"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img
                src={mainSlider2}
                alt="Main Slide"
                className="w-100 rounded"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
          </Slider>
        </div>
        <div className="col-md-3 d-flex flex-column gap-3">
          <img
            src={Slide1}
            alt="Side Slide 1"
            className="w-100 rounded"
            style={{ height: '195px', objectFit: 'cover' }}
          />
          <img
            src={Slide2}
            alt="Side Slide 2"
            className="w-100 rounded"
            style={{ height: '195px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}
