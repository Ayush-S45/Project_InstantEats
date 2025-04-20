import React, { useState, useEffect } from 'react';

function Profile() {
  const [userProfile, setUserProfile] = useState({
    userName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setUserProfile(parsedProfile);
      setFormData(parsedProfile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setEditing(!editing);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setEditing(false);
    setSubmitted(true);
  };

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      {submitted && (
        <div className="alert alert-success">
          Profile information saved successfully!
        </div>
      )}
      {!editing ? (
        <div className="card p-4 shadow-sm" style={{ maxWidth: '600px' }}>
          <p><strong>User Name:</strong> {userProfile.userName || 'N/A'}</p>
          <p><strong>Email:</strong> {userProfile.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {userProfile.phone || 'N/A'}</p>
          <p><strong>Address:</strong> {userProfile.address || 'N/A'}</p>
          <button className="btn btn-primary mt-3" onClick={handleEditToggle}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your address"
            />
          </div>
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Profile;
