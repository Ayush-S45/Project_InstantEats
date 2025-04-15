import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="card mb-4 shadow-sm text-decoration-none text-dark">
      <img 
        src={restaurant.image} 
        className="card-img-top" 
        alt={restaurant.name}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{restaurant.name}</h5>
        <div className="d-flex justify-content-between">
          <span className="badge bg-danger">{restaurant.rating} ★</span>
          <span className="text-muted">{restaurant.cuisine}</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
