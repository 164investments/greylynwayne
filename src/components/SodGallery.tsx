"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type SodGalleryProps = {
  images: string[];
  title: string;
};

export default function SodGallery({ images, title }: SodGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const show = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => show(i)}
            aria-label={`View ${title} photo ${i + 1}`}
            className="group relative aspect-[4/3] overflow-hidden bg-cream cursor-pointer"
          >
            <Image
              src={src}
              alt={`${title} — Greylyn Wayne Street of Dreams photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors" />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-5 right-5 z-10 text-white/80 hover:text-white text-3xl leading-none w-10 h-10 flex items-center justify-center"
          >
            &times;
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 z-10 text-white/70 hover:text-white text-4xl w-12 h-12 flex items-center justify-center"
          >
            &#8249;
          </button>

          <div
            className="relative w-[92vw] h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${title} — photo ${index + 1} of ${images.length}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 z-10 text-white/70 hover:text-white text-4xl w-12 h-12 flex items-center justify-center"
          >
            &#8250;
          </button>

          <p className="absolute bottom-5 left-0 right-0 text-center text-white/60 text-sm tracking-wider">
            {index + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
