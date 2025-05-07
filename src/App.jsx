import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Categories from './components/Categories/Categories';
import NotFound from './components/NotFound/NotFound';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Layout from './components/Layout/Layout';
import { UserContextProvider } from './Context/UserContext';
import ProtectedRoute from './components/ProtectdRoute/ProtectedRoute';
import ProductDeetails from './components/ProductDeetails/ProductDeetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CartContextProvider } from './Context/cart/CartContext';
import { Toaster } from 'react-hot-toast';

let query =new QueryClient(
  // {
  //   defaultOptions:
  // }
);
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDeetails /></ProtectedRoute> },
      { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: '*', element: <NotFound /> }
    ]
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
]);

function App() {
  return (
    <CartContextProvider>
    <QueryClientProvider client={query}>
    <UserContextProvider >
      <RouterProvider router={router} />
      <ReactQueryDevtools></ReactQueryDevtools>
      <Toaster/>
    </UserContextProvider>
    </QueryClientProvider>
    </CartContextProvider>
  );

}

export default App;
