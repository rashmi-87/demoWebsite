// Shared loader: produces the normalized topics array used to seed Mongo
// (and as the JSON fallback). If the full dataset dsa_questions_385.json is
// present in server/data, it is used; otherwise the bundled questions.json.

const fs = require("fs");
const path = require("path");

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fromFull(raw) {
  return raw.topics.map((t) => {
    const ts = slugify(t.name);
    return {
      name: t.name,
      slug: ts,
      description: t.description || "",
      problemCount: t.problemCount,
      locked: false,
      patterns: (t.patterns || []).map((p) => ({
        name: p.name,
        slug: `${ts}-${slugify(p.name)}`,
        strategy: p.strategy || "",
        problems: (p.problems || []).map((pr) => ({
          slug: pr.slug,
          title: pr.title,
          reference: pr.reference,
          difficulty: pr.difficulty,
          leetcodeUrl: pr.leetcodeUrl || null,
        })),
      })),
    };
  });
}

function getTopics() {
  const full = path.join(__dirname, "data", "dsa_questions_385.json");
  if (fs.existsSync(full)) {
    return fromFull(JSON.parse(fs.readFileSync(full, "utf8")));
  }
  const seed = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "questions.json"), "utf8")
  );
  return seed.topics;
}

module.exports = { getTopics, slugify };
