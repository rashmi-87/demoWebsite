// Import the full 385-question dataset into questions.json.
//
// Usage:
//   1) Put the downloaded file at: server/data/dsa_questions_385.json
//   2) From the server folder run:  npm run import
//
// It converts the RisingBrain export (topics -> patterns -> problems) into the
// app's schema, slugifies topics/patterns, unlocks every topic, and preserves
// the existing Array learning content (slugs stay stable).

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "data", "dsa_questions_385.json");
const OUT = path.join(__dirname, "data", "questions.json");

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

if (!fs.existsSync(SRC)) {
  console.error("Missing file:", SRC);
  console.error("Place dsa_questions_385.json in server/data/ and run again.");
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(SRC, "utf8"));
let total = 0;

const topics = raw.topics.map((t) => {
  const topicSlug = slugify(t.name);
  const patterns = (t.patterns || []).map((p) => ({
    name: p.name,
    slug: `${topicSlug}-${slugify(p.name)}`,
    strategy: p.strategy || "",
    problems: (p.problems || []).map((pr) => {
      total++;
      return {
        slug: pr.slug,
        title: pr.title,
        reference: pr.reference,
        difficulty: pr.difficulty,
        leetcodeUrl: pr.leetcodeUrl || null,
      };
    }),
  }));
  return {
    name: t.name,
    slug: topicSlug,
    description: t.description || "",
    problemCount: t.problemCount,
    locked: false,
    patterns,
  };
});

const out = {
  meta: {
    name: "DSA",
    source: "RisingBrain Pattern-Wise Sheet",
    totalProblems: total,
    note: "Imported from dsa_questions_385.json",
  },
  topics,
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`Imported ${total} problems across ${topics.length} topics into questions.json`);
