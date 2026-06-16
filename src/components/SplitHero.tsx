import Image from "next/image";
import type { ReactNode } from "react";
import { HeroProof } from "@/components/Proof";

/**
 * Split editorial hero — real project photo shown whole on one side, text on a
 * cream panel on the other. Keeps the firm's actual photography uncropped while
 * giving the headline/proof/CTAs a clean, legible home. Shared across the
 * homepage, service pages, and city pages so every hero reads as one system.
 *
 * Server component: the "Text Us" button uses [data-open-chat], which SiteTracker
 * delegates to open the ChatWidget — no client hooks needed here.
 */
export default function SplitHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  titleClassName = "text-4xl md:text-5xl lg:text-6xl",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  titleClassName?: string;
}) {
  return (
    <section className="pt-20">
      <div className="flex flex-col lg:flex-row lg:min-h-[640px]">
        {/* Text panel */}
        <div className="lg:w-[45%] bg-cream flex flex-col justify-center px-6 py-11 lg:px-16 lg:py-0 order-2 lg:order-1">
          <p className="text-teal text-sm tracking-[0.3em] uppercase mb-5">
            {eyebrow}
          </p>
          <h1
            className={`font-[family-name:var(--font-playfair)] text-charcoal leading-[1.06] mb-5 ${titleClassName}`}
          >
            {title}
          </h1>
          <p className="text-charcoal-light text-lg leading-relaxed mb-7 max-w-md">
            {subtitle}
          </p>
          <HeroProof />
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              data-open-chat
              className="inline-flex items-center justify-center gap-2 bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors duration-200 text-center font-medium shadow-[0_8px_22px_rgba(107,143,144,0.35)]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              Text Us
            </button>
            <a
              href="tel:9719300220"
              className="inline-flex items-center justify-center gap-2 border border-teal text-teal px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal hover:text-white transition-colors duration-200 text-center font-medium"
            >
              Call (971) 930-0220
            </a>
          </div>
        </div>
        {/* Real project photo */}
        <div className="relative order-1 lg:order-2 lg:flex-1 min-h-[240px] sm:min-h-[360px] lg:min-h-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </div>
    </section>
  );
}
