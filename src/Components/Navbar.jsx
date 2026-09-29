import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="bg-black text-white">
      <div className="flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold">
          TechCart
        </h1>

        <div className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Cart</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;