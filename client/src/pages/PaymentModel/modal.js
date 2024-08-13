import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import "./modal.css";
import { getUserId, placeOrder } from "../../services/routpath";

function Example({ product }) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const { addToast } = useToasts();
  const history = useHistory();
  const handleClose = () => setShow(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveDisabled , setIsSaveDisabled] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };
  
  const [shouldDisableButton, setShouldDisableButton] = useState(false);

  useEffect(() => {
    setTotalPrice(quantity * product.price);
    setShouldDisableButton(quantity < 1);
  }, [quantity]);

  const handleProceedPayment  = async () => {
    setIsLoading(true);
    setIsSaveDisabled(true);
    const orderData = {
      userId: getUserId(), 
      productDetails: [{
        productId: product._id,  
        quantity: quantity
      }],
      amount: totalPrice,
      address: {
        area: "shapur",
        doorno: "9-257/1",
        landmark: "Near ramalayam",
        pincode: 500055,
        country: "India"
      }
    };
  
    try {
      const response = await axios.post(placeOrder, orderData);
      if (response.data.success) {
        addToast("Order placed successfull", { appearance: "success" });
      } else {
        addToast("Failed to place order", { appearance: "error" });
      }
    } catch (error) {
      addToast("Failed to place order", { appearance: "error" });
    }finally{
      setShow(false);
      setIsLoading(false);
      setIsSaveDisabled(false);
    }
  };
  

  return (
    <>
      <button onClick={handleShow} className="btn btn-success">
        Buy Now
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="payment-header"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body className="payment-model">
          <div className="model-content">
            <div className="order-img">
              <img src={product.imageUrls[0]} alt="Product" />
            </div>
            <div className="content-section mt-3">
              <div className="mb-3 disply-flex align-items-center justify-content-center">
                <button className="btn btn-light me-4" onClick={decreaseQuantity}>-</button>
                <span className="quantity">{quantity}</span>
                <button className="btn btn-light ms-4" onClick={incrementQuantity}>+</button>
              </div>
              <span>Total Amount: Rs. {totalPrice}/-</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" disabled={isSaveDisabled} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            disabled={isSaveDisabled}
            onClick={handleProceedPayment}
            style={{ width: "150px", height: "38px" }}
          >
             {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                " Proceed to Payment"
              )}
           
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
