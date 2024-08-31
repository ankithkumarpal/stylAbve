import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PaymentSuccessPage.css';

function PaymentSuccessPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const txnid = params.get('txnid');
    const status = params.get('status');
    const amount = params.get('amount');
    const productinfo = params.get('productinfo');

    return (
        <div className="payment-success-container">
            <div className="payment-success-content">
                <div className="success-icon">✔</div>
                <h2 className="success-message">Payment Successful!</h2>

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-item">
                        <span className="summary-label">Transaction ID:</span>
                        <span className="summary-value">{txnid}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Status:</span>
                        <span className="summary-value">{status}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Amount Paid:</span>
                        <span className="summary-value">₹{amount}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Product:</span>
                        <span className="summary-value">{productinfo}</span>
                    </div>
                </div>

                <p className="success-details">
                    Thank you for your purchase from <strong>Unique Carving</strong>. Your order is now being prepared. We appreciate your trust in us and can't wait for you to experience our exceptional craftsmanship.
                </p>

                <div className="success-actions">
                    <Link to="/" className="home-button">Back to Home</Link>
                    <Link to="/order-history" className="orders-button">View Your Orders</Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccessPage;
