/**
 * Upload tour images to Sanity CDN and attach them to tour documents.
 * Run: npm run sanity:migrate-images
 */
import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "as3gpuo3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const FALLBACK_IMAGE_URLS = {
  "11111111-1111-4111-8111-111111111101":
    "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
  "11111111-1111-4111-8111-111111111102":
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  "11111111-1111-4111-8111-111111111103":
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
  "11111111-1111-4111-8111-111111111104":
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
  "11111111-1111-4111-8111-111111111105":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  "11111111-1111-4111-8111-111111111106":
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
  "11111111-1111-4111-8111-111111111107":
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  "11111111-1111-4111-8111-111111111108":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
};

function getSanityToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN;
  try {
    const config = JSON.parse(
      readFileSync(join(homedir(), ".config/sanity/config.json"), "utf8")
    );
    return config.authToken;
  } catch {
    return null;
  }
}

const token = getSanityToken();
if (!token) {
  console.error("✗ Not logged in to Sanity. Run: npx sanity login");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-06-13",
  token,
  useCdn: false,
});

const tours = await client.fetch(
  `*[_type == "tour"]{ _id, title, imageUrl, "hasImage": defined(image.asset) }`
);

let uploaded = 0;
let skipped = 0;

console.log(`→ Migrating images for ${tours.length} tour(s)...`);

for (const tour of tours) {
  if (tour.hasImage) {
    skipped++;
    continue;
  }

  const candidates = [tour.imageUrl, FALLBACK_IMAGE_URLS[tour._id]].filter(Boolean);
  if (!candidates.length) {
    console.warn(`  ⚠ No image URL for ${tour.title} — upload manually in Studio`);
    continue;
  }

  let buffer = null;
  let contentType = "image/jpeg";
  for (const url of candidates) {
    const res = await fetch(url, {
      headers: { "User-Agent": "SmallTravel/1.0 (Sanity migration)" },
    });
    if (res.ok) {
      buffer = Buffer.from(await res.arrayBuffer());
      contentType = res.headers.get("content-type") ?? "image/jpeg";
      break;
    }
    console.warn(`  ✗ Failed to fetch ${url}: ${res.status}`);
  }

  if (!buffer) {
    console.warn(`  ⚠ Could not upload image for ${tour.title}`);
    continue;
  }

  console.log(`  ↑ ${tour.title}`);
  const asset = await client.assets.upload("image", buffer, {
    filename: `${tour._id}.jpg`,
    contentType,
  });

  await client
    .patch(tour._id)
    .set({
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: tour.title,
      },
    })
    .unset(["imageUrl"])
    .commit();

  uploaded++;
}

console.log(`\n✓ Uploaded ${uploaded} image(s), skipped ${skipped} already set`);
