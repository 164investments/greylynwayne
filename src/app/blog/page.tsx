import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Home Staging & Interior Design Blog | Greylyn Wayne Portland",
  description:
    "Expert home staging and interior design advice from Portland's most-reviewed staging team — staging costs, ROI, design trends, and room-by-room guides.",
  alternates: { canonical: "https://www.greylynwayne.com/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-12">
          <div className="text-center">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Insights & Inspiration
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              The Greylyn Wayne Journal
            </h1>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
              Practical advice on home staging, interior design, and selling for
              more — from the team behind 2,500+ staged Portland-area homes.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-cream">
              <Image src={featured.heroImage} alt={featured.heroAlt} fill priority className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 600px" />
            </div>
            <div>
              <p className="text-teal text-xs tracking-[0.2em] uppercase mb-3">
                Featured · {featured.category}
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-4 group-hover:text-teal transition-colors">
                {featured.title}
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-5">{featured.excerpt}</p>
              <span className="text-teal text-sm tracking-wider uppercase font-medium">
                Read the guide →
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-cream mb-4">
                  <Image src={post.heroImage} alt={post.heroAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 380px" />
                </div>
                <p className="text-teal text-xs tracking-[0.2em] uppercase mb-2">{post.category}</p>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-2 group-hover:text-teal transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-charcoal-light text-sm leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-warm text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-10">
            Whether you&apos;re preparing to sell or redesigning for the way you
            live, we&apos;d love to help. The consultation is free.
          </p>
          <Link href="/contact" className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium">
            Get Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
