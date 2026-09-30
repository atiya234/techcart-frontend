"use client"

import Link from "next/link";
import { useContext } from "react";
import cartContext from "@/context/CartContext";

export default function ProductCard({ product }) {
const { addToCart } = useContext(cartContext)


  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg">
      <div className="flex aspect-square items-center justify-center bg-gray-100 text-sm text-gray-400">
        Image
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {product.category}
        </p>

        <Link href={`/products/${product.id}`} 
          className="mt-1 text-sm font-semibold hover:underline"
        >
          {product.title}
        </Link>

        <p className="mt-2 text-sm text-gray-600">⭐ {product.rating}</p>
        <p className="mt-2 text-lg font-bold">${product.price}</p>

        <button
          type="button" onClick={()=>{
            console.log("CARD CLICKED:", product)
            
            addToCart(product)}}
          className="mt-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}