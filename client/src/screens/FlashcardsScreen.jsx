import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

// Quick-revision flashcards. Pick a topic, then narrow to a single pattern
// (or the whole topic), then flip through: tap the card to reveal the answer.
export default function FlashcardsScreen() {
  const [topics, setTopics] = useState([]);
  const [patterns, setPatterns] = useState([]); // patterns of the selected topic
  const [topic, setTopic] = useState("all");
  const [pattern, setPattern] = useState("all");
  const [cards, setCards] = useState(null);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    api.topics().then((d) => setTopics(d.topics || [])).catch(() => {});
  }, []);

  // When the topic changes, load that topic's pattern list and reset the pattern filter.
  useEffect(() => {
    setPattern("all");
    if (topic === "all") { setPatterns([]); return; }
    api.topic(topic).then((d) => setPatterns(d.patterns || [])).catch(() => setPatterns([]));
  }, [topic]);

  function load() {
    setCards(null);
    setI(0);
    setFlipped(false);
    api.flashcards(topic, pattern, true).then((d) => setCards(d.cards || [])).catch(() => setCards([]));
  }
  useEffect(() => { load(); }, [topic, pattern]);

  const cur = cards && cards[i];
  const total = cards ? cards.length : 0;

  const next = () => { setFlipped(false); setI((x) => (total ? (x + 1) % total : 0)); };
  const prev = () => { setFlipped(false); setI((x) => (total ? (x - 1 + total) % total : 0)); };
  const shuffle = () => load();

  const topicOptions = useMemo(
    () => [{ slug: "all", name: "All topics" }, ...topics.map((t) => ({ slug: t.slug, name: t.name }))],
    [topics]
  );
  const patternOptions = useMemo(
    () => [{ slug: "all", name: "All patterns in this topic" },
      ...patterns.map((p) => ({ slug: p.slug, name: p.name }))],
    [patterns]
  );

  const diffColor = (d) =>
    d === "EASY" ? "#2E7D32" : d === "MEDIUM" ? "#B9770E" : d === "HARD" ? "#B3261E" : "#8a6d5a";

  const selectStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 14,
    border: "1px solid #E7CDBD", background: "#FFF7F1", color: "#4A2A18",
    fontSize: 15, fontWeight: 600, appearance: "none",
  };

  return (
    <>
      <TopBar title="Flashcards" back />
      <div className="screen">
        <p className="sub mb">Flip through quick cards to lock in each pattern & problem 🧠</p>

        {/* Topic picker */}
        <div style={{ marginBottom: 10 }}>
          <label className="sub" style={{ fontSize: 12, display: "block", marginBottom: 5 }}>Topic</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} style={selectStyle}>
            {topicOptions.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Pattern picker — only when a specific topic is chosen */}
        {topic !== "all" && (
          <div style={{ marginBottom: 14 }}>
            <label className="sub" style={{ fontSize: 12, display: "block", marginBottom: 5 }}>Pattern</label>
            <select value={pattern} onChange={(e) => setPattern(e.target.value)} style={selectStyle}>
              {patternOptions.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
          </div>
        )}
        {topic === "all" && <div style={{ marginBottom: 14 }} />}

        {!cards && <p className="loading">Shuffling the deck…</p>}

        {cards && total === 0 && (
          <div className="card center">
            <p className="muted">No cards here yet.</p>
          </div>
        )}

        {cur && (
          <>
            {/* The card — tap anywhere to flip */}
            <div
              onClick={() => setFlipped((f) => !f)}
              className="card"
              style={{
                minHeight: 260, cursor: "pointer", display: "flex", flexDirection: "column",
                justifyContent: flipped ? "flex-start" : "center", transition: "background 0.2s",
                background: flipped ? "#F6FAF6" : "#FFFDFB",
                borderColor: flipped ? "#CDE9CD" : "#F0D9C9",
              }}
            >
              <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
                <span className="sub" style={{ fontSize: 12 }}>
                  {cur.kind === "pattern" ? "🧩 Pattern" : "📝 Problem"} · {cur.topic}
                </span>
                {cur.difficulty && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: diffColor(cur.difficulty) }}>
                    {cur.difficulty}
                  </span>
                )}
              </div>

              {!flipped ? (
                <div className="center" style={{ padding: "6px 2px" }}>
                  <h2 style={{ margin: "4px 0 10px", color: "#3A2012" }}>{cur.front}</h2>
                  {cur.hint && (
                    <p className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>{cur.hint}</p>
                  )}
                  <p className="muted mt" style={{ fontSize: 12 }}>tap to flip 👆</p>
                </div>
              ) : (
                <div style={{ padding: "2px 2px", width: "100%" }}>
                  {(cur.blocks || []).map((b, idx) => (
                    <div key={idx} style={{ marginBottom: 14 }}>
                      <div style={{
                        fontSize: 11, fontWeight: 800, letterSpacing: 0.7,
                        textTransform: "uppercase", color: "#C47A2A", marginBottom: 6,
                      }}>
                        {b.label}
                      </div>
                      {b.mono ? (
                        <pre style={{
                          margin: 0, fontSize: 12.5, lineHeight: 1.5,
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                          background: "#FFFDF8", border: "1px solid #ECD9C8", borderRadius: 10,
                          padding: "10px 12px", overflowX: "auto", whiteSpace: "pre", color: "#4A3524",
                        }}>
                          {b.body}
                        </pre>
                      ) : (
                        <p style={{
                          margin: 0, fontSize: 14.5, lineHeight: 1.6,
                          whiteSpace: "pre-wrap", color: "#2F3A2F",
                        }}>
                          {b.body}
                        </p>
                      )}
                    </div>
                  ))}
                  {cur.leetcode && (
                    <a
                      href={cur.leetcode}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ fontSize: 13, color: "#B9770E", fontWeight: 600 }}
                    >
                      See on LeetCode →
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="row" style={{ marginTop: 14 }}>
              <button className="btn" onClick={prev}>← Prev</button>
              <button className="btn btn-primary" onClick={next}>Next →</button>
            </div>
            <div className="row" style={{ marginTop: 10, justifyContent: "center" }}>
              <button className="btn" onClick={shuffle}>🔀 Shuffle deck</button>
            </div>

            <p className="center muted mt" style={{ fontSize: 12 }}>
              {i + 1} / {total}
            </p>
          </>
        )}
      </div>
    </>
  );
}
