import React from "react";
import "./orderHistory.css";

export const orderHistory = () => {
  return (
    <>
      <div className="order-history">
        <h1 className="ms-3 me-3 order-history-header d-flex align-items-center justify-content-center" style={{color:"white"}}>Order History</h1>
        <div class="aliceblueColor mt-2 order-container">
          <h5 className="card-header saddleBrownColor">
            Order-Id : <span className="sm">6898757332182</span>
          </h5>
          <div className="ms-2 me-2 order-history-card pb-2 d-flex mt-2 mb-2 justify-content-between ">
            <img
              class="card-img-top  ms-2"
              src={`http://localhost:5000/api/product/image/1721585239195.jpeg`}
              alt="Card image cap"
            />
            <div class="card-body d-flex">
              <div className="order-quantity d-flex flex-column  align-items-center ms-4 me-4">
                <label className="saddleBrownColor">Quantity</label>
                <span className="saddleBrownColor">2</span>
              </div>
              <div className="order-price d-flex flex-column  align-items-center ms-4 ms-4">
                <label className="saddleBrownColor">Total Price</label>
                <span className="saddleBrownColor">2</span>
                <span>Rs:4/- per item</span>
              </div>
            </div>
          </div>
         
          <div className="ms-2 me-2 order-history-card pb-2 d-flex mt-2 mb-2 justify-content-between ">
            <img
              class="card-img-top  ms-2"
              src={`http://localhost:5000/api/product/image/1721585239195.jpeg`}
              alt="Card image cap"
            />
            <div class="card-body d-flex">
              <div className="order-quantity d-flex flex-column  align-items-center ms-4 me-4">
                <label className="saddleBrownColor">Quantity</label>
                <span className="saddleBrownColor">2</span>
              </div>
              <div className="order-price d-flex flex-column  align-items-center ms-4 ms-4">
                <label className="saddleBrownColor">Total Price</label>
                <span className="saddleBrownColor">2</span>
                <span>Rs:4/- per item</span>
              </div>
            </div>
          </div>
          <div className="ms-4">
            <span>Total Order Price : </span>
            <span>1200/-</span>
          </div>
          <div className="ms-4">
            <span>Status : </span>
            <span>Completed</span>
          </div>
          <div className="ms-4 pb-4">
            <span>DeliveredAt : </span>
            <span>23-09-2001</span>
          </div>
        </div>
        <div class="aliceblueColor mt-2 order-container">
          <h5 className="card-header saddleBrownColor">
            Order-Id : <span className="sm">6898757332182</span>
          </h5>
          <div className="ms-2 me-2 order-history-card pb-2 d-flex mt-2 mb-2 justify-content-between ">
            <img
              class="card-img-top  ms-2"
              src={`http://localhost:5000/api/product/image/1721585239195.jpeg`}
              alt="Card image cap"
            />
            <div class="card-body d-flex">
              <div className="order-quantity d-flex flex-column  align-items-center ms-4 me-4">
                <label className="saddleBrownColor">Quantity</label>
                <span className="saddleBrownColor">2</span>
              </div>
              <div className="order-price d-flex flex-column  align-items-center ms-4 ms-4">
                <label className="saddleBrownColor">Total Price</label>
                <span className="saddleBrownColor">2</span>
                <span>Rs:4/- per item</span>
              </div>
            </div>
          </div>
         
          <div className="ms-2 me-2 order-history-card pb-2 d-flex mt-2 mb-2 justify-content-between ">
            <img
              class="card-img-top  ms-2"
              src={`http://localhost:5000/api/product/image/1721585239195.jpeg`}
              alt="Card image cap"
            />
            <div class="card-body d-flex">
              <div className="order-quantity d-flex flex-column  align-items-center ms-4 me-4">
                <label className="saddleBrownColor">Quantity</label>
                <span className="saddleBrownColor">2</span>
              </div>
              <div className="order-price d-flex flex-column  align-items-center ms-4 ms-4">
                <label className="saddleBrownColor">Total Price</label>
                <span className="saddleBrownColor">2</span>
                <span>Rs:4/- per item</span>
              </div>
            </div>
          </div>
          <div className="ms-4">
            <span>Total Order Price : </span>
            <span>1200/-</span>
          </div>
          <div className="ms-4">
            <span>Status : </span>
            <span>Completed</span>
          </div>
          <div className="ms-4 pb-4">
            <span>DeliveredAt : </span>
            <span>23-09-2001</span>
          </div>
        </div>
        <div class="aliceblueColor mt-2 order-container">
          <h5 className="card-header saddleBrownColor">
            Order-Id : <span className="sm">6898757332182</span>
          </h5>
          <div className="ms-2 me-2 order-history-card pb-2 d-flex mt-2 mb-2 justify-content-between ">
            <img
              class="card-img-top  ms-2"
              src={`http://localhost:5000/api/product/image/1721585239195.jpeg`}
              alt="Card image cap"
            />
            <div class="card-body d-flex">
              <div className="order-quantity d-flex flex-column  align-items-center ms-4 me-4">
                <label className="saddleBrownColor">Quantity</label>
                <span className="saddleBrownColor">2</span>
              </div>
              <div className="order-price d-flex flex-column  align-items-center ms-4 ms-4">
                <label className="saddleBrownColor">Total Price</label>
                <span className="saddleBrownColor">2</span>
                <span>Rs:4/- per item</span>
              </div>
            </div>
          </div>
         
          <div className="ms-2 me-2 order-history-card pb-2 d-flex mt-2 mb-2 justify-content-between ">
            <img
              class="card-img-top  ms-2"
              src={`http://localhost:5000/api/product/image/1721585239195.jpeg`}
              alt="Card image cap"
            />
            <div class="card-body d-flex">
              <div className="order-quantity d-flex flex-column  align-items-center ms-4 me-4">
                <label className="saddleBrownColor">Quantity</label>
                <span className="saddleBrownColor">2</span>
              </div>
              <div className="order-price d-flex flex-column  align-items-center ms-4 ms-4">
                <label className="saddleBrownColor">Total Price</label>
                <span className="saddleBrownColor">2</span>
                <span>Rs:4/- per item</span>
              </div>
            </div>
          </div>
          <div className="ms-4">
            <span>Total Order Price : </span>
            <span>1200/-</span>
          </div>
          <div className="ms-4">
            <span>Status : </span>
            <span>Completed</span>
          </div>
          <div className="ms-4 pb-4">
            <span>DeliveredAt : </span>
            <span>23-09-2001</span>
          </div>
        </div>
        <div class="aliceblueColor mt-2 order-container">
          <h5 className="card-header saddleBrownColor">
            Order-Id : <span className="sm">6898757332182</span>
          </h5>
          <div className="ms-2 me-2 order-history-card pb-2 d-flex mt-2 mb-2 justify-content-between ">
            <img
              class="card-img-top  ms-2"
              src={`http://localhost:5000/api/product/image/1721585239195.jpeg`}
              alt="Card image cap"
            />
            <div class="card-body d-flex">
              <div className="order-quantity d-flex flex-column  align-items-center ms-4 me-4">
                <label className="saddleBrownColor">Quantity</label>
                <span className="saddleBrownColor">2</span>
              </div>
              <div className="order-price d-flex flex-column  align-items-center ms-4 ms-4">
                <label className="saddleBrownColor">Total Price</label>
                <span className="saddleBrownColor">2</span>
                <span>Rs:4/- per item</span>
              </div>
            </div>
          </div>
         
          <div className="ms-2 me-2 order-history-card pb-2 d-flex mt-2 mb-2 justify-content-between ">
            <img
              class="card-img-top  ms-2"
              src={`http://localhost:5000/api/product/image/1721585239195.jpeg`}
              alt="Card image cap"
            />
            <div class="card-body d-flex">
              <div className="order-quantity d-flex flex-column  align-items-center ms-4 me-4">
                <label className="saddleBrownColor">Quantity</label>
                <span className="saddleBrownColor">2</span>
              </div>
              <div className="order-price d-flex flex-column  align-items-center ms-4 ms-4">
                <label className="saddleBrownColor">Total Price</label>
                <span className="saddleBrownColor">2</span>
                <span>Rs:4/- per item</span>
              </div>
            </div>
          </div>
          <div className="ms-4">
            <span>Total Order Price : </span>
            <span>1200/-</span>
          </div>
          <div className="ms-4">
            <span>Status : </span>
            <span>Completed</span>
          </div>
          <div className="ms-4 pb-4">
            <span>DeliveredAt : </span>
            <span>23-09-2001</span>
          </div>
        </div>
      </div>
    </>
  );
};
