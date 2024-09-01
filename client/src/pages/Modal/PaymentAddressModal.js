import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getHeaders, getUserEmail, getUserId, getUserName, getUserPhone } from '../../services/routpath';
import { PaymentContext } from '../../context/PaymentContext';

function PaymentAddressModal({ cartItems, totalAmount, discount, address, netPayable, setAddress }) {
  const { initiatePayment } = useContext(PaymentContext);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getProductDetails();
  };

  useEffect(() => {
    validateForm();
  }, [address, instruction]);

  const getorderDetails = () => {
    const orderData = {
      userId: getUserId(),
      productDetails: productDetails,
      productType: 'scrunchies',
      amount: netPayable,
      discount: discount,
      total: totalAmount,
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
      productinfo: "unique carving product",
    };
    return orderData;
  };

  const getProductDetails = () => {
    const details = cartItems.map((item) => ({
      productId: item.productDetails.productId,
      quantity: item.quantity,
      price: item.productDetails.price,
    }));
    setProductDetails(details);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { area, doorNo, landmark, pincode, country } = address;
    const isPincodeValid = /^\d{6}$/.test(pincode.trim()); 
    const isAddressValid = 
      area.trim() !== '' && 
      doorNo.trim() !== '' && 
      landmark.trim() !== '' && 
      country.trim() !== '' &&
      instruction.trim() !== '';
  
    setIsFormValid(isPincodeValid && isAddressValid);
  };

  const makePurchase = async () => {
    setIsLoading(true);
    const orderData = getorderDetails();
    try {
      await initiatePayment(orderData);
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
      setShow(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn btn-out btn-success btn-square btn-main mt-2">
        Make Purchase
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='mb-5 '>Total Amount: Rs. <b className='text-success'>{netPayable}</b>/-</span>
          <br />

          <div className="input-group mb-3 mt-3" style={{ width: "100%" }}>
            <textarea
              style={{ width: "100%" }}
              aria-label="With textarea"
              placeholder="Please provide any additional information or special instructions."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            ></textarea>
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
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>

          <Button 
            variant="success" 
            onClick={makePurchase} 
            disabled={!isFormValid || isLoading} 
            style={{ 
              opacity: isFormValid ? 1 : 0.5,
              pointerEvents: isFormValid ? 'auto' : 'none',
              width: "150px", 
              height: "38px"
            }}
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

export default PaymentAddressModal;
