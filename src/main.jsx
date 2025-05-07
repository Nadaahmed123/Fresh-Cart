import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
createRoot(document.getElementById('root')).render(
    <App />
)
