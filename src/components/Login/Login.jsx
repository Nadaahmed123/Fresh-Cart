import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'; // ✅ ADD THIS

export default function Login() {
  const { setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(values) {
    setIsLoading(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values) // ✅ FIXED
      .then((apiResponse) => {
        if (apiResponse?.data?.message === 'success') {
          localStorage.setItem('userToken', apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate('/');
        }
      })
      .catch((error) => {
        setApiError(error?.response?.data?.message || 'Login failed');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
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
    <div className="container mt-5">
      <h1 className="text-center text-success mb-4">Login Now</h1>

      {apiError && <div className="alert alert-danger text-center">{apiError}</div>}

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Login'
          )}
        </Button>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register Now</Link>
        </p>
      </Form>
    </div>
  );
}
