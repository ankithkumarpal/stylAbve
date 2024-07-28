import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import flower from "../../assests/1.jpeg";
import "./modal.css";
import { Context } from "../../context/Context";

function Example({ product, imageSrc }) {
  const history = useHistory();
  const { user } = useContext(Context);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const handleClose = () => setShow(false);


  const handleShow = () => {
    setShow(true);
    console.log(product);
  };

  const incrementQuantity = ()=>{
    setQuantity(quantity + 1);
  }
  const decreaseQuantity = ()=>{
    setQuantity(quantity - 1);
  }
  const [shouldDisableButton, setShouldDisableButton] = useState(false);

  useEffect(() => {
    setTotalPrice(quantity * product.price);
    setShouldDisableButton(quantity < 1 ? true : false);
  }, [quantity]);

  return (
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
              <img src={product.imageUrls[0]}></img>
            </div>
            <div className="content-section mt-3">
              <div className="mb-3 disply-flex align-items-center justify-content-center">
                <button className="btn btn-light me-4" onClick={decreaseQuantity}>-</button>
                <span className="quantity">{quantity}</span>
                <button className="btn btn-light ms-4" onClick={incrementQuantity}>+</button>
              </div>
              <span>Total Amount : {totalPrice}/-</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="success" disabled={shouldDisableButton}>
            Proceed payment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
