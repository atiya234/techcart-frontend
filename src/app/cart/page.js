"use client";
import { useContext } from "react";
import Link from "next/link";
import cartContext from "@/context/CartContext";

export default function CartPage() {
  const { cart, subtotal, removeFromCart } = useContext(cartContext);

  if (cart.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
        <h1 className="text-xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add some products to see them here.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Your Cart</h1>

      <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">
                ${item.price} x {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold">${item.price * item.quantity}</p>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-right text-xl font-bold">Subtotal: ${subtotal}</p>
    </section>
  );
}