import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Image, Container, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../Context/cart/CartContext';
import style from './Cart.module.css';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const { getCartItems, removeCartItem ,updateCartItem} = useContext(CartContext);

  useEffect(() => {
    async function fetchCart() {
      const response = await getCartItems();
      setCartDetails(response.data);
    }
    fetchCart();
  }, [getCartItems]);
  async function fetchCart() {
    const response = await getCartItems();
    setCartDetails(response.data);
  }
  async function removeItem(productId) {
    const response = await removeCartItem(productId);
    setCartDetails(response.data);
  } 
  async function updateQuantity(productId,count) {
    if(count<1)
      return;
    const response = await updateCartItem(productId,count);
    setCartDetails(response.data);
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Shopping Cart</h2>
      <Table striped bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>QTY</th>
            <th>PRICE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.data?.products?.map((product) => (
            <tr key={product.product.id}>
              <td>
                <Row className="align-items-center">
                  <Col xs={4} md={3}>
                    <Image 
                      src={product.product.imageCover} 
                      rounded 
                      fluid 
                      className={style.productImage}
                    />
                  </Col>
                  <Col>{product.product.title}</Col>
                </Row>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Button onClick={()=>updateQuantity(product.product.id ,product.count-1)} variant="outline-secondary" size="sm" className="me-2">-</Button>
                  <span>{product.count}</span>
                  <Button onClick={()=>updateQuantity(product.product.id ,product.count+1)} variant="outline-secondary" size="sm" className="ms-2">+</Button>
                </div>
              </td>
              <td>{product.price} EGP</td>
              <td>
                <Button onClick={() => removeItem(product.product.id)} variant="danger" size="sm">
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
