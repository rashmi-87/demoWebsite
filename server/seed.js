// Seed / re-seed MongoDB with the topics collection.
//
// Usage (from the server folder, with MongoDB running):
//   npm run seed
//
// To load all 385: put dsa_questions_385.json in server/data/ first, then run it.

require("dotenv").config();
const { connect, mongoose } = require("./db");
const { Topic, Content } = require("./models");
const { getTopics } = require("./seedData");
const seedContent = require("./data/content");

async function run() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dsa";
  console.log("Connecting to", uri);
  await connect(uri);

  const topics = getTopics().map((t, i) => ({ ...t, order: i }));
  await Topic.deleteMany({});
  await Topic.insertMany(topics);

  const problems = topics.reduce(
    (a, t) => a + (t.patterns || []).reduce((b, p) => b + (p.problems || []).length, 0),
    0
  );
  console.log(`Seeded ${topics.length} topics and ${problems} problems into the "topics" collection.`);

  // Content collection
  const docs = [];
  for (const [slug, data] of Object.entries(seedContent.patternContent)) docs.push({ kind: "pattern", slug, data });
  for (const [slug, data] of Object.entries(seedContent.questionContent)) docs.push({ kind: "question", slug, data });
  await Content.deleteMany({});
  if (docs.length) await Content.insertMany(docs);
  console.log(`Seeded ${docs.length} documents into the "contents" collection.`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => {
  console.error("Seed failed:", e.message);
  process.exit(1);
});
