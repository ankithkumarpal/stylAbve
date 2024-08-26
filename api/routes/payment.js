const router = require("express").Router();
const crypto = require("crypto");
const getSuccessUrl = require("../provider/success-failure-routes");
const he = require('he');
const { Router } = require("express");
const Transaction = require("../models/Transaction");
const { placeOrder } = require("../common/order");

const MERCHANT_KEY = "7BaVFx";
const MERCHANT_SALT = "ZcIIZ3KVeBTWrtEihFGhTbaelfh5EUqc";

router.post("/pay", async (req, res) => {
    try {
        console.log("payment page /pay " ,req.body);
        const { amount, firstname, email, phone, productType } = req.body;
        const productinfo = productType;

        const txnid = "Txn" + new Date().getTime();
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
            furl: "https://styleabove.netlify.app/failure",
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
        const { txnid,status, amount, productinfo  } = req.body; 

        const transaction = await Transaction.findOne({ TransactionId: txnid });

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        const orderDetails = JSON.parse(transaction.OrderDetails);

        console.log("suceces order details" , orderDetails);

          const response =  await placeOrder(orderDetails);
          console.log(response)
          if(response.success){
            transaction.Status = 'success';
            await transaction.save();
            const queryParams = `?txnid=${txnid}&status=${status}&amount=${amount}&productinfo=${encodeURIComponent(productinfo)}`;
            res.redirect(`https://styleabove.netlify.app/success${queryParams}`); 
          
        }else {
            res.redirect('https://styleabove.netlify.app/failure');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(400).json({ success: false, message: 'Failed to process payment' });
    }
});




module.exports = router;
