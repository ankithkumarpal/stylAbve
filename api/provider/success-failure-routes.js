const pencilCarveSuccess = 'http://localhost:5000/api/payment-gateway/pencil-item/payment-success';
const scrunchies = 'http://localhost:5000/api/payment-gateway/pencil-item/payment-success'

const getSuccessUrl = (type) => {
    console.log(type)
    switch(type) {
      case "pencilcarve":
        return pencilCarveSuccess;
      case "scrunchies":
        return scrunchies;
      default:
        return null;
    }
  };
  

  module.exports = getSuccessUrl;