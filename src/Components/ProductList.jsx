"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function ProductList() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <label htmlFor="search" className="sr-only">
          Search products
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black sm:max-w-md"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-600">
          No products found for "{search}".
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}