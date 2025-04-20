import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentGateway() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    phone: '',
    residenceBlock: '',
    houseNo: '',
    city: '',
    postalCode: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handlePaymentSelection = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!deliveryInfo.address.trim()) errors.address = 'Address is required';
    if (!deliveryInfo.phone.trim()) errors.phone = 'Phone number is required';
    if (!deliveryInfo.residenceBlock.trim()) errors.residenceBlock = 'Residence block is required';
    if (!deliveryInfo.houseNo.trim()) errors.houseNo = 'House number is required';
    if (!deliveryInfo.city.trim()) errors.city = 'City is required';
    if (!deliveryInfo.postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!selectedPayment) errors.payment = 'Payment method is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) {
      alert('Please fill all required fields and select a payment method.');
      return;
    }

    // Mock payment processing
    if (selectedPayment === 'cod') {
      alert('Order placed with Cash on Delivery.');
      navigate('/order-confirmation'); // Assuming an order confirmation page
    } else if (selectedPayment === 'paypal') {
      alert('PayPal payment selected. Redirecting to PayPal...');
      // Implement PayPal payment flow here
    } else if (selectedPayment === 'razorpay') {
      alert('Razorpay payment selected. Redirecting to Razorpay...');
      // Implement Razorpay payment flow here
    }
  };

  return (
    <div className="container mt-4">
      <h2>Delivery Information</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
            value={deliveryInfo.address}
            onChange={handleInputChange}
          />
          {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="residenceBlock" className="form-label">Residence Block</label>
          <input
            type="text"
            id="residenceBlock"
            name="residenceBlock"
            className={`form-control ${formErrors.residenceBlock ? 'is-invalid' : ''}`}
            value={deliveryInfo.residenceBlock}
            onChange={handleInputChange}
          />
          {formErrors.residenceBlock && <div className="invalid-feedback">{formErrors.residenceBlock}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="houseNo" className="form-label">House Number</label>
          <input
            type="text"
            id="houseNo"
            name="houseNo"
            className={`form-control ${formErrors.houseNo ? 'is-invalid' : ''}`}
            value={deliveryInfo.houseNo}
            onChange={handleInputChange}
          />
          {formErrors.houseNo && <div className="invalid-feedback">{formErrors.houseNo}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
            value={deliveryInfo.city}
            onChange={handleInputChange}
          />
          {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            className={`form-control ${formErrors.postalCode ? 'is-invalid' : ''}`}
            value={deliveryInfo.postalCode}
            onChange={handleInputChange}
          />
          {formErrors.postalCode && <div className="invalid-feedback">{formErrors.postalCode}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
            value={deliveryInfo.phone}
            onChange={handleInputChange}
          />
          {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
        </div>
      </form>

      <h2 className="mt-4">Select Payment Method</h2>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="paymentMethod"
          id="cod"
          value="cod"
          checked={selectedPayment === 'cod'}
          onChange={handlePaymentSelection}
        />
        <label className="form-check-label" htmlFor="cod">
          Cash on Delivery
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="paymentMethod"
          id="paypal"
          value="paypal"
          checked={selectedPayment === 'paypal'}
          onChange={handlePaymentSelection}
        />
        <label className="form-check-label" htmlFor="paypal">
          PayPal
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="paymentMethod"
          id="razorpay"
          value="razorpay"
          checked={selectedPayment === 'razorpay'}
          onChange={handlePaymentSelection}
        />
        <label className="form-check-label" htmlFor="razorpay">
          Razorpay
        </label>
      </div>
      <button className="btn btn-primary mt-3" onClick={handlePayment}>
        Proceed
      </button>
    </div>
  );
}

export default PaymentGateway;
