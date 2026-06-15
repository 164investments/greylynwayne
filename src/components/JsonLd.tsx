export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://www.greylynwayne.com/#organization",
    name: "Greylyn Wayne Interior Design & Home Staging",
    alternateName: "Greylyn Wayne",
    url: "https://www.greylynwayne.com",
    logo: "https://www.greylynwayne.com/images/logo-teal.png",
    image: "https://www.greylynwayne.com/images/og-image.png",
    description:
      "Portland's trusted home staging and interior design experts. Founded in 2015, Greylyn Wayne offers professional home staging, interior design, furniture rental, and model home design services throughout Portland, Oregon and surrounding areas.",
    telephone: "+19719300220",
    email: "design@greylynwayne.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1011 SE Oak St",
      addressLocality: "Portland",
      addressRegion: "OR",
      postalCode: "97214",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5152,
      longitude: -122.6784,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Portland",
        containedInPlace: { "@type": "State", name: "Oregon" },
      },
      { "@type": "City", name: "Lake Oswego" },
      { "@type": "City", name: "West Linn" },
      { "@type": "City", name: "Beaverton" },
      { "@type": "City", name: "Happy Valley" },
      { "@type": "City", name: "Bend" },
      { "@type": "City", name: "Hood River" },
      { "@type": "City", name: "Eugene" },
      { "@type": "City", name: "Salem" },
      { "@type": "City", name: "Vancouver", containedInPlace: { "@type": "State", name: "Washington" } },
      { "@type": "City", name: "Camas" },
      { "@type": "City", name: "Cannon Beach" },
      { "@type": "City", name: "Astoria" },
    ],
    founder: {
      "@type": "Person",
      name: "Jody Wallace",
      jobTitle: "Founder & Lead Designer",
    },
    foundingDate: "2015",
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/greylynwayne/",
      "https://www.facebook.com/greylynwayne/",
      "https://www.pinterest.com/greylynwaynepdx/",
      "https://www.tiktok.com/@greylynwayneinteriors",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home Staging & Interior Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Home Staging",
            description:
              "Professional home staging services for residential properties in Portland, Oregon. Occupied staging, vacant staging, luxury staging, and new construction model homes.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior Design",
            description:
              "Full-service interior design in Portland, Oregon. Spatial planning, color consultation, furniture sourcing, and complete room transformations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Furniture Rental",
            description:
              "High-end furniture rental for home staging, model units, and commercial spaces in the Portland metro area.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Short-Term Rental Design",
            description:
              "Airbnb and vacation rental design services to maximize bookings and guest experience.",
          },
        },
      ],
    },
    // Live Google Business Profile numbers (pulled 2026-06-15). Keep in sync
    // with the GBP rating/count — these are the legitimate, verifiable source.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "163",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://www.greylynwayne.com${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `https://www.greylynwayne.com${url}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.greylynwayne.com/#organization",
      name: "Greylyn Wayne",
    },
    areaServed: {
      "@type": "State",
      name: "Oregon",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
