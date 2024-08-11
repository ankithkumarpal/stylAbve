export const  getLogin = "https://unqiue-carving.onrender.com/api/auth/login";
export const register = "https://unqiue-carving.onrender.com/api/auth/register";
export const generateOtp = "https://unqiue-carving.onrender.com/api/email/generate-otp";
export const verifyOtp = "https://unqiue-carving.onrender.com/api/email/verify-otp";
export const resetPassword = "https://unqiue-carving.onrender.com/api/auth/reset-password";
export const getPencilCarveProducts = "https://unqiue-carving.onrender.com/api/product/get-products?productType=pencilcarving";
export const productAddTocart = "https://unqiue-carving.onrender.com/api/cart/add-to-cart";
export const getScrunchies = "https://unqiue-carving.onrender.com/api/product/get-products?productType=scrunchies";
export const getCartProducts = "https://unqiue-carving.onrender.com/api/cart/get-cart/";
export const removeCartProudct = "https://unqiue-carving.onrender.com/api/cart/remove-product";
export const getOrdersInfo = "https://unqiue-carving.onrender.com/api/orders/get-order";
export const getProfileInfo = "https://unqiue-carving.onrender.com/api/profile/fetch/profile-setting";
export const updateProfileInfo = "http://localhost:5000/api/profile/update/profile-setting";
export const deactivateAccount = "http://localhost:5000/api/profile/update/deactivate";


// auth.js

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getAccessToken = () => {
  return localStorage.getItem('access-token');
};

export const getUserId = () => {
  const user = getUser();
  return user ? user.id : null;
};

export const getUserName = () => {
  const user = getUser();
  return user ? user.name : null;
};

export const getUserEmail = () => {
  const user = getUser();
  return user ? user.email : null;
};

export const getLastLogin = ()=>{
  const user = getUser();
  return user ? user.lastLogin : null;
}

export const getHeaders = () => {
  const accesstoken = getAccessToken();
  return {
    'Authorization': `Bearer ${accesstoken}`,
    'Content-Type': 'application/json'
  };
};

