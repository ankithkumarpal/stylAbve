const router = require("express").Router();
const crypto = require("crypto");
const getSuccessUrl = require("../provider/success-failure-routes");
const he = require('he');
const { Router } = require("express");
const Transaction = require("../models/Transaction");
const { placeOrder } = require("../common/order");
const Response = require("../provider/requestResponse");
const axios = require('axios');
const { OrderStatus } = require("../provider/Constants");
const Orders = require("../models/Orders");
const Authorization = require('../Middleware/Authorization');

const MERCHANT_KEY = "7BaVFx";
const MERCHANT_SALT = "ZcIIZ3KVeBTWrtEihFGhTbaelfh5EUqc";

router.post("/pay",Authorization, async (req, res) => {
    try {
        console.log("payment page /pay " ,req.body);
        const { amount, firstname, email, phone, productType } = req.body;
        const productinfo = productType;

        const { v4: uuidv4 } = require('uuid');
        const txnid = `Txn_${uuidv4()}`;

        const surl = getSuccessUrl(productType);

        const udf1Serialized = JSON.stringify(req.body);

        const hashString = 
            `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${MERCHANT_SALT}`;
        
        const hash = crypto.createHash("sha512").update(hashString).digest("hex");

        const paymentData = {
            key: MERCHANT_KEY,
            txnid: txnid,
            amount: amount,
            productinfo: productinfo,
            firstname: firstname,
            email: email,
            phone: phone,
            surl: surl,
            furl: "https://uniquecarving.in/failure",
            hash: hash,
            service_provider: "payu_paisa",
        };

        const transaction = new Transaction({
            TransactionId: txnid,
            Status: "INITIATED",
            OrderDetails: udf1Serialized,
        });

        await transaction.save();

        res.status(200).json(paymentData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/pencil-item/payment-success', async (req, res) => {
    try {
        const { txnid ,status, amount, productinfo  } = req.body; 

        const transaction = await Transaction.findOne({ TransactionId: txnid });

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

          const orderDetails = JSON.parse(transaction.OrderDetails);
          const order = {...orderDetails , transactionId : txnid}
          const response =  await placeOrder(order);
          if(response.success){
            transaction.Status = 'success';
            transaction.OrderId = response.data._id;
            const trs =  await transaction.save();
            const queryParams = `?txnid=${txnid}&status=${status}&amount=${amount}&productinfo=${encodeURIComponent(productinfo)}`;
            res.redirect(`https://uniquecarving.in/success${queryParams}`); 
          
        }else {
            res.redirect('https://uniquecarving.in/failure');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(400).json({ success: false, message: 'Failed to process payment' });
    }
});

router.post('/orders/initiate-refund',Authorization ,async (req , res) => {
        const {orderId ,refundAmount, refundReason} = req.body;
        const transaction = await Transaction.findOne({OrderId : orderId});
        const transactionId = transaction?.TransactionId || null;
        const stringToHash = MERCHANT_KEY + "|" + transactionId + "|" + refundAmount + "|" + MERCHANT_SALT;
        const hash = crypto.createHash('sha512').update(stringToHash).digest('hex');

        const refundData = {
            key: MERCHANT_KEY, 
            command: 'cancel_refund_transaction',
            var1: transactionId, 
            var2: refundAmount,  
            var3: refundReason, 
            var4: '', 
            hash: hash,
            salt: MERCHANT_SALT
        };
    
        try {
            const response = await axios.post('https://info.payu.in/merchant/postservice.php?form=2', refundData);
            if(response){
                const order = await Orders.findById(orderId);
                order.status = OrderStatus.CANCELLED;
                const r = await order.save();
                return res.status(200).json(new Response(success = true , message = 'Odered cancelled, refund initiated' , data = r));
            }
        } catch (error) {
            console.error('Error initiating refund:', error);
            return res.status(200).json(new Response(success = false , message = 'cancellation failded'));
        }
})



module.exports = router;
