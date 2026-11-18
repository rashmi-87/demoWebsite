const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    slug: String,
    title: String,
    reference: String,
    difficulty: String,
    leetcodeUrl: String,
  },
  { _id: false }
);

const PatternSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    strategy: String,
    problems: [ProblemSchema],
  },
  { _id: false }
);

const TopicSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, index: true, unique: true },
  description: String,
  problemCount: Number,
  locked: { type: Boolean, default: false },
  order: Number,
  patterns: [PatternSchema],
});

// Single-user progress document (userId defaults to "me").
const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, default: "me" },
    solved: { type: Object, default: {} },
    quizScores: { type: Object, default: {} },
    patternScores: { type: Object, default: {} },
    timeSpent: { type: Object, default: {} },
    streak: { type: Number, default: 1 },
    lastActiveDay: { type: String, default: () => new Date().toDateString() },
    dailyGoal: { type: Number, default: 3 },
    solvedToday: { type: Number, default: 0 },
  },
  { minimize: false }
);

// Learning content (stories, templates, quizzes) stored per slug.
// kind: "pattern" (keyed by pattern slug) or "question" (keyed by problem slug).
const ContentSchema = new mongoose.Schema(
  {
    kind: { type: String, index: true },
    slug: { type: String, index: true },
    data: { type: Object, default: {} },
  },
  { minimize: false }
);
ContentSchema.index({ kind: 1, slug: 1 }, { unique: true });

const Topic = mongoose.model("Topic", TopicSchema);
const Progress = mongoose.model("Progress", ProgressSchema);
const Content = mongoose.model("Content", ContentSchema);

module.exports = { Topic, Progress, Content };
