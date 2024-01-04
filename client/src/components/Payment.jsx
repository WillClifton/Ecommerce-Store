import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import useCart from "../hooks/useCart";

function Payment() {
  const { cartTotal } = useCart();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5252/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5252/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal() * 100 }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
      {clientSecret && stripePromise && (
        <div className="w-[500px] border p-10  rounded-lg bg-white">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
      <button
        onClick={() => {
          console.log(clientSecret);
          console.log(stripePromise);
        }}
      ></button>
    </div>
  );
}

export default Payment;
