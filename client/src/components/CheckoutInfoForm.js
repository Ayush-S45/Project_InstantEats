import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutInfoForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    houseNumber: '',
    city: '',
    postalCode: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to localStorage or update user profile context if available
    localStorage.setItem('checkoutInfo', JSON.stringify(formData));
    setSubmitted(true);
    // Navigate to payment gateway after short delay
    setTimeout(() => {
      navigate('/payment');
    }, 1000);
  };

  return (
    <div className="container mt-4">
      <h2>Checkout Information</h2>
      {submitted ? (
        <div className="alert alert-success">
          Information saved! Redirecting to payment gateway...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="houseNumber" className="form-label">House Number</label>
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              className="form-control"
              value={formData.houseNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className="form-control"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Continue to Payment</button>
        </form>
      )}
    </div>
  );
};

export default CheckoutInfoForm;
