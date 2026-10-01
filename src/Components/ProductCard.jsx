
"use client";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/Context/AuthContext";
import cartContext from "@/Context/CartContext";

export default function ProductCard({ product }) {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(cartContext);

  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    addToCart(product);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg">
      <div className="flex aspect-square items-center justify-center bg-gray-100 text-sm text-gray-400">
        Image
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {product.category}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="mt-1 text-sm font-semibold hover:underline"
        >
          {product.title}
        </Link>

        <p className="mt-2 text-sm text-gray-600">
          ⭐ {product.rating}
        </p>

        <p className="mt-2 text-lg font-bold">
          ${product.price}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
