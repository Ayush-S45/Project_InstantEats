import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import { restaurants } from '../data/restaurants';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';

  // Filter restaurants by name matching search query
  const matchedRestaurants = searchQuery
    ? restaurants.filter(r => r.name.toLowerCase().includes(searchQuery))
    : [];

  // Filter dishes by name matching search query, include restaurant info
  const matchedDishes = searchQuery
    ? restaurants.flatMap(r =>
        r.dishes
          .filter(dish => dish.name.toLowerCase().includes(searchQuery))
          .map(dish => ({
            ...dish,
            restaurantName: r.name,
            restaurantRating: r.rating,
            restaurantId: r.id
          }))
      )
    : [];

  return (
    <div className="container mt-4">
      <h2>Search Results for "{searchQuery}"</h2>

      {matchedRestaurants.length > 0 ? (
        <>
          <h3>Restaurants</h3>
          <div className="row mb-4">
            {matchedRestaurants.map(restaurant => (
              <div key={restaurant.id} className="col-md-4 mb-3">
                <Link to={`/instanteats/restaurant/${restaurant.id}`}>
                  <RestaurantCard restaurant={restaurant} />
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h5>No restaurants found.</h5>
      )}

      {matchedDishes.length > 0 ? (
        <>
          <h3>Dishes</h3>
          <div className="list-group">
            {matchedDishes.map(dish => (
              <Link
                key={dish.id}
                to={`/instanteats/restaurant/${dish.restaurantId}`}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-3 p-3"
                style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
              >
                <div>
                  <h5>{dish.name}</h5>
                  <p className="mb-0">
                    Restaurant: <strong>{dish.restaurantName}</strong> | Price: ${dish.price.toFixed(2)} | Rating: {dish.restaurantRating}⭐
                  </p>
                </div>
                {dish.image && (
                  <div style={{ border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden', width: '110px', height: '80px', flexShrink: 0 }}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <h5>No dishes found.</h5>
      )}
    </div>
  );
};

export default Search;
