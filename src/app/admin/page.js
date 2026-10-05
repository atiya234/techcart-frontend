"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import OrderContext from "@/Context/OrderContext";
import { getProducts } from "@/services/productService";

export default function AdminDashboard() {
  const { orders } = useContext(OrderContext);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("PRODUCT ERROR:", error);
      });

    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("CATEGORY ERROR:", error);
      });

    const savedUser = localStorage.getItem("registeredUser");

    if (savedUser) {
      setCustomer(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="w-full">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
          Manage your TechCart store
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            {products.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500">
            Total Categories
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            {categories.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            {orders.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            {customer ? 1 : 0}
          </h2>
        </div>

      </div>

      {/* Store Management */}
      <div className="mt-8 sm:mt-10">

        <h2 className="text-lg font-semibold sm:text-xl">
          Store Management
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-5">

          <Link
            href="/admin/products"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
          >
            <h3 className="text-base font-semibold sm:text-lg">
              Product Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add, edit and remove products.
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
          >
            <h3 className="text-base font-semibold sm:text-lg">
              Category Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add, edit and remove product categories.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
          >
            <h3 className="text-base font-semibold sm:text-lg">
              Order Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              View and manage customer orders.
            </p>
          </Link>

          <Link
            href="/admin/customers"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
          >
            <h3 className="text-base font-semibold sm:text-lg">
              Customer Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              View registered customers.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}