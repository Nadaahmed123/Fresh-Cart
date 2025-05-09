import React from 'react';
import { Link } from 'react-router-dom';
import style from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>404</h1>
        <p className={style.message}>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className={style.button}>Go to Homepage</Link>
      </div>
    </div>
  );
}
