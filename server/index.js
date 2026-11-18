require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const { Topic, Progress, Content } = require("./models");
const { getTopics } = require("./seedData");
const seedContent = require("./data/content");
// These start from the bundled content.js, then are replaced by the DB copy at boot.
let patternContent = seedContent.patternContent;
let questionContent = seedContent.questionContent;

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dsa";
const PORT = process.env.PORT || 4000;

// ---- Data cache + progress source ----------------------------------------
let TOPICS = [];              // plain topic objects (from Mongo or JSON)
let MONGO = false;
let ProgressDoc = null;       // Mongoose doc when Mongo is connected
const memProgress = {
  solved: {}, quizScores: {}, patternScores: {}, timeSpent: {},
  streak: 1, lastActiveDay: new Date().toDateString(), dailyGoal: 3, solvedToday: 0,
};
const prog = () => (MONGO ? ProgressDoc : memProgress);
async function saveProg() {
  if (MONGO && ProgressDoc) {
    ["solved", "quizScores", "patternScores", "timeSpent"].forEach((f) => ProgressDoc.markModified(f));
    await ProgressDoc.save();
  }
}

let problemIndex = {}, allProblems = [], META = {};
function reindex() {
  problemIndex = {}; allProblems = [];
  let total = 0;
  for (const topic of TOPICS) {
    for (const pattern of topic.patterns || []) {
      for (const p of pattern.problems || []) {
        total++;
        problemIndex[p.slug] = { problem: p, pattern, topic };
        allProblems.push({ ...p, patternSlug: pattern.slug, topicSlug: topic.slug });
      }
    }
  }
  META = { name: "DSA", source: "RisingBrain Pattern-Wise Sheet", totalProblems: 385, loadedProblems: total, store: MONGO ? "mongodb" : "json-fallback" };
}

// ---- Helpers --------------------------------------------------------------
function touchStreak() {
  const p = prog();
  const today = new Date().toDateString();
  if (p.lastActiveDay !== today) {
    const diff = (new Date(today) - new Date(p.lastActiveDay)) / 86400000;
    p.streak = diff === 1 ? p.streak + 1 : 1;
    p.lastActiveDay = today;
    p.solvedToday = 0;
  }
}
function solvedCountIn(topic) {
  const solved = prog().solved || {};
  let c = 0;
  for (const pattern of topic.patterns || [])
    for (const p of pattern.problems || []) if (solved[p.slug]) c++;
  return c;
}
function pickQuizzes(slug, patternSlug, n = 5) {
  let qs = (questionContent[slug] && questionContent[slug].quizzes) || [];
  if (qs.length < n) {
    // top up with the problem's pattern-level quizzes so every roll has a quiz
    const pq = (patternContent[patternSlug] && patternContent[patternSlug].patternQuiz) || [];
    qs = qs.concat(pq);
  }
  return [...qs].sort(() => Math.random() - 0.5).slice(0, n);
}

