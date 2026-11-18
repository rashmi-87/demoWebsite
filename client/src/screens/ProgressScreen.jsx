import { useEffect, useState } from "react";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

export default function ProgressScreen() {
  const [p, setP] = useState(null);
  useEffect(() => { api.progress().then(setP).catch(() => {}); }, []);

  return (
    <>
      <TopBar title="Progress" streak={p ? p.streak : null} />
      <div className="screen">
        {!p && <p className="loading">Loading…</p>}
        {p && (
          <>
            <div className="grid3 mb">
              <div className="stat" style={{ background: "var(--green-bg)" }}>
                <span>💻</span>
                <p className="n">{p.totalSolved}</p>
                <p className="l">Solved /{p.totalProblems}</p>
              </div>
              <div className="stat" style={{ background: "var(--purple-bg)" }}>
                <span>📋</span>
                <p className="n">{p.avgQuiz != null ? p.avgQuiz + "%" : "—"}</p>
                <p className="l">Avg quiz</p>
              </div>
              <div className="stat" style={{ background: "#FBE7D4" }}>
                <span>🔥</span>
                <p className="n">{p.streak}</p>
                <p className="l">Day streak</p>
              </div>
            </div>

            <div className="card-soft mb" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span>🎯</span>
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: 13 }}>Daily goal</b>
                <div className="bar bar-orange" style={{ marginTop: 4 }}>
                  <span style={{ width: Math.min(100, (p.solvedToday / p.dailyGoal) * 100) + "%" }} />
                </div>
              </div>
              <span className="sub">{p.solvedToday}/{p.dailyGoal}</span>
            </div>

            <h2 className="mt">Pattern-wise progress</h2>
            {p.perTopic.filter((t) => t.solved > 0 || !t.locked).map((t) => (
              <div key={t.slug} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", fontSize: 13, marginBottom: 3 }}>
                  <span style={{ flex: 1 }}>{t.name}</span>
                  <span className="muted">
                    {t.solved}/{t.total}{t.quizPct != null ? " · " + t.quizPct + "% quiz" : ""}
                  </span>
                </div>
                <div className={"bar" + (t.quizPct != null && t.quizPct < 70 ? " bar-orange" : "")}>
                  <span style={{ width: (t.total ? (t.solved / t.total) * 100 : 0) + "%" }} />
                </div>
              </div>
            ))}

            {p.weakSpot && (
              <div className="card mt" style={{ background: "#FBE3D0", borderColor: "#F0CDB0", display: "flex", gap: 10 }}>
                <span style={{ fontSize: 26 }}>🙂</span>
                <div>
                  <b style={{ color: "var(--orange-deep)" }}>{p.weakSpot.name} needs more love!</b>
                  <p className="sub" style={{ marginTop: 3, color: "#7A5A3A" }}>
                    Quiz score here is {p.weakSpot.quizPct}%. Do 2-3 focused problems in this area to strengthen it.
                  </p>
                </div>
              </div>
            )}

            {p.totalSolved === 0 && (
              <div className="card center mt"><p className="muted">Solve your first question — your progress will show up here 🌱</p></div>
            )}
          </>
        )}
      </div>
    </>
  );
}
