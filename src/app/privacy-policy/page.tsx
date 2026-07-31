import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Greylyn Wayne Interior Design & Home Staging.",
  alternates: { canonical: "https://www.greylynwayne.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24 lg:py-32">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-charcoal mb-12">
          Privacy Policy
        </h1>

        <div className="prose prose-sm max-w-none text-charcoal-light leading-relaxed space-y-8">
          <p>
            <strong>Last updated:</strong> July 2026
          </p>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
              Information We Collect
            </h2>
            <p>
              When you contact us through our website, we collect the information
              you provide, including your name, email address, phone number, and
              project details. When you become a client, we also keep records of
              the services we provided and the payments associated with them.
            </p>
            <p className="mt-3">
              We also collect limited technical information automatically when
              you visit, including your IP address, browser type, the pages you
              view, and identifiers stored in cookies. Some of this is used for
              advertising measurement, described below.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
              How We Use Your Information
            </h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Respond to your inquiries and consultation requests</li>
              <li>Provide our home staging and interior design services</li>
              <li>Communicate with you about your project</li>
              <li>Improve our website and services</li>
              <li>
                Measure how well our advertising works and reach people with
                similar interests
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
              Information Sharing
            </h2>
            <p>
              We do not sell or trade your personal information. We may share
              information with trusted service providers who assist us in
              operating our website or conducting our business, as long as those
              parties agree to keep this information confidential.
            </p>
            <p className="mt-3">
              We also share limited information with our advertising and
              analytics partners, currently Google and Meta, so we can measure
              the results of our advertising and reach people likely to need our
              services. Before this information leaves our systems, contact
              details such as your email address and phone number are converted
              into an irreversible scrambled form (a cryptographic hash). Those
              partners use it only to match against their own records and to
              report results back to us. We may include the value of completed
              work in this information so we can understand which advertising
              leads to real projects. We do not share your project details,
              messages, or payment card information with advertising partners.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
              Cookies & Analytics
            </h2>
            <p>
              Our website uses cookies and analytics tools to understand how
              visitors interact with our site. This helps us improve the user
              experience. We currently use Google Analytics and Google Ads, and
              the Meta Pixel. These tools may set cookies that record how you
              arrived at our site and which pages you viewed. You can choose to
              disable cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
              Your Advertising Choices
            </h2>
            <p>
              You can opt out of personalized advertising at any time. To have us
              remove your information from any advertising audience we maintain,
              email{" "}
              <a
                href="mailto:design@greylynwayne.com"
                className="text-teal hover:text-teal-dark transition-colors"
              >
                design@greylynwayne.com
              </a>{" "}
              and we will remove it. You can also manage this directly with the
              platforms through{" "}
              <a
                href="https://adssettings.google.com"
                className="text-teal hover:text-teal-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ad Settings
              </a>{" "}
              and{" "}
              <a
                href="https://www.facebook.com/adpreferences"
                className="text-teal hover:text-teal-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meta Ad Preferences
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
              Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us at{" "}
              <a
                href="mailto:design@greylynwayne.com"
                className="text-teal hover:text-teal-dark transition-colors"
              >
                design@greylynwayne.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
              Contact
            </h2>
            <p>
              If you have questions about this privacy policy, please contact us:
            </p>
            <p className="mt-3">
              Greylyn Wayne Interior Design & Home Staging
              <br />
              1011 SE Oak St, Portland, Oregon 97214
              <br />
              <a
                href="mailto:design@greylynwayne.com"
                className="text-teal hover:text-teal-dark transition-colors"
              >
                design@greylynwayne.com
              </a>
              <br />
              <a
                href="tel:9719300220"
                className="text-teal hover:text-teal-dark transition-colors"
              >
                (971) 930-0220
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
