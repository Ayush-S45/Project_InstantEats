import React, { useState } from 'react';

function Profile() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just mark as submitted
    setSubmitted(true);
  };

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      {submitted ? (
        <div className="alert alert-success">
          Profile information submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-control" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      )}
    </div>
  );
}

export default Profile;
