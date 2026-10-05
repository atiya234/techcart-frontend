
"use client";

import { useState } from "react";
import axios from 'axios'

export default function AddReview({ productId }) {
  const [review, setReview] = useState({
    productId: productId,
    name: "",
    rating: "",
    comment: "",
  });

  const changeData = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  console.log("Product ID:", productId);



const submitHandler = (e) => {
  e.preventDefault();

  axios
    .post("http://localhost:5000/reviews", review)
    .then((res) => {
      console.log("REVIEW ADDED:", res.data);

      setReview({
        productId: productId,
        name: "",
        rating: "",
        comment: "",
      });
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};



  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      
      <h3 className="text-2xl font-bold text-gray-900">
        Write a Review
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Share your experience with this product.
      </p>

      <form onSubmit={submitHandler} className="mt-6 space-y-5">

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={review.name}
            onChange={changeData}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Rating
          </label>

          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            placeholder="Give a rating from 1 to 5"
            value={review.rating}
            onChange={changeData}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your Review
          </label>

          <textarea
            name="comment"
            rows="5"
            placeholder="Write your review..."
            value={review.comment}
            onChange={changeData}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
        >
          Submit Review
        </button>

      </form>
    </div>
  );
}
