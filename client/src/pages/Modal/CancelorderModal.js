import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getHeaders } from "../../services/routpath";
import { useToasts } from "react-toast-notifications";

function MyVerticallyCenteredModal({ getOrders, order, onHide, show }) {
  const { addToast } = useToasts();
  const [reason, setReason] = useState('');

  const cancellOrder = async (order) => {
    onHide();
    const body = {
      "orderId": order._id,
      "refundAmount": order.amount,
      "refundReason": reason
    };

    try {
      const res = await axios.post('https://unqiue-carving.onrender.com/api/payment-gateway/orders/initiate-refund', body, { headers: getHeaders() });
      if (res.data.success) {
        getOrders();
        addToast("Product cancelled successfully", { appearance: "success" });
      } else {
        addToast("Product cancellation failed", { appearance: "error" });
      }
    } catch (error) {
      addToast("An error occurred during cancellation. Please try again.", { appearance: "error" });
    }
  };

  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cancel order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Do you really want to cancel the order?
          </p>
          <div className="input-group mb-3 mt-3" style={{ width: "100%" }}>
            <textarea
              style={{ width: "100%" }}
              aria-label="With textarea"
              placeholder="Reason for cancellation. It will be considered as feedback to provide good service"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button
            onClick={() => cancellOrder(order)}
            style={{ backgroundColor: 'red', borderColor: 'red' }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

function CancelorderModal({ getOrders, order }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        cancel
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        order={order}
        getOrders={getOrders}
      />
    </>
  );
}

export default CancelorderModal;
