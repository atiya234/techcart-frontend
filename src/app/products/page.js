import ProductList from "@/Components/ProductList";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <section className="w-full">

      <h1 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
        All Products
      </h1>

      <ProductList />

    </section>
  );
}