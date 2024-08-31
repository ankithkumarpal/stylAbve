import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./profilesetting.css";
import { useToasts } from "react-toast-notifications";
import { getHeaders, getProfileInfo, getUserId, updateProfileInfo} from "../../services/routpath";
import { BeatLoader } from "react-spinners";

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

  useEffect(() => {
    getProfileInformation();
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
    console.log(user);
  }, [user]);

  const getProfileInformation = () => {
    setIsLoading(true);
    axios
      .get(`${getProfileInfo}?id=${getUserId()}`, { headers: getHeaders() })
      .then((response) => {
        addToast("Profile fetched successfully", { appearance: "success" });
        const userData = response.data.data;
        
        setUser({
          id: getUserId(),
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.Address ? {
            doorNo: userData.Address.doorNo || "",
            area: userData.Address.area || "",
            landmark: userData.Address.landmark || "",
            pincode: userData.Address.pincode || "",
            country: userData.Address.country || "",
          } : {
            doorNo: "",
            area: "",
            landmark: "",
            pincode: "",
            country: "",
          },
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
        addToast("Profile fetching failed", { appearance: "error" });
      }).finally(()=>{setIsLoading(false)});
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
  
    const payload = {
      id: getUserId(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      doorNo: user.address.doorNo,
      area: user.address.area,
      landmark: user.address.landmark,
      pincode: user.address.pincode,
      country: user.address.country,
    };

    axios
      .patch(updateProfileInfo, payload, {headers: getHeaders()})
      .then((response) => {
        setUser((prevState) => ({
          ...prevState,
          ...response.data.data,
          address: response.data.data.Address,
        }));
        setIsLoading(false);
        setIsSaveDisabled(false);
        addToast("Profile updated successfully", { appearance: "success" });
      })
      .catch((error) => {
        setIsLoading(false);
        setIsSaveDisabled(false);
        addToast("Update failed", { appearance: "error" });
      });
  };
  

  const handleNavigate = (path) => {
    history.push(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    addToast("Logged out successfull" , {appearance : "success"})
    history.push("/login");
  };

  const handleDeleteAccount = () => {
    alert("Account deletion functionality is not implemented yet.");
  };

  return (
    <div className="user-profile">
       <div className="spinner">
        <BeatLoader loading={isLoading} color="white" />
      </div>
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
            <label htmlFor="altPhone">Alternative Phone Number (Optional)</label>
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
              className="btn  m-2 btn-fixed"
              onClick={handleSaveChanges}
              disabled={isLoading | isSaveDisabled}
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
        {/* <button
          type="button"
          className="btn btn-secondary btn-sm m-2 delete-account"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button> */}
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
