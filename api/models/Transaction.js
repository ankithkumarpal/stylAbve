const mongoose = require('mongoose');
const { PaymentStatus } = require('../provider/Constants');

const TransactionSchema = new mongoose.Schema({
  TransactionId: {
    type: String,
    required: true,
  },
  OrderId : {
    type: String,
    required: false,
  },
  Status : {
    type: String,
    required: true,
    defafult: PaymentStatus.INITIATED
  },
  OrderDetails: {
    type: String,
    required: true,
  }
 
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
