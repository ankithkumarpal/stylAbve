import { useEffect, useState ,useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import flower from "../../assests/1.jpeg"
import "./modal.css";
import { Context } from "../../context/Context";


function Example({product , imageSrc}) {
  const history = useHistory();
  const { user } = useContext(Context);
  const [show, setShow] = useState(false);
  const [quantity , setQuantity] = useState(1);
  const [totalPrice , setTotalPrice] = useState(product.price)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log(user);
    if(!user){
      history.push('/login')
      return 
    }
    setShow(true);
  }
  const [shouldDisableButton , setShouldDisableButton] = useState(false);

  useEffect(() => {
    setTotalPrice(quantity*product.price);
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
            <img src={imageSrc}></img>
            </div>
            <div className="content-section">
               <input min={1} type="number" placeholder="Enter Quantity"  value={quantity}  onChange={(e)=>setQuantity(e.target.value)} />
               <span>Total Amount : {totalPrice}/-</span>
            </div>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="success" disabled={shouldDisableButton}>Proceed payment</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
