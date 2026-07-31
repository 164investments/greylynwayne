// Blog post content model.
//
// Posts are authored as JSON files in this folder (one per slug) and registered
// in ../blog-posts.ts. Body content is a list of typed blocks so we get clean,
// schema-friendly rendering without a markdown/MDX pipeline. Paragraph, list,
// callout, and quote text support inline markdown-lite: **bold** and
// [label](/internal-path) links (see BlogBody renderer in the [slug] page).

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "callout"; text: string }
  | { type: "quote"; text: string; cite?: string };

export type FAQ = { question: string; answer: string };

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Primary keyword this post targets (for our reference, not rendered). */
  targetKeyword: string;
  category: "Home Staging" | "Interior Design" | "Selling Your Home" | "Trends";
  /** ISO date. */
  date: string;
  updated?: string;
  readMinutes: number;
  heroImage: string;
  heroAlt: string;
  excerpt: string;
  blocks: Block[];
  faqs: FAQ[];
  /** Slugs of related posts shown at the foot of the article. */
  related: string[];
}
