import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
    const [paymentData, setPaymentData] = useState(null);

    const handlePayment = async (e) => {
        e.preventDefault();

        const orderData = {
            amount: '100', // Example amount
            productinfo: 'Product Name',
            name: 'ankith',
            email: 'your.email@example.com'
        };

        try {
            const response = await axios.post('http://localhost:5000/api/payment-gateway/pay', orderData);
            setPaymentData(response.data);
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return (
        <div>
            <h2>PayU Payment</h2>
            {!paymentData ? (
                <form onSubmit={handlePayment}>
                    <button type="submit">Pay Now</button>
                </form>
            ) : (
                <form action="https://test.payu.in/_payment" method="post">
                    <input type="hidden" name="key" value={paymentData.key} />
                    <input type="hidden" name="txnid" value={paymentData.txnid} />
                    <input type="hidden" name="amount" value={paymentData.amount} />
                    <input type="hidden" name="productinfo" value={paymentData.productinfo} />
                    <input type="hidden" name="firstname" value={paymentData.name} />
                    <input type="hidden" name="email" value={paymentData.email} />
                    <input type="hidden" name="surl" value={paymentData.surl} />
                    <input type="hidden" name="furl" value={paymentData.furl} />
                    <input type="hidden" name="hash" value={paymentData.hash} />
                    <button type="submit">Proceed to Pay</button>
                </form>
            )}
        </div>
    );
}

export default Payment;
