
const PaymentStatus = {
    INITIATED : 'initiated',
    SUCCESS : 'success',
    FAILED : 'failed'
  };

const OrderStatus = {
    PLACED : 'placed',
    SHIPPED : 'shipped',
    DELIVERED : 'delivered',
    CANCELLED : 'cancelled'
}

const ProductType = {
    PencilCarve : 'pencilcarve',
    Scrunchies : 'scrunchies'
}
  
  module.exports = {
    PaymentStatus,
    ProductType,
    OrderStatus
  };
  