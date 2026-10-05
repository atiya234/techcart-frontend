import Link from "next/link";

const brands = ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo", "OnePlus", "Xiaomi"];

// Round plate: dark in the middle, fading softly to the edges
const plateStyle = {
  background:
    "radial-gradient(ellipse at center, #374151 0%, #9ca3af 45%, rgba(209, 213, 219, 0) 72%)",
};

export default function BrandsSection() {
  return (
    <section
      aria-labelledby="brands-heading"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
    >
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
          Trusted names
        </p>
        <h2
          id="brands-heading"
          className="mt-3 text-3xl font-bold sm:text-4xl"
        >
          Brands to Celebrate In
        </h2>
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((name) => (
          <li key={name}>
            <Link
              href="/products"
              aria-label={`Shop ${name} products`}
              className="group flex flex-col items-center focus:outline-none"
            >
              <span className="text-2xl font-semibold uppercase tracking-[0.2em] text-gray-900 transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:underline motion-reduce:transition-none sm:text-3xl">
                {name}
              </span>

              {/* Round plate under the name */}
              <span
                aria-hidden="true"
                style={plateStyle}
                className="mt-4 h-6 w-36 rounded-[50%] transition-all duration-300 group-hover:w-40 group-hover:opacity-90 motion-reduce:transition-none"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}