"use client";

import Link from "next/link";
import { useContext } from "react";
import OrderContext from "@/Context/OrderContext";

export default function OrderSuccessPage() {
  const { orders } = useContext(OrderContext);

  const latestOrder = orders[orders.length - 1];

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8">

        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600 dark:bg-green-900/30 dark:text-green-400">
          ✓
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
          Thank you for shopping with TechCart. Your order has been placed
          successfully.
        </p>

        {/* Order Details */}
        {latestOrder && (
          <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left dark:bg-gray-700/50">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Order ID
              </span>

              <span className="font-semibold text-gray-900 dark:text-white">
                #{latestOrder.id}
              </span>
            </div>

            <div className="mt-3 flex justify-between gap-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Total Amount
              </span>

              <span className="font-semibold text-gray-900 dark:text-white">
                ₹{latestOrder.total}
              </span>
            </div>

            <div className="mt-3 flex justify-between gap-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Status
              </span>

              <span className="font-semibold text-green-600 dark:text-green-400">
                {latestOrder.status}
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            href="/profile"
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            View My Orders
          </Link>

          <Link
            href="/products"
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </section>
  );
}