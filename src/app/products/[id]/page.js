"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/services/productService";
import SimilarProducts from "@/Components/SimilarProducts";
import ProductGallery from "@/Components/ProductGallery";
import ModelSelector from "@/Components/ModelSelector";
import cartContext from "@/Context/CartContext";
import WishlistContext from "@/Context/WishlistContext";
import { AuthContext } from "@/Context/AuthContext";
import AddReview from "@/Components/AddReview";
import ReviewList from "@/Components/ReviewList";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  const { addToCart } = useContext(cartContext);
  const { addWishlist } = useContext(WishlistContext);
  const { user, loaded } = useContext(AuthContext);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setPreviewSrc(null);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
  const handleAddToCart = () => {
    if (!loaded) return;

    if (!user) {
      router.push("/login");
      return;
    }

    addToCart(product);
  };
  const handleSelectModel = (model) => {
    if (String(model.id) === String(product.id)) return;

    router.replace(`/products/${model.id}`, { scroll: false });
  };

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  // A product with no stock number (added from admin) counts as available
  const hasStockInfo = typeof product.stock === "number";
  const inStock = !hasStockInfo || product.stock > 0;

  return (
    <div className="bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="grid md:grid-cols-2">
            {/* Product Image */}
            <ProductGallery key={product.id} product={product} previewSrc={previewSrc} />

            {/* Product Information */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                {product.category}
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>

              {/* Other models: hover to preview, click to open */}
              <ModelSelector
                product={product}
                onSelect={handleSelectModel}
                onPreview={setPreviewSrc}
              />

              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-md bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-700">
                  ⭐ {product.rating}
                </span>
                <span className="text-sm text-gray-500">Customer Rating</span>
              </div>

              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                {product.description ||
                  "Experience high-quality technology designed for everyday use."}
              </p>

              <div className="mt-6 border-y border-gray-200 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Availability</span>
                  <span
                    className={`font-medium ${inStock ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {!inStock
                      ? "Out of stock"
                      : hasStockInfo
                        ? `${product.stock} items in stock`
                        : "In stock"}
                  </span>
                </div>

                {product.brand && (
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-medium text-gray-900">
                      {product.brand}
                    </span>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="flex-1 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() => addWishlist(product)}
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  ♡ Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SimilarProducts
        currentProductId={product.id}
        category={product.category}
      />

      <div className="mx-auto mt-10 w-full max-w-6xl">
        <AddReview productId={product.id} />
        <ReviewList productId={product.id} />
      </div>
    </div>
  );
}