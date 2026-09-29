import ProductCard from "./ProductCard";

const products = [
  { id: 1, title: "iPhone 15", category: "smartphones", price: 799, rating: 4.7 },
  { id: 2, title: "Samsung Galaxy S24", category: "smartphones", price: 699, rating: 4.6 },
  { id: 3, title: "MacBook Air M2", category: "laptops", price: 999, rating: 4.8 },
  { id: 4, title: "iPad Pro", category: "tablets", price: 899, rating: 4.5 },
];

export default function FeaturedProducts() {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Featured Products</h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}