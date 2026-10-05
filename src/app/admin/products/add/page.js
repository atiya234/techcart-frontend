"use client";

import { useState } from "react";
import { addProduct } from "@/services/productService";

const emptyProduct = {
  title: "",
  category: "",
  image: "",
  moreImages: "",
  video: "",
  price: "",
  rating: "",
};

export default function AddProductPage() {
  const [product, setProduct] = useState(emptyProduct);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const changeData = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setSaving(true);

    // One link per line becomes a list. The main image goes first.
    const extraImages = product.moreImages
      .split("\n")
      .map((link) => link.trim())
      .filter((link) => link !== "");

    const images = [product.image.trim(), ...extraImages].filter(Boolean);

    try {
      await addProduct({
        title: product.title,
        category: product.category,
        image: product.image.trim(),
        images: images,
        video: product.video.trim(),
        price: Number(product.price),
        rating: Number(product.rating),
      });

      setMessage("Product added successfully.");
      setProduct(emptyProduct);
    } catch (error) {
      console.log("ERROR:", error);
      setMessage("Could not add the product. Is the server running?");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:px-4 sm:py-2 sm:text-base";

  return (
    <div className="mt-4 w-full rounded-xl border border-gray-200 bg-white p-4 sm:mt-6 sm:p-6 md:p-8">

      <h2 className="text-lg font-semibold sm:text-xl">
        Add New Product
      </h2>

      <form onSubmit={submitHandler}>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

          <input
            type="text"
            name="title"
            value={product.title}
            onChange={changeData}
            placeholder="Product name"
            aria-label="Product name"
            required
            className={inputStyle}
          />

          <input
            type="text"
            name="category"
            value={product.category}
            onChange={changeData}
            placeholder="Category"
            aria-label="Category"
            required
            className={inputStyle}
          />

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={changeData}
            placeholder="Main image link (front)"
            aria-label="Main image link"
            className={`${inputStyle} sm:col-span-2`}
          />

          <textarea
            name="moreImages"
            value={product.moreImages}
            onChange={changeData}
            placeholder={"More image links, one per line\n(back, side, camera...)"}
            aria-label="More image links, one per line"
            rows={4}
            className={`${inputStyle} sm:col-span-2 resize-y`}
          />

          <input
            type="text"
            name="video"
            value={product.video}
            onChange={changeData}
            placeholder="Video link (optional)"
            aria-label="Video link"
            className={`${inputStyle} sm:col-span-2`}
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={changeData}
            placeholder="Price"
            aria-label="Price"
            min="0"
            step="0.01"
            required
            className={inputStyle}
          />

          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={changeData}
            placeholder="Rating (0 to 5)"
            aria-label="Rating"
            min="0"
            max="5"
            step="0.1"
            className={inputStyle}
          />

        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-4 w-full rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-5 sm:w-auto"
        >
          {saving ? "Adding..." : "Add Product"}
        </button>

        {message && (
          <p
            role="status"
            className="mt-4 text-sm leading-5 text-gray-700"
          >
            {message}
          </p>
        )}

      </form>
    </div>
  );
}