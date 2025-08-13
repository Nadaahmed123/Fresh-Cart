import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { CartContext } from '../../Context/cart/CartContext';
import style from './Cart.module.css';
import { ClimbingBoxLoader } from 'react-spinners';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getCartItems, removeCartItem, updateCartItem } = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, [getCartItems]);

  async function fetchCart() {
    try {
      setLoading(true);
      const response = await getCartItems();
      setCartDetails(response.data);
    } catch (error) {
      toast.error('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId) {
    try {
      const response = await removeCartItem(productId);
      setCartDetails(response.data);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  }

  async function updateQuantity(productId, count) {
    if (count < 1) return;
    try {
      const response = await updateCartItem(productId, count);
      setCartDetails(response.data);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <ClimbingBoxLoader color='var(--primary-color)' size={20} />
      </div>
    );
  }

  if (!cartDetails?.data?.products || cartDetails.data.products.length === 0) {
    return (
      <div className="section">
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
          <h3 className="text-muted mb-3">Your cart is empty</h3>
          <p className="text-muted mb-4">Add some products to get started!</p>
          <Button href="/products" variant="primary" size="lg">
            <i className="bi bi-arrow-left me-2"></i>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-title">
        <h2 className="text-gradient">Shopping Cart</h2>
        <p className="text-muted">
          {cartDetails?.data?.products?.length} item{cartDetails?.data?.products?.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <Container>
        <Row>
          <Col lg={8}>
            <div className="cart-items">
              {cartDetails?.data?.products?.map((product) => (
                <Card key={product.product.id} className="cart-item mb-3 fade-in">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={12} md={3}>
                        <div className="cart-item-image-container">
                          <Image
                            src={product.product.imageCover}
                            className="cart-item-image"
                            alt={product.product.title}
                          />
                        </div>
                      </Col>
                      
                      <Col xs={12} md={6}>
                        <div className="cart-item-details">
                          <h6 className="cart-item-title mb-2">
                            {product.product.title}
                          </h6>
                          <p className="text-muted mb-2">
                            {product.product.category?.name}
                          </p>
                          <div className="d-flex align-items-center mb-2">
                            <span className="product-rating me-3">
                              <i className="fas fa-star text-warning me-1"></i>
                              {product.product.ratingsAverage}
                            </span>
                            <Badge bg="success" className="me-2">
                              In Stock
                            </Badge>
                          </div>
                        </div>
                      </Col>
                      
                      <Col xs={12} md={3}>
                        <div className="cart-item-actions text-end">
                          <div className="quantity-controls mb-3">
                            <div className="d-flex align-items-center justify-content-end">
                              <Button
                                onClick={() => updateQuantity(product.product.id, product.count - 1)}
                                variant="outline-secondary"
                                size="sm"
                                className="quantity-btn"
                              >
                                <i className="bi bi-dash"></i>
                              </Button>
                              <span className="mx-3 fw-bold">{product.count}</span>
                              <Button
                                onClick={() => updateQuantity(product.product.id, product.count + 1)}
                                variant="outline-secondary"
                                size="sm"
                                className="quantity-btn"
                              >
                                <i className="bi bi-plus"></i>
                              </Button>
                            </div>
                          </div>
                          
                          <div className="price-info mb-3">
                            <div className="product-price fw-bold fs-5">
                              {product.price} EGP
                            </div>
                            <div className="text-muted">
                              {product.count} × {product.price / product.count} EGP
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => removeItem(product.product.id)}
                            variant="outline-danger"
                            size="sm"
                            className="w-100"
                          >
                            <i className="bi bi-trash me-1"></i>
                            Remove
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
          
          <Col lg={4}>
            <Card className="cart-summary sticky-top">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-receipt me-2"></i>
                  Order Summary
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="summary-item d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{cartDetails?.data?.totalCartPrice} EGP</span>
                </div>
                <div className="summary-item d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="summary-item d-flex justify-content-between mb-3">
                  <span className="fw-bold fs-5">Total:</span>
                  <span className="fw-bold fs-5 text-primary">
                    {cartDetails?.data?.totalCartPrice} EGP
                  </span>
                </div>
                
                <Button variant="success" size="lg" className="w-100 mb-2">
                  <i className="bi bi-credit-card me-2"></i>
                  Proceed to Checkout
                </Button>
                
                <Button variant="outline-primary" size="lg" className="w-100" href="/products">
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
