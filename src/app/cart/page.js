
"use client";

import { useContext } from "react";
import Link from "next/link";
import cartContext from "@/Context/CartContext";
import { calculationTotals, formatPrice } from "@/utils/calculations";

export default function CartPage() {
  const { cart, subtotal, removeFromCart, updateQuantity } =
    useContext(cartContext);

  const { discount, delivery, total } = calculationTotals(subtotal);

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
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
        Your Cart
      </h1>

      <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {cart.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">{item.title}</p>

              <p className="text-sm text-gray-600">
                ${item.price} each
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-md border border-gray-300">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                  aria-label={`Decrease quantity of ${item.title}`}
                  className="px-3 py-1.5 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  -
                </button>

                <span className="min-w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  aria-label={`Increase quantity of ${item.title}`}
                  className="px-3 py-1.5 text-lg transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <p className="w-20 text-right font-semibold">
                {formatPrice(item.price * item.quantity)}
              </p>

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

      <div className="mt-6 ml-auto max-w-sm rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Order Summary
        </h2>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-gray-600">Discount</dt>
            <dd className="text-green-600">
              -{formatPrice(discount)}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-gray-600">Delivery</dt>
            <dd>
              {delivery === 0 ? "Free" : formatPrice(delivery)}
            </dd>
          </div>

          <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>

        <Link
          href="/checkout"
          className="mt-6 block rounded-lg bg-black px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}
