import fs from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const inputPath = path.join(workspaceRoot, "src", "sanity", "imports", "extras.json");
const outputPath = path.join(workspaceRoot, "src", "sanity", "imports", "extras.ndjson");

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function normalizeExtraItem(item, index) {
  if (typeof item === "string") {
    return {
      _id: `menuItem-extra-${slugify(item) || index + 1}`,
      _type: "menuItem",
      name: item,
      slug: { current: slugify(item) || `extra-${index + 1}` },
      category: "Extras",
      price: 3000,
      available: true,
    };
  }

  const name = item?.name?.trim();

  if (!name) {
    throw new Error(`Item at index ${index} is missing a valid name.`);
  }

  const slug = slugify(name) || `extra-${index + 1}`;

  return {
    _id: item._id || `menuItem-extra-${slug}`,
    _type: "menuItem",
    name,
    slug: { current: item.slug || slug },
    category: item.category || "Extras",
    price: Number(item.price ?? 3000),
    available: item.available ?? true,
  };
}

const raw = fs.readFileSync(inputPath, "utf8");
const parsed = JSON.parse(raw);

if (!Array.isArray(parsed)) {
  throw new Error("extras.json must contain an array.");
}

const documents = parsed.map(normalizeExtraItem);
const ndjson = documents.map((document) => JSON.stringify(document)).join("\n");

fs.writeFileSync(outputPath, `${ndjson}\n`);

console.log(`Generated ${documents.length} extra item documents.`);
console.log(`Output: ${outputPath}`);
