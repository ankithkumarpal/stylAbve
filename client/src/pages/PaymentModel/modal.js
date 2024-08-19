import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import "./modal.css";
import { getUserId, placeOrder } from "../../services/routpath";
import { SingleName } from "../../components/namescomp/singleName";
import QuantityInput from "../../components/namescomp/Name";

function Example({ product }) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const { addToast } = useToasts();
  const history = useHistory();
  const handleClose = () => setShow(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const [nameFields, setNameFields] = useState([{ id: 1, type: "1" }]); // Initial state with one field and default value

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

  const handleAddNameField = () => {
    setNameFields([...nameFields, { id: nameFields.length + 1, type: "1" }]);
  };

  const handleRemoveNameField = (id) => {
    setNameFields(nameFields.filter((field) => field.id !== id));
  };

  const handleTypeChange = (id, value) => {
    const newFields = nameFields.map((field) =>
      field.id === id ? { ...field, type: value } : field
    );
    setNameFields(newFields);
  };

  const handleProceedPayment = async () => {
    setIsLoading(true);
    setIsSaveDisabled(true);
    const orderData = {
      userId: getUserId(),
      productDetails: [
        {
          productId: product._id,
          quantity: quantity,
        },
      ],
      amount: totalPrice,
      address: {
        area: "shapur",
        doorno: "9-257/1",
        landmark: "Near ramalayam",
        pincode: 500055,
        country: "India",
      },
    };

    try {
      const response = await axios.post(placeOrder, orderData);
      if (response.data.success) {
        addToast("Order placed successfully", { appearance: "success" });
      } else {
        addToast("Failed to place order", { appearance: "error" });
      }
    } catch (error) {
      addToast("Failed to place order", { appearance: "error" });
    } finally {
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
                <button
                  className="btn btn-light me-4"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="btn btn-light ms-4"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
              <span>Total Amount: Rs. {totalPrice}/-</span>
            </div>

            {nameFields.map((field) => (
              <div className="name-to-carve mt-2" key={field.id}>
                <div className="select-section">
                  <div className="select-options">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={field.type}
                      onChange={(e) =>
                        handleTypeChange(field.id, e.target.value)
                      }
                    >
                      <option value="1">Single</option>
                      <option value="2">Pair</option>
                    </select>
                  </div>
                  <div className="incre-decre-btn">
                    <div onClick={handleAddNameField}> + </div>
                    {nameFields.length > 1 && (
                      <div onClick={() => handleRemoveNameField(field.id)}>
                        {" "}
                        -{" "}
                      </div>
                    )}
                  </div>
                </div>
                <hr/>
                {field.type === "1" ? (
                  <SingleName /> 
                ) : (
                  <QuantityInput />
                )}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            disabled={isSaveDisabled}
            onClick={handleClose}
          >
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
              "Make payment"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
