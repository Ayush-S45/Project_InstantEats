import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, clearCart } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Initialize Stripe
  const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual publishable key

  const handlePayment = async () => {
    const stripe = await stripePromise;

    // Create a payment session (this is a placeholder, implement your backend logic)
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    });

    const sessionId = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error('Error redirecting to checkout:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name}
                <span className="badge bg-primary rounded-pill">{item.quantity}</span>
              </li>
            ))}
          </ul>
          <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
          <p className="mt-3">Total items: {totalItems}</p>
          <button className="btn btn-success" onClick={handlePayment}>Pay</button>
        </>
      )}
    </div>
  );
}

export default Cart;
