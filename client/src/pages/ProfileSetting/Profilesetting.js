import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./profilesetting.css";
import { useToasts } from "react-toast-notifications";

const ProfileSetting = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    altPhone: "",
    address: {
      doorNo: "",
      area: "",
      landmark: "",
      pincode: "",
      country: "",
    },
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const userId = "669bed6db7745e761a308068";

  useEffect(() => {
    getProfileInfo();
  }, []);

  useEffect(() => {
    const { name, email, phone, address } = user;
    const { doorNo, area, landmark, pincode, country } = address;

    if (
      name &&
      email &&
      phone.match(/^\d{10}$/) &&
      doorNo &&
      area &&
      landmark &&
      pincode.match(/^\d{6}$/) &&
      country
    ) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [user]);

  const getProfileInfo = () => {
    axios
      .get(
        `https://unqiue-carving.onrender.com/api/profile/fetch/profile-setting?id=${userId}`
      )
      .then((response) => {
        addToast("profile fetched successfully", { appearance: "success" });
        const userData = response.data.data;
        setUser({
          id: userId,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.Address
            ? {
                doorNo: userData.Address.doorNo,
                area: userData.Address.area,
                landmark: userData.Address.landmark,
                pincode: userData.Address.pincode,
                country: userData.Address.country,
              }
            : {},
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
        addToast("Profile Fetching failed", { appearance: "error" });
      });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id in user.address) {
      setUser((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [id]: value,
        },
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    axios
      .patch(`http://localhost:5000/api/profile/update/profile-setting`, {
        id: userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        doorNo: user.address.doorNo,
        area: user.address.area,
        landmark: user.address.landmark,
        pincode: user.address.pincode,
        country: user.address.country,
      })
      .then((response) => {
        setUser((prevState) => ({
          ...prevState,
          ...response.data.data,
          address: response.data.data.Address,
        }));
        setIsLoading(false);
        addToast("Profile updated successfully", { appearance: "success" });
      })
      .catch((error) => {
        setIsLoading(false);
        addToast("Update failed", { appearance: "error" });
      });
  };

  const handleNavigate = (path) => {
    history.push(path);
  };

  const handleLogout = () => {
    // clear session or local storage token
    history.push("/login");
  };

  const handleDeleteAccount = () => {
    alert("Account deletion functionality is not implemented yet.");
  };

  return (
    <div className="user-profile">
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "cursive",
        }}
      >
        User Profile
      </h1>
      <form className="profile-form">
        <div className="field-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div className="field-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              pattern="^\d{10}$"
              maxLength={10}
              required
              title="Phone number should be exactly 10 digits"
            />
          </div>
          <div className="form-group">
            <label htmlFor="altPhone">Alternative Phone Number</label>
            <input
              type="tel"
              id="altPhone"
              value={user.altPhone}
              onChange={handleInputChange}
              placeholder="Enter your alternative phone number"
            />
          </div>
        </div>
        <div className="form-group">
          <h2>Shipping Address</h2>
          <div className="field-row">
            <div className="address-group">
              <label htmlFor="doorNo">Door Number</label>
              <input
                type="text"
                id="doorNo"
                value={user.address.doorNo}
                onChange={handleInputChange}
                placeholder="Enter door number"
                required
              />
            </div>
            <div className="address-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                value={user.address.area}
                onChange={handleInputChange}
                placeholder="Enter your area"
                required
              />
            </div>
            <div className="address-group">
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                id="landmark"
                value={user.address.landmark}
                onChange={handleInputChange}
                placeholder="Enter landmark"
                required
              />
            </div>
            <div className="address-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                value={user.address.pincode}
                onChange={handleInputChange}
                placeholder="Enter pincode"
                required
              />
            </div>
            <div className="address-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                value={user.address.country}
                onChange={handleInputChange}
                placeholder="Enter country"
                required
              />
            </div>
          </div>
          <div className="field-row">
            <button
              type="button"
              className="btn btn-primary m-2 btn-fixed"
              onClick={handleSaveChanges}
              disabled={isSaveDisabled || isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </form>
      <h2>Account Management</h2>
      <div className="field-row">
        <button
          type="button"
          className="btn btn-success btn-sm m-2"
          onClick={() => handleNavigate("/order-history")}
        >
          Past orders
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm m-2 delete-account"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm m-2 delete-account"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfileSetting;