// Build quick-revision flashcards from the authored content.
// Problem cards: front = the problem, back = approach + time/space + example.
// Pattern cards: front = the pattern, back = when to use it + template + moral.
function findQuizAnswer(quizzes, needle) {
  const q = (quizzes || []).find((x) => (x.q || "").toLowerCase().includes(needle));
  return q ? q.options[q.answer] : "";
}
// A complexity value (e.g. "O(n)") is not an "approach" — skip those.
const looksLikeComplexity = (s) => /^(O\(|Θ|Ω|amortized|near|pseudo)/i.test((s || "").trim());
// Pull the core technique: prefer a quiz whose question is about the method,
// then any non-complexity first answer, else fall back to the pattern's moral.
function extractApproach(qc, patternSlug) {
  const qs = qc.quizzes || [];
  const keys = ["technique", "approach", "algorithm", "data structure", "uses", "use a",
    "method", "trick", "strategy", "solved", "solve it", "the idea", "efficient"];
  for (const k of keys) {
    const q = qs.find((x) => (x.q || "").toLowerCase().includes(k) && !looksLikeComplexity(x.options[x.answer]));
    if (q) return q.options[q.answer];
  }
  if (qs[0] && !looksLikeComplexity(qs[0].options[qs[0].answer])) return qs[0].options[qs[0].answer];
  const pc = patternContent[patternSlug];
  return (pc && pc.moral) || "";
}
function buildFlashcards(topicSlug, patternSlug) {
  const cards = [];
  for (const topic of TOPICS) {
    if (topicSlug && topicSlug !== "all" && topic.slug !== topicSlug) continue;
    for (const pattern of topic.patterns || []) {
      if (patternSlug && patternSlug !== "all" && pattern.slug !== patternSlug) continue;
      const pc = patternContent[pattern.slug];
      if (pc) {
        const triggers = (pc.triggers || []).join(" · ");
        const blocks = [];
        if (triggers) blocks.push({ label: "Spot it when", body: triggers });
        if (pc.template) blocks.push({ label: "Template", body: pc.template.trim(), mono: true });
        if (pc.moral) blocks.push({ label: "Key idea", body: pc.moral });
        if (blocks.length)
          cards.push({
            kind: "pattern", topic: topic.name, pattern: pattern.name,
            front: pattern.name, hint: "When do you reach for this pattern?", blocks,
          });
      }
      for (const p of pattern.problems || []) {
        const qc = questionContent[p.slug];
        if (!qc) continue;
        const approach = extractApproach(qc, pattern.slug);
        const time = findQuizAnswer(qc.quizzes, "time complexity");
        const space = findQuizAnswer(qc.quizzes, "space complexity");
        const moral = (pc && pc.moral) || "";
        const blocks = [];
        if (approach) blocks.push({ label: "Approach", body: approach });
        if (moral && moral !== approach) blocks.push({ label: "Logic", body: moral });
        if (time || space)
          blocks.push({ label: "Complexity", body: "Time  " + (time || "—") + "       Space  " + (space || "—") });
        if (qc.example) {
          let ex = "Input   " + qc.example.input + "\nOutput  " + qc.example.output;
          if (qc.example.why) ex += "\nWhy     " + qc.example.why;
          blocks.push({ label: "Example", body: ex, mono: true });
        }
        cards.push({
          kind: "problem", topic: topic.name, pattern: pattern.name,
          front: p.title, hint: qc.description || "What's the approach?",
          blocks, leetcode: p.leetcodeUrl || null,
          difficulty: p.difficulty || "",
        });
      }
    }
  }
  return cards;
}

// ---- Routes --------------------------------------------------------------
app.get("/api/health", (req, res) => res.json({ ok: true, store: MONGO ? "mongodb" : "json-fallback" }));

app.get("/api/topics", (req, res) => {
  const topics = TOPICS.map((t) => ({
    name: t.name, slug: t.slug, description: t.description,
    problemCount: t.problemCount, locked: !!t.locked,
    patternCount: (t.patterns || []).length, solved: solvedCountIn(t),
  }));
  res.json({ topics, meta: META });
});

app.get("/api/topics/:slug", (req, res) => {
  const t = TOPICS.find((x) => x.slug === req.params.slug);
  if (!t) return res.status(404).json({ error: "topic not found" });
  const solved = prog().solved || {};
  const patterns = (t.patterns || []).map((p) => ({
    name: p.name, slug: p.slug, strategy: p.strategy,
    total: (p.problems || []).length,
    solved: (p.problems || []).filter((x) => solved[x.slug]).length,
  }));
  res.json({ name: t.name, slug: t.slug, description: t.description, locked: !!t.locked, patterns });
});

app.get("/api/patterns/:slug", (req, res) => {
  let found = null, topicName = "";
  for (const t of TOPICS)
    for (const p of t.patterns || [])
      if (p.slug === req.params.slug) { found = p; topicName = t.name; }
  if (!found) return res.status(404).json({ error: "pattern not found" });
  const solved = prog().solved || {};
  const content = patternContent[found.slug] || null;
  const problems = (found.problems || []).map((p) => ({ ...p, solved: !!solved[p.slug] }));
  const total = problems.length;
  const solvedN = problems.filter((p) => p.solved).length;
  res.json({
    name: found.name, slug: found.slug, strategy: found.strategy, topicName,
    content, problems, total, solved: solvedN,
    quizUnlocked: total > 0 && solvedN === total,
    patternScore: (prog().patternScores || {})[found.slug] || null,
  });
});

app.get("/api/questions/:slug", (req, res) => {
  const hit = problemIndex[req.params.slug];
  if (!hit) return res.status(404).json({ error: "question not found" });
  const content = questionContent[hit.problem.slug] || null;
  res.json({
    ...hit.problem,
    solved: !!(prog().solved || {})[hit.problem.slug],
    pattern: { name: hit.pattern.name, slug: hit.pattern.slug },
    topic: { name: hit.topic.name, slug: hit.topic.slug },
    content,
    quizzes: pickQuizzes(hit.problem.slug, hit.pattern.slug, 7),
  });
});

app.get("/api/random", (req, res) => {
  const onlyStarted = req.query.started === "1";
  let pool = allProblems;
  if (onlyStarted) {
    const startedTopics = new Set(TOPICS.filter((t) => solvedCountIn(t) > 0).map((t) => t.slug));
    const filtered = allProblems.filter((p) => startedTopics.has(p.topicSlug));
    if (filtered.length) pool = filtered;
  }
  if (!pool.length) return res.status(404).json({ error: "no problems available" });
  const pick = pool[Math.floor(Math.random() * pool.length)];
  res.json({ problem: pick, quizzes: pickQuizzes(pick.slug, pick.patternSlug, 7) });
});

app.get("/api/quiz/recall", (req, res) => {
  const solved = prog().solved || {};
  const solvedSlugs = Object.keys(solved).filter((s) => solved[s]);
  let items = [];
  for (const s of solvedSlugs) {
    const hit = problemIndex[s];
    const qs = (questionContent[s] && questionContent[s].quizzes) ||
      (hit && patternContent[hit.pattern.slug] && patternContent[hit.pattern.slug].patternQuiz) || [];
    for (const quiz of qs) items.push({ ...quiz, fromSlug: s });
  }
  items = items.sort(() => Math.random() - 0.5).slice(0, 10);
  res.json({ items, solvedCount: solvedSlugs.length });
});

app.get("/api/revise", (req, res) => {
  const solved = prog().solved || {};
  const solvedSlugs = Object.keys(solved).filter((s) => solved[s]);
  // Only revise problems the user has actually solved (no fallback sample).
  const items = solvedSlugs.map((s) => {
    const hit = problemIndex[s];
    const c = questionContent[s];
    return {
      slug: s,
      title: hit ? hit.problem.title : s,
      prompt: c ? c.description : "Explain this problem as you would in an interview.",
      answer: (patternContent[hit && hit.pattern.slug] || {}).moral ||
        "Identify the pattern, then state the optimal approach with its time and space complexity.",
      pattern: hit ? hit.pattern.name : "",
    };
  }).sort(() => Math.random() - 0.5).slice(0, 8);
  res.json({ items });
});

app.get("/api/flashcards", (req, res) => {
  const topic = (req.query.topic || "all").toString();
  const pattern = (req.query.pattern || "all").toString();
  let cards = buildFlashcards(topic, pattern);
  if (req.query.shuffle === "1") cards = cards.sort(() => Math.random() - 0.5);
  res.json({ cards, count: cards.length });
});

app.post("/api/progress/solve", async (req, res) => {
  const { slug } = req.body || {};
  if (!slug || !problemIndex[slug]) return res.status(400).json({ error: "bad slug" });
  touchStreak();
  const p = prog();
  if (!p.solved[slug]) { p.solved[slug] = true; p.solvedToday = (p.solvedToday || 0) + 1; }
  await saveProg();
  res.json({ ok: true, solved: true });
});

app.post("/api/progress/quiz", async (req, res) => {
  const { slug, patternSlug, correct, total } = req.body || {};
  const p = prog();
  if (slug) {
    const s = p.quizScores[slug] || { correct: 0, total: 0 };
    s.correct += correct || 0; s.total += total || 0; p.quizScores[slug] = s;
  }
  if (patternSlug) {
    const s = p.patternScores[patternSlug] || { correct: 0, total: 0 };
    s.correct += correct || 0; s.total += total || 0; p.patternScores[patternSlug] = s;
  }
  await saveProg();
  res.json({ ok: true });
});

app.get("/api/progress", (req, res) => {
  touchStreak();
  const p = prog();
  const solved = p.solved || {};
  const totalSolved = Object.values(solved).filter(Boolean).length;
  let qc = 0, qt = 0;
  for (const s of Object.values(p.quizScores || {})) { qc += s.correct; qt += s.total; }
  const perTopic = TOPICS.map((t) => {
    const total = (t.patterns || []).reduce((a, pp) => a + (pp.problems || []).length, 0);
    let tqc = 0, tqt = 0;
    for (const pp of t.patterns || []) {
      const ps = (p.patternScores || {})[pp.slug];
      if (ps) { tqc += ps.correct; tqt += ps.total; }
    }
    return {
      name: t.name, slug: t.slug, total, solved: solvedCountIn(t),
      quizPct: tqt ? Math.round((tqc / tqt) * 100) : null,
      time: (p.timeSpent || {})[t.slug] || 0,
    };
  }).filter((t) => t.total > 0);

  const started = perTopic.filter((t) => t.solved > 0 && t.quizPct !== null).sort((a, b) => a.quizPct - b.quizPct);
  res.json({
    totalSolved, totalProblems: META.totalProblems,
    avgQuiz: qt ? Math.round((qc / qt) * 100) : null,
    streak: p.streak, dailyGoal: p.dailyGoal, solvedToday: p.solvedToday,
    perTopic, weakSpot: started[0] || null,
  });
});

app.get("/api/journey", (req, res) => {
  const nodes = TOPICS.map((t, i) => {
    const total = (t.patterns || []).reduce((a, pp) => a + (pp.problems || []).length, 0);
    const solved = solvedCountIn(t);
    return {
      name: t.name, slug: t.slug, order: i, locked: !!t.locked, total, solved,
      status: t.locked ? "locked" : solved >= total && total > 0 ? "done" : solved > 0 ? "current" : "open",
    };
  });
  res.json({ nodes });
});

// ---- Boot: connect Mongo, seed if empty, else fall back to JSON -----------
(async () => {
  try {
    await connect(MONGODB_URI);
    MONGO = true;
    const count = await Topic.countDocuments();
    if (count === 0) {
      const seedTopics = getTopics().map((t, i) => ({ ...t, order: i }));
      await Topic.insertMany(seedTopics);
      console.log(`Seeded "topics" collection with ${seedTopics.length} topics.`);
    }
    TOPICS = await Topic.find().sort({ order: 1 }).lean();
    ProgressDoc = (await Progress.findOne({ userId: "me" })) || (await Progress.create({ userId: "me" }));

    // Sync learning content from content.js into the "contents" collection (upsert).
    const ops = [];
    for (const [slug, data] of Object.entries(seedContent.patternContent))
      ops.push({ updateOne: { filter: { kind: "pattern", slug }, update: { $set: { data } }, upsert: true } });
    for (const [slug, data] of Object.entries(seedContent.questionContent))
      ops.push({ updateOne: { filter: { kind: "question", slug }, update: { $set: { data } }, upsert: true } });
    if (ops.length) await Content.bulkWrite(ops);
    const allContent = await Content.find().lean();
    const pc = {}, qc = {};
    for (const d of allContent) { if (d.kind === "pattern") pc[d.slug] = d.data; else qc[d.slug] = d.data; }
    patternContent = pc; questionContent = qc;

    console.log(`MongoDB connected (${MONGODB_URI}). Topics: ${TOPICS.length}, content: ${Object.keys(pc).length} patterns / ${Object.keys(qc).length} questions`);
  } catch (e) {
    MONGO = false;
    TOPICS = getTopics();
    console.warn("MongoDB not reachable:", e.message);
    console.warn("Running with JSON + in-memory progress. Start MongoDB and restart to use the database.");
  }
  reindex();
  app.listen(PORT, () => console.log(`DSA server on http://localhost:${PORT}  (store: ${MONGO ? "mongodb" : "json-fallback"})`));
})();
