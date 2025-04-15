import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import { useCart } from '../context/CartContext';

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!restaurant) {
    return <div className="alert alert-danger">Restaurant not found</div>;
  }

  const handleAddDishToCart = (dish) => {
    // Add restaurantName to dish object before adding to cart
    addToCart({ ...dish, restaurantName: restaurant.name });
  };

  const handleProceedToPayment = () => {
    navigate('/cart');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <h1>{restaurant.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <span className="badge bg-danger me-2">{restaurant.rating} ★</span>
            <span className="text-muted">{restaurant.cuisine}</span>
          </div>
          <p className="text-muted">{restaurant.deliveryTime} • {restaurant.priceRange}</p>
          <button className="btn btn-success btn-lg mb-3" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
          {restaurant.dishes && restaurant.dishes.length > 0 && (
            <>
              <h3>Dishes</h3>
              <ul className="list-group">
                {restaurant.dishes.map(dish => (
                  <li key={dish.id} className="list-group-item d-flex align-items-center">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginRight: '15px' }} 
                    />
                    <div className="flex-grow-1">
                      <h5>{dish.name}</h5>
                      <p className="mb-1 text-muted">{dish.description}</p>
                      <p className="mb-1 fw-bold">${dish.price.toFixed(2)}</p>
                    </div>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => handleAddDishToCart(dish)}
                    >
                      Add to Cart
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
