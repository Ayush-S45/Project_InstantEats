import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Navigate to search page with search query as URL param
    navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand font-weight-bold" to="/">
            <span className="text-danger">Instant</span>Eats
          </Link>
          <div className="mx-auto" style={{ width: '500px' }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for restaurants or cuisines..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <div className="input-group-append">
                <button className="btn btn-danger" type="button" onClick={handleSearch}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto align-items-center">
              <li className="nav-item mx-2">
                <Link className="btn btn-danger" to="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="btn btn-outline-primary" to="profile">
                  <i className="fas fa-user"></i> Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
