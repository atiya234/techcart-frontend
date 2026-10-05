"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, updateProduct } from "@/services/productService";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((data) => {
        setOriginal(data);

        // Turn the saved list back into text for the form
        const savedImages = data.images || [];

        setForm({
          title: data.title || "",
          category: data.category || "",
          image: data.image || data.thumbnail || "",
          moreImages: savedImages.slice(1).join("\n"),
          video: data.video || "",
          price: data.price ?? "",
          rating: data.rating ?? "",
        });
      })
      .catch((error) => {
        console.log("ERROR:", error);
        setMessage("Could not load this product.");
      });
  }, [id]);

  const changeData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setSaving(true);

    // One link per line becomes a list again. The main image goes first.
    const extraImages = form.moreImages
      .split("\n")
      .map((link) => link.trim())
      .filter((link) => link !== "");

    const images = [form.image.trim(), ...extraImages].filter(Boolean);

    try {
      await updateProduct(id, {
        ...original,
        title: form.title,
        category: form.category,
        image: form.image.trim(),
        images: images,
        video: form.video.trim(),
        price: Number(form.price),
        rating: Number(form.rating),
      });

      router.push("/admin/products");
    } catch (error) {
      console.log("ERROR:", error);
      setMessage("Could not update the product. Is the server running?");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black sm:px-4 sm:py-2 sm:text-base";

  if (!form) {
    return (
      <p
        role="status"
        className="p-4 text-sm text-gray-600 sm:p-6 sm:text-base"
      >
        {message || "Loading..."}
      </p>
    );
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8">

      <h1 className="text-xl font-bold sm:text-2xl">
        Edit Product
      </h1>

      <form onSubmit={submitHandler}>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={changeData}
            placeholder="Product name"
            aria-label="Product name"
            required
            className={inputStyle}
          />

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={changeData}
            placeholder="Category"
            aria-label="Category"
            required
            className={inputStyle}
          />

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={changeData}
            placeholder="Main image link (front)"
            aria-label="Main image link"
            className={`${inputStyle} sm:col-span-2`}
          />

          <textarea
            name="moreImages"
            value={form.moreImages}
            onChange={changeData}
            placeholder={
              "More image links, one per line\n(back, side, camera...)"
            }
            aria-label="More image links, one per line"
            rows={4}
            className={`${inputStyle} resize-y sm:col-span-2`}
          />

          <input
            type="text"
            name="video"
            value={form.video}
            onChange={changeData}
            placeholder="Video link (optional)"
            aria-label="Video link"
            className={`${inputStyle} sm:col-span-2`}
          />

          <input
            type="number"
            name="price"
            value={form.price}
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
            value={form.rating}
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
          className="mt-4 w-full rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-6 sm:w-auto"
        >
          {saving ? "Saving..." : "Update Product"}
        </button>

        {message && (
          <p
            role="alert"
            className="mt-4 text-sm leading-5 text-red-600"
          >
            {message}
          </p>
        )}

      </form>
    </div>
  );
}