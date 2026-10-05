"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";

// "iPhone 13 Pro" -> "iphone"
const getFamily = (title) => String(title).trim().split(" ")[0].toLowerCase();

export default function ModelSelector({ product, onSelect, onPreview }) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const family = getFamily(product.title);

        const sameFamily = data
          .filter(
            (p) =>
              p.category === product.category &&
              getFamily(p.title) === family
          )
          // numeric: true puts "iPhone 12" before "iPhone 13" before "iPhone 14"
          .sort((a, b) =>
            String(a.title).localeCompare(String(b.title), undefined, {
              numeric: true,
            })
          );

        setModels(sameFamily);
      })
      .catch((error) => console.log("ERROR:", error));
  }, [product.id, product.title, product.category]);

  // Nothing to choose from
  if (models.length < 2) {
    return (
      <p className="mt-4 rounded-lg bg-yellow-50 p-3 text-xs text-yellow-800">
        see here related ,  {models.length}
       {(product.title)}" 
        "{product.category}". .
      </p>
    );
  }

  return (
    <div className="mt-5">
      <p className="text-sm font-medium text-gray-700">Choose model</p>

      <ul className="mt-2 flex flex-wrap gap-2">
        {models.map((model) => {
          const isCurrent = String(model.id) === String(product.id);

          return (
            <li key={model.id}>
              <button
                type="button"
                onClick={() => onSelect(model)}
                onMouseEnter={() =>
                  !isCurrent && onPreview(model.thumbnail || model.image || null)
                }
                onMouseLeave={() => onPreview(null)}
                aria-pressed={isCurrent}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${isCurrent
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-800 hover:border-black hover:bg-gray-100"
                  }`}
              >
                {model.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}