"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, []);

  const deleteCategories = (cid) => {
    axios
      .delete(`http://localhost:5000/categories/${cid}`)
      .then((res) => {
        alert("category deleted successfully");

        const categoriesProduct = categories.filter(
          (category) => category.id !== cid
        );

        setCategories(categoriesProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            Category Management
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage your product categories
          </p>
        </div>

        <Link
          href="/admin/categories/add"
          className="w-full rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
        >
          + Add Category
        </Link>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white sm:mt-6">

        <table className="w-full min-w-[600px]">

          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                Category
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b border-gray-100"
              >
                <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">
                  {category.id}
                </td>

                <td className="px-4 py-3 text-sm font-medium sm:px-6 sm:py-4">
                  {category.name}
                </td>

                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex gap-2">

                    <Link
                      href={`/admin/categories/edit/${category.id}`}
                      className="rounded-md border px-3 py-1.5 text-xs transition hover:bg-gray-50 sm:text-sm"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteCategories(category.id)
                      }
                      className="rounded-md bg-black px-3 py-1.5 text-xs text-white transition hover:bg-gray-800 sm:text-sm"
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