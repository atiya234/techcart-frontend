"use client";

import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/services/productService";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      console.log("PRODUCT DELETED:", id);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            Product Management
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage your TechCart products
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="w-full rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
        >
          + Add Product
        </Link>

      </div>

      {/* Products Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white sm:mt-6">

        <table className="w-full min-w-[850px]">

          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>

              <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                Product
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                Category
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                Price
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                Rating
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100"
              >

                <td className="max-w-[220px] px-4 py-3 text-sm sm:px-6 sm:py-4">
                  <span className="block truncate">
                    {product.title}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">
                  {product.category}
                </td>

                <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">
                  ₹{product.price}
                </td>

                <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">
                  ⭐ {product.rating}
                </td>

                <td className="px-4 py-3 sm:px-6 sm:py-4">

                  <div className="flex gap-2">

                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="rounded-md border px-3 py-1.5 text-xs transition hover:bg-gray-50 sm:text-sm"
                    >
                      Edit
                    </Link>

                    <button
                      className="rounded-md bg-black px-3 py-1.5 text-xs text-white transition hover:bg-gray-800 sm:text-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}