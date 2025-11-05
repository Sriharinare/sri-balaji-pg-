import React from 'react';
import { PAYMENT_QR_CODE_URL } from '../constants';

const Payment: React.FC = () => {
    return (
        <section id="payment" className="py-20 bg-brand-gray">
            <div className="container mx-auto px-6 text-center">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Scan to Pay</h2>
                    <p className="mt-4 text-lg text-gray-400">Complete your booking by making a payment.</p>
                </div>
                <div className="bg-brand-dark inline-block p-8 rounded-lg shadow-2xl">
                    <img src={PAYMENT_QR_CODE_URL} alt="Payment QR Code" className="w-64 h-64 rounded-md mx-auto" />
                    <div className="mt-6 text-left">
                         <p className="text-gray-300 font-semibold text-lg">Instructions:</p>
                        <ol className="list-decimal list-inside mt-2 text-gray-400 space-y-1">
                            <li>Open your favorite UPI app (GPay, PhonePe, Paytm, etc.).</li>
                            <li>Scan the QR code shown above.</li>
                            <li>Enter the booking amount and complete the payment.</li>
                            <li>Share the payment screenshot with the manager on WhatsApp.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
