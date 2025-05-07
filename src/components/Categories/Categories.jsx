import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import style from './Categories.module.css'
import { useProducts } from '../../Hooks/useProducts'

export default function Categories() {
  const [counter,setCounter] =useState(0);
  useEffect(()=>{

  },[])
  let {data ,isError,error,isLoading,isFetching}=useProducts();
    return 
    <>
    <h1>templete name </h1>
    <p>Lorem ipsum dolor sit amet.</p> 
    </>
  
}
