
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    tag: "New arrivals",
    title: "The latest smartphones, all in one place",
    text: "Flagship power, all-day battery and stunning cameras at prices that make sense.",
    href: "/products?category=smartphones",
    cta: "Shop Phones",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQQRucPks856TMg_MibH3QTWCzpC7u7SSZLaG-m7bqY1z_sCStEBAYJFCJuD-Edetu7pTPj6bYXZR7Ld_RrlJi4zZy7HvfjeH0rKoAaRXmVm7MSc8APVv-OyVE",
  },
  {
    id: 2,
    tag: "Limited offer",
    title: "10% off on orders above $1000",
    text: "Upgrade your setup with powerful laptops built for work, study and play.",
    href: "/products?category=laptops",
    cta: "Shop Laptops",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRK9jSXFheOMrKHuOluNCDa4J7yTrPgedQCBneWyOTP7O8HnuqXYuMMf-HcI7UmbhU9R4Hv0FqgTFmNC__HVkYqApek_t0C",
  },
  {
    id: 3,
    tag: "Free delivery",
    title: "Free delivery on orders above $500",
    text: "Tablets, accessories and more, delivered straight to your door.",
    href: "/products",
    cta: "Browse All",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpp1MAh93EnoRH3ma7jz0jGe68uAB5Dkx88W-oXxWJdUHuGhY8WikJtLSXQyz8Qneq5ClhYxgzHliI4BAD4VpXJNj476kfzy6qyOUH4dgq68Cq_MdS7PNYsHs",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  // Auto slide
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Touch / swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const difference =
      e.changedTouches[0].clientX - touchStartX.current;

    if (difference > 50) {
      goToPrevious();
    }

    if (difference < -50) {
      goToNext();
    }

    touchStartX.current = null;
  };

  const arrowStyle =
    "absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-xl text-gray-900 shadow-sm transition hover:border-black hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black sm:flex md:h-11 md:w-11";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden border-b border-gray-200 bg-white text-gray-900"
    >
      {/* Sliding track */}
      <div
        className="flex w-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={index !== current}
            className="w-full shrink-0"
          >
            {/* Slide content */}
            <div className="mx-auto grid min-h-[600px] w-full max-w-7xl grid-cols-1 items-center gap-6 px-5 py-10 sm:min-h-[620px] sm:px-8 sm:py-12 md:min-h-[540px] md:grid-cols-2 md:gap-8 md:px-10 md:py-14 lg:min-h-[560px] lg:gap-12 lg:px-12 xl:px-16">

              {/* Text */}
              <div className="text-center md:text-left">

                <p className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-xs md:justify-start">
                  <span
                    className="hidden h-px w-8 bg-gray-400 sm:block"
                    aria-hidden="true"
                  />

                  {slide.tag}
                </p>

                <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:mt-6 md:text-4xl lg:text-5xl xl:text-6xl">
                  {slide.title}
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 md:mx-0 md:text-lg">
                  {slide.text}
                </p>

                <Link
                  href={slide.href}
                  tabIndex={index === current ? 0 : -1}
                  className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:mt-8 sm:px-7 sm:py-3.5"
                >
                  {slide.cta}
                </Link>

              </div>

              {/* Product Image */}
              <div className="flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-52 w-full max-w-xs object-contain sm:h-64 sm:max-w-sm md:h-80 md:max-w-md lg:h-96"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Previous */}
      <button
        type="button"
        onClick={goToPrevious}
        aria-label="Previous slide"
        className={`left-2 ${arrowStyle} md:left-4`}
      >
        ‹
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className={`right-2 ${arrowStyle} md:right-4`}
      >
        ›
      </button>

      {/* Counter */}
      <p
        className="absolute bottom-5 right-5 hidden text-xs font-medium tracking-widest text-gray-400 md:block"
        aria-hidden="true"
      >
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </p>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current ? "true" : undefined}
            className={`h-2 rounded-full bg-gray-900 transition-all duration-300 ${
              index === current
                ? "w-7"
                : "w-2 opacity-25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
