import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import { useCart } from '../context/CartContext';

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const { addToCart, decreaseQuantity, cartItems } = useCart();
  const navigate = useNavigate();

  if (!restaurant) {
    return <div className="alert alert-danger">Restaurant not found</div>;
  }

  const handleAddDishToCart = (dish) => {
    // Add restaurantName to dish object before adding to cart
    addToCart({ ...dish, restaurantName: restaurant.name });
  };

  const handleDecreaseDishQuantity = (dish) => {
    decreaseQuantity({ ...dish, restaurantName: restaurant.name });
  };

  const handleProceedToPayment = () => {
    navigate('/cart');
  };

  const getDishQuantity = (dishId) => {
    const item = cartItems.find(i => i.id === dishId && i.restaurantName === restaurant.name);
    return item ? item.quantity : 0;
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
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-success btn-lg me-3" onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
            <span className="fw-bold">
              Total Price: $
              {cartItems
                .filter(item => item.restaurantName === restaurant.name)
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          {restaurant.dishes && restaurant.dishes.length > 0 && (
            <>
              <h3>Dishes</h3>
              <ul className="list-group">
                {restaurant.dishes.map(dish => {
                  const quantity = getDishQuantity(dish.id);
                  return (
                    <li key={dish.id} className="list-group-item d-flex align-items-center">
                      <img 
                        src={dish.image} 
                        alt={dish.name} 
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginRight: '15px' }} 
                      />
                      <div className="flex-grow-1">
                        <h5>
                          {dish.name} {quantity > 0 && <span className="badge bg-primary ms-2">{quantity}</span>}
                        </h5>
                        <p className="mb-1 text-muted">{dish.description}</p>
                        <p className="mb-1 fw-bold">${dish.price.toFixed(2)}</p>
                      </div>
                      {quantity === 0 ? (
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => handleAddDishToCart(dish)}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="d-flex align-items-center">
                          <button 
                            className="btn btn-outline-danger me-2"
                            onClick={() => handleDecreaseDishQuantity(dish)}
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button 
                            className="btn btn-outline-primary ms-2"
                            onClick={() => handleAddDishToCart(dish)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
