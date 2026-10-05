
"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import cartContext from "@/Context/CartContext";
import { AuthContext } from "@/Context/AuthContext";
import { ThemeContext } from "@/Context/ThemeContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/wishlist", label: "Wishlist" },
];

const Navbar = () => {
  const { itemCount } = useContext(cartContext);
  const { user, loaded, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white text-gray-900 shadow-md dark:bg-gray-900 dark:text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl font-bold sm:text-2xl"
        >
          TechCart
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-5 text-sm sm:gap-6 sm:text-base md:flex">

          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-900 transition hover:text-gray-500 focus:outline-none focus-visible:underline dark:text-white dark:hover:text-gray-300"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Cart */}
          <li>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-900 transition hover:text-gray-500 focus:outline-none focus-visible:underline dark:text-white dark:hover:text-gray-300"
            >
              Cart

              {itemCount > 0 && (
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-black dark:bg-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </li>

          {/* Theme Toggle */}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-900 transition hover:bg-gray-100 dark:border-white/60 dark:text-white dark:hover:bg-white/10"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </li>

          {/* Login / Logout */}
          {loaded && (
            <li>
              {user ? (
                <div className="flex items-center gap-3">

                  <span className="hidden text-gray-600 lg:inline dark:text-gray-300">
                    Hi, {user.name}
                  </span>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:border-white/60 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white"
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md bg-black px-3 py-1 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus-visible:ring-white"
                >
                  Login
                </Link>
              )}
            </li>
          )}

        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="rounded-md p-2 text-2xl text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white text-gray-900 dark:border-white/10 dark:bg-black dark:text-white md:hidden">

          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">

            {/* Mobile Links */}
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-md px-3 py-3 text-sm text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Mobile Cart */}
            <li>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
              >
                <span>Cart</span>

                {itemCount > 0 && (
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-black dark:bg-white">
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>

            {/* Mobile Theme Toggle */}
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full rounded-md px-3 py-3 text-left text-sm text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
              >
                {theme === "light"
                  ? "🌙 Switch to Dark Mode"
                  : "☀️ Switch to Light Mode"}
              </button>
            </li>

            {/* Mobile Login / Logout */}
            {loaded && (
              <li className="border-t border-gray-200 pt-3 dark:border-white/10">

                {user ? (
                  <div className="space-y-3 px-3">

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Hi, {user.name}
                    </p>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition hover:bg-gray-100 dark:border-white/60 dark:text-white dark:hover:bg-white/10"
                    >
                      Logout
                    </button>

                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    Login
                  </Link>
                )}

              </li>
            )}

          </ul>

        </div>
      )}

    </nav>
  );
};

export default Navbar;
