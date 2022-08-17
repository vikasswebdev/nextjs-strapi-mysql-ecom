import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useData } from "../store";
import { useRouter } from "next/router";

const Checkout = () => {
  const [subtotal, setSubtotal] = useState(0);
  const { state, dispatch } = useData();
  const router = useRouter();

  useEffect(() => {
    if (state.cart.length === 0) {
      router.push("/");
    }
  }, [state.cart.length]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const a = state.cart.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);

    setSubtotal(a);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    let orderId = "OID" + Math.floor(1000000 * Math.random());
    let url = `http://localhost:1337/api/orders/pretransaction`;
    const rawResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        orderid: orderId,
        amount: subtotal,
        ...form,
        cart: state.cart,
      }),
    });

    const content = await rawResponse.json();

    console.log("content", content);

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: orderId /* update order id */,
        token: content.body.txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subtotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    }
  };

  return (
    <>
      <Script
        id={"paytm"}
        type="application/javascript"
        crossorigin="anonymous"
        src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/PBbIDP44776673527126.js"
      ></Script>
      <div>
        <section className="text-black body-font relative">
          <div className="container px-5 py-24 mx-auto min-h-screen">
            <div className="flex flex-col w-full mb-12">
              <h2 className="text-2xl font-medium"> Checkout</h2>
              {state.cart.length > 0 ? (
                <div className="py-5">
                  {state.cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between my-2 md:w-1/2 w-full"
                    >
                      <div className="flex flex-col">
                        <img
                          className="w-20 h-20"
                          src={item.product.image.data.attributes.name}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm">{item.product.title}</div>
                        <div className="text-xs text-gray-600">
                          {item.quantity} x ₹ {item.price}
                        </div>
                      </div>
                      <div className="text-sm">
                        ₹ {item.quantity * item.price}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between my-5 md:w-1/2 w-full border-2 p-2 rounded border-blue-500">
                    <div className="text-lg">Total</div>
                    <div className="text-lg">
                      ₹{" "}
                      {state.cart.reduce((acc, item) => {
                        return acc + item.quantity * item.price;
                      }, 0)}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className=" ">
              <div className="flex flex-wrap -m-2">
                <div className="p-2  w-1/2 ">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={form.name}
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2  ">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      value={form.email}
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2  ">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      onChange={handleChange}
                      value={form.phone}
                      type="phone"
                      id="phone"
                      name="phone"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="address"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Address
                    </label>
                    <textarea
                      onChange={handleChange}
                      value={form.address}
                      id="address"
                      name="address"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    onClick={submit}
                    className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;
