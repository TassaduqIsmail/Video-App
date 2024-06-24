import React, { useState, useEffect } from "react";
import { Elements, StripeProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../Api/apis";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OOfT2I0AsDkQn5UTsR1GybyxGSAa8NJu0Kaq1DjaNOQaoqts1Ey9TfjAw2aczpwKnh5GTmZxgG7XM4xY6P86WiD00DZ5Yursj"
);

function CheckOutPage({ data }) {
  const [clientSecret, setClientSecret] = useState('');
  const [billId, setBillId] = useState(null);
  const [options, setOptions] = useState('');
  const location = useLocation();

  console.log('stripe data hn bhai ',data);
  // const item = location?.state?.items;
  console.log("clientSecret", clientSecret);
  useEffect(() => {
    // Fetch the client secret from your server when the component mounts
    const fetchClientSecret = async () => {
      
      const response = await axios.post(API.PAYMENT.SUBSCRIPTION, {
        creatorId: data?.id,
        subcriberId: data?.uid,
        price: data?.price,
      });

      console.log("stripe data ", response.data?.clientSecret);
      if (response?.data?.success) {
        setClientSecret(response?.data?.clientSecret);
        setOptions({
          clientSecret: response?.data?.clientSecret,
        });
        setBillId(response?.data?.billId);
        localStorage.setItem("billid",billId)
      } else {
        console.log("Failed to fetch client secret");
      }
    };

    if (!clientSecret) fetchClientSecret();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center font-bold uppercase text-gray-500	">
          Order and Payment Details
        </h1>
        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm billId={billId} />
          </Elements>
        ) : (
          console.log(" stripe nhi chl raha hn ")
        )}
      </div>
    </>
  );
}

export default CheckOutPage;
