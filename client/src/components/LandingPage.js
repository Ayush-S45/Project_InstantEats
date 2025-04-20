import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4 text-center">
      <h1>Welcome to Instant Eats</h1>
      <button className="btn btn-primary m-2" onClick={() => navigate('/login')}>Login</button>
      <button className="btn btn-secondary m-2" onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  );
}

export default LandingPage;
