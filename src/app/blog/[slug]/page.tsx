import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { blogPosts, getPost } from "@/data/blog-posts";
import type { Block } from "@/data/blog/_schema";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FAQJsonLd,
} from "@/components/JsonLd";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://www.greylynwayne.com/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: `https://www.greylynwayne.com/blog/${post.slug}`,
      images: [{ url: "/images/og-image.png", width: 2500, height: 1312 }],
    },
  };
}

// --- markdown-lite: **bold** and [label](/path) -> React nodes ---
function renderInline(text: string, keyPrefix: string) {
  // Split on links first, then bold within each segment.
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last)
      nodes.push(
        <Fragment key={`${keyPrefix}-t${i}`}>{renderBold(text.slice(last, m.index), `${keyPrefix}-b${i}`)}</Fragment>,
      );
    const href = m[2];
    const internal = href.startsWith("/");
    nodes.push(
      internal ? (
        <Link key={`${keyPrefix}-l${i}`} href={href} className="text-teal underline underline-offset-2 hover:text-teal-dark">
          {m[1]}
        </Link>
      ) : (
        <a key={`${keyPrefix}-l${i}`} href={href} className="text-teal underline underline-offset-2 hover:text-teal-dark" rel="noopener">
          {m[1]}
        </a>
      ),
    );
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length)
    nodes.push(<Fragment key={`${keyPrefix}-t${i}`}>{renderBold(text.slice(last), `${keyPrefix}-b${i}`)}</Fragment>);
  return nodes;
}

function renderBold(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-${idx}`} className="font-semibold text-charcoal">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={`${keyPrefix}-${idx}`}>{part}</Fragment>
    ),
  );
}

function BlockView({ block, i }: { block: Block; i: number }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal mt-14 mb-5">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mt-10 mb-3">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc pl-6 space-y-2 mb-6 text-charcoal-light leading-relaxed marker:text-teal">
          {block.items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `b${i}-li${idx}`)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 space-y-2 mb-6 text-charcoal-light leading-relaxed marker:text-teal marker:font-semibold">
          {block.items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `b${i}-oli${idx}`)}</li>
          ))}
        </ol>
      );
    case "image":
      return (
        <figure className="my-10">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-cream">
            <Image src={block.src} alt={block.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-charcoal-light italic">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <div className="my-8 border-l-4 border-teal bg-teal-bg/60 px-6 py-5 text-charcoal-light leading-relaxed">
          {renderInline(block.text, `b${i}-callout`)}
        </div>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-teal pl-6">
          <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-charcoal leading-snug italic">
            “{block.text}”
          </p>
          {block.cite && <cite className="mt-3 block text-sm not-italic text-charcoal-light">— {block.cite}</cite>}
        </blockquote>
      );
    default:
      return (
        <p className="mb-6 text-charcoal-light leading-[1.8] text-[1.0625rem]">
          {renderInline(block.text, `b${i}-p`)}
        </p>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.related
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  const prettyDate = new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      {post.faqs.length > 0 && <FAQJsonLd faqs={post.faqs} />}

      <article className="pt-20">
        {/* Header */}
        <header className="mx-auto max-w-3xl px-6 lg:px-8 pt-16 pb-10 text-center">
          <p className="text-teal text-xs tracking-[0.25em] uppercase mb-4">{post.category}</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-charcoal-light text-sm">
            By Greylyn Wayne · {prettyDate} · {post.readMinutes} min read
          </p>
        </header>

        {/* Hero image */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-cream">
            <Image src={post.heroImage} alt={post.heroAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-14">
          <p className="text-lg text-charcoal leading-relaxed mb-10 font-[family-name:var(--font-playfair)]">
            {post.excerpt}
          </p>
          {post.blocks.map((block, i) => (
            <BlockView key={i} block={block} i={i} />
          ))}

          {/* FAQ section */}
          {post.faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-7">
                {post.faqs.map((f, idx) => (
                  <div key={idx}>
                    <h3 className="text-charcoal font-semibold mb-2">{f.question}</h3>
                    <p className="text-charcoal-light leading-relaxed">{renderInline(f.answer, `faq${idx}`)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* CTA */}
        <section className="bg-warm py-20 text-center">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-5">
              Thinking About Staging or a Redesign?
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-9">
              Greylyn Wayne has staged 2,500+ Portland-area homes and earned 4.9★ across 163 reviews.
              Tell us about your project — the consultation is free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-block bg-teal text-white px-9 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium">
                Get Your Free Consultation
              </Link>
              <a href="tel:+19719300220" className="inline-block border border-teal text-teal px-9 py-4 text-sm tracking-wider uppercase hover:bg-teal-bg transition-colors font-medium">
                Call (971) 930-0220
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal mb-10 text-center">
              Keep Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-cream mb-4">
                    <Image src={r.heroImage} alt={r.heroAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 380px" />
                  </div>
                  <p className="text-teal text-xs tracking-[0.2em] uppercase mb-2">{r.category}</p>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg text-charcoal group-hover:text-teal transition-colors">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
