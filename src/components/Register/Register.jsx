import React, { useState, useEffect, useContext } from 'react';
import style from './Register.module.css';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  let {setUserLogin}=useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {}, []);

  function handleRegister(values) {
    setIsLoading(true);
  
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === 'success') {
          localStorage.setItem('userToken', apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate('/');
        }
      })
      .catch((error) => {
        setApiError(error?.response?.data?.message || "Registration failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name is too short').required('Name is required'),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Invalid phone number')
      .required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-4">Register</h1>

      {apiError && (
        <div className="alert alert-danger text-center">{apiError}</div>
      )}

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && !!formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.phone && !!formik.errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

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
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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

        <Form.Group className="mb-3" controlId="formRePassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="rePassword"
            placeholder="Confirm password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.rePassword && !!formik.errors.rePassword}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.rePassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
  {isLoading ? (
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  ) : (
    "Register"
  )}
</Button>
<p className="mt-3 text-center">
          i have an account? <Link to="/login">login Now</Link>
        </p>

      </Form>
    </div>
  );
}
