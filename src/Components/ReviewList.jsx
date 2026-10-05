"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/reviews")
      .then((res) => {
        const exist = res.data.filter(
          (r) => String(r.productId) === String(productId)
        );

        setReviews(exist);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, [productId]);

  console.log("CURRENT PRODUCT ID:", productId);
  console.log("FILTERED REVIEWS:", reviews);

  return (
    <div className="mt-8 sm:mt-10">

      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500 sm:mt-4 sm:text-base">
          Be the first to review this product.
        </p>
      ) : (
        <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:rounded-xl sm:p-5"
            >

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <h3 className="min-w-0 break-words text-sm font-semibold text-gray-900 sm:text-base">
                  {review.name}
                </h3>

                <span className="shrink-0 text-xs font-medium sm:text-sm">
                  ⭐ {review.rating}/5
                </span>

              </div>

              <p className="mt-3 break-words text-sm leading-6 text-gray-600 sm:text-base">
                {review.comment}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}