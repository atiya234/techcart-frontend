"use client";

import { useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

// Turn a normal YouTube link into an embeddable one.
const getVideoInfo = (link) => {
  if (!link) return null;

  const youtube = link.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );

  if (youtube) {
    return {
      type: "youtube",
      src: `https://www.youtube.com/embed/${youtube[1]}`,
    };
  }

  return { type: "file", src: link };
};

export default function ProductGallery({ product, previewSrc }) {
  const images = (
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail || product.image]
  ).filter(Boolean);

  const video = getVideoInfo(product.video);

  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState("50% 50%");
  const [showVideo, setShowVideo] = useState(false);

  if (images.length === 0 && !video) {
    return (
      <div className="flex min-h-[280px] items-center justify-center bg-gray-100 text-sm text-gray-400 sm:min-h-[350px] lg:min-h-[450px]">
        No Image Available
      </div>
    );
  }

  const changeImage = (index) => {
    setShowVideo(false);
    setCurrent(index);
    setZoom(1);
    setOrigin("50% 50%");
  };

  const goPrevious = () =>
    changeImage((current - 1 + images.length) % images.length);

  const goNext = () => changeImage((current + 1) % images.length);

  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));

  const zoomOut = () => setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));

  const resetZoom = () => {
    setZoom(1);
    setOrigin("50% 50%");
  };

  const toggleZoom = () => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      resetZoom();
    }
  };

  const handleMouseMove = (e) => {
    if (zoom === 1) return;

    const box = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;

    setOrigin(`${x}% ${y}%`);
  };

  const controlStyle =
    "rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white transition hover:bg-black sm:px-3 sm:py-1.5 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-40";

  const hasThumbnails = images.length > 1 || video;

  return (
    <div className="w-full bg-gray-100 p-3 sm:p-4 lg:p-6">
      {/* Main area */}
      <div className="relative">
        {showVideo && video && !previewSrc ? (
          /* Video */
          <div className="flex h-[280px] w-full items-center justify-center overflow-hidden rounded-lg bg-black sm:h-[360px] md:h-[420px] lg:h-[480px]">
            {video.type === "youtube" ? (
              <iframe
                src={video.src}
                title={`${product.title} video`}
                className="h-full w-full"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={video.src}
                controls
                className="h-full w-full object-contain"
              >
                Your browser does not support video.
              </video>
            )}
          </div>
        ) : (
          <>
            {/* Image */}
            <div
              onClick={toggleZoom}
              onMouseMove={handleMouseMove}
              className={`flex h-[280px] w-full items-center justify-center overflow-hidden rounded-lg bg-white sm:h-[360px] md:h-[420px] lg:h-[480px] ${
                zoom === 1 ? "cursor-zoom-in" : "cursor-zoom-out"
              }`}
            >
              <img
                src={previewSrc || images[current]}
                alt={`${product.title} (image ${current + 1} of ${images.length})`}
                className="max-h-full max-w-full object-contain p-2 transition-transform duration-200 sm:p-4"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: origin,
                }}
                draggable="false"
              />
            </div>

            {/* Previous */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous image"
                className={`absolute left-2 top-1/2 -translate-y-1/2 text-lg sm:left-3 ${controlStyle}`}
              >
                ‹
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className={`absolute right-2 top-1/2 -translate-y-1/2 text-lg sm:right-3 ${controlStyle}`}
              >
                ›
              </button>
            )}

            {/* Zoom controls */}
            <div className="absolute bottom-2 right-2 flex max-w-[calc(100%-1rem)] items-center gap-1 sm:bottom-3 sm:right-3 sm:gap-2">
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoom === MIN_ZOOM}
                aria-label="Zoom out"
                className={controlStyle}
              >
                −
              </button>

              <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] text-white sm:px-2 sm:py-1.5 sm:text-xs">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={zoomIn}
                disabled={zoom === MAX_ZOOM}
                aria-label="Zoom in"
                className={controlStyle}
              >
                +
              </button>

              <button
                type="button"
                onClick={resetZoom}
                disabled={zoom === MIN_ZOOM}
                aria-label="Reset zoom"
                className={controlStyle}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasThumbnails && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2 sm:gap-3">
          {images.map((src, index) => (
            <button
              key={src + index}
              type="button"
              onClick={() => changeImage(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={
                !showVideo && index === current ? "true" : undefined
              }
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 bg-white transition sm:h-16 sm:w-16 ${
                !showVideo && index === current
                  ? "border-black"
                  : "border-transparent opacity-70 hover:opacity-100"
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-black`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-contain"
              />
            </button>
          ))}

          {/* Video thumbnail */}
          {video && (
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              aria-label="Play product video"
              aria-current={showVideo ? "true" : undefined}
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-md border-2 bg-black text-lg text-white transition sm:h-16 sm:w-16 sm:text-xl ${
                showVideo
                  ? "border-white ring-2 ring-black"
                  : "border-transparent opacity-70 hover:opacity-100"
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-black`}
            >
              ▶
            </button>
          )}
        </div>
      )}
    </div>
  );
}