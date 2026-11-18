import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

const diffChip = (d) => "chip chip-" + (d || "").toLowerCase();
const nice = (d) => ({ EASY: "Easy", MEDIUM: "Medium", HARD: "Hard" }[d] || d);

export default function QuestionScreen() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [q, setQ] = useState(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    api.question(slug).then((d) => { setQ(d); setSolved(!!d.solved); }).catch(() => {});
  }, [slug]);

  const markSolved = async () => { await api.solve(slug); setSolved(true); };
  const c = q && q.content;

  return (
    <>
      <TopBar title={q ? q.title : "Question"} back />
      <div className="screen">
        {!q && <p className="loading">Loading…</p>}
        {q && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              <span className={diffChip(q.difficulty)}>{nice(q.difficulty)}</span>
              {q.leetcodeUrl && <span className="chip chip-lc">🔗 {q.reference}</span>}
              {q.pattern && <span className="chip chip-pattern">🎯 {q.pattern.name}</span>}
            </div>

            {c ? (
              <>
                <div className="story mb">
                  <p className="k">💡 The problem</p>
                  <p>{c.description}</p>
                </div>
                {c.example && (
                  <div className="mb">
                    <span className="chip chip-pattern">Example</span>
                    <div className="card-soft" style={{ marginTop: 7 }}>
                      <pre style={{ margin: 0, fontFamily: "Consolas, monospace", fontSize: 13, whiteSpace: "pre-wrap", color: "#4D3A2A" }}>
{"Input:  " + c.example.input + "\nOutput: " + c.example.output + (c.example.why ? "\nWhy:    " + c.example.why : "")}
                      </pre>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="card-soft mb">
                <p style={{ margin: 0, fontSize: 13 }} className="muted">
                  A detailed explainer and quiz for this question are coming soon. For now, read it on LeetCode, solve it, and hit "Mark solved".
                </p>
              </div>
            )}

            <div className="mb">
              <p className="sub" style={{ marginBottom: 6 }}>💻 Code template (JavaScript)</p>
              <div className="codebox"><pre>{`function solve(input) {\n  // Write your code here\n}`}</pre></div>
            </div>

            <div className="row mb">
              {q.leetcodeUrl && (
                <a className="btn" href={q.leetcodeUrl} target="_blank" rel="noreferrer">🔗 See on LeetCode</a>
              )}
              <button className={solved ? "btn btn-green" : "btn btn-primary"} onClick={markSolved}>
                {solved ? "✓ Solved" : "Mark solved"}
              </button>
            </div>

            {q.quizzes && q.quizzes.length > 0 && (
              <button
                className="btn"
                onClick={() => nav("/quiz", { state: { title: q.title + " — quick quiz", items: q.quizzes, slug: q.slug } })}
              >
                ❓ Test yourself ({q.quizzes.length} quick questions)
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
