import React from "react";
import "./history.css";
import {useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { BeatLoader } from 'react-spinners';
import { getCartProducts, getHeaders, getUserId, removeCartProudct } from "../../services/routpath";
import PaymentAddressModal from "../Modal/PaymentAddressModal";
function Order() {
  const { addToast } = useToasts();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [discount, setDiscount] = useState(10);
  const [netPayable , setNetPayable] = useState(0);
  const [address, setAddress] = useState({
    doorNo: "",
    area: "",
    landmark: "",
    city: "",
    pincode: "",
    country: "",
  });
  useEffect(() => {
    getCartItems();
    fetchAddress();
  }, []);

  const fetchAddress = async()=>{
    try {
       const response = await axios.get(`https://unqiue-carving.onrender.com/api/profile/fetch/user-address?id=${getUserId()}` , { headers: getHeaders() })
       if(response.data){
           setAddress({
               doorNo: response.data.data.doorNo,
               area: response.data.data.area,
               landmark: response.data.data.landmark,
               city: response.data.data.city,
               pincode: response.data.data.pincode,
               country: response.data.data.country
           })
       }
       console.log(address);
    } catch (error) {
       console.log(error.message);
    }
 }

  const getCartItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${getCartProducts}${getUserId()}`, {
        headers: getHeaders()
      });
      setCartItems(response.data.data);
      
    } catch (error) {
      addToast('Failed to fetch cart items', {appearance: 'error'});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  useEffect(()=>{
    setNetPayable(totalPrice - ((totalPrice*discount)/100))
  },[totalPrice]);


  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, product) => {
      return acc + product.productDetails.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  }

  const removeItem = async (id) => {
    setIsLoading(true);
    try {
      await axios.get(`${removeCartProudct}/${id}`, {
        headers: getHeaders()
      });
      addToast('Item removed successfully', { appearance: 'success' });
      getCartItems();
    } catch (error) {
      addToast('Failed to remove item', { appearance: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="home">
        <div className="spinner">
          <BeatLoader loading={isLoading} color="black" />
        </div>
        <div className="cart-content">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
          </div>
          <div className="cart-product-container">
            <div className="container-fluid mt-0">
              <div className="row mt-1">
                <aside className="col-lg-9">
                  <div className="card">
                    <div className="table-responsive">
                      <table className="table table-borderless table-shopping-cart">
                        <thead className="text-muted">
                          <tr className="small text-uppercase">
                            <th scope="col" className="columns">
                              Product
                            </th>
                            <th scope="col" className="columns" width="120">
                              Quantity
                            </th>
                            <th scope="col" className="columns" width="120">
                              Price
                            </th>
                            <th
                              scope="col"
                              className="columns text-right d-none d-md-block"
                              width="200"
                            ></th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {cartItems.map((product) => (
                            <tr key={product._id} className="table-body">
                              <td>
                                <figure className="itemside align-items-center">
                                  <div className="aside">
                                    <img src={product.productDetails.images[0]} className="img-sm" alt="Product" />
                                  </div>
                                  <figcaption className="info">
                                  </figcaption>
                                </figure>
                              </td>
                              <td>
                                <div className="quantity-control">
                                  <button 
                                    className="dec-button"
                                    onClick={() => {
                                      setCartItems(cartItems.map(item => 
                                        item._id === product._id 
                                          ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
                                          : item
                                      ));
                                      calculateTotalPrice();
                                    }}
                                  >
                                    -
                                  </button>
                                  <span className="quantity">{product.quantity}</span>
                                  <button 
                                    className="dec-button"
                                    onClick={() => {
                                      setCartItems(cartItems.map(item => 
                                        item._id === product._id 
                                          ? { ...item, quantity: item.quantity + 1 }
                                          : item
                                      ));
                                      calculateTotalPrice();
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td>
                                <div className="price-wrap">
                                  <var className="price">Rs: {product.productDetails.price * product.quantity}</var>
                                  <small className="text-muted"> {product.productDetails.price} Rs/- each </small>
                                </div>
                              </td>
                              <td className="text-right">
                                <button className="remove-button" onClick={() => removeItem(product._id)}>
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </aside>
                <aside className="col-lg-3">
                  <div className="card mt-1">
                    <div className="card-body">
                      <dl className="dlist-align">
                        <dt>Total price: </dt>
                        <dd className="text-right ml-3 text-dark">  Rs: {totalPrice} /-</dd>
                      </dl>
                      <dl className="dlist-align">
                        <dt>Discount:</dt>
                        <dd className="text-right text-dark ml-3">Rs: {discount}/-</dd>
                      </dl>
                      <dl className="dlist-align">
                        <dt>Net Pay :</dt>
                        <dd className="text-right text-dark b ml-3">
                          <strong className="text-success">Rs : { netPayable} /-</strong>
                        </dd>
                      </dl>
                      <hr />
                      {/* <button
                        className="btn btn-out btn-primary btn-square btn-main"
                        onClick={purchaseOrder}
                      >
                        Make Purchase
                      
                      </button> */}
                        <PaymentAddressModal cartItems={cartItems} address={address} setAddress={setAddress} discount={discount} totalAmount={totalPrice} netPayable={netPayable}/>
                      <Link
                        to={`/pencilarts`}
                        className="btn btn-out btn-primary btn-square btn-main mt-2"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
