import Link from "next/link";

const categories = [
  { name: "Smartphones", slug: "smartphones" },
  { name: "Laptops", slug: "laptops" },
  { name: "Tablets", slug: "tablets" },
  { name: "Mobile Accessories", slug: "mobile-accessories" },
];

export default function Category() {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Shop by Category</h2>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/products?category=${cat.slug}`}
              className="flex h-24 items-center justify-center rounded-xl border border-gray-200 bg-white text-center text-sm font-medium transition hover:border-black hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}