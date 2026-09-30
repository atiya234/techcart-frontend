
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/productService";
import ProductCard from "@/Components/ProductCard";
import SimilarProducts from "@/Components/SimilarProducts";
import { useContext } from "react";
import cartContext from "@/context/CartContext";
export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(cartContext)

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        console.log("API DATA:", data);
        setProduct(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, [id]);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-gray-500">Loading product...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Product Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="grid md:grid-cols-2">

            {/* Product Image */}
            <div className="flex min-h-[350px] items-center justify-center bg-gray-100 p-6 sm:min-h-[450px]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[400px] w-full object-contain"
                />
              ) : (
                <div className="flex h-full min-h-[300px] items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">

              {/* Category */}
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-md bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-700">
                  ⭐ {product.rating}
                </span>
                <span className="text-sm text-gray-500">
                  Customer Rating
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 leading-7 text-gray-600">
                {product.description ||
                  "Experience high-quality technology designed for everyday use."}
              </p>

              {/* Stock */}
              <div className="mt-6 border-y border-gray-200 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Availability</span>

                  <span className="font-medium text-green-600">
                    {product.stock > 0
                      ? `${product.stock} items in stock`
                      : "Out of stock"}
                  </span>
                </div>

                {product.brand && (
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-medium text-gray-900">
                      {product.brand}
                    </span>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button" onClick={()=>console.log("BUTTON CLICKED")}
                  className="flex-1 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  ♡ Wishlist
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <SimilarProducts  currentProductId = {product.id}
      category = {product.category}
      
      />
     
    </main>
  );
}
