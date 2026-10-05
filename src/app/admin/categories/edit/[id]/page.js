"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCategoryPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/categories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, [id]);

  const changeData = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const data = await response.json();

      console.log("CATEGORY UPDATED:", data);

      router.push("/admin/categories");
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  if (!category) {
    return (
      <p className="p-4 text-sm text-gray-600 sm:p-6 sm:text-base">
        Loading...
      </p>
    );
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8">

      <h1 className="text-xl font-bold sm:text-2xl">
        Edit Category
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        Update your product category
      </p>

      <form onSubmit={submitHandler} className="mt-5 sm:mt-6">

        <input
          type="text"
          name="name"
          value={category.name}
          onChange={changeData}
          placeholder="Category name"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:px-4 sm:py-2 sm:text-base"
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:mt-5 sm:w-auto"
        >
          Update Category
        </button>

      </form>

    </div>
  );
}