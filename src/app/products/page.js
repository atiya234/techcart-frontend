import ProductCard from "@/Components/ProductCard";
import { products } from "@/data/products";

export default function ProductsPage(){
    return (
        <section>
            <h1 className="mb-6 text-2xl font-bold sm:text-3xl">All Products</h1>
            <div  className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {
                    products.map((product)=>(
                        <ProductCard key = {product.id} product={product} />
                    ))
                }
            </div>
        </section>
    )
}