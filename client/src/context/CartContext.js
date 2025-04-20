import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item already in cart
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove item if quantity is 1
          return prevItems.filter(i => i.id !== item.id);
        } else {
          // Decrease quantity by 1
          return prevItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          );
        }
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
