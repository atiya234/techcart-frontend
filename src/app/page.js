
import Link from "next/link";
import Category from "@/Components/Category";
import FeaturedProducts from "@/Components/FeaturedProducts";

export default function Home() {
  return (
    <main className="bg-white text-black">

      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-black text-white">
        <div className="mx-auto grid min-h-[70vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">

          {/* Hero Content */}
          <div className="text-center lg:text-left">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
              Technology. Simplified.
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Everything You Need.
              <span className="block text-gray-400">
                All in One Place.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg lg:mx-0">
              Discover smartphones, laptops, tablets and accessories
              built for modern life.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

              <Link
                href="/products"
                className="rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Shop Now
              </Link>

              <Link
                href="/products"
                className="rounded-lg border border-gray-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Explore Products
              </Link>

            </div>

          </div>

          {/* Minimal Product Visual */}
          <div className="hidden items-center justify-center lg:flex">

            <div className="relative flex h-[400px] w-[400px] items-center justify-center rounded-full border border-gray-700">

              <div className="flex h-[300px] w-[300px] items-center justify-center rounded-full border border-gray-700">

                <div className="text-center">

                  <div className="text-7xl font-bold">
                    TC
                  </div>

                  <p className="mt-3 text-sm uppercase tracking-[0.3em] text-gray-500">
                    TechCart
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Benefits */}
      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">

          <div className="border-b border-gray-200 p-6 text-center md:border-b-0 md:border-r">
            <h3 className="font-semibold">
              Fast Delivery
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Quick and reliable shipping
            </p>
          </div>

          <div className="border-b border-gray-200 p-6 text-center md:border-b-0 md:border-r">
            <h3 className="font-semibold">
              Secure Payment
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Safe and secure checkout
            </p>
          </div>

          <div className="border-b border-gray-200 p-6 text-center md:border-b-0 md:border-r">
            <h3 className="font-semibold">
              Easy Returns
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Simple return process
            </p>
          </div>

          <div className="p-6 text-center">
            <h3 className="font-semibold">
              Quality Products
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Carefully selected products
            </p>
          </div>

        </div>

      </section>


      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="mb-10 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Browse
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Shop by Category
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Explore our collection of modern technology.
          </p>

        </div>

        <Category />

      </section>


      {/* Featured Products */}
      <section className="border-y border-gray-200 bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Collection
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Featured Products
              </h2>

              <p className="mt-3 text-gray-500">
                Discover some of our most popular products.
              </p>

            </div>

            <Link
              href="/products"
              className="text-sm font-semibold underline underline-offset-4 transition hover:text-gray-500"
            >
              View All Products →
            </Link>

          </div>

          <FeaturedProducts />

        </div>

      </section>


      {/* Final CTA */}
      <section className="bg-black text-white">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            TechCart
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Find Your Next Device
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Explore our collection and find the technology that fits
            your everyday needs.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Browse Products
          </Link>

        </div>

      </section>

    </main>
  );
}
