import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

const nice = (d) => ({ EASY: "Easy", MEDIUM: "Medium", HARD: "Hard" }[d] || d);

export default function RandomScreen() {
  const nav = useNavigate();
  const [started, setStarted] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const roll = (s = started) => {
    setLoading(true);
    api.random(s).then((d) => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { roll(); }, []);

  const toggle = (s) => { setStarted(s); roll(s); };

  return (
    <>
      <TopBar title="Random question" />
      <div className="screen">
        <div className="center" style={{ padding: "8px 0 4px" }}>
          <div style={{ fontSize: 40 }}>🎲</div>
          <h2 style={{ margin: "8px 0 2px" }}>Surprise question</h2>
          <p className="sub">A random problem + 5 quick quiz questions on it</p>
        </div>

        <div className="row" style={{ justifyContent: "center", margin: "12px 0" }}>
          <span className="chip" style={{ cursor: "pointer", background: started ? "var(--purple-bg)" : "var(--cream-2)", color: started ? "var(--purple)" : "var(--muted)" }} onClick={() => toggle(true)}>Only started</span>
          <span className="chip" style={{ cursor: "pointer", background: !started ? "var(--purple-bg)" : "var(--cream-2)", color: !started ? "var(--purple)" : "var(--muted)" }} onClick={() => toggle(false)}>Anything goes</span>
        </div>

        {loading && <p className="loading">Rolling…</p>}
        {!loading && data && (
          <>
            <div className="card" role="button" onClick={() => nav("/question/" + data.problem.slug)}>
              <b style={{ fontSize: 15 }}>{data.problem.title}</b>
              <p className="sub" style={{ marginTop: 4 }}>
                {data.problem.reference} · {nice(data.problem.difficulty)}
              </p>
            </div>

            {data.quizzes && data.quizzes.length > 0 && (
              <button
                className="btn btn-primary mt"
                onClick={() => nav("/quiz", { state: { title: data.problem.title + " — quiz", items: data.quizzes, slug: data.problem.slug } })}
              >
                ▶ Start {data.quizzes.length}-question quiz
              </button>
            )}
            <button className="btn mt" onClick={() => roll()}>🔄 Roll again</button>
          </>
        )}
      </div>
    </>
  );
}
