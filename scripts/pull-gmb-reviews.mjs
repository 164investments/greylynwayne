// Pull all Google Business Profile reviews for Greylyn Wayne via the
// authenticated owner's gcloud session (Hayden Laverty personal GMB account).
//
// Prereq (one-time, signing in as the verified GMB owner hayden.laverty@gmail.com):
//   gcloud auth application-default login --no-launch-browser \
//     --scopes=openid,https://www.googleapis.com/auth/userinfo.email,\
// https://www.googleapis.com/auth/userinfo.profile,\
// https://www.googleapis.com/auth/cloud-platform,\
// https://www.googleapis.com/auth/business.manage
//
// Usage: node scripts/pull-gmb-reviews.mjs
// Output: src/data/google-reviews.json (only overwrites if >= MIN_REVIEWS_TO_WRITE).
//
// Adapted from highland-farms/scripts/pull-gmb-reviews.mjs — only the title
// regex + output metadata changed. See memory shared/google-business-profile-api.md.

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUTPUT = path.join(process.cwd(), "src/data/google-reviews.json");
const MIN_REVIEWS_TO_WRITE = 5;
const QUOTA_PROJECT = process.env.QUOTA_PROJECT ?? "ace-destination-454618-k4";
const TITLE_RE = /greylyn/i;

function getAccessToken() {
  const t = execSync("gcloud auth application-default print-access-token", {
    encoding: "utf8",
  }).trim();
  if (!t) throw new Error("no ADC access token; run application-default login first");
  return t;
}

async function apiGet(url, token) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Goog-User-Project": QUOTA_PROJECT,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${body.slice(0, 500)}`);
  }
  return res.json();
}

async function listAccounts(token) {
  const data = await apiGet(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    token
  );
  return data.accounts ?? [];
}

async function listLocations(accountName, token) {
  const fields = "name,title,storefrontAddress,metadata,storeCode";
  const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=${encodeURIComponent(fields)}&pageSize=100`;
  const data = await apiGet(url, token);
  return data.locations ?? [];
}

async function listAllReviews(accountId, locationId, token) {
  const out = [];
  let pageToken = null;
  for (let page = 0; page < 30; page++) {
    const params = new URLSearchParams({ pageSize: "50" });
    if (pageToken) params.set("pageToken", pageToken);
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?${params}`;
    const data = await apiGet(url, token);
    if (data.reviews) out.push(...data.reviews);
    pageToken = data.nextPageToken;
    console.log(`  page ${page + 1}: +${data.reviews?.length ?? 0} reviews (total ${out.length})`);
    if (!pageToken) break;
  }
  return out;
}

function gmbToOur(r) {
  const STAR = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  const publish = r.updateTime ?? r.createTime ?? null;
  return {
    rating: STAR[r.starRating] ?? 0,
    publish_time: publish,
    relative_time: null,
    author_name: r.reviewer?.displayName ?? "Google User",
    author_photo: r.reviewer?.profilePhotoUrl ?? null,
    author_url: null,
    text: (r.comment ?? "").trim(),
    owner_reply: r.reviewReply
      ? { text: r.reviewReply.comment, updated: r.reviewReply.updateTime }
      : null,
  };
}

async function main() {
  const token = getAccessToken();
  console.log("got access token; listing accounts…");

  const accounts = await listAccounts(token);
  if (accounts.length === 0) {
    console.error("no business accounts visible. Re-run application-default login with");
    console.error("  --scopes=...https://www.googleapis.com/auth/business.manage");
    console.error("as hayden.laverty@gmail.com (the GMB owner of Greylyn Wayne).");
    process.exit(2);
  }
  for (const a of accounts) console.log(`  account: ${a.name} ${a.accountName ?? ""} (${a.type})`);

  let foundAcct = null;
  let foundLoc = null;
  for (const a of accounts) {
    const locs = await listLocations(a.name, token);
    for (const loc of locs) {
      const title = loc.title ?? "";
      if (TITLE_RE.test(title)) {
        foundAcct = a.name;
        foundLoc = loc.name;
        console.log(`  match: ${title} (${loc.name})`);
        break;
      }
    }
    if (foundAcct) break;
  }

  if (!foundAcct || !foundLoc) {
    console.error("couldn't find a location matching /greylyn/i in any visible account.");
    process.exit(3);
  }

  const accountId = foundAcct.split("/")[1];
  const locationId = foundLoc.split("/")[1];
  console.log(`pulling reviews for accounts/${accountId}/locations/${locationId}…`);

  const reviews = await listAllReviews(accountId, locationId, token);
  console.log(`fetched ${reviews.length} reviews total`);

  if (reviews.length < MIN_REVIEWS_TO_WRITE) {
    console.error(`refusing to overwrite: only got ${reviews.length} reviews (min ${MIN_REVIEWS_TO_WRITE}).`);
    process.exit(4);
  }

  const mapped = reviews.map(gmbToOur);
  const fiveStar = mapped.filter((r) => r.rating === 5).length;
  const avg = mapped.reduce((s, r) => s + r.rating, 0) / mapped.length;

  const out = {
    name: "Greylyn Wayne Home Staging & Interior Design",
    rating: Math.round(avg * 10) / 10,
    user_rating_count: reviews.length,
    five_star_count: fiveStar,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "google-business-profile-api",
    reviews: mapped,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ${OUTPUT} (${reviews.length} reviews, avg ${out.rating}, ${fiveStar} five-star)`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
