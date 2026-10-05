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
      <section className="rounded-lg border border-dashed border-gray-300 p-6 text-center sm:p-10 md:p-12">
        <h1 className="text-lg font-semibold sm:text-xl">
          Your cart is empty
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Add some products to see them here.
        </p>

        <Link
          href="/products"
          className="mt-5 inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:mt-6 sm:px-6 sm:py-3"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full">

      <h1 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
        Your Cart
      </h1>

      <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">

        {cart.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between"
          >

            <div className="min-w-0">
              <p className="break-words text-sm font-semibold sm:text-base">
                {item.title}
              </p>

              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                ${item.price} each
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">

              <div className="flex items-center rounded-md border border-gray-300">

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                  aria-label={`Decrease quantity of ${item.title}`}
                  className="px-2.5 py-1.5 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                >
                  -
                </button>

                <span className="min-w-7 text-center text-sm font-medium sm:min-w-8">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  aria-label={`Increase quantity of ${item.title}`}
                  className="px-2.5 py-1.5 text-lg transition hover:bg-gray-100 sm:px-3"
                >
                  +
                </button>

              </div>

              <p className="w-auto min-w-[70px] text-right text-sm font-semibold sm:w-20 sm:text-base">
                {formatPrice(item.price * item.quantity)}
              </p>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus:ring-red-500 sm:text-sm"
              >
                Remove
              </button>

            </div>

          </li>
        ))}

      </ul>

      <div className="mt-5 w-full rounded-xl border border-gray-200 bg-white p-4 sm:mt-6 sm:p-6 md:ml-auto md:max-w-sm">

        <h2 className="mb-4 text-base font-semibold sm:text-lg">
          Order Summary
        </h2>

        <dl className="space-y-2 text-sm">

          <div className="flex justify-between gap-4">
            <dt className="text-gray-600">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-gray-600">Discount</dt>
            <dd className="text-green-600">
              -{formatPrice(discount)}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-gray-600">Delivery</dt>
            <dd>
              {delivery === 0 ? "Free" : formatPrice(delivery)}
            </dd>
          </div>

          <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-base font-bold">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>

        </dl>

        <Link
          href="/checkout"
          className="mt-5 block rounded-lg bg-black px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-gray-800 sm:mt-6 sm:px-6 sm:py-3"
        >
          Proceed to Checkout
        </Link>

      </div>

    </section>
  );
}