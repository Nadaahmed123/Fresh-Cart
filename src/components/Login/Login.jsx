import React, { useContext, useState } from 'react';
import { Button, Form, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { ClimbingBoxLoader } from 'react-spinners';

export default function Login() {
  const { setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(values) {
    setIsLoading(true);
    setApiError('');

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === 'success') {
          localStorage.setItem('userToken', apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate('/');
        }
      })
      .catch((error) => {
        setApiError(error?.response?.data?.message || 'Login failed. Please check your credentials.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="auth-container" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--light-color) 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '2rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div className="auth-bg-decoration" style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, transparent 70%)',
        zIndex: 0
      }}></div>
      <div className="auth-bg-decoration" style={{
        position: 'absolute',
        bottom: '-50%',
        left: '-50%',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, transparent 70%)',
        zIndex: 0
      }}></div>
      
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="form-container shadow-custom-lg fade-in" style={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <div className="auth-icon-container" style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--info-color))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      boxShadow: '0 8px 25px rgba(46, 204, 113, 0.3)'
                    }}>
                      <i className="bi bi-person-circle display-4 text-white"></i>
                    </div>
                  </div>
                  <h2 className="form-title text-gradient fw-bold">Welcome Back</h2>
                  <p className="text-muted mb-0">Sign in to your account to continue shopping</p>
                </div>

                {apiError && (
                  <Alert variant="danger" className="text-center border-0" style={{
                    background: 'rgba(231, 76, 60, 0.1)',
                    color: 'var(--accent-color)',
                    borderRadius: 'var(--border-radius-sm)'
                  }}>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {apiError}
                  </Alert>
                )}

                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label className="fw-semibold d-flex align-items-center">
                      <i className="bi bi-envelope me-2 text-primary"></i>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && !!formik.errors.email}
                      className="form-control-lg border-0"
                      style={{
                        background: 'var(--gray-100)',
                        borderRadius: 'var(--border-radius-sm)',
                        padding: '1rem 1.25rem'
                      }}
                    />
                    <Form.Control.Feedback type="invalid" className="d-flex align-items-center">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label className="fw-semibold d-flex align-items-center">
                      <i className="bi bi-lock me-2 text-primary"></i>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                      className="form-control-lg border-0"
                      style={{
                        background: 'var(--gray-100)',
                        borderRadius: 'var(--border-radius-sm)',
                        padding: '1rem 1.25rem'
                      }}
                    />
                    <Form.Control.Feedback type="invalid" className="d-flex align-items-center">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      id="rememberMe"
                      label="Remember me"
                      className="text-muted"
                    />
                    <Link 
                      to="#" 
                      className="text-decoration-none fw-medium"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="d-grid mb-4">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={isLoading}
                      className="btn-primary border-0"
                      style={{
                        background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
                        padding: '1rem',
                        borderRadius: 'var(--border-radius-sm)',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}
                    >
                      {isLoading ? (
                        <div className="d-flex align-items-center justify-content-center">
                          <ClimbingBoxLoader color="white" size={15} className="me-2" />
                          Signing In...
                        </div>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-center mb-4">
                    <div className="divider" style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '1.5rem 0'
                    }}>
                      <div style={{ flex: 1, height: '1px', background: 'var(--gray-300)' }}></div>
                      <span className="px-3 text-muted">or continue with</span>
                      <div style={{ flex: 1, height: '1px', background: 'var(--gray-300)' }}></div>
                    </div>
                    
                    <div className="social-login-buttons">
                      <Button 
                        variant="outline-secondary" 
                        className="me-2 mb-2"
                        style={{
                          borderRadius: 'var(--border-radius-sm)',
                          padding: '0.75rem 1.5rem',
                          border: '2px solid var(--gray-300)'
                        }}
                      >
                        <i className="bi bi-google me-2"></i>
                        Google
                      </Button>
                      <Button 
                        variant="outline-secondary"
                        className="mb-2"
                        style={{
                          borderRadius: 'var(--border-radius-sm)',
                          padding: '0.75rem 1.5rem',
                          border: '2px solid var(--gray-300)'
                        }}
                      >
                        <i className="bi bi-facebook me-2"></i>
                        Facebook
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{' '}
                      <Link 
                        to="/register" 
                        className="text-decoration-none fw-bold"
                        style={{ 
                          color: 'var(--primary-color)',
                          background: 'linear-gradient(135deg, var(--primary-color), var(--info-color))',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
