import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, addToCart, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  // Group cart items by restaurantName
  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.restaurantName]) {
      groups[item.restaurantName] = [];
    }
    groups[item.restaurantName].push(item);
    return groups;
  }, {});

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayClick = () => {
    navigate('/payment');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            {Object.entries(groupedItems).map(([restaurantName, items]) => (
              <div key={restaurantName} className="mb-4">
                <h4 className="mb-3 text-primary">{restaurantName}</h4>
                <ul className="list-group mb-3">
                  {items.map(item => (
                    <li key={`${item.id}-${item.restaurantName}`} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{item.name}</strong> x {item.quantity}
                        <div className="btn-group ms-3" role="group" aria-label="Quantity controls">
                          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => decreaseQuantity(item)}>-</button>
                          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => addToCart(item)}>+</button>
                        </div>
                      </div>
                      <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="fw-bold fs-5">Total Payable Amount: ${totalPrice.toFixed(2)}</p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-outline-danger me-3" onClick={clearCart}>Clear Cart</button>
              <button className="btn btn-success" onClick={handlePayClick}>Pay</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
