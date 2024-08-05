import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./add-product.css";
import { useToasts } from 'react-toast-notifications';


function Product() {
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(null);
  const [price, setPrice] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [shouldDisableButton, setShouldDisableButton] = useState(false);
  const { addToast } = useToasts();

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("color", color);
    formData.append("price", price);
    await axios
      .post("/product/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setPrice(null);
        setColor(null);
        setFile(null);
        setShow(false);
        addToast('Product saved sucessfully', { appearance: 'success' });
      })
      .catch((err) => {
         addToast('Failed to save', { appearance: 'error' });
      });
  };
  return (
    <>
      <Navbar />
      <div className="home">
        <>
          <button onClick={handleShow} class="btn btn-success">
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
              <Modal.Title>Select Qunatity</Modal.Title>
            </Modal.Header>
            <Modal.Body className="payment-model">
              <div className="model-content">
                <div className="order-img">
                  <img  src={file ? URL.createObjectURL(file) : ''}></img>
                </div>
                <div className="prod-section">
                <div class="mt-3">
                    <input class="form-control" type="file" id="formFile" onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                  <input class="form-control form-control-lg mt-3" type="text" placeholder="Enter the color" aria-label=".form-control-lg example" value={color} onChange={(e) => setColor(e.target.value)}></input>
                  <input  class="form-control form-control-lg mt-3" type="number" placeholder="Enter the Price" aria-label=".form-control-lg example" value = {price}  onChange={(e) => setPrice(e.target.value)}></input>

                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="success"
                disabled={shouldDisableButton}
                onClick={addProduct}
              >
                Add product
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </>
  );
}

export default Product;
