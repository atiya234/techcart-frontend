// "use client";
// import { useState } from "react";
// import ProductCard from "./ProductCard";
// import { products } from "../data/products";
// import Pagination from "./Pagination";


// const ITEMS_PER_PAGE = 4;

// const categories = ["all", "smartphones", "laptops", "tablets", "mobile-accessories"];

// const sortOptions = [
//   { value: "default", label: "Sort by" },
//   { value: "price-low", label: "Price: Low to High" },
//   { value: "price-high", label: "Price: High to Low" },
//   { value: "rating", label: "Top Rated" },
//   { value: "name", label: "Name: A to Z" },
// ];

// const inputStyle =
//   "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black";

// export default function ProductList() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [sort, setSort] = useState("default");
//   const [page , setPage] = useState(1);

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.title
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     const matchesCategory = category === "all" || product.category === category;

//     return matchesSearch && matchesCategory;
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sort === "price-low") return a.price - b.price;
//     if (sort === "price-high") return b.price - a.price;
//     if (sort === "rating") return b.rating - a.rating;
//     if (sort === "name") return a.title.localeCompare(b.title);
//     return 0;
//   });

//   const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
//   const startIndex = (page-1) * ITEMS_PER_PAGE;
//   const paginatedProducts = sortedProducts.slice(
//     startIndex, startIndex + ITEMS_PER_PAGE
//   );

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   }
// const handleCategory = (e) => {
//     setCategory(e.target.value);
//     setPage(1)
// }
// const handleSort = (e) => {
//     setSort(e.target.value);
//     setPage(1);
// }


// const handlePageChange = (newPage) => {
//     setPage(newPage);
//     window.scrollTo({top : 0, behavior:'smooth'});

// };
//   return (
//     <>
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row">
//         <div className="sm:flex-1">
//           <label htmlFor="search" className="sr-only">
//             Search products
//           </label>
//           <input
//             id="search"
//             type="text"
//             value={search}
//             onChange={handleSearch}
//             placeholder="Search products..."
//             className={inputStyle}
//           />
//         </div>

//         <div className="sm:w-48">
//           <label htmlFor="category" className="sr-only">
//             Filter by category
//           </label>
//           <select
//             id="category"
//             value={category}
//             onChange={handleCategory}
//             className={`${inputStyle} capitalize`}
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat === "all" ? "All categories" : cat.replace("-", " ")}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="sm:w-48">
//           <label htmlFor="sort" className="sr-only">
//             Sort products
//           </label>
//           <select
//             id="sort"
//             value={sort}
//             onChange={handleSort}
//             className={inputStyle}
//           >
//             {sortOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {sortedProducts.length === 0 ? (
//         <p className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-600">
//           No products found.
//         </p>
//       ) : (
//         <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
//           {sortedProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}

//       {paginatedProducts.length === 0 ? (
//         <p className="rounded-lg border border-dashed border-gray 300 p-10 text-center text-gray-600">
//             No products found
//         </p>
//       ): (
//         <div>
//             {
//                 paginatedProducts.map((product)=>(
//                     <ProductCard key = {product.id} product={product}/>
//                 ))
//             }
//         </div>
//       )
        
//     }

//       <Pagination
//       currentPage={page} 
//       totalPages={page}
//       onPageChange={handlePageChange}
//       />
//     </>
//   );
// }
// 
// 
"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import Pagination from "./Pagination";

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
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

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
    if (sort === "price-low") {
      return a.price - b.price;
    }

    if (sort === "price-high") {
      return b.price - a.price;
    }

    if (sort === "rating") {
      return b.rating - a.rating;
    }

    if (sort === "name") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(
    sortedProducts.length / ITEMS_PER_PAGE
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Category handler
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  // Sort handler
  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  // Pagination handler
  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Search + Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">

        {/* Search */}
        <div className="sm:flex-1">
          <label htmlFor="search" className="sr-only">
            Search products
          </label>

          <input
            id="search"
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search products..."
            className={inputStyle}
          />
        </div>

        {/* Category */}
        <div className="sm:w-48">
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
                {cat === "all"
                  ? "All Categories"
                  : cat.replace("-", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="sm:w-48">
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
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products */}
      {paginatedProducts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-600">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
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