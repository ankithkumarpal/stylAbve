import "./history.css";
import Navbar from "../../components/navbar/Navbar";
import PastOrders from "../../components/pastorder/Pastorder";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import flower from "../../assests/flower.jpeg";
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import {BeatLoader} from 'react-spinners';


function Order() {
  const { addToast } = useToasts();
  const { user } = useContext(Context);
  const [cartItem, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading , setIsLoading] = useState(true);
 
  useEffect(() => {
    getpost();
  }, []);

  const getpost = async () => {
    setIsLoading(true);
    const response = await axios.get(`/cart/get-cart/${user.user.id}` ,  {
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });
    setCartItems(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
      caluclateTotalPrice();
  }, [cartItem]);

  const caluclateTotalPrice = ()=>{
    const total = cartItem.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  }

  const removeItem = async (id) =>{
    setIsLoading(true);
  await axios.get(`/cart/remove-product/${id}` ,  {
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json'
    }
  }).then((res) => {
      console.log(res);
      addToast('Item removed successfully', { appearance: 'success' });
      getpost();
      setIsLoading(false);
    })
    .catch((err) => {
       addToast('Failed to remove item', { appearance: 'error' });
       setIsLoading(false);
    });
  }

  const purchaseOrder = ()=>{
      console.log(cartItem);
  }
  return (
    <>
      <Navbar />
      <div className="home">
      <div className="spinner">
            <BeatLoader loading={isLoading} color="black"/>
        </div>
        <div className="cart-content">
          <div className="cart-header ">
            <h1>Shopping Cart</h1>
          </div>
          <div className="cart-product-container ">
            <div class="container-fluid mt-0">
              <div class="row mt-1">
                <aside class="col-lg-9">
                  <div class="card">
                    <div class="table-responsive">
                      <table class="table table-borderless table-shopping-cart">
                        <thead class="text-muted">
                          <tr class="small text-uppercase">
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
                              className="columns"
                              class="text-right d-none d-md-block"
                              width="200"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItem.map((product) => {
                              const base64String = Buffer.from(product.image.data.data).toString("base64");
                              const imageSrc = `data:image/png;base64,${base64String}`;
                            return (
                              <>
                            <tr>
                              <td>
                                <figure class="itemside align-items-center">
                                  <div class="aside">
                                    <img src={imageSrc} class="img-sm" />
                                  </div>
                                </figure>
                              </td>
                              <td>
                                <input min={1} type="number" class="form-control" placeholder="Qunatity" value={product.quantity} 
                                 onChange={(e) => {
                                  product.quantity = e.target.value;
                                  caluclateTotalPrice(); // Update the total price when the quantity changes
                                }}
                                />
                              </td>
                              <td>
                                <div class="price-wrap">
                                  {" "}
                                  <var class="price">Rs : {product.price*product.quantity}</var>{" "}
                                  <small class="text-muted"> {product.price} Rs/- each </small>{" "}
                                </div>
                              </td>
                              <td class="text-right">
                                {" "}
                                <button class="btn btn-light" data-abc="true" onClick={(e)=>{removeItem(product._id)}}>
                                  {" "}
                                  Remove
                                </button>
                              </td>
                            </tr>;
                              </>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </aside>
                <aside class="col-lg-3">
                  <div class="card mt-1">
                    <div class="card-body">
                      <dl class="dlist-align">
                        <dt>Total price : </dt>
                        <dd class="text-right ml-3"> Rs : {totalPrice} /-</dd>
                      </dl>
                      <dl class="dlist-align">
                        <dt>Discount:</dt>
                        <dd class="text-right text-danger ml-3">Rs : 0.00/-</dd>
                      </dl>
                      <dl class="dlist-align">
                        <dt>Total:</dt>
                        <dd class="text-right text-dark b ml-3">
                          <strong>Rs : {totalPrice} /-</strong>
                        </dd>
                      </dl>
                      <hr />{" "}
                      <button
                        to={"#"}
                        class="btn btn-out btn-primary btn-square btn-main"
                        data-abc="true"
                        onClick={purchaseOrder}
                      >
                        {" "}
                        Make Purchase{" "}
                      </button>{" "}
                      <Link
                        to={`/pencilarts`}
                        class="btn btn-out btn-success btn-square btn-main mt-2"
                        data-abc="true"
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
