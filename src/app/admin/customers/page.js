"use client";

import { useEffect, useState } from "react";

export default function AdminCustomersPage() {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("registeredUser");

    if (savedUser) {
      setCustomer(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="w-full">

      <div>
        <h1 className="text-xl font-bold sm:text-2xl">
          Customer Management
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View registered customers
        </p>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white sm:mt-6">

        {!customer ? (

          <div className="p-6 text-center sm:p-10">

            <div className="text-3xl sm:text-4xl">
              👥
            </div>

            <h2 className="mt-3 text-base font-semibold sm:text-lg">
              No customers yet
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Registered customers will appear here.
            </p>

          </div>

        ) : (

          <table className="w-full min-w-[600px]">

            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>

                <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Name
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-gray-100">

                <td className="px-4 py-3 text-sm font-medium sm:px-6 sm:py-4">
                  {customer.name}
                </td>

                <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">
                  {customer.email}
                </td>

                <td className="px-4 py-3 sm:px-6 sm:py-4">

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium sm:px-3">
                    Registered
                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}