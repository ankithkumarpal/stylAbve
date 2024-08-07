import React from 'react';
import { useHistory } from 'react-router-dom';
import './profilesetting.css';

const ProfileSetting = () => {
  const history = useHistory();

  const handleNavigate = (path) => {
    history.push(path);
  };

  const handleDeleteAccount = () => {
    alert('Account deletion functionality is not implemented yet.');
  };

  return (
    <div className="user-profile">
      <h1 style={{display:'flex',alignItems:"center",justifyContent:"center",fontFamily:'cursive'}}>User Profile</h1>
      <form className="profile-form">
        <div className="field-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
        </div>
        <div className="field-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="altPhone">Alternative Phone Number</label>
            <input type="tel" id="altPhone" placeholder="Enter your phone number" />
          </div>
        </div>
        <div className="form-group">
          <h2>Shipping Address</h2>
          <div className="field-row">
            <div className="address-group">
              <label htmlFor="doorNo">Door Number</label>
              <input type="text" id="doorNo" placeholder="Enter door number" />
            </div>
            <div className="address-group">
              <label htmlFor="area">Area</label>
              <input type="text" id="area" placeholder="Enter your area" />
            </div>
            <div className="address-group">
              <label htmlFor="landmark">Landmark</label>
              <input type="text" id="landmark" placeholder="Enter landmark" />
            </div>
            <div className="address-group">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" id="pincode" placeholder="Enter pincode" />
            </div>
            <div className="address-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" placeholder="Enter country" />
            </div>
          </div>
          <div className="field-row">
            <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigate('/trackorders')}>Save Changes</button>
          </div>
        </div>
      </form>
      <h2>Account Management</h2>
      <div className="field-row">
<button type="button" className="btn btn-success btn-sm m-2" onClick={() => handleNavigate('/order-history')}>Past Orders</button>
<button type="button" className="btn btn-secondary btn-sm m-2 delete-account" onClick={handleDeleteAccount}>Delete Account</button>
<button type="button" className="btn btn-danger btn-sm m-2 delete-account" onClick={handleDeleteAccount}>Sign out</button>
  </div>
      </div>
  );
};

export default ProfileSetting;
