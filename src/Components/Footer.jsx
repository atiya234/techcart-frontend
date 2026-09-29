import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-lg font-bold">TechCart</p>
          <p className="mt-2 text-sm text-gray-600">
            The latest technology at the best prices.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><Link href="/products" className="hover:underline">All Products</Link></li>
            <li><Link href="/wishlist" className="hover:underline">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:underline">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Account</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><Link href="/login" className="hover:underline">Login</Link></li>
            <li><Link href="/register" className="hover:underline">Register</Link></li>
            <li><Link href="/profile" className="hover:underline">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Support</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>support@techcart.com</li>
            <li>Mon–Sat, 9am–6pm</li>
          </ul>
        </div>
      </div>

      <p className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © 2026 TechCart. All rights reserved.
      </p>
    </footer>
  );
}