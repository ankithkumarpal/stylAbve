import React from "react";
import "./history.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { BeatLoader } from 'react-spinners';

function Order() {
  const { addToast } = useToasts();
  const { user } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://unqiue-carving.onrender.com/api/cart/get-cart/${"669bed6db7745e761a308068"}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
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

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  }

  const removeItem = async (id) => {
    setIsLoading(true);
    try {
      await axios.get(`/cart/remove-product/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      addToast('Item removed successfully', { appearance: 'success' });
      getCartItems();
    } catch (error) {
      addToast('Failed to remove item', { appearance: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  const purchaseOrder = () => {
    console.log(cartItems);
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
                                  <var className="price">Rs: {product.price * product.quantity}</var>
                                  <small className="text-muted"> {product.price} Rs/- each </small>
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
                        <dd className="text-right ml-3">  Rs: {totalPrice} /-</dd>
                      </dl>
                      <dl className="dlist-align">
                        <dt>Discount:</dt>
                        <dd className="text-right text-danger ml-3">Rs: 0.00/-</dd>
                      </dl>
                      <dl className="dlist-align">
                        <dt>Total:</dt>
                        <dd className="text-right text-dark b ml-3">
                          <strong>Rs : { totalPrice} /-</strong>
                        </dd>
                      </dl>
                      <hr />
                      <button
                        className="btn btn-out btn-primary btn-square btn-main"
                        onClick={purchaseOrder}
                      >
                        Make Purchase
                      </button>
                      <Link
                        to={`/pencilarts`}
                        className="btn btn-out btn-success btn-square btn-main mt-2"
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
