"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/services/productService";

export default function SimilarProducts({ currentProductId, category }) {
  const [similar, setSimilar] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const sameCategory = data.filter(
          (p) =>
            p.category === category &&
            String(p.id) !== String(currentProductId)
        );
        setSimilar(sameCategory.slice(0, 10));
      })
      .catch((error) => console.log("ERROR:", error));
  }, [currentProductId, category]);

  // Scroll the row by about one screen of cards
  const scrollRow = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  // Nothing similar to show
  if (similar.length === 0) return null;

  const arrowStyle =
    "rounded-full border border-gray-300 bg-white px-3 py-1.5 text-base transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus:ring-black sm:px-3.5 sm:py-1.5 sm:text-lg";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Similar products"
      className="mx-auto mt-8 w-full max-w-6xl sm:mt-12"
    >
      {/* Heading + arrows */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Similar Products
        </h2>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollRow(-1)}
            aria-label="Scroll similar products left"
            className={arrowStyle}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => scrollRow(1)}
            aria-label="Scroll similar products right"
            className={arrowStyle}
          >
            ›
          </button>
        </div>
      </div>

      {/* Product carousel */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-4 sm:gap-4"
      >
        {similar.map((product) => (
          <div
            key={product.id}
            className="w-[170px] shrink-0 snap-start sm:w-56 md:w-64"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}