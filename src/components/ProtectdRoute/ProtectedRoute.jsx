import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import style from './ProtectdRoute.module.css'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute(props) {
  if (localStorage.getItem('userToken')!==null) {
      return props.children;
    
  }else{
   return <Navigate to={'/login'}/>
  }
  

  
  
}
