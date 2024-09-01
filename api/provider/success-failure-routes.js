const pencilCarveSuccess = 'https://unqiue-carving.onrender.com/api/payment-gateway/pencil-item/payment-success';
const scrunchies = 'https://unqiue-carving.onrender.com/api/payment-gateway/pencil-item/payment-success'

const getSuccessUrl = (type) => {
    console.log(type)
    switch(type) {
      case "pencilcarving":
        return pencilCarveSuccess;
      case "scrunchies":
        return scrunchies;
      default: 
        return null;
    }
  };
  

  module.exports = getSuccessUrl;