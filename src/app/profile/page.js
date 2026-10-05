"use client";

import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import OrderContext from "@/Context/OrderContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);

  console.log("ORDERS:", orders);

  return (
    <section className="min-h-screen px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
            Manage your account and view your orders.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6">

          <div className="flex flex-col items-center gap-4 sm:flex-row">

            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* User Details */}
            <div className="min-w-0 text-center sm:text-left">
              <h2 className="break-words text-lg font-semibold text-gray-900 sm:text-xl">
                {user?.name || "User"}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {user?.email || "Email not available"}
              </p>

              <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                Active Account
              </span>
            </div>

          </div>

        </div>

        {/* Personal Information */}
        <div className="mt-5 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm sm:mt-6 sm:p-6">

          <h2 className="text-base font-semibold sm:text-lg">
            Personal Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Full Name
              </p>

              <p className="mt-1 break-words text-sm font-medium sm:text-base">
                {user?.name || "Not available"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Email Address
              </p>

              <p className="mt-1 break-all text-sm font-medium sm:text-base">
                {user?.email || "Not available"}
              </p>
            </div>

          </div>

        </div>

        {/* Order History */}
        <div className="mt-5 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm sm:mt-6 sm:p-6">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-base font-semibold sm:text-lg">
                Order History
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Your recent orders
              </p>
            </div>

            <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
              {orders.length} Orders
            </span>

          </div>

          {orders.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-gray-300 p-6 text-center sm:mt-6 sm:p-8">

              <div className="text-3xl">
                🛍️
              </div>

              <h3 className="mt-3 text-sm font-semibold sm:text-base">
                No orders yet
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                Your orders will appear here after you make a purchase.
              </p>

            </div>
          ) : (
            <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-gray-200 p-4 sm:p-5"
                >

                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                    <div className="min-w-0">
                      <p className="break-all text-sm font-semibold sm:text-base">
                        Order #{order.id}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        {order.date}
                      </p>
                    </div>

                    <span className="w-fit shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                      {order.status}
                    </span>

                  </div>

                  <div className="mt-4 space-y-2">

                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-3 text-xs sm:text-sm"
                      >

                        <span className="min-w-0 break-words">
                          {item.title} × {item.quantity || 1}
                        </span>

                        <span className="shrink-0">
                          ₹{item.price * (item.quantity || 1)}
                        </span>

                      </div>
                    ))}

                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4">

                    <div className="flex justify-between gap-4 text-sm font-semibold sm:text-base">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}