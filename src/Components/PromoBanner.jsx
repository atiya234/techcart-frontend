import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:gap-6">

      <div className="rounded-2xl bg-black p-5 text-white sm:p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-300 sm:text-sm">
          Limited offer
        </p>

        <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
          Up to 30% off on laptops
        </h2>

        <p className="mt-2 max-w-lg text-sm leading-6 text-gray-300 sm:text-base">
          Upgrade your setup with our best laptop deals.
        </p>

        <Link
          href="/products?category=laptops"
          className="mt-5 inline-block rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:mt-6 sm:px-5"
        >
          Shop Laptops
        </Link>
      </div>

      <div className="rounded-2xl bg-gray-200 p-5 sm:p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 sm:text-sm">
          Just landed
        </p>

        <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
          Latest smartphones
        </h2>

        <p className="mt-2 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
          Explore the newest phones at great prices.
        </p>

        <Link
          href="/products?category=smartphones"
          className="mt-5 inline-block rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:mt-6 sm:px-5"
        >
          Shop Phones
        </Link>
      </div>

    </section>
  );
}