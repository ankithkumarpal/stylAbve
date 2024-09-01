import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { getHeaders } from '../services/routpath';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [paymentData, setPaymentData] = useState(null);
    const { addToast } = useToasts();

    const initiatePayment = async (orderData) => {
        try {
            const response = await axios.post('https://unqiue-carving.onrender.com/api/payment-gateway/pay', orderData , {headers:getHeaders()});
            setPaymentData(response.data);

            if (response.data) {
                redirectToPayment(response.data);
            } else {
                throw new Error('No payment data received');
            }
        } catch (error) {
            console.error('Payment initiation error:', error);
            addToast('Payment initiation failed', { appearance: 'error' });
        }
    };

    const redirectToPayment = (paymentData) => {
        if (paymentData) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://test.payu.in/_payment';

            const requiredParams = ['key', 'txnid', 'amount', 'productinfo', 'firstname', 'email', 'phone', 'surl', 'furl', 'hash'];

            requiredParams.forEach(param => {
                if (paymentData[param]) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = param;
                    input.value = paymentData[param];
                    form.appendChild(input);
                } else {
                    console.error(`Missing required parameter: ${param}`);
                }
            });

            document.body.appendChild(form);
            form.submit();
        } else {
            console.error('No payment data available for redirection');
        }
    };

    return (
        <PaymentContext.Provider value={{ initiatePayment }}>
            {children}
        </PaymentContext.Provider>
    );
};
