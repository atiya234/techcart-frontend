"use client";

import { useContext } from "react";
import Link from "next/link";
import WishlistContext from "@/Context/WishlistContext";
import cartContext from "@/Context/CartContext";
import { formatPrice } from "@/utils/calculations";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(cartContext);

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-gray-300 p-6 text-center sm:p-10 md:p-12">
        <h1 className="text-lg font-semibold sm:text-xl">
          Your wishlist is empty
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Save products you like and they will show up here.
        </p>

        <Link
          href="/products"
          className="mt-5 inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:mt-6 sm:px-6 sm:py-3"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full">

      <h1 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
        Your Wishlist
      </h1>

      <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">

        {wishlist.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between"
          >

            <div className="min-w-0">
              <Link
                href={`/products/${item.id}`}
                className="block break-words text-sm font-semibold hover:underline sm:text-base"
              >
                {item.title}
              </Link>

              <p className="mt-1 text-sm text-gray-600">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">

              <button
                type="button"
                onClick={() => moveToCart(item)}
                className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:w-auto sm:py-2"
              >
                Move to Cart
              </button>

              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                className="w-full rounded-md border border-red-300 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:w-auto sm:py-2"
              >
                Remove
              </button>

            </div>

          </li>
        ))}

      </ul>

    </section>
  );
}