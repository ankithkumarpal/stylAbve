import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import "./modal.css";
import {
  getUserEmail,
  getUserId,
  getUserName,
  getUserPhone,
  pencilCarvePlaceOrder,
  placeOrder,
  productAddTocart,
  ScrunchiesplaceOrder,
} from "../../services/routpath";
import { SingleName } from "../../components/namescomp/singleName";
import QuantityInput from "../../components/namescomp/Name";
import { PaymentContext } from "../../context/PaymentContext";

function Example({ product }) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSingleLetterCount, setTotalSingleLetterCount] = useState(0);
  const [totalPairLetterCount, setTotalPairLetterCount] = useState(0);
  const { addToast } = useToasts();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [singleTemplateUsed, setSingleTemplateUsed] = useState(0);
  const [pairTemplateUsed, setPairTemplateUsed] = useState(0);
  const { initiatePayment } = useContext(PaymentContext);

  const [nameFields, setNameFields] = useState([
    { id: 1, type: "1" },
    { id: 2, type: "2" },
  ]);
  const [nameData, setNameData] = useState([]);
  const [quantityData, setQuantityData] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [proceedDisabled, setIsProceedDisabled] = useState(true);
  const [address, setAddress] = useState({
    doorNo: "",
    area: "",
    landmark: "",
    city: "",
    pincode: "",
    country: "",
  });

  const handleShow = () => {
    if (getUserId() == null) {
      addToast("Please login to proceed with the purchase", { appearance: "warning" });
      history.push("/login");
      return;
    }
    setShow(true);
  }

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const reset = () => {
    setQuantity(1);
    setTotalPrice(0);
    setTotalPairLetterCount(0);
    setTotalSingleLetterCount(0);
    setIsLoading(false);
    setIsSaveDisabled(false);
    setNameData([]);
    setQuantityData([]);
    setAddress({
      doorNo: "",
      area: "",
      landmark: "",
      city: "",
      pincode: "",
      country: "",
    })
    setInstruction("")
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const validateProceedButton = () => {
    const isNameDataValid = nameData.every((item) => item.name?.trim() !== "");
    const isQuantityDataValid = quantityData.every(
      (item) => item.names[0].trim() !== "" && item.names[1].trim() !== ""
    );

    const isAddressValid = Object.keys(address).every((field) => {
      if (field === "pincode") {
        return /^\d{6}$/.test(address[field]);
      }
      return address[field].trim() !== "";
    });

    setIsProceedDisabled(
      !(isNameDataValid && isQuantityDataValid && isAddressValid)
    );
  };

  const handleClose = () => {
    reset();
    setShow(false);
  };

  useEffect(() => {
    validateProceedButton();
  }, [nameData, quantityData, address]);

  useEffect(() => {
    setTotalPrice(quantity * product.price);
  }, [quantity]);

  useEffect(() => {
    let TotalAmount = 0;
    for (let i = 0; i < nameData.length; i++) {
      let nameLen = (nameData[i].name?.trim()).length;
      if (nameLen != 0) {
        TotalAmount += product.price;
      }

      if (nameLen > 3) {
        TotalAmount += (nameLen - 3) * 20;
      }
    }

    for (let i = 0; i < quantityData.length; i++) {
      let nameLen =
        quantityData[i].names[0].trim().length +
        quantityData[i].names[1].trim().length;
      if (nameLen != 0) {
        TotalAmount += product.price;
      }

      if (nameLen > 3) {
        TotalAmount += (nameLen - 3) * 20;
      }
    }

    setTotalAmount(TotalAmount);
  }, [nameData, quantityData]);

  const handleTypeChange = (id, value) => {
    const newFields = nameFields.map((field) =>
      field.id === id ? { ...field, type: value } : field
    );
    setNameFields(newFields);
  };

  const removeSingleNameInput = (id) => {
    setNameData((prevData) => {
      return prevData.filter((item) => item.id !== id);
    });
  };

  const removePairNameInput = (id) => {
    setQuantityData((prevData) => {
      return prevData.filter((item) => item.pairId !== id);
    });
  };

  const handleNameChange = (id, value) => {
    setNameData((prevData) => {
      const itemIndex = prevData.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        return prevData.map((item, index) =>
          index === itemIndex ? { ...item, name: value } : item
        );
      }
      return [...prevData, { id, name: value }];
    });
  };

  const handlePairChange = (pairId, index, value) => {
    setQuantityData((prevData) => {
      const pairIndex = prevData.findIndex((item) => item.pairId === pairId);
      if (pairIndex !== -1) {
        const updatedData = [...prevData];
        updatedData[pairIndex] = {
          ...updatedData[pairIndex],
          names: updatedData[pairIndex].names.map((name, idx) =>
            idx === index - 1 ? value : name
          ),
        };
        return updatedData;
      }
      return [
        ...prevData,
        {
          pairId,
          names: ["", ""].map((_, idx) => (idx === index - 1 ? value : "")),
        },
      ];
    });
  };

  const pencilArtsPayload = () => {
    const orderData = {
      userId: getUserId(),
      productDetails: [
        {
          productId: product._id,
          quantity: quantity,
        },
      ],
      productType: product.productType,
      amount: totalAmount,
      address: {
        area: address.area,
        doorno: address.doorNo,
        landmark: address.landmark,
        pincode: address.pincode,
        country: address.country,
      },
      singleName: nameData,
      pairName: quantityData,
      instruction: instruction,
      firstname: getUserName(),
      email: getUserEmail(),
      phone: getUserPhone(),
      productinfo: "unqiue carving product",
    };
    return orderData;
  };

  const scrunchiesPayload = () => {
    const orderData = {
      userId: getUserId(),
      productDetails: [
        {
          productId: product._id,
          quantity: quantity,
        },
      ],
      productType: product.productType,
      amount: totalPrice,
      address: {
        area: address.area,
        doorno: address.doorNo,
        landmark: address.landmark,
        pincode: address.pincode,
        country: address.country,
      },
      instruction: instruction,
      firstname: getUserName(),
      email: getUserEmail(),
      phone: getUserPhone(),
      productinfo: "unqiue carving product",
    };
    return orderData;
  };
  const handleProceedPayment = async () => {
    setIsLoading(true);
    setIsSaveDisabled(true);

    const orderData =
      product.productType == "scrunchies"
        ? scrunchiesPayload()
        : pencilArtsPayload();
    try {
      const url =
        product.productType == "scrunchies"
          ? ScrunchiesplaceOrder
          : pencilCarvePlaceOrder;
      await initiatePayment(orderData);
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

            {product.productType === "scrunchies" ? (
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
              </div>
            ) : (
              <>
                <span className="mt-2">Enter names to be carved</span>
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
                          style={{ color: "black" }}
                          disabled="true"
                        >
                          <option value="1">Single</option>
                          <option value="2">Pair</option>
                        </select>
                      </div>
                    </div>
                    <hr />
                    {field.type === "1" ? (
                      <SingleName
                        onNameChange={handleNameChange}
                        onInputRemove={removeSingleNameInput}
                      />
                    ) : (
                      <QuantityInput
                        onPairChange={handlePairChange}
                        onInputPairRemove={removePairNameInput}
                      />
                    )}
                  </div>
                ))}
              </>
            )}
            {product.productType == "scrunchies" ? (
              <span>Total Amount: Rs. {totalPrice}/-</span>
            ) : (
              <>
                <span>Total Amount: Rs. {totalAmount}</span>
              </>
            )}

            <br />

            <div class="input-group mb-3" style={{ width: "100%" }}>
              <textarea
                style={{ width: "100%" }}
                aria-label="With textarea"
                placeholder="Please provide any additional information or special instructions."
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="delivery-address">
            <span>Delivery Address</span>
            <div className="mt-2 address-input">
              <input
                type="text"
                name="doorNo"
                value={address.doorNo}
                onChange={handleAddressChange}
                placeholder="Door No."
              />
              <input
                type="text"
                name="area"
                value={address.area}
                onChange={handleAddressChange}
                placeholder="Area"
              />
              <input
                type="text"
                name="landmark"
                value={address.landmark}
                onChange={handleAddressChange}
                placeholder="Landmark"
              />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="City"
              />
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleAddressChange}
                placeholder="6 digit pincode"
              />
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleAddressChange}
                placeholder="Country"
              />
            </div>
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
            onClick={handleProceedPayment}
            style={{ width: "150px", height: "38px" }}
            disabled={isSaveDisabled || proceedDisabled}
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
