"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

import Pagination from "./Pagination";
import { getProducts } from "@/services/productService";

const ITEMS_PER_PAGE = 4;

const categories = [
  "all",
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
];

const sortOptions = [
  { value: "default", label: "Sort by" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A to Z" },
];

const inputStyle =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:px-4 sm:py-2.5 focus:border-black focus:outline-none focus:ring-2 focus:ring-black";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [listening, setListening] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        console.log(error);
      });
  });

  // Voice search
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
//here we are taking from the brower speechRecognition api...its available in some available hota haiok\\
    if (!SpeechRecognition) {
      alert(
        "Voice search is not supported in this browser. Try Chrome or Edge."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript.replace(/[.,!?]$/, ""));
      setPage(1);
    };

    recognition.start();
  };

  // Search + Category filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "name") return a.title.localeCompare(b.title);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Search + Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:gap-4 md:flex-row">

        {/* Search */}
        <div className="relative sm:flex-1">
          <label htmlFor="search" className="sr-only">
            Search products
          </label>

          <input
            id="search"
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search products..."
            className={`${inputStyle} pr-12`}
          />

          <button
            type="button"
            onClick={handleVoiceSearch}
            aria-label="Search by voice"
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-lg transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              listening ? "animate-pulse bg-red-100" : ""
            }`}
          >
            🎤
          </button>
        </div>

        {/* Category */}
        <div className="w-full md:w-48">
          <label htmlFor="category" className="sr-only">
            Filter by category
          </label>

          <select
            id="category"
            value={category}
            onChange={handleCategory}
            className={`${inputStyle} capitalize`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat.replace("-", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="w-full md:w-48">
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>

          <select
            id="sort"
            value={sort}
            onChange={handleSort}
            className={inputStyle}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products */}
      {paginatedProducts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600 sm:p-10 sm:text-base">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}