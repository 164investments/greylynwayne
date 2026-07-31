export type CityFAQ = { question: string; answer: string };

export type CityData = {
  slug: string;
  name: string;
  state: string;
  stateShort: string;
  region: string;
  /**
   * Which staging-portfolio region to pull nearby listings from when we have no
   * staged homes in the city itself. `null` = a far region with no metro listings
   * nearby, so the page falls back to the portfolio's standout sales (labeled honestly).
   */
  stagingRegion:
    | "Portland"
    | "Westside & Valley"
    | "East & Clackamas"
    | "SW Washington"
    | null;
  /** Per-city hero (GW's own optimized imagery, varied by market character). */
  heroImage: string;
  heroAlt: string;
  /** Unique intro paragraph (hero subtitle). */
  description: string;
  /** Unique paragraph on the local market, buyers, and home styles. Replaces the old boilerplate. */
  marketNote: string;
  /** Real neighborhoods/areas we serve in this city. */
  neighborhoods: string[];
  highlights: string[];
  nearby: string[];
  /** City-specific FAQ — questions and answers both vary by market. */
  faqs: CityFAQ[];
};

export const cities: CityData[] = [
  // ─────────────────────────── Portland Metro ───────────────────────────
  {
    slug: "portland",
    name: "Portland",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Portland",
    heroImage: "/images/portland-home-staging-living-room.webp",
    heroAlt: "Professionally staged Portland living room with warm, modern furnishings by Greylyn Wayne",
    description:
      "As Portland's home base for staging and interior design, Greylyn Wayne has transformed hundreds of properties across the city since 2015. From Pearl District lofts to Laurelhurst Craftsmans, we know how Portland buyers think — and we stage to sell.",
    marketNote:
      "Portland is a neighborhood city, and buyers shop by neighborhood character as much as by square footage. A 1912 Alameda Craftsman, a Pearl District concrete loft, and a new Sellwood infill home each speak to a different buyer — so we tailor the staging story to the property rather than applying one generic look. Our SE Portland warehouse keeps inventory minutes from most listings, which means fast installs even on tight contingency timelines.",
    neighborhoods: [
      "Pearl District",
      "Laurelhurst",
      "Alameda & Irvington",
      "Sellwood-Moreland",
      "Alberta Arts",
      "Eastmoreland",
      "Hawthorne & Mt. Tabor",
      "Northwest / Nob Hill",
    ],
    highlights: [
      "Staging for Portland's mix of Craftsman, Mid-Century, and contemporary homes",
      "Deep knowledge of Portland's neighborhood-specific buyer demographics",
      "Warehouse and inventory located in SE Portland for fast turnarounds",
      "Trusted by Portland's top-producing real estate agents",
    ],
    nearby: ["Lake Oswego", "Beaverton", "Milwaukie", "Gresham", "Tigard"],
    faqs: [
      {
        question: "How much does home staging cost in Portland?",
        answer:
          "Most Portland staging projects range from about $2,500 to $8,000+, depending on square footage, the number of rooms staged, and how long the home is on the market. A compact Hawthorne bungalow costs far less than a four-bedroom Alameda Craftsman. We give every Portland seller a free, no-obligation quote specific to the property — (971) 930-0220.",
      },
      {
        question: "Do you stage homes in my Portland neighborhood?",
        answer:
          "Almost certainly. We stage across Portland — the Pearl District, Laurelhurst, Alameda, Irvington, Sellwood, Alberta, Eastmoreland, Hawthorne, Mt. Tabor, and the Northwest/Nob Hill area — and our SE Portland warehouse keeps us close to all of them. If you're elsewhere in the city, just ask.",
      },
      {
        question: "Should I stage a vacant home or an occupied one?",
        answer:
          "We do both. Vacant Portland listings benefit most from full staging — empty rooms photograph cold and read smaller online. For occupied homes, we offer staging consultations and partial staging that work with what you already own. We'll recommend the right approach during your walkthrough.",
      },
      {
        question: "How quickly can you stage a Portland listing?",
        answer:
          "Typically within 5–7 business days of your consultation, and often faster — our inventory is warehoused right here in SE Portland. Rush staging is available when you're racing a listing deadline.",
      },
    ],
  },
  {
    slug: "lake-oswego",
    name: "Lake Oswego",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/street-of-dreams.webp",
    heroAlt: "Luxury staged interior in Lake Oswego by Greylyn Wayne, a four-time Street of Dreams featured designer",
    description:
      "Lake Oswego's luxury market demands exceptional presentation. Greylyn Wayne specializes in high-end Lake Oswego staging — from lakefront estates to First Addition bungalows — with furnishings and design that match the area's discerning buyers.",
    marketNote:
      "Lake Oswego buyers expect a level of finish that off-the-shelf staging can't deliver. As a four-time NW Natural Street of Dreams featured designer, we bring genuinely high-end inventory and a designer's eye to LO listings — the difference between a home that photographs as nice and one that photographs as aspirational. In a market where a single weekend on the wrong side of a price band costs real money, presentation does heavy lifting.",
    neighborhoods: [
      "First Addition",
      "Old Town",
      "Lake Grove",
      "Country Club / North Shore",
      "Forest Highlands",
      "Mountain Park",
    ],
    highlights: [
      "Luxury staging tailored to Lake Oswego's upscale market",
      "Experience with lakefront, First Addition, and Country Club homes",
      "Premium furnishings that match the expectations of luxury buyers",
      "Consistent track record of faster sales and higher offers in LO",
    ],
    nearby: ["West Linn", "Portland", "Tigard", "Tualatin", "Milwaukie"],
    faqs: [
      {
        question: "Is your staging inventory nice enough for a luxury Lake Oswego home?",
        answer:
          "Yes — it's the core of what we do. We're a four-time Street of Dreams featured designer, and we maintain a premium inventory specifically for high-end Lake Oswego listings. Lakefront estates, Country Club homes, and First Addition properties get furnishings and art that match their price point, not generic rental furniture.",
      },
      {
        question: "How much does it cost to stage a luxury home in Lake Oswego?",
        answer:
          "Luxury staging is priced by the home. Larger LO estates with multiple living spaces, a primary suite, and outdoor rooms naturally cost more than a First Addition bungalow. We'll walk the property and give you a precise quote — the investment is almost always a fraction of a single price reduction.",
      },
      {
        question: "Do you stage lakefront and Country Club properties?",
        answer:
          "We do — including lakefront homes where the view is the selling point. We stage to frame the water and natural light rather than compete with them, and we're experienced with the Country Club, North Shore, Lake Grove, and Forest Highlands areas.",
      },
      {
        question: "Can you also handle interior design for an LO home I'm keeping?",
        answer:
          "Absolutely. Beyond staging-to-sell, our full-service interior design team works with Lake Oswego homeowners on whole-home and single-room projects — color, furniture, spatial planning, and finishes.",
      },
    ],
  },
  {
    slug: "west-linn",
    name: "West Linn",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/sod-2024-vista.webp",
    heroAlt: "Staged West Linn home with territorial views and open living space by Greylyn Wayne",
    description:
      "West Linn's hillside homes and family-friendly neighborhoods deserve staging that highlights their best features. Greylyn Wayne helps West Linn sellers showcase spacious layouts, territorial views, and the livability buyers move here for.",
    marketNote:
      "West Linn sells on space, schools, and views — and staging is how you make all three obvious in the first three listing photos. Many West Linn homes have generous footprints and walkout lower levels that read as empty or confusing when vacant; thoughtful staging gives every room an unmistakable purpose. Buyers here are often move-up families trading Portland for square footage, and they shop visually online before they ever drive out.",
    neighborhoods: [
      "Willamette",
      "Robinwood",
      "Hidden Springs",
      "Tanner Basin",
      "Skyline Ridge",
      "Sunset",
    ],
    highlights: [
      "Staging that highlights West Linn's views and outdoor living spaces",
      "Family-oriented staging appealing to the area's core buyer demographic",
      "Experience with West Linn's variety of custom and estate homes",
      "Quick staging turnarounds from our nearby Portland warehouse",
    ],
    nearby: ["Lake Oswego", "Oregon City", "Wilsonville", "Tualatin"],
    faqs: [
      {
        question: "How does staging help a West Linn home with a view sell faster?",
        answer:
          "Views are West Linn's premium feature, but an empty room of windows reads flat in photos. We place and scale furniture to draw the eye to the view and give buyers a sense of how they'd live with it — a deck set for dinner, a great room oriented to the territorial outlook. It turns a feature into an emotional hook.",
      },
      {
        question: "Do you stage larger West Linn homes with walkout basements?",
        answer:
          "Yes. Multi-level West Linn homes and homes with finished lower levels are a sweet spot for staging — those bonus spaces are exactly the rooms buyers struggle to picture when they're empty. We define them clearly so the square footage actually counts.",
      },
      {
        question: "Which West Linn neighborhoods do you serve?",
        answer:
          "All of them — Willamette, Robinwood, Hidden Springs, Tanner Basin, Skyline Ridge, and Sunset. Our warehouse is a short drive north in Portland, so turnarounds are quick across West Linn.",
      },
      {
        question: "What does staging cost for a West Linn listing?",
        answer:
          "Most projects fall in the $2,500–$8,000+ range, scaling with home size and number of rooms. Given West Linn's price points, staging is typically a small percentage of the sale that protects against a much larger price drop. We'll quote your specific home for free.",
      },
    ],
  },
  {
    slug: "beaverton",
    name: "Beaverton",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/portland-staged-kitchen-hero.webp",
    heroAlt: "Bright staged kitchen in a Beaverton home by Greylyn Wayne",
    description:
      "Beaverton's competitive market — fueled by major tech employers and top-rated schools — rewards homes that stand out from day one. Greylyn Wayne stages Beaverton properties to attract buyers who expect move-in-ready perfection.",
    marketNote:
      "Beaverton buyers skew young, professional, and relocating — often for a Nike, Intel, or Tektronix-area job — which means many are shopping from out of state and judging your home almost entirely on its listing photos. Clean, contemporary staging that photographs beautifully online is what wins that first click. Beaverton's housing is a mix of '70s–'90s neighborhoods and newer townhomes, and updated, well-staged interiors consistently separate the homes that get multiple offers from the ones that sit.",
    neighborhoods: [
      "Cedar Hills",
      "Murray Hill",
      "Somerset",
      "Five Oaks",
      "Raleigh Hills",
      "Cedar Mill",
    ],
    highlights: [
      "Modern staging that appeals to Beaverton's tech-industry buyers",
      "Experience staging in Cedar Hills, Somerset, and Murray Hill",
      "Clean, contemporary design that photographs beautifully online",
      "Staging for condos, townhomes, and single-family homes",
    ],
    nearby: ["Hillsboro", "Tigard", "Portland", "Bethany", "Sherwood"],
    faqs: [
      {
        question: "Why does staging matter so much for Beaverton listings?",
        answer:
          "A large share of Beaverton buyers are relocating professionals who tour homes online first and in person second. Staged homes photograph dramatically better than empty ones, so staging directly drives the click-throughs and showings that lead to offers in this fast-moving market.",
      },
      {
        question: "Do you stage townhomes and condos in Beaverton?",
        answer:
          "Yes — Beaverton has a lot of townhome and condo inventory, and smaller spaces actually reward smart staging the most. We scale furniture to make rooms feel open and functional rather than cramped, which is exactly what younger buyers are looking for.",
      },
      {
        question: "Which Beaverton areas do you cover?",
        answer:
          "Cedar Hills, Murray Hill, Somerset, Five Oaks, Raleigh Hills, and the Cedar Mill area, among others. We're close by on the east side and serve all of Beaverton.",
      },
      {
        question: "How fast can you turn a Beaverton home around?",
        answer:
          "Usually 5–7 business days from consultation, with rush options available. Our Portland warehouse is a quick hop over the hill, so Westside installs stay on schedule.",
      },
    ],
  },
  {
    slug: "tigard",
    name: "Tigard",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/portland-home-staging-bedroom.webp",
    heroAlt: "Staged primary bedroom in a Tigard home by Greylyn Wayne",
    description:
      "Tigard's convenient location and strong schools make it a top pick for families. Greylyn Wayne stages Tigard homes to emphasize livability, storage, and the functional spaces today's buyers are looking for.",
    marketNote:
      "Tigard's buyer pool is family-driven, and families read a home through a practical lens: Where do the kids go? Where does life actually happen? Staging answers those questions room by room — a defined home office, a real dining space, a bedroom that clearly fits a queen bed. Bull Mountain's larger homes and the area's many '80s–'90s two-stories both benefit when staging makes flow and function obvious instead of leaving buyers to guess.",
    neighborhoods: [
      "Bull Mountain",
      "Summerlake",
      "Cook Park",
      "Metzger",
      "King City (adjacent)",
    ],
    highlights: [
      "Staging that highlights family-friendly layouts and functional spaces",
      "Experience with Bull Mountain, Summerlake, and Cook Park area homes",
      "Competitive pricing for the Tigard market",
      "Staging designed to move properties quickly in a competitive market",
    ],
    nearby: ["Beaverton", "Tualatin", "Lake Oswego", "Portland", "Sherwood"],
    faqs: [
      {
        question: "What kind of staging works best for family homes in Tigard?",
        answer:
          "Functional, aspirational staging. We define every room's purpose — a real home office, a kid-friendly bonus room, a primary suite that feels like a retreat — so family buyers can immediately see their life in the home rather than wondering how a room would work.",
      },
      {
        question: "Do you stage larger Bull Mountain homes?",
        answer:
          "Yes. Bull Mountain's bigger floor plans have more rooms to furnish and more square footage to justify, which is exactly where staging pays off. We make sure none of that space reads as empty or purposeless in photos.",
      },
      {
        question: "Is staging worth it in a market like Tigard?",
        answer:
          "In our experience, yes — staged Tigard homes tend to show better online and sell faster than comparable empty listings. The cost of staging is typically far less than the first price reduction a stale listing takes.",
      },
      {
        question: "What's the cost to stage a home in Tigard?",
        answer:
          "Most Tigard projects run $2,500–$8,000+ depending on size and rooms staged. We price competitively for this market and give you a free quote for your specific property.",
      },
    ],
  },
  {
    slug: "tualatin",
    name: "Tualatin",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/hero-staging.webp",
    heroAlt: "Move-in-ready staged living space in a Tualatin home by Greylyn Wayne",
    description:
      "Tualatin's mix of established neighborhoods and newer construction offers unique staging opportunities. Greylyn Wayne helps Tualatin sellers present their homes with the polished, move-in-ready feel buyers in this market expect.",
    marketNote:
      "Tualatin blends mature neighborhoods around Tualatin Commons with pockets of newer construction, and the two need different staging touches — warmth and updating cues for older homes, lifestyle and scale for new builds. Buyers here value the small-city feel, river access, and easy I-5/I-205 commutes, and staging that signals 'settled, comfortable, move-in ready' resonates with the young families and professionals who shop this market.",
    neighborhoods: [
      "Byrom",
      "Sagert",
      "Tualatin Commons",
      "Nyberg",
      "Ibach",
    ],
    highlights: [
      "Staging for both established homes and new construction in Tualatin",
      "Highlighting Tualatin's community amenities and outdoor access",
      "Clean, modern designs that appeal to young families and professionals",
      "Fast turnaround times from our nearby Portland inventory",
    ],
    nearby: ["Tigard", "Wilsonville", "Lake Oswego", "Sherwood", "West Linn"],
    faqs: [
      {
        question: "Do you stage both older and newly built homes in Tualatin?",
        answer:
          "Yes, and we adjust the approach to each. Established homes around Tualatin Commons get warmth and subtle updating cues; newer construction gets contemporary furnishings that show off open plans and modern finishes. Same goal — help buyers picture living there.",
      },
      {
        question: "Will staging help my Tualatin home compete with new construction nearby?",
        answer:
          "It's one of the best tools you have. New builds show fully finished and styled, so an empty resale listing looks dated by comparison. Staging levels the field and lets your home's character and value come through.",
      },
      {
        question: "Which parts of Tualatin do you serve?",
        answer:
          "All of Tualatin — Byrom, Sagert, the Tualatin Commons area, Nyberg, and Ibach. We're a short drive away and reach the whole south-Westside quickly.",
      },
      {
        question: "How long does staging take in Tualatin?",
        answer:
          "Generally 5–7 business days from your consultation, with rush staging available. Our nearby Portland warehouse keeps Tualatin installs prompt.",
      },
    ],
  },
  {
    slug: "hillsboro",
    name: "Hillsboro",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/portland-interior-design-white-kitchen.webp",
    heroAlt: "Bright, modern staged kitchen in a Hillsboro home by Greylyn Wayne",
    description:
      "Hillsboro's booming tech corridor — anchored by Intel and a wave of startups — drives steady demand for well-presented homes. Greylyn Wayne stages Hillsboro properties with modern, sophisticated design that resonates with the area's professional buyers.",
    marketNote:
      "Hillsboro is the Silicon Forest, and its buyers reflect it: tech professionals, many relocating internationally, who expect clean modern interiors and shop heavily online. Orenco Station and AmberGlen set a contemporary, urbanist tone, while South Hillsboro is adding thousands of new homes — both contexts favor crisp, current staging over traditional looks. For relocating buyers touring by video, strong photos aren't a nicety; they're the whole first impression.",
    neighborhoods: [
      "Orenco Station",
      "AmberGlen",
      "South Hillsboro",
      "Tanasbourne",
      "Jackson School",
      "Reedville",
    ],
    highlights: [
      "Modern staging tailored to Hillsboro's tech-industry buyer pool",
      "Experience with Orenco Station, AmberGlen, and South Hillsboro",
      "Contemporary furnishings that match new construction aesthetics",
      "Staging for townhomes, condos, and single-family homes",
    ],
    nearby: ["Beaverton", "Bethany", "Forest Grove", "Cornelius"],
    faqs: [
      {
        question: "What staging style works for Hillsboro's tech buyers?",
        answer:
          "Clean, contemporary, and uncluttered. Many Hillsboro buyers come from the tech sector and often from out of the area, and they gravitate to modern, move-in-ready interiors. We use current furnishings and a restrained palette that photographs sharply online.",
      },
      {
        question: "Do you stage homes in Orenco Station and South Hillsboro?",
        answer:
          "Yes — both are areas we know well. Orenco's townhomes and condos and South Hillsboro's new construction both benefit from staging that matches their contemporary architecture and shows off open layouts.",
      },
      {
        question: "Can staging help my Hillsboro home stand out against new builds?",
        answer:
          "Definitely. With so much new inventory coming online in South Hillsboro, a staged resale home competes far better than an empty one. Staging signals that your home is just as move-in ready as the model down the street.",
      },
      {
        question: "How much does staging cost in Hillsboro?",
        answer:
          "Most projects range from $2,500 to $8,000+ based on home size and rooms staged. We provide a free, property-specific quote — (971) 930-0220.",
      },
    ],
  },
  {
    slug: "sherwood",
    name: "Sherwood",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/portland-home-staging-character-bedroom.webp",
    heroAlt: "Warm, inviting staged bedroom in a Sherwood home by Greylyn Wayne",
    description:
      "Sherwood's charming Old Town and newer developments draw families seeking small-town character with suburban convenience. Greylyn Wayne stages Sherwood homes to emphasize their warmth, curb appeal, and community lifestyle.",
    marketNote:
      "Sherwood sells a feeling as much as a floor plan — the walkable Old Town, the strong schools, the sense of a real community. Our staging leans warm and inviting to match that, helping buyers imagine settling in rather than just moving through. Much of Sherwood's inventory is family-sized homes in newer neighborhoods like Woodhaven, where defining the bonus rooms and outdoor living spaces is what makes the lifestyle click in photos.",
    neighborhoods: [
      "Old Town Sherwood",
      "Murdock",
      "Woodhaven",
      "Ladd Hill",
      "Snyder",
    ],
    highlights: [
      "Warm, inviting staging that matches Sherwood's community character",
      "Experience with Sherwood's newer developments and established neighborhoods",
      "Staging that highlights outdoor living spaces and family functionality",
      "Competitive rates for the Sherwood market",
    ],
    nearby: ["Tualatin", "Tigard", "Wilsonville", "Newberg"],
    faqs: [
      {
        question: "What staging approach fits Sherwood's market?",
        answer:
          "Warm and family-forward. Sherwood buyers are drawn to its community feel, so we stage to feel inviting and lived-in rather than coldly modern — the goal is for a family to picture holidays and homework at the kitchen island, not just admire the furniture.",
      },
      {
        question: "Do you serve both Old Town and Sherwood's newer neighborhoods?",
        answer:
          "Yes — historic Old Town homes and newer developments like Woodhaven and Murdock alike. We tailor the look to the home's era while keeping the broad, buyer-friendly appeal Sherwood listings need.",
      },
      {
        question: "Can you stage outdoor living spaces too?",
        answer:
          "We can stage and style key outdoor areas — patios, decks, covered porches — which matter a lot to Sherwood's family buyers. Outdoor living is part of the lifestyle here, so we make sure it shows.",
      },
      {
        question: "What will staging cost in Sherwood?",
        answer:
          "Typically $2,500–$8,000+ depending on the home's size and number of rooms. Our rates are competitive for the Sherwood market, and quotes are free.",
      },
    ],
  },
  {
    slug: "wilsonville",
    name: "Wilsonville",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/portland-home-staging-loft-living-room.webp",
    heroAlt: "Contemporary staged living room in a Wilsonville home by Greylyn Wayne",
    description:
      "Wilsonville's planned communities and excellent schools make it one of the most desirable suburbs south of Portland. Greylyn Wayne stages Wilsonville properties to showcase their modern layouts and family-friendly appeal.",
    marketNote:
      "Wilsonville is master-planned living — Villebois' walkable, European-inspired streets and the riverfront Charbonneau community draw very different buyers, from relocating families to active-adult downsizers. Staging here is about matching the home to its intended buyer: youthful and open for Villebois townhomes, refined and low-maintenance for Charbonneau. The city's steady stream of relocating professionals also means a lot of sight-unseen, photo-first shopping.",
    neighborhoods: [
      "Villebois",
      "Charbonneau",
      "Canyon Creek",
      "Montebello",
      "Old Town Wilsonville",
    ],
    highlights: [
      "Staging for Villebois, Charbonneau, and other Wilsonville communities",
      "Modern, clean design that appeals to relocating professionals",
      "Experience staging new construction and resale homes",
      "Highlighting Wilsonville's parks, trails, and community amenities",
    ],
    nearby: ["Tualatin", "Sherwood", "Canby", "West Linn", "Oregon City"],
    faqs: [
      {
        question: "Do you stage homes in Villebois and Charbonneau?",
        answer:
          "Yes — and we approach them differently. Villebois calls for fresh, open, youthful staging that suits its townhomes and walkable design; Charbonneau's market leans toward refined, low-maintenance interiors that appeal to downsizers and active-adult buyers. We match the staging to the community.",
      },
      {
        question: "Why is staging useful for relocating buyers in Wilsonville?",
        answer:
          "Many Wilsonville buyers are relocating and tour online before they ever visit. Staged homes give them confidence to act on a home they may have only seen in photos or on video — empty listings rarely earn that trust.",
      },
      {
        question: "Can you stage new construction in Wilsonville?",
        answer:
          "Absolutely. We stage both new builds and resale homes, and we work with builders on model homes that help buyers envision the full lifestyle a community offers.",
      },
      {
        question: "How quickly can you stage in Wilsonville?",
        answer:
          "Usually within 5–7 business days of the consultation, with rush options. Wilsonville is an easy drive from our Portland-area warehouse.",
      },
    ],
  },
  {
    slug: "oregon-city",
    name: "Oregon City",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "East & Clackamas",
    heroImage: "/images/portland-home-staging-character-bedroom.webp",
    heroAlt: "Character-rich staged bedroom in a historic Oregon City home by Greylyn Wayne",
    description:
      "Oregon City's historic character and Clackamas River bluffs create unique staging opportunities. Greylyn Wayne helps Oregon City sellers present their homes in a way that honors the area's heritage while appealing to modern buyers.",
    marketNote:
      "As Oregon's first incorporated city, Oregon City has a deep stock of historic and character homes on the McLoughlin bluff, alongside newer hillside subdivisions with river and valley views. Older homes need staging that respects their architecture without feeling dated, while the hillside homes sell on their views and outdoor space. Oregon City also tends to offer more value than its Clackamas neighbors, attracting first-time and move-up buyers who respond strongly to a home that simply feels finished.",
    neighborhoods: [
      "McLoughlin Historic District",
      "Hazel Grove",
      "Caufield",
      "Holcomb",
      "Park Place",
    ],
    highlights: [
      "Staging that bridges Oregon City's historic charm and modern buyer expectations",
      "Experience with hillside homes, river views, and historic properties",
      "Affordable staging options for the Oregon City market",
      "Staging designed to compete in the Clackamas County market",
    ],
    nearby: ["West Linn", "Milwaukie", "Happy Valley", "Canby", "Gladstone"],
    faqs: [
      {
        question: "How do you stage a historic Oregon City home?",
        answer:
          "We honor the architecture — original woodwork, built-ins, period proportions — while keeping the furnishings current enough that modern buyers can see themselves living there. The balance is celebrating the character without making the home feel like a time capsule.",
      },
      {
        question: "Do you stage hillside homes with river or valley views?",
        answer:
          "Yes. For Oregon City's bluff and hillside homes, we orient the staging to frame the views and the outdoor living spaces, which are often the strongest selling points.",
      },
      {
        question: "Is staging affordable for the Oregon City market?",
        answer:
          "We offer staging options scaled to Oregon City's price points, and the return is real — a well-staged home competes far better against the rest of Clackamas County. We'll give you a free quote and an honest read on what's worth doing.",
      },
      {
        question: "Which Oregon City neighborhoods do you cover?",
        answer:
          "The McLoughlin historic district, Hazel Grove, Caufield, Holcomb, Park Place, and the surrounding hillside areas. We serve all of Oregon City.",
      },
    ],
  },
  {
    slug: "happy-valley",
    name: "Happy Valley",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "East & Clackamas",
    heroImage: "/images/sod-2021-ohana.webp",
    heroAlt: "Upscale staged interior in a newer Happy Valley home by Greylyn Wayne",
    description:
      "Happy Valley's newer developments and family-focused community attract buyers looking for move-in-ready homes. Greylyn Wayne stages Happy Valley properties with polished, contemporary design that meets the area's high expectations.",
    marketNote:
      "Happy Valley is one of the metro's fastest-growing communities, dominated by newer construction with open floor plans, high ceilings, and modern finishes. Buyers here expect that level of polish, so staging needs premium, contemporary furnishings that fill big great rooms and double-height entries without looking sparse. With so many similar new homes competing at once, a well-staged listing is what stops the scroll and earns the showing.",
    neighborhoods: [
      "Pleasant Valley",
      "Scouters Mountain",
      "Mt. Scott",
      "Altamont",
      "Eagle Landing",
    ],
    highlights: [
      "Contemporary staging for Happy Valley's newer construction homes",
      "Experience with Pleasant Valley, Scouters Mountain, and East Happy Valley",
      "Staging that highlights open floor plans and modern finishes",
      "Premium furnishings that match the area's upscale new builds",
    ],
    nearby: ["Milwaukie", "Clackamas", "Oregon City", "Damascus", "Portland"],
    faqs: [
      {
        question: "What kind of staging suits Happy Valley's newer homes?",
        answer:
          "Contemporary and substantial. Happy Valley's open floor plans and double-height spaces need furnishings with enough scale and quality to feel intentional. We stage to match the modern architecture and the upscale expectations of the area's buyers.",
      },
      {
        question: "How does staging help when so many new homes look alike?",
        answer:
          "When buyers are comparing a dozen similar floor plans, staging is the differentiator. A staged home reads as warmer and more move-in ready than the empty or builder-basic listing next door, which is exactly what wins the offer.",
      },
      {
        question: "Do you stage large great rooms and open-concept spaces?",
        answer:
          "Yes — that's a specialty. Big open spaces are the hardest to get right and the easiest to leave feeling empty. We zone them into living, dining, and conversation areas so buyers understand how to actually use the square footage.",
      },
      {
        question: "What does staging cost in Happy Valley?",
        answer:
          "Larger Happy Valley homes typically land in the upper part of our $2,500–$8,000+ range given their size and number of rooms. We'll quote your specific property at no cost.",
      },
    ],
  },
  {
    slug: "milwaukie",
    name: "Milwaukie",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "East & Clackamas",
    heroImage: "/images/hero-interior.webp",
    heroAlt: "Inviting staged interior in a Milwaukie character home by Greylyn Wayne",
    description:
      "Milwaukie's revitalized downtown and proximity to Portland make it increasingly popular with buyers. Greylyn Wayne stages Milwaukie homes to highlight their character, accessibility, and the area's growing appeal.",
    marketNote:
      "Milwaukie has quietly become one of the metro's most appealing values — walkable downtown, the Orange Line to Portland, and pockets of genuine character in Historic Milwaukie and Island Station. Much of the housing is mid-century and older, with the charm buyers love but also the smaller, compartmentalized rooms that read awkwardly empty. Staging that warms up those spaces and shows their flexibility is what converts Milwaukie's strong location into strong offers.",
    neighborhoods: [
      "Historic Milwaukie",
      "Island Station",
      "Ardenwald",
      "Lewelling",
      "Lake Road",
    ],
    highlights: [
      "Staging that highlights Milwaukie's character homes and walkability",
      "Experience with both historic and updated Milwaukie properties",
      "Affordable staging options that deliver strong ROI for sellers",
      "Quick turnaround from our SE Portland warehouse location",
    ],
    nearby: ["Portland", "Happy Valley", "Oregon City", "Lake Oswego"],
    faqs: [
      {
        question: "How do you stage Milwaukie's older, smaller-room homes?",
        answer:
          "Carefully scaled furniture and a light, warm palette. Mid-century and older Milwaukie homes can feel chopped up when empty; we choose pieces that fit the rooms, define their purpose, and make the whole home feel larger and more flexible in photos.",
      },
      {
        question: "Is staging worth it given Milwaukie's price points?",
        answer:
          "Yes — arguably more so. Milwaukie's value-buyer market is competitive, and a modest staging investment helps your home stand out and sell faster, typically for far more than the staging cost.",
      },
      {
        question: "How close is your warehouse to Milwaukie?",
        answer:
          "Very close — our inventory is warehoused in SE Portland, just minutes from Milwaukie, which keeps installs fast and easy to schedule.",
      },
      {
        question: "Which Milwaukie areas do you serve?",
        answer:
          "Historic Milwaukie, Island Station, Ardenwald, Lewelling, the Lake Road area, and the rest of the city.",
      },
    ],
  },
  {
    slug: "canby",
    name: "Canby",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "East & Clackamas",
    heroImage: "/images/portland-home-staging-bedroom.webp",
    heroAlt: "Comfortable staged bedroom in a Canby home by Greylyn Wayne",
    description:
      "Canby's small-town charm and rural character attract buyers seeking space and community. Greylyn Wayne stages Canby properties with warm, welcoming designs that emphasize the area's lifestyle and livability.",
    marketNote:
      "Canby trades on space, quiet, and a genuine small-town downtown — buyers here are often trading metro density for acreage, shop space, or just a bigger yard. Many listings are larger lots, farmhouse-style homes, and ranches where the indoor-outdoor connection and the land are central to the appeal. Warm, grounded staging that plays up that lifestyle — rather than an urban-modern look that feels out of place — is what resonates with Canby's buyers.",
    neighborhoods: [
      "Downtown Canby",
      "Logan",
      "Knights Bridge",
      "Territorial",
    ],
    highlights: [
      "Warm staging that reflects Canby's welcoming community character",
      "Experience with farmhouse, ranch, and newer construction styles",
      "Staging that highlights acreage, views, and outdoor living",
      "Serving Canby sellers with professional staging at competitive rates",
    ],
    nearby: ["Wilsonville", "Oregon City", "Molalla", "Woodburn"],
    faqs: [
      {
        question: "What staging style fits Canby's market?",
        answer:
          "Warm and grounded — farmhouse and transitional looks that feel right at home in Canby rather than an out-of-place urban-modern aesthetic. We stage to the lifestyle buyers come to Canby for: space, comfort, and community.",
      },
      {
        question: "Do you stage homes on acreage or with outbuildings?",
        answer:
          "Yes. For Canby's larger lots and rural properties, we make sure the staging highlights the indoor-outdoor flow, the views, and the usable land — often the very reasons a buyer chooses Canby.",
      },
      {
        question: "Do you travel to Canby for staging?",
        answer:
          "We do — Canby is well within our service area, an easy drive south from the metro. Turnarounds are typically 5–7 business days from your consultation.",
      },
      {
        question: "What does staging cost in Canby?",
        answer:
          "Most projects fall in the $2,500–$8,000+ range based on home size and rooms staged. We keep our rates competitive for the Canby market and quote every home for free.",
      },
    ],
  },
  {
    slug: "newberg",
    name: "Newberg",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/sod-2019-bespoke-living.webp",
    heroAlt: "Elegant wine-country staged living room in a Newberg home by Greylyn Wayne",
    description:
      "Newberg sits at the gateway to Oregon wine country, drawing buyers to its small-town warmth and vineyard lifestyle. Greylyn Wayne stages Newberg properties to capture the area's relaxed sophistication and natural beauty.",
    marketNote:
      "Newberg's identity is wine country, and that shapes its buyers — many are relocating from Portland or California for the Chehalem Valley lifestyle, with an eye for relaxed, elevated interiors. Staging that reads as warm-but-refined, with a nod to the vineyard setting, lands well here, especially on the larger homes and acreage properties that define the upper end of the market. Downtown Newberg's historic homes, meanwhile, reward staging that respects their character.",
    neighborhoods: [
      "Springbrook",
      "Downtown Newberg",
      "Chehalem Mountain",
      "Mountainview",
    ],
    highlights: [
      "Staging that captures wine country elegance and warmth",
      "Experience with Newberg's historic homes and newer developments",
      "Design that appeals to buyers relocating from Portland",
      "Highlighting outdoor living, views, and Newberg's lifestyle appeal",
    ],
    nearby: ["Sherwood", "Dundee", "McMinnville", "Wilsonville"],
    faqs: [
      {
        question: "What staging style works in Newberg's wine country market?",
        answer:
          "Relaxed sophistication. Many Newberg buyers are drawn by the Chehalem Valley lifestyle, so we stage to feel warm and elevated — interiors that suit a glass of local pinot on the porch, with the vineyard views and outdoor spaces front and center.",
      },
      {
        question: "Do you stage acreage and vineyard-adjacent properties?",
        answer:
          "Yes. Newberg's larger homes and acreage listings benefit from staging that frames the land and the views as part of the lifestyle, not an afterthought. We make the setting a selling point.",
      },
      {
        question: "Can you stage historic homes in downtown Newberg?",
        answer:
          "We can. Downtown Newberg's older homes get staging that honors their period character while staying fresh enough for today's buyers.",
      },
      {
        question: "Do you serve Newberg and the surrounding wine country?",
        answer:
          "We do — Newberg, plus nearby Dundee and the broader Yamhill County wine country. Reach out for a free consultation: (971) 930-0220.",
      },
    ],
  },
  {
    slug: "gresham",
    name: "Gresham",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "East & Clackamas",
    heroImage: "/images/portland-staged-kitchen-hero.webp",
    heroAlt: "Clean, welcoming staged kitchen in a Gresham home by Greylyn Wayne",
    description:
      "Gresham offers affordability and access to Mt. Hood recreation, making it a strong market for well-staged homes. Greylyn Wayne helps Gresham sellers maximize their return with professional staging that drives faster sales.",
    marketNote:
      "Gresham is one of the metro's most accessible markets, drawing first-time buyers and value-seekers who shop hard and compare listings closely. In that price-sensitive environment, staging is a high-ROI move: it makes a home photograph better than the competition and signals move-in-ready condition, both of which matter enormously to buyers stretching their budget. Gresham's housing ranges from older homes near downtown to newer subdivisions toward the buttes, and all of it sells faster when it shows its best.",
    neighborhoods: [
      "Powell Valley",
      "Gresham Butte",
      "Centennial",
      "Rockwood",
      "Mt. Hood (MHCC) area",
    ],
    highlights: [
      "Professional staging at price points that work for the Gresham market",
      "Experience with a range of home styles and sizes",
      "Staging that helps Gresham listings stand out in online searches",
      "Fast setup from our Portland-based warehouse and team",
    ],
    nearby: ["Portland", "Troutdale", "Wood Village", "Happy Valley"],
    faqs: [
      {
        question: "Is staging worth it for a more affordable Gresham home?",
        answer:
          "Often it's where staging delivers the highest return. Gresham buyers compare listings closely and stretch their budgets, so a staged home that photographs well and looks move-in ready stands out and tends to sell faster — for more than the cost of staging.",
      },
      {
        question: "Do you offer staging that fits the Gresham market's price points?",
        answer:
          "Yes. We scale the scope to the home and the market, so Gresham sellers get a polished result without over-investing. We'll recommend exactly what's worth doing and quote it free.",
      },
      {
        question: "Which Gresham areas do you serve?",
        answer:
          "Powell Valley, Gresham Butte, Centennial, Rockwood, and the Mt. Hood Community College area, plus nearby Troutdale and Wood Village.",
      },
      {
        question: "How fast can you stage a home in Gresham?",
        answer:
          "Typically 5–7 business days from consultation, with rush staging available. Our Portland warehouse and team keep east-county installs prompt.",
      },
    ],
  },
  {
    slug: "bethany",
    name: "Bethany",
    state: "Oregon",
    stateShort: "OR",
    region: "Portland Metro",
    stagingRegion: "Westside & Valley",
    heroImage: "/images/portland-interior-design-white-kitchen.webp",
    heroAlt: "Modern staged kitchen in an upscale Bethany home by Greylyn Wayne",
    description:
      "Bethany's family-friendly planned communities and highly-rated schools make it one of the most competitive markets in the metro. Greylyn Wayne stages Bethany homes with the modern, polished look area buyers expect.",
    marketNote:
      "Bethany is the Westside's family-and-schools magnet, and demand here is consistently strong — which raises the bar for presentation rather than lowering it. Buyers are largely professional families who expect contemporary, well-kept interiors, and the area's newer planned-community homes set a clean, modern standard. Staging that matches that aesthetic and emphasizes family functionality is what keeps a Bethany listing at the top of a competitive heap.",
    neighborhoods: [
      "NW Bethany",
      "Bethany Village",
      "Rock Creek",
      "Oak Hills (adjacent)",
      "Claremont",
    ],
    highlights: [
      "Modern staging tailored to Bethany's upscale family market",
      "Experience with NW Bethany and nearby planned communities",
      "Clean, contemporary design that appeals to professional families",
      "Staging for new construction and resale homes in the Bethany area",
    ],
    nearby: ["Beaverton", "Hillsboro", "Portland", "Cedar Mill"],
    faqs: [
      {
        question: "What staging look fits Bethany's family market?",
        answer:
          "Clean, modern, and family-functional. Bethany's buyers are largely professional families who expect contemporary interiors and want to see how a home supports daily life — defined homework nooks, real dining space, and a primary suite that feels like a retreat.",
      },
      {
        question: "Is staging necessary in a market as in-demand as Bethany?",
        answer:
          "High demand raises expectations rather than removing the need to compete. Buyers paying Bethany prices expect a polished, move-in-ready home, and staging is how you meet that expectation and protect your sale price.",
      },
      {
        question: "Do you stage Bethany's newer planned-community homes?",
        answer:
          "Yes — NW Bethany, Bethany Village, Rock Creek, and the surrounding planned communities. We stage to match the contemporary architecture these neighborhoods are known for.",
      },
      {
        question: "What does staging cost in Bethany?",
        answer:
          "Most projects range $2,500–$8,000+ depending on size and rooms. We'll provide a free quote tailored to your home.",
      },
    ],
  },

  // ─────────────────────────── Central Oregon ───────────────────────────
  {
    slug: "bend",
    name: "Bend",
    state: "Oregon",
    stateShort: "OR",
    region: "Central Oregon",
    stagingRegion: null,
    heroImage: "/images/sod-2024-vista.webp",
    heroAlt: "Mountain-modern staged living space suited to a Bend home by Greylyn Wayne",
    description:
      "Bend's booming market draws buyers from across the West Coast. Greylyn Wayne brings Portland-caliber staging and interior design to Central Oregon, helping Bend sellers and agents present properties that match the area's premium price points.",
    marketNote:
      "Bend is a destination market — much of the demand comes from out-of-area and second-home buyers who shop online from Seattle, the Bay Area, and beyond, and who expect the mountain-modern aesthetic the region is known for. Neighborhoods like NorthWest Crossing and Tetherow set a high design bar, and a vacant or dated listing simply doesn't compete for those buyers' attention. Staging that captures Bend's indoor-outdoor, high-desert-modern lifestyle is what turns a scroll into a showing.",
    neighborhoods: [
      "NorthWest Crossing",
      "Old Bend / Drake Park",
      "Awbrey Butte",
      "Tetherow",
      "Old Mill District",
      "Shevlin",
    ],
    highlights: [
      "Professional staging that matches Bend's premium market expectations",
      "Experience with mountain modern, lodge, and contemporary styles",
      "Interior design for primary residences and vacation homes",
      "Serving Bend's growing luxury and second-home market",
    ],
    nearby: ["Sunriver", "Redmond", "Sisters", "La Pine"],
    faqs: [
      {
        question: "Do you provide staging in Bend even though you're Portland-based?",
        answer:
          "Yes. Greylyn Wayne serves Central Oregon, bringing the same Street of Dreams-caliber staging and design we're known for in Portland to Bend listings. Reach out and we'll talk through logistics and timing for your property.",
      },
      {
        question: "What staging style works for Bend's market?",
        answer:
          "Mountain-modern and high-desert contemporary — the look Bend buyers come for. We stage to highlight the indoor-outdoor living, natural light, and views that define the area's most desirable homes in NorthWest Crossing, Tetherow, and beyond.",
      },
      {
        question: "Can you help with second-home and vacation properties in Bend?",
        answer:
          "Definitely. Beyond sale staging, our interior design team works on vacation homes and short-term rentals, designing for both guest appeal and durability — important in a heavy-use second-home market.",
      },
      {
        question: "Why does staging matter so much for out-of-area Bend buyers?",
        answer:
          "Most Bend buyers shop online from out of town and form their opinion from listing photos alone. Staged homes photograph dramatically better and give distant buyers the confidence to schedule a trip or make an offer.",
      },
    ],
  },
  {
    slug: "sunriver",
    name: "Sunriver",
    state: "Oregon",
    stateShort: "OR",
    region: "Central Oregon",
    stagingRegion: null,
    heroImage: "/images/sod-2021-ohana.webp",
    heroAlt: "Resort-style staged interior suited to a Sunriver vacation home by Greylyn Wayne",
    description:
      "Sunriver's resort community and active vacation-rental market call for specialized design. Greylyn Wayne designs Sunriver properties for both sale appeal and rental income — blending resort style with durability and comfort.",
    marketNote:
      "Sunriver is a rental-driven market: a huge share of homes here are second homes that need to perform as short-term rentals, so design decisions are also revenue decisions. The right interiors photograph beautifully for listing platforms, sleep more guests comfortably, and stand up to high turnover — all of which lift both booking rates and resale value. Whether you're selling or optimizing for income, lodge-inspired, durable, family-friendly design is the through-line in Sunriver.",
    neighborhoods: [
      "Sunriver Village",
      "Caldera Springs",
      "Crosswater",
      "North Pool / South Meadow areas",
    ],
    highlights: [
      "Staging and design for Sunriver's resort and vacation-home market",
      "Short-term rental design to maximize booking appeal and revenue",
      "Durable, lodge-inspired furnishings suited to rental properties",
      "Interior design for cabins, condos, and custom homes in Sunriver",
    ],
    nearby: ["Bend", "La Pine", "Three Rivers"],
    faqs: [
      {
        question: "Do you design Sunriver homes for short-term rental performance?",
        answer:
          "Yes — it's a specialty for resort markets like Sunriver. We design interiors that photograph well for booking platforms, sleep guests comfortably, and use durable, easy-care furnishings that survive high turnover. Good design directly raises booking rates and guest reviews.",
      },
      {
        question: "Can you stage a Sunriver home for sale instead?",
        answer:
          "Absolutely. For resale, we stage to capture Sunriver's resort-lifestyle appeal so buyers picture both their own getaways and the rental income potential — often a key part of the purchase decision here.",
      },
      {
        question: "What design style suits Sunriver properties?",
        answer:
          "Lodge-inspired and mountain-contemporary, warmed up for comfort. It fits the setting, photographs beautifully, and appeals to the families who make up most of Sunriver's guests and buyers.",
      },
      {
        question: "Do you serve Sunriver from out of the area?",
        answer:
          "We do — Greylyn Wayne works throughout Central Oregon, including Sunriver, Caldera Springs, and Crosswater. Contact us to discuss your project and timeline.",
      },
    ],
  },
  {
    slug: "hood-river",
    name: "Hood River",
    state: "Oregon",
    stateShort: "OR",
    region: "Columbia River Gorge",
    stagingRegion: null,
    heroImage: "/images/hero-interior.webp",
    heroAlt: "Bright, airy staged interior suited to a Hood River home by Greylyn Wayne",
    description:
      "Hood River's stunning Gorge setting and active lifestyle attract a specific kind of buyer. Greylyn Wayne stages Hood River properties with designs that complement the area's natural beauty and adventurous spirit.",
    marketNote:
      "Hood River buyers are drawn by the Gorge — the windsurfing, the orchards, the views — and they want interiors that feel light, natural, and connected to the outdoors. The market spans historic homes in the Heights and downtown, orchard properties, and a growing vacation-rental segment, each with its own staging needs. Across all of them, the move is to frame the setting: stage so the river, the mountain, and the natural light are the stars.",
    neighborhoods: [
      "The Heights",
      "Downtown Hood River",
      "Pine Grove",
      "Odell",
      "West Side",
    ],
    highlights: [
      "Staging that complements Hood River's views and natural surroundings",
      "Experience with Gorge-area homes, orchards, and vacation properties",
      "Designs that appeal to Hood River's active, outdoor-oriented buyers",
      "Short-term rental design for Hood River vacation properties",
    ],
    nearby: ["The Dalles", "Cascade Locks", "White Salmon", "Parkdale"],
    faqs: [
      {
        question: "How do you stage a Hood River home to show off the Gorge?",
        answer:
          "We orient everything to the view and the light. Furniture placement, low sightlines, and a natural palette keep the focus on the river, the mountain, and the orchards — the reasons buyers choose Hood River in the first place.",
      },
      {
        question: "Do you design Hood River vacation rentals?",
        answer:
          "Yes. We design short-term rentals for the Gorge market with durable, photogenic interiors that boost bookings and suit the active, outdoor-oriented guests Hood River attracts.",
      },
      {
        question: "Can you stage historic homes in the Heights or downtown?",
        answer:
          "We can — Hood River's older homes get staging that respects their character while feeling fresh and current for today's buyers.",
      },
      {
        question: "Do you serve Hood River from the Portland area?",
        answer:
          "We do — Hood River and the wider Columbia River Gorge are within our service area. Reach out for a consultation and we'll coordinate timing.",
      },
    ],
  },

  // ─────────────────────────── Willamette Valley ───────────────────────────
  {
    slug: "eugene",
    name: "Eugene",
    state: "Oregon",
    stateShort: "OR",
    region: "Willamette Valley",
    stagingRegion: null,
    heroImage: "/images/portland-home-staging-living-room.webp",
    heroAlt: "Professionally staged living room suited to a Eugene home by Greylyn Wayne",
    description:
      "Eugene's eclectic market — from University of Oregon neighborhoods to South Hills estates — rewards staging that speaks to a diverse buyer pool. Greylyn Wayne brings Portland-level expertise to Lane County.",
    marketNote:
      "Eugene is really several markets at once: the University of Oregon's student-and-faculty orbit, the established prestige of the South Hills, the artsy energy of the Whiteaker, and family-friendly Cal Young. Staging has to read the home and its likely buyer rather than apply one formula — a South Hills view home and a Friendly-area bungalow want very different stories. The common thread is that staged homes photograph better and sell faster across every one of those sub-markets.",
    neighborhoods: [
      "South Hills",
      "Fairmount / UO area",
      "Friendly",
      "Whiteaker",
      "Cal Young",
    ],
    highlights: [
      "Professional staging for Eugene's diverse housing market",
      "Experience with university-area, downtown, and South Hills properties",
      "Design that appeals to Eugene's mix of academic and professional buyers",
      "Serving Lane County with full staging and interior design services",
    ],
    nearby: ["Springfield", "Cottage Grove", "Junction City", "Veneta"],
    faqs: [
      {
        question: "Does Greylyn Wayne stage homes in Eugene?",
        answer:
          "Yes — we serve Eugene and Lane County, bringing the same staging and interior-design expertise we're known for in the Portland metro. Get in touch and we'll talk through your property and timeline.",
      },
      {
        question: "How do you handle Eugene's very different neighborhoods?",
        answer:
          "We stage to the home and its buyer. A South Hills estate, a Fairmount home near campus, and a Whiteaker bungalow each call for a different feel, so we tailor the furnishings and styling rather than dropping in a one-size look.",
      },
      {
        question: "Do you offer interior design in Eugene too?",
        answer:
          "We do — full-service interior design for Eugene homeowners, from single rooms to whole-home projects, alongside our sale-focused staging.",
      },
      {
        question: "What does staging cost in Eugene?",
        answer:
          "Most projects fall in the $2,500–$8,000+ range depending on size and rooms staged. We provide a free, property-specific quote.",
      },
    ],
  },
  {
    slug: "salem",
    name: "Salem",
    state: "Oregon",
    stateShort: "OR",
    region: "Willamette Valley",
    stagingRegion: null,
    heroImage: "/images/hero-staging.webp",
    heroAlt: "Polished staged interior suited to a Salem home by Greylyn Wayne",
    description:
      "Salem's growing market and rising property values make professional staging a smart investment for sellers. Greylyn Wayne brings the state capital the same quality staging and design we bring to Portland's luxury market.",
    marketNote:
      "As the state capital, Salem has a steady, employment-anchored market with distinct character pockets — the historic Grant and Court-Chemeketa districts, the views and newer builds of South Salem, and the increasingly popular West Salem hills. Salem buyers respond to homes that feel cared-for and current, and staging is the most efficient way to project that, especially against the wave of new construction the area continues to add.",
    neighborhoods: [
      "South Salem",
      "West Salem",
      "Grant Historic District",
      "Court-Chemeketa",
      "Keizer (adjacent)",
    ],
    highlights: [
      "Professional staging bringing Portland quality to the Salem market",
      "Experience with South Salem, West Salem, and historic district homes",
      "Staging that helps Salem listings stand out and sell faster",
      "Full interior design services for Salem homeowners",
    ],
    nearby: ["Keizer", "Silverton", "Stayton", "Independence"],
    faqs: [
      {
        question: "Do you stage homes in Salem?",
        answer:
          "Yes. Greylyn Wayne serves Salem and the surrounding Willamette Valley, bringing Portland-caliber staging to the state capital. Contact us to discuss your listing and schedule.",
      },
      {
        question: "Can you stage historic homes in the Grant or Court-Chemeketa districts?",
        answer:
          "We can. Salem's historic homes get staging that honors their architecture and period detail while staying fresh enough to appeal to modern buyers.",
      },
      {
        question: "How does staging help against new construction in Salem?",
        answer:
          "New homes show fully finished, so an empty resale listing looks dated by comparison. Staging closes that gap and lets your home's value and character compete on equal footing.",
      },
      {
        question: "Do you offer interior design for Salem homeowners?",
        answer:
          "Yes — full-service interior design as well as sale staging, for everything from a single-room refresh to a whole-home project.",
      },
    ],
  },
  {
    slug: "corvallis",
    name: "Corvallis",
    state: "Oregon",
    stateShort: "OR",
    region: "Willamette Valley",
    stagingRegion: null,
    heroImage: "/images/portland-interior-design-white-kitchen.webp",
    heroAlt: "Clean, modern staged kitchen suited to a Corvallis home by Greylyn Wayne",
    description:
      "Corvallis's college-town charm and steady housing demand — driven by Oregon State University and a thriving tech sector — make professional staging a smart move for sellers looking to maximize their return.",
    marketNote:
      "Corvallis is anchored by Oregon State and HP, which gives it an unusually stable, well-educated buyer base — relocating faculty, researchers, and tech professionals who often arrive from out of the area and shop online first. They lean toward clean, contemporary interiors, and staged listings give them the confidence to act from a distance. College Hill near campus and the newer homes of NW Corvallis both benefit from staging that reads modern and move-in ready.",
    neighborhoods: [
      "College Hill",
      "Witham Hill",
      "NW Corvallis",
      "Downtown / Central",
      "Timberhill",
    ],
    highlights: [
      "Staging tailored to Corvallis's academic and tech-professional buyers",
      "Experience with homes near OSU campus and surrounding neighborhoods",
      "Clean, modern design that appeals to relocating professionals",
      "Serving Benton County with full staging and design services",
    ],
    nearby: ["Albany", "Philomath", "Monroe", "Lebanon"],
    faqs: [
      {
        question: "Does Greylyn Wayne serve Corvallis?",
        answer:
          "Yes — Corvallis and Benton County are within our service area. We bring the same staging and design expertise we're known for in Portland. Reach out and we'll coordinate timing for your property.",
      },
      {
        question: "Why does staging matter for Corvallis's relocating buyers?",
        answer:
          "Many Corvallis buyers relocate for OSU or the tech sector and shop online before they ever visit. Staged homes photograph far better and give out-of-town buyers the confidence to make an offer sight-unseen or after a single trip.",
      },
      {
        question: "What staging style fits the Corvallis market?",
        answer:
          "Clean and contemporary. Corvallis's academic and professional buyers gravitate to modern, uncluttered interiors that photograph sharply and feel move-in ready.",
      },
      {
        question: "What does staging cost in Corvallis?",
        answer:
          "Most projects range $2,500–$8,000+ depending on home size and rooms staged. We'll quote your specific property for free.",
      },
    ],
  },
  {
    slug: "albany",
    name: "Albany",
    state: "Oregon",
    stateShort: "OR",
    region: "Willamette Valley",
    stagingRegion: null,
    heroImage: "/images/portland-home-staging-character-bedroom.webp",
    heroAlt: "Character-rich staged bedroom suited to a historic Albany home by Greylyn Wayne",
    description:
      "Albany's historic homes and growing new-construction market present distinct staging opportunities. Greylyn Wayne helps Albany sellers present their properties with professional design that drives interest and competitive offers.",
    marketNote:
      "Albany has one of Oregon's largest collections of historic homes — the Monteith and Hackleman districts are full of Victorians and early-century houses with real architectural pull — set against a steady supply of newer construction in North Albany and on the edges. Those two worlds need opposite touches: reverent, character-forward staging for the historics, and contemporary, lifestyle-driven staging for the new builds. Albany's value pricing also means staging delivers strong ROI here.",
    neighborhoods: [
      "Monteith Historic District",
      "Hackleman Historic District",
      "North Albany",
      "Downtown",
    ],
    highlights: [
      "Staging for Albany's historic homes and newer developments",
      "Design that respects historic character while appealing to modern buyers",
      "Affordable staging options for the mid-Willamette Valley market",
      "Full staging and interior design services for Linn County",
    ],
    nearby: ["Corvallis", "Lebanon", "Sweet Home", "Salem"],
    faqs: [
      {
        question: "How do you stage Albany's historic Monteith and Hackleman homes?",
        answer:
          "With real respect for the architecture. We highlight original woodwork, built-ins, and period proportions while keeping the furnishings current, so the home's character is the star and modern buyers can still picture themselves living there.",
      },
      {
        question: "Do you also stage newer construction in North Albany?",
        answer:
          "Yes. For new builds we use contemporary, lifestyle-driven staging that shows off open layouts and modern finishes — a different toolkit than we use on the historics.",
      },
      {
        question: "Is staging cost-effective in Albany's market?",
        answer:
          "Very — Albany's value pricing makes a modest staging investment pay off quickly by helping a home sell faster and stand out. We scale the scope to the home and quote it for free.",
      },
      {
        question: "Does Greylyn Wayne serve Albany and Linn County?",
        answer:
          "We do — full staging and interior design throughout Albany and Linn County. Contact us at (971) 930-0220.",
      },
    ],
  },

  // ─────────────────────────── Oregon Coast ───────────────────────────
  {
    slug: "cannon-beach",
    name: "Cannon Beach",
    state: "Oregon",
    stateShort: "OR",
    region: "Oregon Coast",
    stagingRegion: null,
    heroImage: "/images/hero-interior.webp",
    heroAlt: "Bright coastal-inspired staged interior suited to a Cannon Beach home by Greylyn Wayne",
    description:
      "Cannon Beach's premium coastal market calls for staging that captures the area's natural beauty and relaxed luxury. Greylyn Wayne designs Cannon Beach properties with coastal-inspired interiors that appeal to vacation-home buyers and rental investors alike.",
    marketNote:
      "Cannon Beach is one of the Oregon Coast's most exclusive markets, and its buyers are almost entirely second-home and investment buyers who weigh both lifestyle and rental income. That makes design a financial lever: light, coastal-luxe interiors photograph beautifully for listings and booking platforms, command higher nightly rates, and help a home sell to the next dreamer. The classic move here is to frame the ocean and the famous Haystack Rock views and let natural light do the rest.",
    neighborhoods: [
      "Tolovana Park",
      "Midtown",
      "Presidential Streets",
      "Haystack Heights",
      "Ecola Creek",
    ],
    highlights: [
      "Coastal luxury staging for Cannon Beach's premium market",
      "Short-term rental design to maximize vacation rental income",
      "Beach-inspired interiors that complement ocean views and natural light",
      "Experience with Cannon Beach condos, cottages, and custom homes",
    ],
    nearby: ["Seaside", "Manzanita", "Astoria", "Gearhart"],
    faqs: [
      {
        question: "Do you design and stage Cannon Beach vacation homes?",
        answer:
          "Yes — it's a core part of our coastal work. We design and stage Cannon Beach second homes for both sale appeal and short-term-rental performance, with light, coastal-luxe interiors that photograph beautifully and command strong nightly rates.",
      },
      {
        question: "How do you make the most of an ocean view when staging?",
        answer:
          "We keep the palette natural and the sightlines low so nothing competes with the water and Haystack Rock. Furniture is placed to orient buyers and guests toward the view — the single biggest driver of value here.",
      },
      {
        question: "Can good design really increase rental income in Cannon Beach?",
        answer:
          "Yes. On a competitive coast, photos sell the booking. Thoughtful, photogenic design lifts click-throughs, nightly rates, and reviews — and durable furnishings keep the home looking its best through heavy seasonal use.",
      },
      {
        question: "Does Greylyn Wayne travel to the coast for projects?",
        answer:
          "We do — Cannon Beach and the North Coast are within our service area. Reach out and we'll coordinate the logistics and timeline.",
      },
    ],
  },
  {
    slug: "astoria",
    name: "Astoria",
    state: "Oregon",
    stateShort: "OR",
    region: "Oregon Coast",
    stagingRegion: null,
    heroImage: "/images/portland-home-staging-character-bedroom.webp",
    heroAlt: "Character-rich staged bedroom suited to a historic Astoria home by Greylyn Wayne",
    description:
      "Astoria's Victorian homes and revitalized downtown draw buyers to its character and Columbia River setting. Greylyn Wayne stages Astoria properties with designs that honor the area's history while appealing to modern tastes.",
    marketNote:
      "Astoria's calling card is its hillside Victorians and the working-waterfront character of its downtown — buyers here are often drawn specifically by that history and the river views. Staging needs to celebrate the architecture, the bay windows, and the period detail while keeping interiors livable for modern life. The growing vacation-rental and creative-class influx adds a second buyer type that rewards interiors balancing heritage charm with fresh, photogenic styling.",
    neighborhoods: [
      "Uppertown",
      "Downtown Astoria",
      "Alderbrook",
      "Shively-McClure Historic District",
      "Hillside / Numbered Streets",
    ],
    highlights: [
      "Staging that complements Astoria's Victorian and historic architecture",
      "Design balancing historic character with modern buyer expectations",
      "Experience with Astoria's hillside homes and river views",
      "Vacation rental design for the North Coast market",
    ],
    nearby: ["Warrenton", "Seaside", "Cannon Beach", "Long Beach"],
    faqs: [
      {
        question: "How do you stage Astoria's historic Victorian homes?",
        answer:
          "We lean into the character — the bay windows, the woodwork, the river-view rooms — while keeping the furnishings current enough for modern living. Astoria buyers come for the history, so we celebrate it rather than cover it up.",
      },
      {
        question: "Do you design vacation rentals in Astoria?",
        answer:
          "Yes. Astoria's growing short-term-rental market rewards interiors that balance heritage charm with fresh, photogenic styling — exactly the balance we specialize in for the North Coast.",
      },
      {
        question: "Can you stage hillside homes with Columbia River views?",
        answer:
          "Absolutely. For Astoria's hillside homes we orient the staging to frame the river and bridge views, which are central to the area's appeal.",
      },
      {
        question: "Does Greylyn Wayne serve Astoria?",
        answer:
          "We do — Astoria and the North Coast are within our service area. Contact us to talk through your project and schedule.",
      },
    ],
  },
  {
    slug: "manzanita",
    name: "Manzanita",
    state: "Oregon",
    stateShort: "OR",
    region: "Oregon Coast",
    stagingRegion: null,
    heroImage: "/images/portland-interior-design-white-kitchen.webp",
    heroAlt: "Bright, beachy staged kitchen suited to a Manzanita home by Greylyn Wayne",
    description:
      "Manzanita's quiet, upscale beach community is a favorite for vacation-home buyers. Greylyn Wayne stages and designs Manzanita properties with relaxed coastal interiors that make buyers and guests feel instantly at home.",
    marketNote:
      "Manzanita is the understated, design-conscious end of the North Coast — buyers here want a calm, elevated beach-house feel rather than anything flashy, and many are buying as a retreat that doubles as a rental. Light woods, soft neutrals, and a strong connection to the dunes and Neahkahnie Mountain define the look that sells. Because inventory is limited and prices are high, presentation carries real weight on both the sale and the rental side.",
    neighborhoods: [
      "Manzanita Village",
      "Neahkahnie",
      "Classic Street area",
      "Nehalem (adjacent)",
    ],
    highlights: [
      "Relaxed coastal staging for Manzanita's vacation-home market",
      "Short-term rental design for beach houses and condos",
      "Interiors that maximize ocean views and natural light",
      "Experience with Manzanita's unique beach community aesthetic",
    ],
    nearby: ["Cannon Beach", "Rockaway Beach", "Wheeler", "Nehalem"],
    faqs: [
      {
        question: "What design style works in Manzanita?",
        answer:
          "Calm, elevated, and beachy — light woods, soft neutrals, and a strong connection to the dunes and Neahkahnie Mountain. Manzanita buyers want an understated retreat, not anything flashy, and that's exactly the feel we create.",
      },
      {
        question: "Do you design Manzanita homes for short-term rental?",
        answer:
          "Yes. Many Manzanita owners run their homes as rentals, so we design for photogenic listings, comfortable guest stays, and durable, easy-care furnishings that hold up through the season.",
      },
      {
        question: "Can staging help a Manzanita home sell faster?",
        answer:
          "It can. With limited inventory and high prices, presentation matters — a beautifully staged beach house gives buyers the emotional pull and the rental-income confidence to move quickly.",
      },
      {
        question: "Does Greylyn Wayne serve Manzanita and the North Coast?",
        answer:
          "We do. Reach out and we'll coordinate the timing and logistics for your Manzanita project.",
      },
    ],
  },
  {
    slug: "seaside",
    name: "Seaside",
    state: "Oregon",
    stateShort: "OR",
    region: "Oregon Coast",
    stagingRegion: null,
    heroImage: "/images/portland-home-staging-loft-living-room.webp",
    heroAlt: "Comfortable coastal staged living room suited to a Seaside home by Greylyn Wayne",
    description:
      "Seaside's active vacation-rental market and family-friendly appeal make professional staging and design a valuable investment. Greylyn Wayne helps Seaside owners present homes for sale or optimize them for maximum rental income.",
    marketNote:
      "Seaside is the North Coast's family-vacation hub, with a high concentration of rental properties that need to sleep groups, survive heavy turnover, and photograph well against a crowded field of listings. Design here is practical and revenue-minded: durable, stylish, family-friendly interiors that maximize sleeping capacity and booking appeal. For sellers, the same qualities — plus a clear picture of rental potential — are what move a Seaside home.",
    neighborhoods: [
      "The Prom / Downtown",
      "Seaside Heights",
      "Gearhart (adjacent)",
      "Cove area",
    ],
    highlights: [
      "Staging and design for Seaside's vacation rental market",
      "Durable, stylish interiors built for rental property performance",
      "Experience with Seaside condos, townhomes, and beach houses",
      "Design that maximizes rental bookings and guest satisfaction",
    ],
    nearby: ["Cannon Beach", "Gearhart", "Astoria", "Manzanita"],
    faqs: [
      {
        question: "Do you design Seaside homes for vacation-rental income?",
        answer:
          "Yes — it's central to our coastal work. We design Seaside rentals to sleep groups comfortably, photograph well for booking platforms, and use durable, easy-care furnishings that hold up through heavy family-season turnover.",
      },
      {
        question: "Can you maximize how many guests a Seaside rental sleeps?",
        answer:
          "We design with capacity in mind — smart bunk and sleeping arrangements that increase the guest count (and nightly rate) without making the home feel crowded. More heads in beds, done tastefully.",
      },
      {
        question: "Do you stage Seaside homes for sale too?",
        answer:
          "Yes. For resale we stage to highlight both the family-getaway lifestyle and the rental-income potential, which is often a major part of a Seaside buyer's decision.",
      },
      {
        question: "Does Greylyn Wayne travel to Seaside?",
        answer:
          "We do — Seaside and the North Coast are within our service area. Contact us to plan your project.",
      },
    ],
  },
  {
    slug: "lincoln-city",
    name: "Lincoln City",
    state: "Oregon",
    stateShort: "OR",
    region: "Oregon Coast",
    stagingRegion: null,
    heroImage: "/images/hero-interior.webp",
    heroAlt: "Light-filled coastal staged interior suited to a Lincoln City home by Greylyn Wayne",
    description:
      "Lincoln City's oceanfront properties and active vacation-rental market benefit from design that drives bookings and buyer interest. Greylyn Wayne serves the Central Coast with staging and interior design tailored to the coastal lifestyle.",
    marketNote:
      "Lincoln City spans seven miles of coast and a wide range of property types — oceanfront condos, beach cottages, and investment homes across Roads End, Nelscott, and Taft. It's a heavily rental-driven market where design choices translate directly into booking revenue. Bright, durable, ocean-oriented interiors photograph well, raise nightly rates, and reassure both guests and resale buyers, making professional design one of the highest-leverage investments an owner can make here.",
    neighborhoods: [
      "Roads End",
      "Nelscott",
      "Taft",
      "Oceanlake",
      "Cutler City",
    ],
    highlights: [
      "Coastal staging for Lincoln City's diverse property market",
      "Short-term rental design to boost vacation rental performance",
      "Experience with oceanfront condos, homes, and investment properties",
      "Interior design that captures the Central Coast lifestyle",
    ],
    nearby: ["Depoe Bay", "Newport", "Pacific City", "Neskowin"],
    faqs: [
      {
        question: "Do you design Lincoln City vacation rentals?",
        answer:
          "Yes. Lincoln City is a rental-driven market, and we design interiors that photograph beautifully for booking platforms, hold up to heavy use, and orient guests toward the ocean — all of which raise occupancy and nightly rates.",
      },
      {
        question: "Can you work with oceanfront condos and cottages?",
        answer:
          "Absolutely — from Roads End to Taft, we work with oceanfront condos, beach cottages, and investment homes, tailoring the design to each property type and its target guest or buyer.",
      },
      {
        question: "Does good design pay off for a Lincoln City rental?",
        answer:
          "It's one of the best investments an owner can make here. On a coast full of listings, photogenic, well-designed interiors win the booking and command higher rates — and the same appeal carries through at resale.",
      },
      {
        question: "Does Greylyn Wayne serve Lincoln City and the Central Coast?",
        answer:
          "We do. Reach out and we'll coordinate the logistics and timing for your Central Coast project.",
      },
    ],
  },

  // ─────────────────────────── Southwest Washington ───────────────────────────
  {
    slug: "vancouver",
    name: "Vancouver",
    state: "Washington",
    stateShort: "WA",
    region: "Southwest Washington",
    stagingRegion: "SW Washington",
    heroImage: "/images/portland-home-staging-living-room.webp",
    heroAlt: "Professionally staged living room in a Vancouver, WA home by Greylyn Wayne",
    description:
      "Vancouver's booming market — with no state income tax and easy Portland access — draws buyers from across the region. Greylyn Wayne brings full staging and interior-design expertise across the river to Clark County.",
    marketNote:
      "Vancouver's no-income-tax advantage pulls a steady stream of buyers across the river from Oregon, many of them relocating professionals shopping online before they tour. The market runs from the urban-renaissance condos and townhomes of the Waterfront and downtown to the established neighborhoods of Felida and Salmon Creek and the new construction filling the city's edges. We stage to each context, and as a firm that already works on both sides of the Columbia, Vancouver is core territory for us.",
    neighborhoods: [
      "The Waterfront",
      "Felida",
      "Salmon Creek",
      "Cascade Park",
      "Fishers Landing",
      "Hazel Dell",
    ],
    highlights: [
      "Full staging and design services for Clark County's competitive market",
      "Experience with Vancouver's Waterfront, Felida, and Salmon Creek areas",
      "Modern staging that appeals to buyers relocating from Portland",
      "New construction staging for Vancouver's growing developments",
    ],
    nearby: ["Camas", "Ridgefield", "Battle Ground", "Washougal", "Portland"],
    faqs: [
      {
        question: "Does Greylyn Wayne stage homes in Vancouver, WA?",
        answer:
          "Yes — Vancouver and Clark County are core to our service area. We already work on both sides of the Columbia, so crossing the river for Vancouver listings is routine, with the same inventory and team.",
      },
      {
        question: "How do you stage for buyers relocating from Portland?",
        answer:
          "Many Vancouver buyers move over for the no-income-tax advantage and shop online first. We stage with clean, modern, photo-forward interiors that earn the click and give relocating buyers confidence to tour or offer.",
      },
      {
        question: "Do you stage Waterfront condos and new construction?",
        answer:
          "Both. We stage Waterfront and downtown condos and townhomes to feel urban and move-in ready, and we work with builders and sellers on new construction across Vancouver's growing developments.",
      },
      {
        question: "Which Vancouver neighborhoods do you serve?",
        answer:
          "The Waterfront, Felida, Salmon Creek, Cascade Park, Fishers Landing, Hazel Dell, and the rest of the city.",
      },
    ],
  },
  {
    slug: "camas",
    name: "Camas",
    state: "Washington",
    stateShort: "WA",
    region: "Southwest Washington",
    stagingRegion: "SW Washington",
    heroImage: "/images/sod-2025-alla-famiglia.webp",
    heroAlt: "Upscale staged interior in a Camas, WA home by Greylyn Wayne",
    description:
      "Camas's top-rated schools, charming downtown, and upscale neighborhoods make it one of the most desirable communities in Southwest Washington. Greylyn Wayne stages Camas properties with the polished, premium look this market demands.",
    marketNote:
      "Camas is SW Washington's prestige market — the schools, the historic downtown, and view neighborhoods like Prune Hill and Lacamas Shores draw buyers with high expectations and budgets to match. Many are move-up families and relocating professionals who want a turnkey, designer-finished home. Premium staging that meets that standard — quality furnishings, view-forward layouts — is what keeps Camas listings competitive at the top of the local market.",
    neighborhoods: [
      "Prune Hill",
      "Lacamas Shores",
      "Grass Valley",
      "North Shore",
      "Downtown Camas",
    ],
    highlights: [
      "Premium staging for Camas's upscale residential market",
      "Experience with homes in Prune Hill, Lacamas Shores, and North Shore",
      "Design that matches the expectations of Camas's discerning buyers",
      "Staging for new construction and custom homes in East Clark County",
    ],
    nearby: ["Washougal", "Vancouver", "Ridgefield", "Battle Ground"],
    faqs: [
      {
        question: "Is your staging suited to Camas's upscale market?",
        answer:
          "Yes. As a Street of Dreams featured designer, we keep premium inventory for exactly this kind of market. Camas's Prune Hill and Lacamas Shores buyers expect a designer-finished feel, and we deliver furnishings and styling that match the price point.",
      },
      {
        question: "Do you stage view and lakefront-style homes in Camas?",
        answer:
          "We do. For homes near Lacamas Lake and on Prune Hill, we orient the staging to frame the views and natural light, which are central to those homes' premium positioning.",
      },
      {
        question: "Do you stage new construction and custom homes in Camas?",
        answer:
          "Yes — both new builds and custom homes across East Clark County. We match contemporary architecture with furnishings that show off open plans and high-end finishes.",
      },
      {
        question: "Does Greylyn Wayne serve Camas from Portland?",
        answer:
          "We do — Camas is an easy reach across the river, and we serve it routinely with the same team and inventory. Contact us at (971) 930-0220.",
      },
    ],
  },
  {
    slug: "ridgefield",
    name: "Ridgefield",
    state: "Washington",
    stateShort: "WA",
    region: "Southwest Washington",
    stagingRegion: "SW Washington",
    heroImage: "/images/portland-staged-kitchen-hero.webp",
    heroAlt: "Bright staged kitchen in a new Ridgefield, WA home by Greylyn Wayne",
    description:
      "Ridgefield's rapid growth and new master-planned communities create strong demand for professional staging. Greylyn Wayne helps Ridgefield sellers and builders present properties that attract the families and professionals moving to the area.",
    marketNote:
      "Ridgefield is one of SW Washington's fastest-growing communities, with master-planned neighborhoods like Pioneer Canyon and Discovery Ridge adding new homes at a rapid clip. That means lots of similar new construction competing at once — the perfect environment for staging to differentiate a listing. Buyers are largely families relocating for space and schools, and builders here lean on model-home staging to help buyers envision a community that's still taking shape.",
    neighborhoods: [
      "Discovery Ridge",
      "Pioneer Canyon",
      "Taverner Ridge",
      "Downtown Ridgefield",
      "South Ridge",
    ],
    highlights: [
      "Staging for Ridgefield's booming new construction market",
      "Experience with Discovery Ridge, Pioneer Canyon, and other communities",
      "Modern staging that appeals to families relocating to Ridgefield",
      "Builder partnerships for model home staging and design",
    ],
    nearby: ["Vancouver", "Battle Ground", "Woodland", "La Center"],
    faqs: [
      {
        question: "Do you work with builders on Ridgefield model homes?",
        answer:
          "Yes — model-home staging is a specialty. In Ridgefield's master-planned communities, a well-staged model helps buyers envision the lifestyle of a neighborhood that's still being built, which accelerates sales for the whole development.",
      },
      {
        question: "How does staging help when so much new construction looks alike?",
        answer:
          "With many similar floor plans competing at once, staging is the differentiator. A staged Ridgefield home reads warmer and more move-in ready than the empty listing next door — and that's what wins the offer.",
      },
      {
        question: "What staging style fits Ridgefield's buyers?",
        answer:
          "Modern and family-forward. Ridgefield's buyers are largely families relocating for space and schools, so we stage to show off open plans, flexible rooms, and the practical, lifestyle-driven appeal they're after.",
      },
      {
        question: "Does Greylyn Wayne serve Ridgefield?",
        answer:
          "We do — Ridgefield and north Clark County are within our service area. Contact us to discuss your listing or community.",
      },
    ],
  },
  {
    slug: "washougal",
    name: "Washougal",
    state: "Washington",
    stateShort: "WA",
    region: "Southwest Washington",
    stagingRegion: "SW Washington",
    heroImage: "/images/sod-2024-vista.webp",
    heroAlt: "Staged home with Gorge views suited to a Washougal, WA property by Greylyn Wayne",
    description:
      "Washougal's Gorge-adjacent setting and growing community offer unique appeal for buyers seeking natural beauty with suburban convenience. Greylyn Wayne stages Washougal properties to highlight views, outdoor access, and the area's lifestyle draw.",
    marketNote:
      "Washougal sits where the suburbs meet the Columbia River Gorge, and that setting is its biggest selling point — buyers come for the river access, the hiking, and the small-town feel within reach of Vancouver and Portland. Staging here works best when it frames the views and the indoor-outdoor lifestyle, whether the home is an established neighborhood property or one of the newer builds climbing the hills. As an East Clark County market neighboring Camas, it shares some of that upscale, view-driven sensibility.",
    neighborhoods: [
      "Downtown Washougal",
      "Columbia River Waterfront",
      "Bear Prairie",
      "Hillside / North Washougal",
    ],
    highlights: [
      "Staging that highlights Washougal's Gorge views and natural setting",
      "Experience with both established and new construction properties",
      "Design appealing to buyers drawn to Washougal's outdoor lifestyle",
      "Serving East Clark County with full staging and design services",
    ],
    nearby: ["Camas", "Vancouver", "Hood River", "Stevenson"],
    faqs: [
      {
        question: "How do you stage a Washougal home with Gorge or river views?",
        answer:
          "We orient the staging to frame the views and the outdoor living spaces — the river, the hills, the light. In Washougal those features are the main draw, so we make sure they're the first thing buyers notice in photos and in person.",
      },
      {
        question: "Do you stage both older and new homes in Washougal?",
        answer:
          "Yes — established neighborhood homes and the newer builds on the hillsides alike. We adjust the look to the home while keeping the focus on Washougal's outdoor, view-driven lifestyle.",
      },
      {
        question: "Is Washougal within your service area?",
        answer:
          "It is — Washougal and East Clark County are an easy reach for us, and we serve them with the same team and inventory we use across the metro.",
      },
      {
        question: "What does staging cost in Washougal?",
        answer:
          "Most projects fall in the $2,500–$8,000+ range depending on home size and rooms staged. We'll quote your specific property for free.",
      },
    ],
  },
  {
    slug: "battle-ground",
    name: "Battle Ground",
    state: "Washington",
    stateShort: "WA",
    region: "Southwest Washington",
    stagingRegion: "SW Washington",
    heroImage: "/images/portland-home-staging-bedroom.webp",
    heroAlt: "Warm, family-friendly staged bedroom in a Battle Ground, WA home by Greylyn Wayne",
    description:
      "Battle Ground's family-friendly community and steady growth make professional staging a smart investment for sellers. Greylyn Wayne stages Battle Ground homes with warm, inviting designs that resonate with the area's core buyer demographic.",
    marketNote:
      "Battle Ground is north Clark County's family hub — buyers come for affordability relative to Camas, larger lots, and a small-town feel, often trading a tighter Vancouver or Portland home for more room. Staging that feels warm and family-oriented lands best here, helping buyers picture settling in. The market mixes established neighborhoods with steady new construction in areas like Meadow Glade and Cherry Grove, and staged homes consistently photograph and show better than the empty competition.",
    neighborhoods: [
      "Downtown Battle Ground",
      "Meadow Glade",
      "Cherry Grove",
      "Lewisville",
      "Hockinson (adjacent)",
    ],
    highlights: [
      "Family-oriented staging for Battle Ground's growing market",
      "Experience with new developments and established neighborhoods",
      "Warm, inviting design that appeals to families and young professionals",
      "Competitive staging rates for the North Clark County market",
    ],
    nearby: ["Vancouver", "Ridgefield", "Brush Prairie", "Yacolt"],
    faqs: [
      {
        question: "What staging style fits Battle Ground's market?",
        answer:
          "Warm and family-oriented. Battle Ground buyers are often families moving for more space and a small-town feel, so we stage to feel welcoming and lived-in, helping them picture settling in rather than just touring.",
      },
      {
        question: "Do you stage both new and established homes in Battle Ground?",
        answer:
          "Yes — established neighborhoods and the newer construction in Meadow Glade, Cherry Grove, and beyond. We tailor the look to the home while keeping the broad, family-friendly appeal the market wants.",
      },
      {
        question: "Are your rates competitive for the Battle Ground market?",
        answer:
          "They are. We scale the scope to the home and the local price points, so Battle Ground sellers get a polished result with strong ROI. Quotes are always free.",
      },
      {
        question: "Does Greylyn Wayne serve Battle Ground?",
        answer:
          "We do — Battle Ground and north Clark County are within our service area, served by the same team and inventory we use across the metro.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

/**
 * Cities that have a real location/market hero photo (GW's own scenic shots, recovered
 * from the prior site, self-hosted at /images/service-areas/{slug}.webp). When present,
 * the city page uses this in place of the generic brand-interior `heroImage`. Value = alt text.
 * The remaining cities fall back to `heroImage` until their own local photo is added here.
 */
export const cityHeroPhotos: Record<string, string> = {
  portland: "Downtown Portland, Oregon — home staging & interior design by Greylyn Wayne",
  "lake-oswego": "Lake Oswego, Oregon — luxury home staging & interior design by Greylyn Wayne",
  "west-linn": "West Linn, Oregon — home staging & interior design by Greylyn Wayne",
  "happy-valley": "Happy Valley, Oregon — home staging & interior design by Greylyn Wayne",
  bend: "Bend, Oregon — home staging & interior design by Greylyn Wayne",
  eugene: "Eugene, Oregon — home staging & interior design by Greylyn Wayne",
  "hood-river": "Hood River, Oregon — home staging & interior design by Greylyn Wayne",
  salem: "Salem, Oregon — home staging & interior design by Greylyn Wayne",
  vancouver: "Vancouver, Washington — home staging & interior design by Greylyn Wayne",
  camas: "Camas, Washington — home staging & interior design by Greylyn Wayne",
  astoria: "Astoria, Oregon — home staging & interior design by Greylyn Wayne",
  "cannon-beach": "Cannon Beach, Oregon — home staging & interior design by Greylyn Wayne",
  sherwood: "Sherwood, Oregon — home staging & interior design by Greylyn Wayne",
  "oregon-city": "Oregon City, Oregon — home staging & interior design by Greylyn Wayne",
  ridgefield: "Ridgefield, Washington — home staging & interior design by Greylyn Wayne",
};

/** Resolve the hero image + alt for a city, preferring its real location photo. */
export function cityHero(city: CityData): { src: string; alt: string } {
  const alt = cityHeroPhotos[city.slug];
  return alt
    ? { src: `/images/service-areas/${city.slug}.webp`, alt }
    : { src: city.heroImage, alt: city.heroAlt };
}

/**
 * Per-city interior-design content (the "Beyond Staging" section + interior
 * FAQs). Kept as a slug-keyed map so it composes onto the existing CityData
 * without touching the 33 city objects. The [city] template renders `note` in a
 * dedicated "Interior Design in {city}" section and merges `faqs` into the page
 * + FAQ schema, so the interior-design Service schema is backed by real,
 * market-specific content. See ARCHITECTURE.md (new service area row).
 */
export const cityInteriorContent: Record<string, { note: string; faqs: CityFAQ[] }> = {
  "portland": {
    note: "Portland interior designers work in one of the most architecturally varied cities in the country, and our approach starts there: a 1912 Alameda Craftsman with original fir built-ins calls for a different plan than a Pearl District concrete loft or a new Sellwood infill with an open main floor. Greylyn Wayne offers full-service interior design in Portland — whole-home projects, single-room refreshes, color and finish selection, furniture sourcing, and the spatial planning that makes older floor plans work for how people actually live now. Because our studio and warehouse are in SE Portland, we can walk your home quickly, test scale against real inventory, and manage installs without long-distance logistics. Jody Wallace, a four-time NW Natural Street of Dreams featured designer, leads every project — and the same eye that stages Portland homes to sell is what makes a home you're keeping finally feel finished.",
    faqs: [
      {
        question: "Do you offer full interior design in Portland, or only home staging?",
        answer:
          "Both, and they feed each other. Staging is how many Portland homeowners first find us, but full-service interior design is half of what the studio does — whole-home projects, single-room refreshes, color consultations, furniture sourcing, and finish selection. If you've loved how one of our staged homes felt, we can build that feeling into the home you actually live in. Call (971) 930-0220 to talk through your project.",
      },
      {
        question: "Can you design around the character of an older Portland home?",
        answer:
          "That's the heart of our Portland work. Craftsmans in Laurelhurst and Alameda, foursquares in Irvington, mid-century ranches near Mt. Tabor — we design with the architecture, keeping original woodwork, built-ins, and proportions as the backbone while updating color, furniture, and lighting so the home feels current rather than preserved.",
      },
    ],
  },
  "lake-oswego": {
    note: "Lake Oswego homeowners tend to arrive with a clear standard: they've seen what a professionally finished home looks like, and they want theirs to hold up beside it. As a Lake Oswego interior designer with four NW Natural Street of Dreams features, Jody Wallace works comfortably at that level — whole-home design for lakefront and Country Club estates, single-room projects in First Addition bungalows, and everything between. The work here often centers on light and water: palettes and finishes chosen to flatter a lake view instead of competing with it, furniture planned so main rooms orient to the water without reading like a showroom, and materials with the depth this market expects. Whether you're rethinking a Lake Grove kitchen's finishes, furnishing a Forest Highlands new build from the studs out, or finally giving a formal living room a reason to be used, we bring designer-grade sourcing rather than catalog defaults.",
    faqs: [
      {
        question: "How is interior design priced for a larger Lake Oswego home?",
        answer:
          "By scope, not by formula. A single-room project in First Addition and a whole-home plan for a lakefront estate are quoted very differently, and we set the furnishings budget together up front so there are no surprises mid-project. Every engagement starts with a walkthrough and a clear proposal — call (971) 930-0220 to schedule one.",
      },
      {
        question: "Do you design lakefront homes differently than other Lake Oswego properties?",
        answer:
          "Yes — the water changes the brief. Lakefront rooms deal with strong reflected light, big glass, and a view that should stay the main event, so we plan sightlines, palettes, and window treatments around it. Outdoor rooms get treated as real living space too, since lakeside decks and terraces are half the point of these homes.",
      },
    ],
  },
  "west-linn": {
    note: "Much of our interior design in West Linn starts right after a move: families trade a close-in Portland house for square footage in Hidden Springs or Skyline Ridge, and suddenly there are twice as many rooms to make sense of. We plan whole homes so each space earns its keep — a walkout lower level that becomes a real media room and guest suite instead of a catch-all, a great room furnished to the territorial view rather than the TV, a dining room the family actually uses. A West Linn interior designer also has to respect the light and sightlines these hillside homes were built around; we choose color, furniture placement, and window treatments that work with the view, not against it. From single rooms in Willamette's older homes to full furnishing plans for custom builds, the goal is simple: a house that finally feels as big as it is.",
    faqs: [
      {
        question: "We just moved up to a larger West Linn home — can you furnish the whole thing?",
        answer:
          "That's our most common West Linn project. We start with a whole-home plan, decide together which existing pieces still earn a place, and source the rest — phased over time if that suits your budget better than one big install. The plan keeps every purchase working toward the same finished house. Call (971) 930-0220 and we'll walk it with you.",
      },
      {
        question: "How do you design around a West Linn view?",
        answer:
          "We treat the view as the room's largest piece of art. Furniture is scaled and angled so the territorial outlook stays in the sightline from the main seating, palettes stay quiet enough not to compete, and window treatments manage western sun without curtaining off the reason you bought the house.",
      },
    ],
  },
  "beaverton": {
    note: "Beaverton's housing stock is full of good bones from the '70s, '80s, and '90s — solid ranches in Cedar Hills, two-stories in Murray Hill and Somerset — that read dated inside long before they need a remodel. That's where interior design in Beaverton earns its keep: new color, lighting, furniture, and finish choices can move a house twenty years forward without touching a wall. We also do a steady stream of work for relocating professionals — Nike, Intel, and the tech corridor bring people to Beaverton who've just bought and want the home livable and finished quickly, not furnished over three years of weekends. Whether it's a single dated family room, a whole-home plan for a new purchase, or a Beaverton townhome that needs careful space planning to live larger than its footprint, we design to the way this market actually lives: practical, contemporary, and unfussy.",
    faqs: [
      {
        question: "Can you update my dated Beaverton home without a full remodel?",
        answer:
          "Usually, yes — and it's often the smarter first move. A designer-led refresh of color, lighting, furniture, textiles, and targeted finishes transforms how a '70s–'90s Beaverton home feels for a fraction of remodel cost. We'll also tell you honestly when a room's problem really is the wall, not the palette.",
      },
      {
        question: "I'm relocating to Beaverton for work — how fast can the house be ready?",
        answer:
          "Faster than you'd guess. We can start from your floor plan and photos before you arrive, make decisions by video, and prioritize in-stock sourcing so the essential rooms are furnished and functional close to move-in, with longer-lead pieces following. Call (971) 930-0220 and we'll build the timeline around your start date.",
      },
    ],
  },
  "tigard": {
    note: "Tigard families ask more of their homes than almost any market we serve — the same rooms host homework, remote work, dinner, and a decade of growing kids. Our interior design in Tigard is built around that reality: durable, cleanable materials that still look considered, storage that's planned rather than bolted on, and layouts that give every room one clear job. Bull Mountain's larger homes often need a full furnishing plan to keep big bonus rooms and formal spaces from going unused, while Summerlake and Metzger's more compact homes reward tight space planning. We handle whole-home projects and single rooms alike — a family room that survives the family, a primary suite that finally feels like it belongs to the adults, a home office that isn't a corner of the guest room. Practical doesn't have to mean plain; proving that is a Tigard interior designer's whole job.",
    faqs: [
      {
        question: "Can you design a Tigard home that stands up to kids and pets?",
        answer:
          "Yes — it's a specialty born of necessity in this market. Performance fabrics that shrug off spills, rugs that hide a season of soccer cleats, finishes that wipe clean, and furniture without precious edges. The trick is doing it without the house looking defensive; done right, guests see a beautiful room and you see one you never worry about.",
      },
      {
        question: "Do we have to design the whole Tigard house at once?",
        answer:
          "No. Many of our Tigard projects run in phases — we build the whole-home plan up front so colors, furniture, and finishes all pull in one direction, then execute room by room as budget allows. You avoid the expensive mistake of piecemeal purchases that never quite add up. Call (971) 930-0220 to talk through a phased plan.",
      },
    ],
  },
  "tualatin": {
    note: "Tualatin gives an interior designer two very different briefs. The established neighborhoods around Tualatin Commons — Byrom, Sagert, Ibach — are full of comfortable homes from the '80s and '90s whose interiors want warming and updating: fresh palettes, better lighting, furniture that fits the rooms as they actually are. The newer construction on the city's edges has the opposite problem — crisp, open, and blank, waiting for someone to give it character beyond the builder's default gray. We do both sides of that work: whole-home furnishing plans for new builds, single-room refreshes for long-held houses, and the color, finish, and spatial planning decisions in between. People choose Tualatin for its settled, small-city comfort and easy river access, and interior design in Tualatin should deliver the same feeling inside — rooms that look composed but live easy, from the front room to the back patio.",
    faqs: [
      {
        question: "Our new Tualatin build feels builder-basic — can you fix that?",
        answer:
          "That's one of our favorite assignments. Builder homes arrive with fine bones and zero personality, so we layer in what's missing: real color instead of default greige, lighting beyond the recessed cans, window treatments, and furniture scaled to the open plan. The house stops feeling like the model and starts feeling like yours.",
      },
      {
        question: "Do you take single-room projects in Tualatin, or only whole homes?",
        answer:
          "Both. Plenty of Tualatin projects start with one room that's bothered you for years — a living room that never came together, a dining space the family avoids — and we're glad to solve just that. Many clients then phase into other rooms later, using the first as the design's anchor.",
      },
    ],
  },
  "hillsboro": {
    note: "Hillsboro's buyers move fast and settle fast — a relocation to Intel or the Silicon Forest often means buying a South Hillsboro new build or an Orenco Station townhome and needing it genuinely livable within weeks. Our interior design in Hillsboro is shaped around that: efficient whole-home furnishing plans, clean contemporary palettes that suit the area's newer architecture, and space planning that makes a compact townhome function like something larger. Orenco's urbanist floor plans reward precision — furniture scaled to the room, storage designed in, sightlines kept open — while South Hillsboro's houses want warmth layered over builder finishes so they stop feeling like the model home down the street. Many of our Hillsboro clients arrive from out of state or overseas, so we're comfortable working from floor plans and video before you land — the design can be moving before the moving truck is.",
    faqs: [
      {
        question: "Can you start designing before we even move to Hillsboro?",
        answer:
          "Yes — it's how many Hillsboro projects begin. Send the floor plan and listing photos, and we'll develop the space plan, palette, and furniture selections remotely, reviewing everything by video. By the time you get the keys, orders are placed and the install is scheduled. Call (971) 930-0220 to start before your relocation date.",
      },
      {
        question: "What design approach suits Orenco Station's townhomes and condos?",
        answer:
          "Precision over volume. Orenco's compact, well-designed floor plans punish oversized furniture and reward pieces scaled exactly to the room, built-in-feeling storage, and a light, current palette that keeps sightlines open. The goal is a home that lives larger than its square footage — which is exactly what these floor plans were drawn to do.",
      },
    ],
  },
  "sherwood": {
    note: "Much of Sherwood's housing went up in the last few decades — family-sized homes in Woodhaven, Murdock, and Snyder that share floor plans with half the street. Interior design in Sherwood is largely the art of making one of those homes unmistakably yours: color drawn from more than the builder's three-scheme menu, lighting that replaces the contractor basics, furniture chosen for the family that actually lives there. Old Town is the other half of the story — older homes with genuine character that deserve interiors as warm as the neighborhood feels on a summer evening. Our work here leans inviting rather than austere, which suits how Sherwood lives: kitchens that host, bonus rooms with a real purpose, porches and patios treated as rooms of their own. Whether it's one room or the whole house, a Sherwood interior designer should design for settling in — that's the reason people move here.",
    faqs: [
      {
        question: "Our Sherwood house looks like every other one on the street — can design change that?",
        answer:
          "Completely. Shared floor plans are only identical until someone makes real choices inside them. Conviction in the color, lighting with actual character, furniture and art chosen for your family — those decisions separate your home from the neighbors' faster than any remodel. It's the highest-return design work we do in Sherwood's newer neighborhoods.",
      },
      {
        question: "How does an interior design project in Sherwood usually start?",
        answer:
          "With a walkthrough. We look at how your household actually uses the house, talk budget honestly, and come back with a concept and plan — whole-home or one room at a time. From there we handle sourcing, ordering, and installation. Call (971) 930-0220 to set up the first visit.",
      },
    ],
  },
  "wilsonville": {
    note: "Wilsonville's two signature communities call for almost opposite design instincts, and we practice both. In Villebois, the townhomes and compact lots reward smart space planning — furniture scaled to European-inspired floor plans, storage that works hard, and a fresh, current palette to match the neighborhood's walkable energy. In Charbonneau, much of the work is rightsizing: homeowners arriving from larger houses who want fewer, better things — refined, low-maintenance interiors where every piece was chosen rather than kept by default. Between them sit Canyon Creek and Montebello's family homes and a steady flow of relocating professionals who need a whole house furnished on a deadline. A Wilsonville interior designer has to read which brief is which. We start every project with the home, the owner, and how the next ten years should feel — then build the color, furnishing, and finish plan to match.",
    faqs: [
      {
        question: "We're downsizing to Charbonneau — can you help us decide what to keep?",
        answer:
          "Yes, and it's often the most valuable part of the project. We edit your existing furnishings with you, keep the pieces that fit the new home's scale and the life you want there, and design around them — sourcing fewer, better things for the rest. The result feels curated, not compressed. Call (971) 930-0220 to talk it through.",
      },
      {
        question: "Do you design Villebois townhomes?",
        answer:
          "We do, and we enjoy them — Villebois floor plans are compact but thoughtful, and they respond beautifully to precise space planning. Right-sized furniture, hardworking storage, and a light, current palette make these homes live far larger than their footprint while keeping the fresh character the neighborhood is known for.",
      },
    ],
  },
  "oregon-city": {
    note: "Oregon City's best interiors respect a simple fact: many of these homes were here long before current trends and will outlast them too. Our interior design in Oregon City splits between the historic stock on the McLoughlin bluff — where period woodwork, plaster, and proportions set the rules, and our job is choosing color, lighting, and furnishings that honor them — and the newer hillside homes in Caufield and Holcomb, where river and valley views should drive the whole plan. We're comfortable with the judgment calls old houses demand: which walls can carry a saturated heritage color, how to light a room that was wired in 1925, how to furnish small formal rooms so they get used instead of admired. And because Oregon City offers more house for the money than most of Clackamas County, we scope design work to match — high impact, honest budgets.",
    faqs: [
      {
        question: "Can you design a McLoughlin district home without making it a museum?",
        answer:
          "That's exactly the balance we aim for. The original woodwork, built-ins, and proportions stay the stars; around them we bring current furniture, layered lighting, and color that's period-informed rather than period-costume. The house should read as a home with history, not a house stuck in it.",
      },
      {
        question: "Is hiring an interior designer realistic at Oregon City price points?",
        answer:
          "Yes — we scale the engagement to the home. That might mean a design plan and shopping list you execute yourself, a single room done completely, or a phased whole-home project spread over a year or two. Good design prevents expensive purchasing mistakes, which is worth the most in value-minded markets. Call (971) 930-0220 for an honest scope.",
      },
    ],
  },
  "happy-valley": {
    note: "Happy Valley's newer homes are generous by design — great rooms open to double-height entries, oversized kitchens, bonus rooms on every level — and that generosity is exactly what makes them hard to furnish. Standard-sized furniture disappears in these spaces, and interiors end up feeling sparse even after real money has been spent. Our interior design in Happy Valley starts with scale: pieces substantial enough to hold a two-story wall, lighting that brings tall ceilings down to human height, and zoning that turns one big room into living, dining, and conversation areas that each feel intentional. Many clients in Pleasant Valley and Scouters Mountain come to us straight from closing on a new build, wanting the home to feel genuinely finished rather than builder-beige by default. Whole-home plans are the sweet spot here, but we take on single spaces too — a great room done right changes the entire house.",
    faqs: [
      {
        question: "Why does my Happy Valley great room feel empty no matter what I buy?",
        answer:
          "Almost always scale and zoning. Double-height rooms swallow standard furniture, and one seating arrangement can't hold a space meant for three. We fix both — substantial pieces, larger rugs, lighting hung at the right height, and distinct zones for living, dining, and conversation — so the room finally feels as impressive occupied as it did empty.",
      },
      {
        question: "Do you work with brand-new Happy Valley homes?",
        answer:
          "Constantly — many clients call us within weeks of closing. We layer real design onto the builder's finishes: color with conviction, lighting beyond the recessed cans, window treatments, and a furnishing plan scaled to the architecture. Call (971) 930-0220 and we'll start from your floor plan.",
      },
    ],
  },
  "milwaukie": {
    note: "Milwaukie's charm is real — and so are its floor plans. Much of the city's housing is mid-century and older, with the smaller, compartmentalized rooms that era built: a living room that seats five, a dining room that fits a table and little else. Interior design in Milwaukie is a space-planning discipline first. We choose furniture scaled to the actual rooms, use color and light to open sightlines, and find the storage these houses never came with — so a Historic Milwaukie or Ardenwald home feels bigger without moving a wall. It's also a market where good design doesn't require a luxury budget; we scope projects honestly, from a single-room refresh to a whole-home plan, and our SE Portland studio is minutes away, which keeps visits and installs easy. The goal is interiors with the same unpretentious warmth that's drawing people to Milwaukie in the first place.",
    faqs: [
      {
        question: "Can you make my Milwaukie home's small rooms feel larger?",
        answer:
          "Yes — without a contractor. Correctly scaled furniture, lighter palettes that carry room to room, layered lighting instead of one overhead fixture, and storage that clears the visual clutter all make mid-century Milwaukie rooms live noticeably bigger. It's the most cost-effective transformation these houses can get.",
      },
      {
        question: "Do you work with modest design budgets in Milwaukie?",
        answer:
          "We do, and we're straightforward about it. A project can be a paid consultation and a plan you execute yourself, one room done completely, or a phased whole-home design — whatever the budget genuinely supports. Being minutes away in SE Portland keeps our visits easy and the process efficient. Call (971) 930-0220 for an honest scope.",
      },
    ],
  },
  "canby": {
    note: "Design in Canby answers to the land. People come here for acreage, shop space, and a real small-town downtown, and the houses — farmhouses, ranches, newer builds on big lots — live differently than metro homes: mudrooms that handle actual mud, kitchens that feed a crowd, sightlines that end in pasture instead of a neighbor's fence. Our interior design in Canby leans warm and grounded to match — natural materials, sturdy comfortable furniture, palettes drawn from the landscape — rather than an urban-modern look that fights the setting. Farmhouse style is easy to do badly; done well, it skips the mass-market signage and shiplap clichés for interiors that feel collected and genuinely rural. We handle whole-home plans, single rooms, and the indoor-outdoor spaces that matter so much on larger properties. Canby is an easy drive from our Portland studio, so site visits are simple to schedule.",
    faqs: [
      {
        question: "Can you do farmhouse style in Canby without the clichés?",
        answer:
          "That's precisely the assignment we like. Real farmhouse design comes from materials and utility — honest woods, durable textiles, rooms organized around how a rural property actually works — not from word-art signs and factory-distressed decor. The result feels collected over time, which is what the mass-market version is imitating in the first place.",
      },
      {
        question: "Do you travel to Canby and surrounding rural properties for design work?",
        answer:
          "Yes — Canby is an easy drive from our Portland studio, and larger properties outside town are no problem. We handle everything from a single-room refresh in downtown Canby to whole-home plans for acreage homes, including the mudrooms, porches, and outdoor rooms rural life depends on. Call (971) 930-0220 to schedule a visit.",
      },
    ],
  },
  "newberg": {
    note: "Newberg interiors carry a specific assignment: hold their own against wine country. Many of our clients here relocated from Portland or California for the Chehalem Valley lifestyle, and they want homes that entertain the way the region does — relaxed, generous, quietly refined. Our interior design in Newberg leans into that: dining rooms and kitchens built for long dinners, palettes that echo vineyard light rather than fight it, and outdoor rooms treated as seriously as indoor ones on the acreage properties along Chehalem Mountain. Downtown Newberg's historic homes are a different pleasure — period character that rewards careful color and furnishing choices over a gut-and-redo instinct. Whether it's a whole-home plan for a view property or a single-room refresh in Springbrook, we design for the reason people choose Newberg: a slower, better evening, most nights of the week.",
    faqs: [
      {
        question: "Can you design our Newberg home around entertaining?",
        answer:
          "Gladly — it's what wine country homes are for. We plan kitchens and dining rooms for long tables and easy flow, build in the wine storage and serving surfaces that get used weekly here, and treat patios and covered outdoor rooms as first-class entertaining space with real furniture and lighting. Call (971) 930-0220 to talk through your property.",
      },
      {
        question: "Do you work on historic homes in downtown Newberg?",
        answer:
          "Yes. Downtown Newberg's older homes have character worth protecting, so we design with the architecture — period-informed color, lighting that flatters original detail, and furnishings that bridge old and new — rather than flattening it into a trend. The home stays itself, just more comfortable and more current.",
      },
    ],
  },
  "gresham": {
    note: "Gresham rewards designers who respect a budget, and that's how we work here. Much of our interior design in Gresham is high-impact and tightly scoped: a whole-home color plan, better lighting, furniture chosen once and chosen well — the moves that transform how a house feels without a remodel's price tag. The housing runs from older homes near downtown to newer subdivisions toward the buttes, and our clients are often first-time homeowners furnishing a real house for the first time, or long-time owners ready to make the place feel current after years of making do. We build phased plans for exactly those situations: a master design up front, executed room by room as budget allows, so nothing gets bought twice. Good design isn't a luxury-market exclusive — a Gresham interior designer just has to be honest about where the money matters.",
    faqs: [
      {
        question: "Is an interior designer worth it for a modest Gresham home?",
        answer:
          "Often more so than for an expensive one, because the margin for purchasing mistakes is smaller. A designer keeps every dollar pulling toward one coherent result — the right paint the first time, furniture that fits, lighting that changes the room — instead of a decade of piecemeal buys that never add up. We'll tell you honestly what's worth doing.",
      },
      {
        question: "Can we spread a Gresham design project over time?",
        answer:
          "Absolutely — phased projects are our standard recommendation in Gresham. We create the whole-home design up front, then execute it room by room on your timeline and budget. Because everything follows one plan, the house gets more finished with each phase instead of more mismatched. Call (971) 930-0220 to start with the plan.",
      },
    ],
  },
  "bethany": {
    note: "Bethany households run at full speed — two careers, school schedules, sports weekends — and the area's planned-community homes are built for exactly that life. Our interior design in Bethany makes them feel designed for it too: contemporary, polished interiors that also absorb daily reality, with performance fabrics where the family actually sits, storage planned for backpacks and gear, and a home office that works as hard as its owners. The homes in NW Bethany, Bethany Village, and Rock Creek share a clean modern architecture we complement rather than fight — warm contemporary palettes, layered lighting in place of builder cans, and furniture with enough character to keep modern from reading generic. Most projects here are whole-home or main-floor plans for families who want the house finished properly once, but we take single rooms too. Style and school-night chaos can coexist; that's the brief.",
    faqs: [
      {
        question: "Can a Bethany home be both stylish and kid-proof?",
        answer:
          "Yes — that tension is exactly what we design for. Performance fabrics have gotten genuinely beautiful, durable rugs and finishes no longer look institutional, and smart storage keeps the daily gear from swallowing the design. Your main floor can host a dinner party on Saturday and survive a sleepover on Friday without changing anything.",
      },
      {
        question: "How long does a whole-home design project take in Bethany?",
        answer:
          "The design phase typically runs a few weeks — space planning, palette, and selections — and then furnishing lead times vary by piece, so we sequence orders to get key rooms functional early. Busy Bethany households appreciate that we manage the ordering, delivery, and installation end to end. Call (971) 930-0220 and we'll map a timeline to your calendar.",
      },
    ],
  },
  "bend": {
    note: "Bend runs on a design language of its own — high-desert modern, warm woods, black steel, big glass to the mountains — and homes in NorthWest Crossing and Tetherow set that bar high. Greylyn Wayne is a Portland studio, and we serve Bend the honest way: design development handled remotely, site work and installs executed in efficient, planned trips. Our interior design in Bend splits between primary residences that want the full mountain-modern treatment done with restraint, and the second homes and short-term rentals that make up so much of this market — where design also has to photograph well for booking platforms, sleep guests comfortably, and survive heavy use without looking like it's trying to. Whether you're furnishing a new Tetherow build from scratch or bringing an Awbrey Butte home up to the standard of its view, we design to Bend's setting rather than importing Portland's.",
    faqs: [
      {
        question: "Can a Portland studio really handle a Bend interior design project?",
        answer:
          "Yes, with the right structure. We run Bend projects on a planned-trip model: an on-site consultation up front, design development and reviews handled remotely by video, then concentrated installation trips. Most of a design project's work doesn't require being in the room — and the parts that do, we schedule properly rather than improvising.",
      },
      {
        question: "Do you design Bend vacation homes and short-term rentals?",
        answer:
          "It's a significant share of our Central Oregon work. Second homes and rentals need design that earns twice — a mountain-modern look owners love and a durable, photogenic setup that lifts bookings and reviews. We plan sleeping capacity, materials, and styling with both jobs in mind. Call (971) 930-0220 to talk through your property.",
      },
    ],
  },
  "sunriver": {
    note: "In Sunriver, interior design is a revenue decision before it's an aesthetic one. Most homes here are second homes that earn their keep as short-term rentals, so every choice — the sleeping arrangements, the fabrics, how the main room photographs — shows up in booking rates and reviews. Our design work for Sunriver properties is built around that math: lodge-inspired, family-friendly interiors that present beautifully on listing platforms, sleep more guests comfortably without feeling packed, and use materials that shrug off sand, snow gear, and constant turnover. We work with owners in the Village, Caldera Springs, and Crosswater on everything from refreshing a tired rental to fully furnishing a new purchase — and because most owners live elsewhere, the process runs comfortably remote, with decisions made by video and installs handled in planned trips. A Sunriver interior designer should make the house better to own, not just nicer to look at.",
    faqs: [
      {
        question: "Can you furnish our Sunriver rental as a complete package?",
        answer:
          "Yes — full furnishing plans are common here, from furniture and lighting through rugs, bedding, window treatments, and final styling. We design for guest capacity, durability, and the photography that wins bookings, then handle ordering and installation in coordinated trips so the home is rental-ready when we leave. Call (971) 930-0220 to scope your property.",
      },
      {
        question: "We don't live in Central Oregon — how does a Sunriver project work?",
        answer:
          "Almost entirely remotely, by design. After an initial property visit, we develop the plan and review everything with you by video, then execute the install in planned trips. Many Sunriver owners never need to be on site at all — we send photos of the finished rooms before the first guests arrive.",
      },
    ],
  },
  "hood-river": {
    note: "Hood River interiors have one job above all: get out of the light's way. The Gorge delivers river views, orchard views, and Mount Hood on the horizon, and our interior design in Hood River is planned around them — low sightlines, natural palettes, materials that feel connected to the outdoors this whole town is organized around. The market gives us three kinds of projects: character homes in the Heights and downtown that want their history respected while their interiors catch up to modern life; newer westside homes where the view should drive the furniture plan; and a growing set of vacation rentals where durable, photogenic design directly lifts bookings. Hood River is an easy run up the Gorge from our Portland studio, so site visits are simple. And for the active households that define this town, we design interiors that recover well — from wet gear, sandy dogs, and full weekends.",
    faqs: [
      {
        question: "How do you design a Hood River home around its view and light?",
        answer:
          "We let the Gorge win. Furniture stays low and oriented to the water and mountain, palettes take their cues from the landscape, and window treatments manage the Gorge's serious afternoon sun and wind-driven weather without curtaining off the reason you're here. Inside, natural materials keep the room feeling continuous with what's outside the glass.",
      },
      {
        question: "Do you design Hood River vacation rentals as well as full-time homes?",
        answer:
          "Both. Rentals here get durable, photogenic interiors designed for the active guests the Gorge attracts — gear storage included — because better design reliably means better bookings. Full-time homes get the same view-first approach, tuned to the owners instead of the platform. Call (971) 930-0220 and we'll coordinate a Gorge visit.",
      },
    ],
  },
  "eugene": {
    note: "Eugene doesn't have one design sensibility — it has several, and interior design in Eugene means reading which one you're in. South Hills homes carry views and established formality that reward a refined, layered approach; Fairmount and the university orbit skew toward warm, book-lined comfort; the Whiteaker's creative streak invites bolder color and more personal collections; Cal Young's family homes want durable practicality that still looks considered. We're a Portland studio serving Lane County, and we run Eugene projects the way that actually works at distance: a thorough on-site consultation, design development handled remotely with video reviews, and installs executed in planned visits. The work spans whole-home plans, single-room refreshes, and the color, furnishing, and finish decisions in between. What stays constant across every Eugene sub-market is the order of operations — design to the house, the neighborhood, and the owner, in that order.",
    faqs: [
      {
        question: "How does a Portland-based interior designer handle a Eugene project?",
        answer:
          "On a planned-trip model that keeps the drive from becoming your problem. We consult on site, then do the heavy design work remotely — video reviews, shared boards, decisions at your pace — and return for coordinated installs. Eugene clients get the same process our Portland clients do; it's just scheduled more deliberately. Call (971) 930-0220 to get on the calendar.",
      },
      {
        question: "Can you match Eugene's very different neighborhood styles?",
        answer:
          "That's the fun of working here. A South Hills view home, a Fairmount professor's Craftsman, and a Whiteaker bungalow deserve entirely different rooms, and we'd never hand them the same palette. We start from the architecture and how you live, so the design belongs to your house — not to a portfolio look we repeat.",
      },
    ],
  },
  "salem": {
    note: "Salem's steadiest design work happens in its historic districts — Grant and Court-Chemeketa homes whose owners want interiors that honor original detail without living in the past. That balance is a strength of ours: heritage-appropriate color, lighting that flatters old rooms, and furnishings that let a 1920s house work for a modern household. The other half of interior design in Salem is newer: South Salem and West Salem hills homes with views and open plans that need furniture properly scaled and zoned, and a steady base of homeowners — many anchored by state employment — who want their houses to feel cared-for and current without chasing trends. We're a Portland studio, and Salem is an easy hour down I-5, so consultations, design development, and installs all schedule simply. Whole homes, single rooms, and everything between — designed to outlast the next repaint cycle.",
    faqs: [
      {
        question: "Can you design a Grant or Court-Chemeketa historic home sensitively?",
        answer:
          "Yes — those districts are exactly the kind of work we enjoy. We treat the original woodwork, proportions, and detail as fixed assets, then bring the color, lighting, and furnishings up to modern life around them. The house keeps its standing in the district while finally working for the people inside it.",
      },
      {
        question: "Is Salem too far from Portland for a design project?",
        answer:
          "Not at all — it's an hour down I-5, which makes Salem one of the easiest markets outside the metro for us to serve. Consultations and installs schedule like local work, and design development happens remotely between visits regardless of where a client lives. Call (971) 930-0220 to set up a consultation.",
      },
    ],
  },
  "corvallis": {
    note: "Corvallis clients tend to arrive with their research done — this is a town of Oregon State faculty, researchers, and HP engineers, and they evaluate a designer the way they'd review a paper. Good. Our interior design in Corvallis stands up to that scrutiny: a clear process, honest budgets, and decisions we can defend, from the space plan to the fabric performance. The homes range from College Hill and Witham Hill's established character to NW Corvallis and Timberhill's newer construction, and many clients are newly relocated — furnishing a first Oregon home and wanting it done efficiently and well. We're Portland-based and run Corvallis on a planned-trip model: on-site consultation, remote design development with video reviews, then coordinated installs. Clean, contemporary, comfortable interiors are the common request here, and we deliver them with enough warmth and personality that contemporary never slides into sterile.",
    faqs: [
      {
        question: "We're relocating to Corvallis — can design work start before we arrive?",
        answer:
          "Yes, and it should. From your floor plan and photos we can develop the space plan, palette, and key selections while you're still out of state, reviewing by video on your schedule. Orders go in early, so the house comes together shortly after you do — not a year later. Call (971) 930-0220 before the move.",
      },
      {
        question: "Do you take single-room Corvallis projects, or only whole homes?",
        answer:
          "Both. Because we serve Corvallis on planned trips, we'll sometimes batch a smaller project with other Willamette Valley work — which keeps a one-room refresh entirely practical. Many Corvallis clients start with the living room or a home office and expand from there once they've seen the process.",
      },
    ],
  },
  "albany": {
    note: "Albany hands an interior designer some of the best raw material in Oregon: the Monteith and Hackleman districts are full of Victorians and early-century homes with intact woodwork, high ceilings, and proportions modern construction rarely matches. Our interior design in Albany treats that inheritance seriously — period-informed color, lighting that warms tall old rooms, furnishings that bridge eras instead of forcing one — while keeping the houses fully livable for the families in them now. North Albany's newer homes call for the opposite toolkit: contemporary furnishing plans, warmth layered over builder finishes, open-plan zoning. Albany's value pricing also changes the design math in the owner's favor — money not spent on the purchase can go into making the interior genuinely right. We're Portland-based and serve Albany on scheduled visits, with whole-home plans, single rooms, and phased projects all on the table.",
    faqs: [
      {
        question: "Can you design a Monteith or Hackleman Victorian respectfully?",
        answer:
          "Yes — those districts are a privilege to work in. High ceilings, original millwork, and true formal rooms give us more to design with than most new construction ever will. We choose color and lighting that flatter the period detail and furnishings that let a Victorian hold its character while living like a modern family home.",
      },
      {
        question: "Is professional interior design practical at Albany price points?",
        answer:
          "Very — Albany may be the best design value in the valley. Because the homes cost less, owners can put real budget into the interiors, and we scope projects to fit: a design plan you execute, one room done completely, or a phased whole-home project. Call (971) 930-0220 for an honest recommendation on your house.",
      },
    ],
  },
  "cannon-beach": {
    note: "Cannon Beach homes answer to the ocean, and the design brief follows: light, coastal-luxe interiors, natural palettes that defer to the water, sightlines kept low so nothing competes with Haystack Rock. Our interior design in Cannon Beach serves the market's two overlapping owners — second-home buyers furnishing a retreat in Tolovana Park or the Presidential Streets, and investors whose interiors have to perform on booking platforms, where photography quality shows up directly in nightly rates. We handle both, often in the same house: turnkey furnishing plans for newly purchased homes, refreshes that bring a tired beach house up to the standard of its address, and rental-minded material choices that survive sand, salt air, and full-house summer weeks. Most Cannon Beach owners live elsewhere, so our process runs remote-friendly — decisions by video, installs in planned coastal trips from our Portland studio.",
    faqs: [
      {
        question: "Can you furnish our Cannon Beach second home turnkey?",
        answer:
          "Yes — turnkey is the norm here. We design the full furnishing plan, place the orders, and install in coordinated coastal trips, from furniture and lighting through bedding, window treatments, and final styling. You arrive to a finished beach house rather than a season of weekend errands. Call (971) 930-0220 to talk through your property.",
      },
      {
        question: "Does interior design actually improve a Cannon Beach rental's performance?",
        answer:
          "On this coast, presentation is the product. Guests choose between listings on photos, and a light, well-designed interior earns the click, supports stronger nightly rates, and reads through in reviews. Durable, salt-air-appropriate materials then protect that result through heavy summer turnover — design and revenue are the same decision here.",
      },
    ],
  },
  "astoria": {
    note: "Astoria attracts owners who chose character on purpose — a hillside Victorian with bay windows over the Columbia, a numbered-streets foursquare, a downtown building finding its second life. Our interior design in Astoria works with that intent: period-appropriate color that lets original woodwork breathe, lighting that flatters tall old rooms and dark winter afternoons, and furnishings that mix eras the way the town itself does. River views get framed, not fought — furniture planned so the water and the bridge stay the main event. The creative-class and vacation-rental energy reshaping Astoria adds a second brief: interiors with heritage charm and enough fresh, photogenic styling to delight guests too. We're a Portland studio and serve the North Coast on planned trips, handling everything from single-room refreshes to whole-home plans for a newly purchased Victorian that deserves better than furniture from three houses ago.",
    faqs: [
      {
        question: "How do you balance a Victorian's character with modern comfort in Astoria?",
        answer:
          "By letting each do its job. The architecture — bay windows, millwork, high ceilings — provides the character, so the furnishings can prioritize comfort and current life without apology. Period-informed color and good lighting tie the two together, which matters doubly in Astoria's long gray winters. The result is a Victorian you actually relax in.",
      },
      {
        question: "Do you design Astoria vacation rentals?",
        answer:
          "Yes — Astoria's rental market rewards exactly the heritage-plus-fresh balance we specialize in. Guests book Astoria for character, so we keep it front and center while adding the durable materials, comfortable beds, and photogenic styling that drive bookings and reviews. Call (971) 930-0220 and we'll plan a North Coast visit.",
      },
    ],
  },
  "manzanita": {
    note: "Manzanita has quietly become the design-literate end of the North Coast, and its interiors are expected to keep up — calm, spare, and warm, with light woods, soft neutrals, and nothing that shouts. Our interior design in Manzanita works inside that sensibility: beach houses that feel like an exhale, planned around the dunes, Neahkahnie Mountain, and the particular gray-gold light of this stretch of coast. Most owners here are designing a retreat that also earns — a house that restores its own family and still photographs well enough to book strongly as a rental. We design for both jobs at once: durable natural materials, sleeping arrangements that host generously without clutter, styling restrained enough to age past the trend cycle. Owners are rarely local, so the process runs comfortably by video between planned installation trips from our Portland studio. Understated is a discipline — that's what a Manzanita interior designer is for.",
    faqs: [
      {
        question: "Can one design serve both our family retreat and our Manzanita rental guests?",
        answer:
          "Yes — in Manzanita they're the same brief done well. The calm, natural, uncluttered interiors that make a beach house restorative for your family are exactly what this market's guests are booking for. We simply add the practical layer: durable materials, generous sleeping arrangements, and storage that lets the house reset quickly between uses.",
      },
      {
        question: "We live inland — how does a Manzanita design project work?",
        answer:
          "Smoothly, and mostly from wherever you are. After an initial visit to the property, design development and reviews happen by video, and we execute the installation in planned coastal trips. Many owners see the finished house for the first time in our photos. Call (971) 930-0220 to get a project scoped.",
      },
    ],
  },
  "seaside": {
    note: "Seaside interiors work harder than almost any on the coast — a successful house here might host forty different families a year, each arriving with sandy kids, wet towels, and expectations set by the listing photos. Our interior design in Seaside is engineered for that duty cycle: smart bunk and sleeping arrangements that raise guest capacity tastefully, performance fabrics and finishes that reset fast between turnovers, and cheerful, family-forward styling that stands out in a crowded field of rental listings. We design for owners' own use too — plenty of Seaside houses are family beach homes first and rentals second, and the same durable, comfortable design serves both. From a Prom-area condo refresh to a full furnishing plan for a newly purchased cottage near the Cove, we scope to the property and the revenue plan. A Seaside interior designer should improve the spreadsheet and the vacation.",
    faqs: [
      {
        question: "Can design increase how many guests our Seaside rental sleeps?",
        answer:
          "Usually, yes — and capacity is the biggest rate lever in Seaside's family market. Well-designed bunk rooms, sleeper sofas chosen for actual comfort, and smarter room assignments often add meaningful guest count without making the house feel packed. We plan it so the extra beds read as charming, not crammed. Call (971) 930-0220 to review your layout.",
      },
      {
        question: "What materials survive a high-turnover Seaside beach rental?",
        answer:
          "Performance fabrics on every seat, rugs that tolerate sand and washing, wipeable finishes, and bedding systems housekeepers can turn quickly. We specify for the reality of back-to-back summer bookings — the design should look as good in August as it did in June, without the owner replacing something every season.",
      },
    ],
  },
  "lincoln-city": {
    note: "Seven miles of coastline gives Lincoln City an unusually wide design brief — an oceanfront condo at Roads End, a mid-century cottage in Nelscott, and an investment home in Taft all need different answers. Our interior design in Lincoln City covers that range with one constant: the ocean sets the palette and the salt air sets the materials. Condos reward precise space planning — compact furnishings that don't crowd the view, storage designed for beach gear — while cottages and larger homes want bright, durable, guest-ready interiors that hold up through a full rental season. Because this is a heavily rental-driven market, most projects carry a revenue component, and we design accordingly: photogenic main rooms that win the booking, sleeping arrangements that lift capacity, finishes that survive turnover. Owners are usually inland, so we run design remotely by video and handle installs in planned coastal trips from our Portland studio.",
    faqs: [
      {
        question: "Do you design oceanfront condos in Lincoln City?",
        answer:
          "Yes — from Roads End to Taft. Oceanfront condos are compact by nature, so the design lives or dies on space planning: furniture scaled to the room and oriented to the water, storage for beach gear designed in, and a palette that lets the view carry the room. Done right, a small condo feels like a front-row seat rather than a tight one.",
      },
      {
        question: "Will professional design pay for itself on our Lincoln City rental?",
        answer:
          "The mechanics favor it. Guests pick between dozens of similar listings on photos alone, so a genuinely well-designed interior earns more clicks and supports stronger rates, while durable materials cut the replacement churn that erodes rental profit. We design with those levers in mind from the first sketch. Call (971) 930-0220 to talk through your property's numbers.",
      },
    ],
  },
  "vancouver": {
    note: "We work both sides of the Columbia as a matter of routine, and interior design in Vancouver is core territory — same team, same standards as our Portland work. The projects track the city's range: Waterfront and downtown condos that want sharp, urban space planning and furniture scaled to window walls; established Felida and Salmon Creek homes ready for whole-home refreshes after a couple of decades of good service; and the new construction filling Vancouver's edges, where builder finishes need warmth, character, and real lighting layered on top. A steady share of our Vancouver design clients just crossed the river themselves — Oregonians drawn by the tax advantage, furnishing a new house and wanting it to feel settled fast. Whole-home plans, single rooms, color and finish consultations — all of it schedules easily, because for us the bridge is a commute, not a barrier.",
    faqs: [
      {
        question: "Is Vancouver really part of your regular design service area?",
        answer:
          "Fully. Clark County isn't an occasional stretch for us — we're on both sides of the Columbia constantly, and Vancouver design projects run on the same process, timelines, and team as our Portland work. From a Felida whole-home plan to a downtown condo, the river doesn't change anything about how we serve you.",
      },
      {
        question: "Can you design our Vancouver Waterfront condo?",
        answer:
          "Yes — the Waterfront's condos are a favorite assignment. Window walls and open plans call for furniture scaled and placed with precision, palettes that hold up against all that light and river view, and storage planned into a compact footprint. We design them to feel urban and composed, not showroom-cold. Call (971) 930-0220 to get started.",
      },
    ],
  },
  "camas": {
    note: "Camas expects a designer-finished result — this is SW Washington's prestige market, and homes on Prune Hill and around Lacamas Lake are bought by people who know what good looks like. Our interior design in Camas operates at that level: whole-home plans for view properties where the lake and light drive every decision, finish and furnishing selection for custom builds — we're comfortable working alongside builders during construction — and refreshes that bring an established Grass Valley or North Shore home up to its neighborhood's standard. Jody's four NW Natural Street of Dreams features are the right credential for this market; that showcase work is exactly the caliber of design Camas owners have in mind when they call. From a single statement room in a downtown Camas character home to a full furnishing plan for a new custom build, we design to the standard the address implies.",
    faqs: [
      {
        question: "Can you work with our builder on a new Camas custom home?",
        answer:
          "Yes — and earlier is better. Joining during construction lets us guide finish, lighting, and layout decisions while they're still cheap to change, then carry the same design language through the furnishing plan. Builders generally welcome it; decisions get made faster and the finished home reads as one coherent piece. Call (971) 930-0220 before your selections deadline.",
      },
      {
        question: "Is your design work at the level Camas's market expects?",
        answer:
          "It's the level we're known for. Jody Wallace has been a featured designer in four NW Natural Street of Dreams shows — the region's showcase for exactly the caliber of home Prune Hill and Lacamas Shores represent — and our sourcing runs designer-grade rather than catalog. Camas is precisely the market that work was built for.",
      },
    ],
  },
  "ridgefield": {
    note: "Ridgefield is growing so fast that whole neighborhoods share a birthday — and a finish palette. In Pioneer Canyon, Discovery Ridge, and Taverner Ridge, hundreds of well-built new homes start from the same handful of builder schemes, which makes interior design in Ridgefield largely the art of differentiation: color with actual conviction, lighting beyond the recessed-can default, and furniture chosen for your family instead of the floor plan. Most of our clients here are young families who relocated for space and schools and are furnishing more house than they've ever owned; we build phased whole-home plans so the important rooms get done right first and nothing gets bought twice. Downtown Ridgefield's older homes offer a smaller, character-driven counterpoint we enjoy just as much. The goal in every case: a house that stops feeling like a lot number and starts feeling inevitable — like it was always going to look this way.",
    faqs: [
      {
        question: "Our new Ridgefield home looks like every other one in the neighborhood — where do we start?",
        answer:
          "Start with the rooms you live in most, and start with conviction. Real color instead of the builder scheme, lighting with character, and one properly designed main living space will separate your house from the street more than anything else. From there, a whole-home plan keeps every later purchase building on that foundation.",
      },
      {
        question: "Can we furnish our Ridgefield home in phases?",
        answer:
          "Yes — phasing is our standard advice for Ridgefield's young families. We design the whole home up front so the vision is fixed, then execute it in stages that match your budget: main floor first, primary suite next, bonus rooms when you're ready. Call (971) 930-0220 and we'll sketch the sequence with you.",
      },
    ],
  },
  "washougal": {
    note: "Washougal homes live half outdoors — the Gorge is the backyard, and the best interiors here act like they know it. Our interior design in Washougal starts from the view and the light: furniture planned so river and hillside sightlines stay open, palettes pulled from the landscape rather than a trend board, and window treatments that manage the Gorge's serious sun and weather without blocking the reason you bought the house. The newer builds climbing Washougal's hills want that view-first furnishing plan from scratch; established neighborhoods closer to downtown more often need warming and updating — better lighting, current color, furniture that finally fits the rooms. We give the transitional spaces equal care, because mudrooms, covered patios, and gear storage are daily life for households this active. East Clark County is an easy reach for us, and a Washougal interior designer should design for how this town actually spends its weekends.",
    faqs: [
      {
        question: "How do you design around Washougal's Gorge views and light?",
        answer:
          "We plan the room from the window inward. Seating orients to the river and hills, palettes echo the landscape so the view feels continuous with the interior, and window treatments are chosen for the Gorge's strong sun and wind-driven weather — control without concealment. The view was the purchase decision; the design should honor it.",
      },
      {
        question: "Do you offer full interior design in Washougal, or just staging?",
        answer:
          "Full design — whole-home plans, single rooms, color and finish selection, and furnishing for both new hillside builds and established in-town homes. Washougal and East Clark County are an easy reach from our studio, so visits and installs schedule like local work. Call (971) 930-0220 to set up a consultation.",
      },
    ],
  },
  "battle-ground": {
    note: "The move to Battle Ground usually comes with a happy problem: more house than furniture. Families trade tighter Vancouver or Portland homes for bigger lots and extra square footage here, then discover the old sofa is lost in the new great room and half the rooms have no plan at all. Our interior design in Battle Ground solves exactly that — whole-home furnishing plans scaled to the larger footprints, phased sensibly so budgets stay comfortable, in the warm, unpretentious style that fits how north Clark County lives. The housing mix runs from established in-town neighborhoods to newer construction out toward Meadow Glade and Cherry Grove, and both benefit from the same fundamentals: honest materials, family-proof fabrics, rooms with a clear job. We keep the design practical without letting it go plain — comfortable enough for daily life, considered enough that the house finally feels finished.",
    faqs: [
      {
        question: "We upsized to Battle Ground and our furniture doesn't fit — can you help?",
        answer:
          "This is the classic Battle Ground project, and yes. We assess what you own against the new home's scale, keep what genuinely works, and build a furnishing plan for the rest — usually phased, so the great room and main spaces come together first. The house stops feeling half-moved-into within the first phase. Call (971) 930-0220 to get started.",
      },
      {
        question: "Is professional interior design practical at Battle Ground budgets?",
        answer:
          "Yes, because we scope to the market rather than importing luxury-market assumptions. That might mean a design plan you execute yourself, one room done completely, or a phased whole-home project spread across a year or two. A clear plan also prevents the mismatched piecemeal purchases that quietly cost more in the end.",
      },
    ],
  },
};
