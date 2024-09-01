import React, { useEffect, useState } from "react";
import "./orderHistory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { BeatLoader } from "react-spinners";
import { getHeaders, getOrdersInfo, getUserId, headers, userId } from "../../services/routpath";
import CancelorderModal from "../Modal/CancelorderModal";

export const OrderHistory = () => {
  const { addToast } = useToasts();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${getOrdersInfo}?userId=${getUserId()}`, {
        headers: getHeaders()
      });
      setOrders(response.data.data);
      addToast("Orders Fetched successfully", { appearance: "success" });
    } catch (error) {
      addToast("Failed to fetch cart items", { appearance: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="order-history" style={{ fontFamily: "cursive" }}>
      <div className="spinner">
        <BeatLoader loading={isLoading} color="#26aefc"/>
      </div>
      <header className="orderhistory-header">
        <h4 className="" style={{ color: "" }}>
          Order history
        </h4>
      </header>
      {orders.map((order) => (
        <div
          key={order._id}
          className="card mx-auto mt-2 shadow-sm ms-3 me-3 mb-0"
          style={{ maxWidth: "350px" }}
        >
          <div className="card-body" style={{ fontSize: "0.6rem" }}>
            <div className="d-flex justify-content-between">
              <span className="text-muted">
                Order ID <strong>: {order._id}</strong>
              </span>

              {
                order.status !== "cancelled"  &&  <div
                href="#!"
                className="text-danger cancell-order"
                style={{
                  fontWeight: "bolder",
                  width: "60px",
                  height: "15px",
                  letterSpacing: "0.1em",
                  fontSize: "0.8rem",
                }}
              >
                <CancelorderModal order={order} getOrders={getOrders}/>
              </div>
              }
             
            </div>
            <div>
              <span className="text-muted">
                Placed On <strong>: {order.createdAt}</strong>
              </span>
            </div>
            <hr />
            {order.productDetails.map((product) => (
              <div
                key={product.productId}
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div style={{ width: "60%" }}>
                  <h5>{product.productId}</h5>
                  <p className="text-muted">Qt: {product.quantity}</p>
                  <p className="text-muted">Rs: {product.price}/- per item</p>
                </div>
                <div>
                  <img src={product.images} className="img-sm" alt="Product" />
                </div>
              </div>
            ))}
            <h4 className="text-dark">
              ₹ {order.amount}{" "}
              <span className="text-muted" style={{ fontSize: "0.5em" }}>
                via (COD)
              </span>
            </h4>
            <span className="text-muted">
              Tracking Status on: 11:30pm, Today
            </span>
            <div>
              <p className="text-muted">
                Delivery Address:{" "}
                {order.address.doorno +
                  " " +
                  order.address.area +
                  " " +
                  order.address.landmark +
                  " " +
                  order.address.pincode +
                  " " +
                  order.address.country}
              </p>
            </div>
          </div>
          <div
  className={`card-footer ${order.status === "cancelled" ? "bg-danger" : ""}`}
  style={{ fontSize: "0.6rem" }}
>

          {order.status === "cancelled" ? (
  <div style={{ color: 'white', fontSize: "0.8rem" }}>
    Cancelled
  </div>
) : (
  <div className="position-relative order-tracker pt-3 pb-3">
    <div className="progress-line"></div>
    <div className="d-flex justify-content-between align-items-center">
      <div className="text-center">
        <div
          className={`circle ${
            order.status === "placed" || order.status === "shipped" || order.status === "delivered"
              ? "bg-success"
              : "bg-primary"
          } text-white mb-1`}
        >
          1
        </div>
        <span className="text-muted">PLACED</span>
      </div>
      <div className="text-center">
        <div
          className={`circle ${
            order.status === "shipped" || order.status === "delivered"
              ? "bg-success"
              : "bg-primary"
          } text-white mb-1`}
        >
          2
        </div>
        <span className="text-muted">SHIPPED</span>
      </div>
      <div className="text-center">
        <div
          className={`circle ${
            order.status === "delivered"
              ? "bg-success"
              : "bg-secondary"
          } text-white mb-1`}
        >
          3
        </div>
        <span className="text-muted">DELIVERED</span>
      </div>
    </div>
  </div>
)}

</div>

        </div>
      ))}
    </div>
  );
};
