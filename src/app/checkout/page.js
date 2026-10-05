"use client";

import { useContext, useState } from "react";
import cartContext from "@/Context/CartContext";
import { useRouter } from "next/navigation";
import OrderContext from "@/Context/OrderContext";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useContext(cartContext);

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("cod");

  const router = useRouter();

  const changeHandler = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const { addOrder } = useContext(OrderContext);

  const discount = subtotal > 500 ? 50 : 0;
  const delivery = subtotal > 1000 ? 0 : 100;
  const total = subtotal - discount + delivery;

  const handlePlaceOrder = () => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toDateString(),
      items: cart,
      shipping: shipping,
      payment: payment,
      subtotal: subtotal,
      discount: discount,
      delivery: delivery,
      total: total,
      status: "Placed",
    };

    console.log("NEW ORDER:", newOrder);

    addOrder(newOrder);
    clearCart();

    console.log("REDIRECTING TO ORDER SUCCESS");

    router.push("/order-success");
  };

  return (
    <section className="min-h-screen py-5 sm:py-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Checkout
          </h1>

          <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
            Complete your order by providing your details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">

          {/* LEFT SIDE */}
          <div className="space-y-5 lg:col-span-2 lg:space-y-6">

            {/* Shipping Information */}
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm sm:p-6">

              <h2 className="text-lg font-semibold sm:text-xl">
                Shipping Information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4">

                {/* Name */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={shipping.name}
                    onChange={changeHandler}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:text-base"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={shipping.email}
                    onChange={changeHandler}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:text-base"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={shipping.phone}
                    onChange={changeHandler}
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:text-base"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={shipping.city}
                    onChange={changeHandler}
                    placeholder="Enter city"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:text-base"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={shipping.address}
                    onChange={changeHandler}
                    placeholder="Enter your complete address"
                    rows="3"
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:text-base"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={shipping.pincode}
                    onChange={changeHandler}
                    placeholder="Enter pincode"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:text-base"
                  />
                </div>

              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm sm:p-6">

              <h2 className="text-lg font-semibold sm:text-xl">
                Payment Method
              </h2>

              <div className="mt-4 space-y-3 sm:mt-5">

                {/* COD */}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50 sm:items-center sm:p-4">

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="mt-1 sm:mt-0"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium sm:text-base">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Pay when your order arrives.
                    </p>
                  </div>

                </label>

                {/* Card */}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50 sm:items-center sm:p-4">

                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="mt-1 sm:mt-0"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium sm:text-base">
                      Credit / Debit Card
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Pay securely using your card.
                    </p>
                  </div>

                </label>

                {/* UPI */}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50 sm:items-center sm:p-4">

                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === "upi"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="mt-1 sm:mt-0"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium sm:text-base">
                      UPI
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Pay using your UPI app.
                    </p>
                  </div>

                </label>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="h-fit rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm sm:p-6 lg:sticky lg:top-24">

            <h2 className="text-lg font-semibold sm:text-xl">
              Order Summary
            </h2>

            {/* Products */}
            <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3"
                >

                  <div className="min-w-0">
                    <p className="break-words text-sm font-medium sm:text-base">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium sm:text-base">
                    ₹{item.price * (item.quantity || 1)}
                  </p>

                </div>
              ))}

            </div>

            <div className="my-4 border-t border-gray-200 sm:my-5"></div>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Discount
                </span>

                <span className="text-green-600">
                  -₹{discount}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span>
                  {delivery === 0 ? "Free" : `₹${delivery}`}
                </span>
              </div>

            </div>

            <div className="my-4 border-t border-gray-200 sm:my-5"></div>

            <div className="flex items-center justify-between gap-4">

              <span className="text-base font-semibold sm:text-lg">
                Total
              </span>

              <span className="text-lg font-bold sm:text-xl">
                ₹{total}
              </span>

            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-5 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:mt-6 sm:text-base"
            >
              Place Order
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}