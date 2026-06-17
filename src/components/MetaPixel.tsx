import Script from "next/script";

/**
 * Meta Pixel (dataset 1596777147987027) — browser side.
 *
 * The base pixel + automatic PageView load here; Lead events fire from
 * tracking.ts on form submit / chat capture / phone+text click, each with an
 * `eventID` that the server-side CAPI Lead (api/lead) reuses so Meta dedups the
 * browser/server pair.
 *
 * SP lesson: if a CSP is ever added to this app, `https://www.facebook.com`
 * MUST go in `connect-src` (not just `img-src`) or large-payload pixel fires are
 * silently blocked. GW currently ships no CSP, so nothing to allowlist today.
 *
 * `.trim()` defends against the Vercel trailing-newline bug.
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
