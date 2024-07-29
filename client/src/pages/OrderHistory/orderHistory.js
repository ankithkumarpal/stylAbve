import React from "react";
import "./orderHistory.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const orderHistory = () => {
  return (
    <div className="order-history " style={{fontFamily:"cursive"}}>
    <div
      className="card mx-auto mt-2 shadow-sm ms-3 me-3 mb-0"
      style={{ maxWidth: "350px" }}
    >
      <div className="card-body" style={{fontSize:"0.6rem"}}>
        <div className="d-flex justify-content-between">
          <span className="text-muted">
            Order ID <strong>: 1222528743</strong>
          </span>
          <a href="#!" className="text-danger" style={{fontWeight:'bolder' , letterSpacing:"0.1em"}}>
            Cancel
          </a>
        </div>
        <div className="">
          <span className="text-muted">
            Place On <strong>: 12, March 2019</strong>
          </span>
        </div>
        <hr />
        <div style={{display:"flex" , justifyContent:"space-around"}}>
            <div style={{width:"60%"}}>
                <h5 className="">Blade Hih Sandals</h5>
                <p className="text-muted">Qt: 1 Pair</p>
                <p className="text-muted">Rs:20/- per item</p>
            </div>
            <div>
            <img src={"http://localhost:5000/api/product/image/1721585239195.jpeg"} className="img-sm" alt="Product" />
            </div>
        </div>
        <div style={{display:"flex" , justifyContent:"space-around"}}>
            <div style={{width:"60%"}}>
                <h5 className="">Blade  Sandals</h5>
                <p className="text-muted">Qt: 1 Pair</p>
                <p className="text-muted">Rs:20/- per item</p>
            </div>
            <div>
            <img src={"http://localhost:5000/api/product/image/1721585239195.jpeg"} className="img-sm" alt="Product" />
            </div>
        </div>
        <div style={{display:"flex" , justifyContent:"space-around"}}>
            <div style={{width:"60%"}}>
                <h5 className="">Blade Hih schooll Sandals</h5>
                <p className="text-muted">Qt: 1 Pair</p>
                <p className="text-muted">Rs:20/- per item</p>
            </div>
            <div>
            <img src={"http://localhost:5000/api/product/image/1721585239195.jpeg"} className="img-sm" alt="Product" />
            </div>
        </div>
        <h4 className="text-dark">
          ₹ 1,500{" "}
          <span className="text-muted" style={{ fontSize: "0.5em" }}>
            via (COD)
          </span>
        </h4>
        <p className="text-muted">Tracking Status on: 11:30pm, Today</p>
        {/* <span
          className="badge p-2"
          style={{ color: "green", border: "2px solid lightgreen" }}
        >
          Reached Hub, Delhi
        </span> */}
      </div>
      <div className="card-footer" style={{fontSize:"0.6rem"}}>
        <div className="position-relative order-tracker pt-3 pb-3">
          <div className="progress-line"></div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-center">
              <div className="circle bg-primary text-white mb-1">1</div>
              <span className="text-muted">PLACED</span>
            </div>
            <div className="text-center">
              <div className="circle bg-success text-white mb-1">2</div>
              <span className="text-muted">SHIPPED</span>
            </div>
            <div className="text-center">
              <div className="circle bg-secondary text-white mb-1">3</div>
              <span className="text-muted">DELIVERED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="card mx-auto mt-2 shadow-sm ms-3 me-3 mb-0"
      style={{ maxWidth: "350px" }}
    >
      <div className="card-body" style={{fontSize:"0.6rem"}}>
        <div className="d-flex justify-content-between">
          <span className="text-muted">
            Order ID <strong>: 1222528743</strong>
          </span>
          <a href="#!" className="text-danger" style={{fontWeight:'bolder' , letterSpacing:"0.1em"}}>
            Cancel
          </a>
        </div>
        <div className="">
          <span className="text-muted">
            Place On <strong>: 12, March 2019</strong>
          </span>
        </div>
        <hr />
        <div style={{display:"flex" , justifyContent:"space-around"}}>
            <div style={{width:"60%"}}>
                <h5 className="">Blade Hih Sandals</h5>
                <p className="text-muted">Qt: 1 Pair</p>
                <p className="text-muted">Rs:20/- per item</p>
            </div>
            <div>
            <img src={"http://localhost:5000/api/product/image/1721585239195.jpeg"} className="img-sm" alt="Product" />
            </div>
        </div>
        <div style={{display:"flex" , justifyContent:"space-around"}}>
            <div style={{width:"60%"}}>
                <h5 className="">Blade  Sandals</h5>
                <p className="text-muted">Qt: 1 Pair</p>
                <p className="text-muted">Rs:20/- per item</p>
            </div>
            <div>
            <img src={"http://localhost:5000/api/product/image/1721585239195.jpeg"} className="img-sm" alt="Product" />
            </div>
        </div>
        <div style={{display:"flex" , justifyContent:"space-around"}}>
            <div style={{width:"60%"}}>
                <h5 className="">Blade Hih schooll Sandals</h5>
                <p className="text-muted">Qt: 1 Pair</p>
                <p className="text-muted">Rs:20/- per item</p>
            </div>
            <div>
            <img src={"http://localhost:5000/api/product/image/1721585239195.jpeg"} className="img-sm" alt="Product" />
            </div>
        </div>
        <h4 className="text-dark">
          ₹ 1,500{" "}
          <span className="text-muted" style={{ fontSize: "0.5em" }}>
            via (COD)
          </span>
        </h4>
        <p className="text-muted">Tracking Status on: 11:30pm, Today</p>
        {/* <span
          className="badge p-2"
          style={{ color: "green", border: "2px solid lightgreen" }}
        >
          Reached Hub, Delhi
        </span> */}
      </div>
      <div className="card-footer" style={{fontSize:"0.6rem"}}>
        <div className="position-relative order-tracker pt-3 pb-3">
          <div className="progress-line"></div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-center">
              <div className="circle bg-primary text-white mb-1">1</div>
              <span className="text-muted">PLACED</span>
            </div>
            <div className="text-center">
              <div className="circle bg-success text-white mb-1">2</div>
              <span className="text-muted">SHIPPED</span>
            </div>
            <div className="text-center">
              <div className="circle bg-secondary text-white mb-1">3</div>
              <span className="text-muted">DELIVERED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    </div>
  );
}
