"use client";

import Script from "next/script";
import { useState } from "react";

const PaymentPage = () => {
  const AMOUNT = 100;
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Create order
      const response = await fetch("/api/create-order", { method: "POST" });
      const data = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "Ubertaxi Payment Gateway",
        description: "Test description",
        order_id: data.orderId,
        handler: function (response) {
          console.log("Payment Successful", response);
          // Handler for successful payment (e.g., update UI, send to server)
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "1373783838",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Initialize Razorpay and open the payment modal
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Razorpay Sdk failed . are you online?");
      return;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 px-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          Taxi Payment
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          You need to pay{" "}
          <span className="font-semibold text-black">{AMOUNT} INR</span>
        </p>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-transform duration-200 transform hover:scale-105 ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
