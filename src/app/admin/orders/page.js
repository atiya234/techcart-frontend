"use client";

import { useContext } from "react";
import OrderContext from "@/Context/OrderContext";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useContext(OrderContext);

  return (
    <div className="w-full">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">
          Order Management
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View and manage customer orders
        </p>
      </div>

      {/* Orders */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white sm:mt-6">

        {orders.length === 0 ? (

          <div className="p-6 text-center sm:p-10">

            <div className="text-3xl sm:text-4xl">
              📦
            </div>

            <h2 className="mt-3 text-base font-semibold sm:text-lg">
              No orders yet
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Customer orders will appear here.
            </p>

          </div>

        ) : (

          <table className="w-full min-w-[800px]">

            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>

                <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Order ID
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Customer
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Date
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Total
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b border-gray-100"
                >

                  <td className="px-4 py-3 text-sm font-medium sm:px-6 sm:py-4">
                    #{order.id}
                  </td>

                  <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">
                    {order.shipping.name}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    {order.date}
                  </td>

                  <td className="px-4 py-3 text-sm font-medium sm:px-6 sm:py-4">
                    ₹{order.total}
                  </td>

                  <td className="px-4 py-3 sm:px-6 sm:py-4">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="rounded-md border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-black sm:px-3 sm:py-2 sm:text-sm"
                    >
                      <option value="Placed">
                        Placed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}