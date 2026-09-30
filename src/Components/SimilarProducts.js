"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import Link from "next/link";

export default function SimilarProducts({ currentProductId , category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log("ALL PRODUCTS:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.filter((product) => product.id !== currentProductId  && product.category === category)
        .map((product)=>(

        
           
           
            
            
          <Link  key={product.id} href={`/products/${product.id}`} className="rounded-xl border p-4">


            <h3 className="font-semibold">{product.title}</h3>

            <p className="mt-2 text-gray-600">
              ${product.price}
            </p>

            <p className="mt-2">
              ⭐ {product.rating}
            </p>
          </Link>
         
          
        ))}
      </div>
    </div>
  );
}