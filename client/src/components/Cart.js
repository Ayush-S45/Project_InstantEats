import React from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, clearCart } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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
        </>
      )}
    </div>
  );
}

export default Cart;
