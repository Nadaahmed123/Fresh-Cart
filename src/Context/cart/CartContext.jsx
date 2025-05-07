import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export function CartContextProvider(props) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };
function removeCartItem(productId){
 return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
    headers
 })
}
function updateCartItem(productId,count){
    return   axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count
    },{
       headers
    })
   }
  function addToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
      productId
    }, {
      headers
    });
  }

  function getCartItems() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers
    });
  }

  return (
    <CartContext.Provider value={{ addToCart, getCartItems,removeCartItem,updateCartItem}}>
      {props.children}
    </CartContext.Provider>
  );
}
