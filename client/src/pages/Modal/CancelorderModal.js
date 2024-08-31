import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
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
              placeholder="Reason for cancellation.It will be considered as a feedback to provide good service"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button
            onClick={props.onHide}
            style={{ backgroundColor: 'red', borderColor: 'red' }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

function CancelorderModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        cancel
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default CancelorderModal;
