import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="mb-4 display-4 text-primary">Welcome to InstantEats</h1>
      <div>
        <Link to="/signup" className="me-3">
          <button className="btn btn-success btn-lg px-4">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-outline-primary btn-lg px-4">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
