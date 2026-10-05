"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
import cartContext from "@/Context/CartContext";

export default function ProductCard({ product, featured = false }) {
  const { user, loaded } = useContext(AuthContext);
  const { addToCart } = useContext(cartContext);
  const router = useRouter();

  const [imageFailed, setImageFailed] = useState(false);

  const imageSrc = product.thumbnail || product.image;

  const handleAddToCart = () => {
    if (!loaded) return; //this is make sure whether the authentication loading is finished or not before deciding whether user can add to cart

    if (!user) {
      router.push("/login");
      return;
    }

    addToCart(product);
  };

  return (
    <article
      className={`flex min-w-0 flex-col overflow-hidden border border-gray-200 bg-white transition ${
        featured
          ? "rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:shadow-md"
          : "rounded-lg hover:shadow-lg sm:rounded-xl"
      }`}
    >
      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        aria-label={`View ${product.title}`}
        className={`flex aspect-square min-w-0 items-center justify-center overflow-hidden ${
          featured
            ? "m-2 rounded-xl bg-white shadow-md ring-1 ring-black/5 sm:m-3 sm:rounded-2xl sm:shadow-lg"
            : "bg-gray-100"
        }`}
      >
        {imageSrc && !imageFailed ? (
          <img
            src={imageSrc}
            alt={product.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain p-3 transition duration-300 hover:scale-105 sm:p-4 lg:p-5"
          />
        ) : (
          <span className="px-2 text-center text-xs text-gray-400 sm:text-sm">
            No image
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">

        {/* Category */}
        <p className="truncate text-[10px] uppercase tracking-wide text-gray-500 sm:text-xs">
          {product.category}
        </p>

        {/* Title */}
        <Link
          href={`/products/${product.id}`}
          className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 hover:underline sm:text-base"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <p className="mt-2 text-xs text-gray-600 sm:text-sm">
          ⭐ {product.rating}
        </p>

        {/* Price */}
        <p className="mt-2 text-base font-bold sm:text-lg lg:text-xl">
          ${product.price}
        </p>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3 w-full rounded-md bg-black px-3 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:mt-4 sm:px-4 sm:text-sm"
        >
          Add to Cart
        </button>

      </div>
    </article>
  );
}