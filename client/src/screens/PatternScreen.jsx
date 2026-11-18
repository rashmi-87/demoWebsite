import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

const diffChip = (d) => "chip chip-" + (d || "").toLowerCase();
const diffShort = (d) => ({ EASY: "Easy", MEDIUM: "Med", HARD: "Hard" }[d] || d);

export default function PatternScreen() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => { api.pattern(slug).then(setData).catch(() => {}); }, [slug]);

  const startPatternQuiz = () => {
    if (data && data.content && data.content.patternQuiz) {
      nav("/quiz", { state: { title: data.name + " quiz", items: data.content.patternQuiz, patternSlug: data.slug } });
    }
  };

  return (
    <>
      <TopBar title={data ? data.name : "Pattern"} back />
      <div className="screen">
        {!data && <p className="loading">Loading…</p>}
        {data && (
          <>
            {data.content && (
              <>
                <div className="story mb">
                  <p className="k">📖 Story time</p>
                  <p>{data.content.story}</p>
                </div>
                {data.content.moral && (
                  <div className="card-soft mb">
                    <p className="sub" style={{ marginBottom: 4 }}>💡 Remember</p>
                    <p style={{ margin: 0, fontSize: 13 }}>{data.content.moral}</p>
                  </div>
                )}
                {data.content.triggers && (
                  <div className="card mb">
                    <p className="sub" style={{ marginBottom: 6 }}>Reach for this pattern when you hear</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {data.content.triggers.map((t) => (
                        <span key={t} className="chip chip-pattern">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {data.content.template && (
                  <div className="mb">
                    <p className="sub" style={{ marginBottom: 6 }}>💻 Reusable template (JavaScript)</p>
                    <div className="codebox"><pre>{data.content.template}</pre></div>
                  </div>
                )}
              </>
            )}

            <h2 className="mt">Questions ({data.total})</h2>
            {data.problems.map((p) => (
              <div key={p.slug} className="list-item" role="button" onClick={() => nav("/question/" + p.slug)}>
                <span style={{ fontSize: 18, color: p.solved ? "var(--green)" : "#C9B894" }}>
                  {p.solved ? "✓" : "○"}
                </span>
                <span style={{ flex: 1, fontSize: 14 }}>{p.title}</span>
                <span className={diffChip(p.difficulty)}>{diffShort(p.difficulty)}</span>
                <span className="muted">›</span>
              </div>
            ))}

            <button
              className="btn btn-primary mt"
              style={{ opacity: data.quizUnlocked ? 1 : 0.55 }}
              onClick={() => data.quizUnlocked ? startPatternQuiz() : null}
            >
              {data.quizUnlocked ? "🏆 Take the " + data.name + " quiz" : "🔒 Finish all questions to unlock the quiz"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
