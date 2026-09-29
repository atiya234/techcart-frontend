import Link from "next/link";
import Category from "@/Components/Category";
import FeaturedProducts from "@/Components/FeaturedProducts";
import PromoBanner from "@/Components/PromoBanner";

export default function Home() {
  return (
    <>
      <section className="flex min-h-[80vh] items-center justify-center rounded-2xl bg-gray-100 px-4">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-5xl">
            Welcome to TechCart
          </h1>

          <p className="mb-6 text-base text-gray-600 sm:text-lg">
            Discover the latest technology at the best prices.
          </p>

          <Link
            href="/products"
            className="inline-block rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <Category />
      <FeaturedProducts />
      <PromoBanner />
    </>
  );
}