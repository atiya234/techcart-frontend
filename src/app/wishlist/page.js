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
      <section className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
        <h1 className="text-xl font-semibold">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-gray-600">
          Save products you like and they will show up here.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Your Wishlist</h1>

      <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {wishlist.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Link
                href={`/products/${item.id}`}
                className="font-semibold hover:underline"
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => moveToCart(item)}
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Move to Cart
              </button>
              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
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