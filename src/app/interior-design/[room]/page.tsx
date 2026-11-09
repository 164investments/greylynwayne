import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, FAQJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import SplitHero from "@/components/SplitHero";
import RoomPlan from "@/components/RoomPlan";
import { getRoomBySlug, roomPages } from "@/data/rooms";
import { renderInline, stripInline } from "@/lib/inline";

export const dynamicParams = false;

export function generateStaticParams() {
  return roomPages.map((r) => ({ room: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ room: string }>;
}): Promise<Metadata> {
  const { room: slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  const url = `https://www.greylynwayne.com/interior-design/${room.slug}`;
  return {
    title: { absolute: room.metaTitle },
    description: room.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: room.metaTitle,
      description: room.metaDescription,
      url,
      images: [{ url: room.hero.src }],
    },
  };
}

// Restated from the /interior-design process so every room page tells it the same way.
const steps = [
  { step: "01", title: "Free discovery call", desc: "We learn how you live and walk through the room." },
  { step: "02", title: "Design and present", desc: "Plans, materials and lighting, before anything changes." },
  { step: "03", title: "Bring it to life", desc: "We source, install and style." },
];

// Phones: label on its own line above the value; sm+: inline before it.
const label = "block mb-0.5 sm:inline sm:mb-0 sm:mr-2 text-charcoal-light text-xs tracking-wider uppercase";
// Body links: charcoal text with a teal underline (teal text is under 4.5:1 at body size).
const link = "text-charcoal underline decoration-teal underline-offset-2 hover:decoration-charcoal";
const count = ["", "a", "two", "three", "four"];
const h2 = "font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal";

export default async function RoomPage({ params }: { params: Promise<{ room: string }> }) {
  const { room: slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();
  const path = `/interior-design/${room.slug}`;
  const others = roomPages.filter((r) => r.slug !== room.slug);
  // Jody Wallace was lead interior designer on all four Street of Dreams homes;
  // claim only the ones this room's photos actually show.
  const sod = new Set(room.photos.flatMap((p) => p.src.match(/\/images\/sod\/([^/]+)\//)?.[1] ?? []));
  const sodLine = sod.size
    ? `Including ${count[sod.size]} Street of Dreams ${sod.size > 1 ? "homes" : "home"} Jody\u00a0Wallace designed.`
    : "";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Interior Design", href: "/interior-design" },
          { name: room.title, href: path },
        ]}
      />
      <ServiceJsonLd name={`${room.title}, Oregon`} description={room.metaDescription} url={path} />
      <FAQJsonLd faqs={room.faqs.map((f) => ({ question: f.question, answer: stripInline(f.answer) }))} />

      <SplitHero
        compact
        title={room.title}
        subtitle={room.answer}
        imageSrc={room.hero.src}
        imageAlt={room.hero.alt}
        mobileImageClass="h-[310px] sm:h-auto sm:min-h-[360px]"
      />

      {/* Picks */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className={`${h2} mb-12 text-center`}>{room.picks.heading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {room.picks.items.map((p) => (
              <div key={p.name} className="border border-gray-200 p-6 lg:p-8">
                {p.plan && <RoomPlan kind={p.plan} className="w-28 h-auto mb-5" />}
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-3">{p.name}</h3>
                <p className="text-charcoal-light text-lg leading-relaxed">
                  <span className={label}>Best for</span>
                  {p.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers + illustration */}
      <section className="py-24 lg:py-32 bg-warm">
        <div
          className={
            room.art.alt
              ? "mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              : "mx-auto max-w-3xl px-6 lg:px-8"
          }
        >
          <div>
            <h2 className={`${h2} mb-8`}>{room.numbers.heading}</h2>
            <table className="w-full text-left">
              <tbody className="block sm:table-row-group">
                {room.numbers.rows.map((r) => (
                  <tr key={r.label} className="block sm:table-row border-b border-charcoal/10 align-top py-3 sm:py-0">
                    <th scope="row" className="block sm:table-cell sm:py-3 sm:pr-4 font-normal text-base sm:text-lg text-charcoal-light">{r.label}</th>
                    <td className="block sm:table-cell pt-0.5 sm:py-3 text-lg text-charcoal whitespace-nowrap">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-charcoal-light mt-4">
              {room.numbers.sources.length > 1 ? "Sources: " : "Source: "}
              {room.numbers.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && "; "}
                  <a href={s.url} className={link} rel="noopener" target="_blank">
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
          {room.art.alt && (
            <figure>
              <Image
                src={room.art.src}
                alt={room.art.alt}
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto"
              />
              <figcaption className="text-sm text-charcoal-light mt-3">{room.art.caption}</figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* Real project photos */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className={`${h2} mb-4 text-center`}>From Our Projects</h2>
          {sodLine && <p className="text-charcoal-light text-lg text-center max-w-2xl mx-auto text-balance">{sodLine}</p>}
          <div className="mb-12" />
          {/* Grid follows the photo count so no row is left half empty. */}
          <div
            className={`grid grid-cols-1 gap-8 ${
              room.photos.length % 3 === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 max-w-5xl mx-auto"
            }`}
          >
            {room.photos.map((p) => (
              <Link key={p.src} href={p.href} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
                <p className="text-sm text-charcoal-light leading-relaxed mt-3 group-hover:text-teal transition-colors">{p.caption}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32 bg-teal-light">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className={`${h2} mb-12 text-center`}>How It Works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <li key={s.step} className="text-center">
                <div className="font-[family-name:var(--font-playfair)] text-5xl text-charcoal-light mb-3" aria-hidden="true">{s.step}</div>
                <h3 className="text-charcoal text-xl mb-2">{s.title}</h3>
                <p className="text-charcoal text-lg leading-relaxed text-balance">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className={`${h2} mb-10 text-center`}>{room.room} Design Questions</h2>
          <div className="space-y-8">
            {room.faqs.map((f, i) => (
              <div key={f.question} className="border-b border-gray-200 pb-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3 text-balance">{f.question}</h3>
                <p className="text-charcoal-light text-lg leading-relaxed">{renderInline(f.answer, `faq${i}`, link)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other rooms */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className={`${h2} mb-8`}>Other Rooms We Design</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {others.map((r) => (
              <Link key={r.slug} href={`/interior-design/${r.slug}`} className="px-5 py-2.5 border border-teal/30 text-charcoal-light hover:border-teal hover:text-teal transition-colors">
                {r.room}
              </Link>
            ))}
            <Link href="/interior-design" className="px-5 py-2.5 border border-teal text-charcoal hover:bg-teal hover:text-white transition-colors">
              All Interior Design
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-warm text-center">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <h2 className={`${h2} mb-6`}>Let&apos;s Plan Your {room.room}</h2>
          <p className="text-charcoal-light leading-relaxed mb-10">Send a few photos and tell us how you use the room. The discovery call is free.</p>
          <button
            type="button"
            data-open-chat
            className="bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Text Us About Your {room.room}
          </button>
        </div>
      </section>
    </>
  );
}
