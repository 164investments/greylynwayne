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

export function ArticleJsonLd({
  post,
}: {
  post: {
    slug: string;
    title: string;
    metaDescription: string;
    date: string;
    updated?: string;
    heroImage: string;
  };
}) {
  const url = `https://www.greylynwayne.com/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `https://www.greylynwayne.com${post.heroImage}`,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: {
      "@type": "Organization",
      name: "Greylyn Wayne",
      url: "https://www.greylynwayne.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.greylynwayne.com/#organization",
      name: "Greylyn Wayne",
      logo: {
        "@type": "ImageObject",
        url: "https://www.greylynwayne.com/images/logo-teal.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JobPostingJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Principal Staging Designer",
    description:
      "Lead Greylyn Wayne staging projects from walkthrough through completion, setting the design vision, directing the crew, and taking ownership of each home's final presentation.",
    identifier: {
      "@type": "PropertyValue",
      name: "Greylyn Wayne",
      value: "principal-staging-designer-2026",
    },
    datePosted: "2026-07-10",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      "@id": "https://www.greylynwayne.com/#organization",
      name: "Greylyn Wayne",
      sameAs: "https://www.greylynwayne.com",
      logo: "https://www.greylynwayne.com/images/logo-teal.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1011 SE Oak St",
        addressLocality: "Portland",
        addressRegion: "OR",
        postalCode: "97214",
        addressCountry: "US",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: 23,
        maxValue: 28,
        unitText: "HOUR",
      },
    },
    educationRequirements: "High school diploma",
    experienceRequirements:
      "One to three years of home staging experience preferred; small-team leadership experience preferred.",
    qualifications:
      "Valid driver's license and reliable transportation required.",
    jobBenefits:
      "Use of a company vehicle during shifts and an employee discount after 90 days.",
    url: "https://www.greylynwayne.com/careers#principal-staging-designer",
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
    // Include Portland (city) alongside the state so page-level Service schema
    // matches the localized "portland interior designer" queries these pages
    // actually rank for — a bare State:Oregon under-signals the locality.
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
      { "@type": "City", name: "Vancouver", containedInPlace: { "@type": "State", name: "Washington" } },
      { "@type": "State", name: "Oregon" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
