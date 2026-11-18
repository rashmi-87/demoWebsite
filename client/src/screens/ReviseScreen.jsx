import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

export default function ReviseScreen() {
  const nav = useNavigate();
  const [mode, setMode] = useState("problem");
  const [items, setItems] = useState(null);
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [recallCount, setRecallCount] = useState(null);

  useEffect(() => { api.revise().then((d) => setItems(d.items)).catch(() => {}); }, []);
  useEffect(() => { api.recall().then((d) => setRecallCount(d.solvedCount)).catch(() => {}); }, []);

  const next = () => { setReveal(false); setI((x) => (x + 1) % (items.length || 1)); };
  const cur = items && items[i];

  return (
    <>
      <TopBar title="Revision" back />
      <div className="screen">
        <div className="row" style={{ marginBottom: 14 }}>
          <button className={mode === "problem" ? "btn btn-primary" : "btn"} onClick={() => setMode("problem")}>
            Problem
          </button>
          <button className={mode === "quiz" ? "btn btn-primary" : "btn"} onClick={() => setMode("quiz")}>
            Quiz
          </button>
        </div>

        {/* PROBLEM: interviewer-style revisit of solved problems */}
        {mode === "problem" && (
          <>
            {!items && <p className="loading">Loading…</p>}
            {items && items.length === 0 && (
              <div className="card center">
                <p className="muted">Solve a few questions first — then you can revise them here 🙂</p>
              </div>
            )}
            {items && cur && (
              <>
                <p className="sub mb">Interviewer mode · random problems you've already solved 🎤</p>
                <div className="story mb" style={{ background: "#FAECE7", borderColor: "#F0D0C0" }}>
                  <p className="k" style={{ color: "#993C1D" }}>🎤 The interviewer asks</p>
                  <p style={{ color: "#4A1B0C" }}>"{cur.prompt}"</p>
                  {cur.pattern && <p className="sub" style={{ marginTop: 8 }}>({cur.title} · {cur.pattern})</p>}
                </div>

                {!reveal ? (
                  <button className="btn btn-primary" onClick={() => setReveal(true)}>Reveal the answer</button>
                ) : (
                  <>
                    <div className="card mb">
                      <p style={{ margin: 0, fontSize: 14 }}>{cur.answer}</p>
                    </div>
                    <div className="row">
                      <button className="btn" onClick={next}>Still shaky</button>
                      <button className="btn btn-green" onClick={next}>Got it cold</button>
                    </div>
                  </>
                )}
                <p className="center muted mt" style={{ fontSize: 12 }}>
                  {i + 1} / {items.length} · shaky ones come back sooner
                </p>
              </>
            )}
          </>
        )}

        {/* QUIZ: recall quiz from every solved topic */}
        {mode === "quiz" && (
          <div className="card center">
            <div style={{ fontSize: 34 }}>❓</div>
            <h2 style={{ margin: "8px 0 4px" }}>Recall quiz</h2>
            <p className="sub mb">Random quizzes drawn from every topic you've solved so far.</p>
            {recallCount === 0 ? (
              <p className="muted">Solve a few questions first to unlock the quiz.</p>
            ) : (
              <button className="btn btn-primary" onClick={() => nav("/quiz")}>Start recall quiz</button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
