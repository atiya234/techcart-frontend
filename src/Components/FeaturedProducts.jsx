"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/services/productService";

const FEATURED_COUNT = 4;

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    setError(false);

    getProducts()
      .then((data) => {
        const topRated = [...data]
          .sort((a, b) => Number(b.rating) - Number(a.rating))
          .slice(0, FEATURED_COUNT);

        setProducts(topRated);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className="mt-10 sm:mt-12 lg:mt-16">

      {/* Heading */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          Featured Products
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
          Explore our top-rated products picked especially for you.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div
          role="status"
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {Array.from({ length: FEATURED_COUNT }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl border border-gray-200 bg-gray-100 sm:h-72"
            />
          ))}

          <span className="sr-only">
            Loading featured products...
          </span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-6 text-center sm:p-8"
        >
          <p className="font-medium text-red-700">
            Could not load featured products.
          </p>

          <button
            type="button"
            onClick={loadProducts}
            className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && products.length === 0 && (
        <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600 sm:p-8 sm:text-base">
          No products available yet.
        </p>
      )}

      {/* Products */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              featured
            />
          ))}
        </div>
      )}

    </section>
  );
}