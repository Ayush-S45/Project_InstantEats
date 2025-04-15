import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import { restaurants } from '../data/restaurants';

const RestaurantList = () => {
  const [filters, setFilters] = useState({
    cuisine: '',
    rating: '',
    price: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (
      (!filters.cuisine || restaurant.cuisine === filters.cuisine) &&
      (!filters.rating || restaurant.rating >= Number(filters.rating)) &&
      (!filters.price || restaurant.priceRange === filters.price)
    );
  });

  const uniqueValues = (key) => [...new Set(restaurants.map(r => r[key]))];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/cart" className="btn btn-danger me-2">
          <i className="fas fa-shopping-cart"></i> Cart
        </Link>
        <Link to="/profile" className="btn btn-outline-primary">
          <i className="fas fa-user"></i> Profile
        </Link>
      </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5>Filters</h5>
            </div>
            <div className="card-body">
              {/* Cuisine Filter */}
              <div className="mb-3">
                <label className="form-label">Cuisine</label>
                <select
                  name="cuisine"
                  className="form-select"
                  value={filters.cuisine}
                  onChange={handleFilterChange}
                >
                  <option value="">All Cuisines</option>
                  {uniqueValues('cuisine').map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-3">
                <label className="form-label">Minimum Rating</label>
                <select
                  name="rating"
                  className="form-select"
                  value={filters.rating}
                  onChange={handleFilterChange}
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <select
                  name="price"
                  className="form-select"
                  value={filters.price}
                  onChange={handleFilterChange}
                >
                  <option value="">Any Price</option>
                  {uniqueValues('priceRange').map(price => (
                    <option key={price} value={price}>{price}</option>
                  ))}
                </select>
              </div>

              <button
                className="btn btn-outline-danger w-100"
                onClick={() => setFilters({ cuisine: '', rating: '', price: '' })}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="row">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map(restaurant => (
                <div key={restaurant.id} className="col-md-4 mb-4">
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h4>No restaurants match your filters</h4>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => setFilters({ cuisine: '', rating: '', price: '' })}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
