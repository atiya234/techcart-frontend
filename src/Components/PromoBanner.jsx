import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="mt-12 grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl bg-black p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">
          Limited offer
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          Up to 30% off on laptops
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Upgrade your setup with our best laptop deals.
        </p>
        <Link href = ""
        //   href="/products?category=laptops"
          className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Shop Laptops
        </Link>
      </div>

      <div className="rounded-2xl bg-gray-200 p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          Just landed
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          Latest smartphones
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Explore the newest phones at great prices.
        </p>
        <Link href=""
        //   href="/products?category=smartphones"
          className="mt-6 inline-block rounded-md bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          Shop Phones
        </Link>
      </div>
    </section>
  );
}